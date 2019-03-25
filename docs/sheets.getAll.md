# sheets.getAll(id)

Gets the full content of a Google Sheet.

- `id` `<String>`: The Id for a Google Sheet (see [here](../README.md#usage))

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  const data = await goot.sheets.getAll('MY_DOC_ID');
}

myFunc();
```

## Example Data
```json
{
  "spreadsheetId": "1ncKlvgYasfi7u4seASDaaasdf-casdf5W8pE",
  "valueRanges": [{
    "range": "Sheet1!A1:Z1000",
    "majorDimension": "ROWS",
    "values": [
      ["Column Header 1", "Column Header 2"],
      ["Lorem", "Ipsum"],
      ["Lorem", "Ipsum"],
      ["Lorem", "Ipsum"],
      ["Lorem", "Ipsum"]
    ]
  }, {
    "range": "Sheet2!A1:Z1000",
    "majorDimension": "ROWS",
    "values": [
      ["Column Header 1", "Column Header 2"],
      ["Lorem", "Ipsum"],
      ["Lorem", "Ipsum"],
      ["Lorem", "Ipsum"],
      ["Lorem", "Ipsum"]
    ]
  }]
}
```
