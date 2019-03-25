import { readJSON } from 'fs-extra';
import { OAuth2Client } from 'google-auth-library';

export default async function(config, token) {
  let credentials;

  if (typeof config === 'string') {
    credentials = await readJSON(config);
  } else if (typeof config === 'object') {
    credentials = config;
  }

  const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris,
  } = credentials.installed;

  this.client = new OAuth2Client(
    clientId, clientSecret, redirectUris[0]);

  await this.client.setCredentials(token);

  return this;
};
