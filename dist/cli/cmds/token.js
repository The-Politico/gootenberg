"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleAuthLibrary = require("google-auth-library");

var _fsExtra = require("fs-extra");

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function createOAuthToken(credentials = 'credentials.json', tokenPath = 'token.json') {
  if (typeof credentials === 'string') {
    credentials = await (0, _fsExtra.readJSON)(credentials);
  } else if (credentials === undefined) {
    throw new Error('Must supply a credentials object, or path to a credentials file.');
  }

  const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris
  } = credentials.installed;
  var client = new _googleAuthLibrary.OAuth2Client(clientId, clientSecret, redirectUris[0]);
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const code = await q.code();
  const token = await getToken(client, code);
  client.setCredentials(token);
  await (0, _fsExtra.writeFile)(tokenPath, JSON.stringify(token), err => {
    if (err) return console.error(err);
    console.log('Token stored to', tokenPath);
  });
}

function getToken(client, code) {
  return new Promise((resolve, reject) => {
    client.getToken(code, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
}

exports.default = createOAuthToken;