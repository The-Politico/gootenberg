# drive.files([query])

Get all the files shared with your service account matching a given query.

- `query` `<String>`: A Google API search query (see [here](https://developers.google.com/drive/api/v3/search-parameters))

## Example
```javascript
import Gootenberg from 'gooternberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);

  const data = await goot.drive.files('name = "MY_DOC_NAME"');
  console.log(data);
}

myFunc();
```

## Example Data
```json
[
  {
    "kind": "drive#file",
    "id": "1PuNASDFfoUr1waasdmAVW3z8yUasdfCWTKRkasdfuSo",
    "name": "plain",
    "mimeType": "application/vnd.google-apps.document"
  }

  ...
]
```
