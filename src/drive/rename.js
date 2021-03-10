import validateArgs from 'aproba';

export default async function rename(fileId, newTitle) {
  validateArgs('SS', [fileId, newTitle]);

  return this.driveAPI.files.update({
    auth: this.client,
    fileId,
    requestBody: {
      name: newTitle,
    },
  });
}
