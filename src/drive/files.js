import validateArgs from 'aproba';

export default function driveFiles(query) {
  validateArgs('S', [query]);

  return new Promise((resolve, reject) => {
    this.driveAPI.files.list({
      auth: this.client,
      q: query,
      spaces: 'drive',
    }, (err, resp) => {
      if (err) {
        reject(err);
      }
      resolve(resp.data.files);
    });
  });
}
