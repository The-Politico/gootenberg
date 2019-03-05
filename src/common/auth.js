import { readJSON } from 'fs-extra';
import { JWT } from 'google-auth-library';

export default async function(config) {
  let credentials;

  if (typeof config === 'string') {
    credentials = await readJSON(config);
  } else if (typeof config === 'object') {
    credentials = config;
  }

  this.client = new JWT({
    email: credentials['client_email'],
    key: credentials['private_key'],
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  await this.client.authorize();
  return this;
};
