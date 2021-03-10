import validateArgs from 'aproba';

export default async function copy(src, { destination, title } = {}) {
  validateArgs('S', [src]);

  const copyOpts = destination ? {
    parents: [destination],
  } : {};

  const { data } = await this.driveAPI.files.copy({
    auth: this.client,
    fileId: src,
    ...copyOpts,
  });

  if (title) {
    const { id: copyId } = data;

    await this.drive.rename(copyId, title);
  }

  return data;
}
