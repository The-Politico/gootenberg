import { OAuth2Client } from 'google-auth-library';
import { readJSON, writeFile } from 'fs-extra';
import * as q from './questions';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function createOAuthToken(credentials = 'credentials.json', tokenPath = 'token.json') {
  if (typeof credentials === 'string') {
    credentials = await readJSON(credentials);
  } else if (credentials === undefined) {
    throw new Error('Must supply a credentials object, or path to a credentials file.');
  }

  const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris,
  } = credentials.installed;

  var client = new OAuth2Client(clientId, clientSecret, redirectUris[0]);

  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const code = await q.code();
  const token = await getToken(client, code);

  client.setCredentials(token);

  await writeFile(tokenPath, JSON.stringify(token), (err) => {
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

export default createOAuthToken;
