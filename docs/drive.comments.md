# drive.comments(id)

Get the comments for a Google Drive file.

- `id` `<String>`: The Id for a Google Drive file (see [here](../README.md#usage))

## Example
```javascript
import Gootenberg from '@politico/gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);

  const data = await goot.drive.comments('MY_DOC_ID');
  console.log(data);
}

myFunc();
```

## Example Data
```json
[
  {
    "kind": "drive#comment",
    "id": "AEWABCuB7Y-E",
    "createdTime": "2019-03-05T20:02:30.294Z",
    "modifiedTime": "2019-03-05T20:02:30.294Z",
    "author": {
      "kind": "drive#user",
      "displayName": "Andrew Briz",
      "photoLink": "//lh3.googleusercontent.com/a-/ASDFAS7BWE9mjHAEFAEA0JASDFAADFAEbm1r3AVEASEFFyCT-arfkWCg=s96-k-no",
      "me": false
    },
    "htmlContent": "Lorem ipsum.",
    "content": "Lorem ipsum.",
    "deleted": false,
    "quotedFileContent": {
      "mimeType": "text/html",
      "value": "Ut enim ad minim"
    },
    "anchor": "kix.6pvv3sglwns5",
    "replies": []
  }

  ...
]
```
