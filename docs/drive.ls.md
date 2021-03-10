# drive.ls(id)

Get all the files in a Drive directory

- `id` `<String>`: The Id for a Google Drive folder (see [here](../README.md#usage))

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  const data = await goot.drive.ls('MY_FOLDER_ID');
  console.log(data);
}

myFunc();
```

## Example Data
```json
[
  {
    "kind": "drive#file",
    "id": "FILE_ID_HERE",
    "name": "FILE_NAME_HERE",
    "mimeType": "application/vnd.google-apps.document"
  },

  ...
]
```
