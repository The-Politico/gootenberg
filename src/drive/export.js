import validateArgs from 'aproba';

export default function driveExport(
  fileId,
  mimeType = 'text/plain',
) {
  validateArgs('SS', [fileId, mimeType]);

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
