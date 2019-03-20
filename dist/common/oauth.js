"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (config, token) {
  let credentials;

  if (typeof config === 'string') {
    credentials = await (0, _fsExtra.readJSON)(config);
  } else if (typeof config === 'object') {
    credentials = config;
  }

  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  this.client = new _googleAuthLibrary.OAuth2Client(client_id, client_secret, redirect_uris[0]);
  await this.client.setCredentials(token);
  return this;
};

var _fsExtra = require("fs-extra");

var _googleAuthLibrary = require("google-auth-library");

;