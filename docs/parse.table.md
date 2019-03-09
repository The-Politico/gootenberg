# parse.table(id)

Downloads and parses a Google Sheet into JSON with the first row of each sheet representing keys and each row representing objects in an array.

- `id` `<String>`: The Id for a Google Sheet (see [here](../README.md#usage))

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);

  const data = await goot.parse.table('MY_DOC_ID');
}

myFunc();
```

## Example Data
```json
{
  "Sheet 1": [
    {
      "Column Header 1": "Lorem",
      "Column Header 2": "Ipsum"
    }, {
      "Column Header 1": "Dolor",
      "Column Header 2": "Sit"
    }, {
      "Column Header 1": "Amet",
      "Column Header 2": "Consectetur"
    }, {
      "Column Header 1": "Adipisicing",
      "Column Header 2": "Elit"
    }
  ],
  "Sheet 2": [
    {
      "Column Header 3": "Sed",
      "Column Header 4": "Eiusmod"
    }, {
      "Column Header 3": "Tempor",
      "Column Header 4": "Incididunt"
    }, {
      "Column Header 3": "Labore",
      "Column Header 4": "Magna"
    }, {
      "Column Header 3": "Aliqua",
      "Column Header 4": "Enim"
    }
  ]
}
```
