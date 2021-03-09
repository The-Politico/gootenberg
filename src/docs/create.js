import validateArgs from 'aproba';

export default async function create(title, directoryId) {
  validateArgs('S|SS', [title, directoryId]);

  const { data } = await this.docsAPI.documents.create({
    auth: this.client,
    title,
  });

  if (directoryId) {
    const { documentId } = data;

    await this.drive.move(documentId, directoryId);
  }

  return data;
}
