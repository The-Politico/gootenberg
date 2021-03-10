# sheets.appendRows(id, values, \[options\])

Gets the full content of a Google Sheet.

- `id` `<String>`: The Id for a Google Sheet (see [here](../README.md#usage))
- `values` `<String[][]>`: Each row should be its own array, with an array of strings inside it.
- `options` `<Object>`: Extra configurations
- `options.valueInputOption` `<String>`: Defaults to `RAW`, but can instead by set to `USER_ENTERED` (see [here](https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption)).

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const data = [
    [
      'Row 1 Column 1',
      'Row 1 Column 2',
      'Row 1 Column 3',
    ],
    [
      'Row 2 Column 1',
      'Row 2 Column 2',
      'Row 2 Column 3',
    ],
  ];


  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  await goot.sheets.appendRows(SHEET_ID, data);
}

myFunc();
```
