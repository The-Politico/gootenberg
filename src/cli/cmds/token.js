import { OAuth2Client } from 'google-auth-library';
import { readJSON, writeFile } from 'fs-extra';
import * as q from './questions';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

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

async function createOAuthToken(
  credentialsOrPath = 'credentials.json',
  tokenPath = 'token.json',
) {
  let credentials = credentialsOrPath;
  if (typeof credentialsPath === 'string') {
    credentials = await readJSON(credentials);
  } else if (credentialsOrPath === undefined) {
    throw new Error(
      'Must supply a credentials object, or path to a credentials file.',
    );
  }

  const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris,
  } = credentials.installed;

  const client = new OAuth2Client(clientId, clientSecret, redirectUris[0]);

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

export default createOAuthToken;
