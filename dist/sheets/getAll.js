"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (spreadsheetId) {
  return new Promise((resolve, reject) => {
    this.sheetsAPI.spreadsheets.get({
      auth: this.client,
      spreadsheetId,
      range: []
    }, (err, resp) => {
      if (err) {
        reject(err);
      }

      ;
      resolve(resp.data);
    });
  }).then(data => {
    return new Promise((resolve, reject) => {
      this.sheetsAPI.spreadsheets.values.batchGet({
        auth: this.client,
        spreadsheetId,
        ranges: data.sheets.map(s => s.properties.title)
      }, (err, resp) => {
        if (err) {
          reject(err);
        }

        ;
        resolve(resp.data);
      });
    });
  });
};