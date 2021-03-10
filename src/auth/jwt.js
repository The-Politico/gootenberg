import { readJSON } from 'fs-extra';
import { JWT } from 'google-auth-library';

export default async function jwt(config) {
  let credentials;

  if (typeof config === 'string') {
    credentials = await readJSON(config);
  } else if (typeof config === 'object') {
    credentials = config;
  } else if (config === undefined) {
    credentials = {
      client_email: process.env.GAPI_CLIENT_EMAIL,
      private_key: process.env.GAPI_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  this.client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  await this.client.authorize();
  return this;
}
