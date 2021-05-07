const fs = require('fs'),
      env = require('dotenv').config();

if (env.error)
  throw error;

const TwitchOAuth2Client = new (require('../lib'))({
  client_id: env.parsed.TWITCH_CLIENT_ID,
  redirect_uri: env.parsed.AUTHENTICATION_URL,
  client_secret: env.parsed.TWITCH_CLIENT_SECRET,
  callbackURL: env.parsed.AUTHENTICATION_URL,
  scope: 'user_read channel_read',
});

const getAppAccessToken = async () => {
  const authenticationData = await TwitchOAuth2Client.getAppAccessToken();
  fs.writeFileSync('./database.json', JSON.stringify(authenticationData));
};

// Create or update 
if (!fs.existsSync('./database.json'))
  // Initialize "database file"
  getAppAccessToken();
else {
  // Check if the token has expired and get new one if necessary
  const authenticationData = JSON.parse(fs.readFileSync('./database.json', { encoding: 'UTF-8' }));
  if (Date.parse(authenticationData.dateExpiration) < Date.now())
    // Token has expired, refresh
    getAppAccessToken();
  else
    TwitchOAuth2Client.setAccessToken(authenticationData.access_token);
}

const main = async () => {
  // console.log(TwitchOAuth2Client);
  let user = await TwitchOAuth2Client.getStreams('profswirlyeyes');
  console.log(user)
  user = await TwitchOAuth2Client.getStreams(['profswirlyeyes','wiggenwell']);
  console.log(user)
}

main();