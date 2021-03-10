import validateArgs from 'aproba';

export default async function create(title, directoryId) {
  validateArgs('S|SS', [title, directoryId]);

  const { data } = await this.sheetsAPI.spreadsheets.create({
    auth: this.client,
    resource: {
      properties: {
        title,
      },
    },
  });

  if (directoryId) {
    const { spreadsheetId } = data;
    await this.drive.move(spreadsheetId, directoryId);
  }

  return data;
}
