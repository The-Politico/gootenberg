export default function appendRows(
  spreadsheetId,
  values,
  { valueInputOption = 'RAW' } = {},
) {
  return new Promise((resolve, reject) => {
    this.sheetsAPI.spreadsheets.values.append({
      auth: this.client,
      spreadsheetId,
      range: 'A1',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption,
      resource: {
        majorDimension: 'ROWS',
        values,
      },
    }, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp.data);
      }
    });
  });
}
