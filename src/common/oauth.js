import { readJSON } from 'fs-extra';
import { OAuth2Client } from 'google-auth-library';

export default async function(config, token) {
  let credentials;

  if (typeof config === 'string') {
    credentials = await readJSON(config);
  } else if (typeof config === 'object') {
    credentials = config;
  }

  const {client_secret, client_id, redirect_uris} = credentials.installed;

  this.client = new OAuth2Client(
      client_id, client_secret, redirect_uris[0]);

  await this.client.setCredentials(token);

  return this;

};
