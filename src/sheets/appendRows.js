import validateArgs from 'aproba';

export default async function appendRows(
  spreadsheetId,
  values,
  { valueInputOption = 'RAW' } = {},
) {
  validateArgs('SA', [spreadsheetId, values]);
  if (!Array.isArray(values[0])) {
    throw new Error(
      'Argument #2: Each item in array should be an array of values.',
    );
  }

  const { data } = await this.sheetsAPI.spreadsheets.values.append({
    auth: this.client,
    spreadsheetId,
    range: 'A1',
    insertDataOption: 'INSERT_ROWS',
    valueInputOption,
    resource: {
      majorDimension: 'ROWS',
      values,
    },
  });

  return data;
}
