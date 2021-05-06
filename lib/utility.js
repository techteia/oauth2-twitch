// Performs a url encoding to a javascript object
const uriEncode = (o) => Object.keys(o).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(o[k])}`).join('&');

module.exports = {
  uriEncode,
};
