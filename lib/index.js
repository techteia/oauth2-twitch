const fetch = require('node-fetch'),
      { uriEncode } = require('./utility');

function TwitchOAuth2Client(options) {
  this.client_id = options?.client_id;
  this.client_secret = options?.client_secret;
  this.redirect_uri = options?.redirect_uri;
  this.scope = options?.scope;
  this.twitchAuthBaseUri = options?.twitchAuthBaseUri || 'https://id.twitch.tv/oauth2';
  this.twitchAPIBaseUri = options?.twitchAPIBaseUri || 'https://api.twitch.tv/helix';
  this.callbackURL = options?.callbackURL;
  this.access_token;
  this.dateExpiration;
}

TwitchOAuth2Client.prototype.setAccessToken = function(access_token) {
  this.access_token = access_token;
};

TwitchOAuth2Client.prototype.setScope = function(scope) {
  this.scope = scope;
};

TwitchOAuth2Client.prototype.getAuthenticationUri = function() {
  return `${this.twitchAuthBaseUri}/authorize?${uriEncode({
    client_id: this.client_id,
    client_secret: this.client_secret,
    response_type: 'token',
    redirect_uri: this.redirect_uri,
  })}`;
};

TwitchOAuth2Client.prototype.getAppAccessToken = async function(scope = this.scope) {
  const response = await fetch(
    `${this.twitchAuthBaseUri}/token?`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: uriEncode({
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'client_credentials',
        scope,
      }),
    }
  );

  if (!response.ok) throw await response.json();

  const data = await response.json();

  this.access_token = data.access_token;

  this.dateExpiration = new Date();
  this.dateExpiration.setSeconds(this.dateExpiration.getSeconds() + +data.expires_in);

  return {
    ...data, dateExpiration: this.dateExpiration,
  };
};

TwitchOAuth2Client.prototype.revokeAppAccessToken = async function(token = this.access_token) {
  const response = await fetch(
    `${this.twitchAuthBaseUri}/revoke?`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: uriEncode({
        client_id: this.client_id, token,
      }),
    }
  );

  if (!response.ok) throw await response.json();

  return response.status;
};

TwitchOAuth2Client.prototype.getChannel = async function(broadcaster_id, accessToken = this.access_token, tokenType = 'Bearer') {
  const response = await fetch(
    `${this.twitchAPIBaseUri}/channels?${uriEncode({ broadcaster_id })}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': this.client_id,
        'Authorization': `${tokenType} ${accessToken}`,
      },
    }
  );

  if (!response.ok) throw await response.json();

  const { data } = await response.json();

  return data[0];
};

TwitchOAuth2Client.prototype.getUser = async function(login, accessToken = this.access_token, tokenType = 'Bearer') {
  const response = await fetch(
    `${this.twitchAPIBaseUri}/users?${uriEncode({ login })}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': this.client_id,
        'Authorization': `${tokenType} ${accessToken}`,
      },
    }
  );

  if (!response.ok) throw await response.json();

  const { data } = await response.json();

  return data[0];
};

TwitchOAuth2Client.prototype.validateToken = async function(token = this.access_token) {
  const response = await fetch(
    `${this.twitchAuthBaseUri}/validate`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw await response.json();

  return await response.json();
};

TwitchOAuth2Client.prototype.createSubscription = async function(subscriptionEntity, subscriptionType, broadcasterUserId, accessToken = this.access_token, tokenType = 'Bearer') {
  const response = await fetch(
    `${this.twitchAPIBaseUri}/eventsub/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': this.client_id,
        'Authorization': `${tokenType} ${accessToken}`,
      },
      body: JSON.stringify({
        type: `${subscriptionEntity}.${subscriptionType}`,
        version: '1',
        condition: {
          broadcaster_user_id: broadcasterUserId,
        },
        transport: {
          method: 'webhook',
          callback: `${this.callbackURL}/${subscriptionEntity}/${subscriptionType}`,
          secret: this.client_secret,
        },
      }),
    }
  );

  if (!response.ok) throw await response.json();

  return await response.json();
};

TwitchOAuth2Client.prototype.deleteSubscription = async function(id, accessToken = this.access_token, tokenType = 'Bearer') {
  const response = await fetch(
    `${this.twitchAPIBaseUri}/eventsub/subscriptions?${uriEncode({ id })}`,
    {
      method: 'DELETE',
      headers: {
        'Client-ID': this.client_id,
        'Authorization': `${tokenType} ${accessToken}`,
      },
    }
  );

  if (!response.ok) throw await response.json();

  return response.status;
};

TwitchOAuth2Client.prototype.getSubscriptions = async function(accessToken = this.access_token, tokenType = 'Bearer') {
  const response = await fetch(
    `${this.twitchAPIBaseUri}/eventsub/subscriptions`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': this.client_id,
        'Authorization': `${tokenType} ${accessToken}`,
      },
    }
  );

  if (!response.ok) throw await response.json();

  return await response.json();
};

module.exports = TwitchOAuth2Client;
