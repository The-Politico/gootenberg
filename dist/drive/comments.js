"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (id) {
  return new Promise((resolve, reject) => {
    const getComments = (fileId, pageToken = null, accumulator = []) => {
      this.driveAPI.comments.list({
        auth: this.client,
        fileId,
        pageToken,
        fields: 'comments,nextPageToken',
        pageSize: 100
      }, (err, resp) => {
        if (err) {
          reject(err);
        }

        const commentData = [...accumulator, ...resp.data.comments];

        if (resp.data.nextPageToken) {
          getComments(fileId, resp.data.nextPageToken, commentData);
        } else {
          resolve(commentData);
        }
      });
    };

    getComments(id);
  });
};