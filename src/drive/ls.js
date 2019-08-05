export default function(id) {
  return new Promise((resolve, reject) => {
    const getChildren = (fileId, pageToken = null, accumulator = []) => {
      this.driveAPI.files.list({
        auth: this.client,
        q: `'${fileId}' in parents`,
        pageToken,
        pageSize: 100,
      }, (err, resp) => {
        if (err) {
          reject(err);
        }

        const commentData = [...accumulator, ...resp.data.files];

        if (resp.data.nextPageToken) {
          getChildren(fileId, resp.data.nextPageToken, commentData);
        } else {
          resolve(commentData);
        }
      });
    };

    getChildren(id);
  });
}
