"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (query) {
  return new Promise((resolve, reject) => {
    this.driveAPI.files.list({
      auth: this.client,
      q: query,
      spaces: 'drive'
    }, (err, resp) => {
      if (err) {
        reject(err);
      }

      resolve(resp.data.files);
    });
  });
};