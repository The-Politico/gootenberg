import validateArgs from 'aproba';

export default async function move(srcId, destinationId) {
  validateArgs('SS', [srcId, destinationId]);

  const src = await this.driveAPI.files.get({
    auth: this.client,
    fileId: srcId,
    fields: 'parents',
  });

  const previousParents = src.data.parents.join(',');

  await this.driveAPI.files.update({
    auth: this.client,
    fileId: srcId,
    addParents: destinationId,
    removeParents: previousParents,
    fields: 'id, parents',
  });
}
