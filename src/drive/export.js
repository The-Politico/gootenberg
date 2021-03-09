export default function driveExport(fileId, mimeType = 'text/plain') {
  return new Promise((resolve, reject) => {
    this.driveAPI.files.export({
      auth: this.client,
      fileId,
      mimeType,
    }, (err, resp) => {
      if (err) { reject(err); }
      resolve(resp.data);
    });
  });
}
