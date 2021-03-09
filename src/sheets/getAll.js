import validateArgs from 'aproba';

export default async function getAll(spreadsheetId) {
  validateArgs('S', [spreadsheetId]);

  const {
    data: spreadsheetData,
  } = await this.sheetsAPI.spreadsheets.get({
    auth: this.client,
    spreadsheetId,
    range: [],
  });

  const { data } = await this.sheetsAPI.spreadsheets.values.batchGet({
    auth: this.client,
    spreadsheetId,
    ranges: spreadsheetData.sheets.map((s) => s.properties.title),
  });

  return data;
}
