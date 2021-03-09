import validateArgs from 'aproba';

export default async function parseTable(sheetId) {
  validateArgs('S', [sheetId]);
  const output = {};

  const data = await this.sheets.getAll(sheetId);
  // for each Sheet
  data.valueRanges.forEach((s) => {
    const name = s.range.replace(/'/g, '').split('!')[0];
    const headers = s.values[0];
    output[name] = [];

    // for each row
    s.values.forEach((v, vidx) => {
      if (vidx === 0) { return; }

      const entry = {};
      // for each column
      headers.forEach((h, hidx) => {
        entry[h] = s.values[vidx][hidx];
      });

      output[name].push(entry);
    });
  });

  return output;
}
