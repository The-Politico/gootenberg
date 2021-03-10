# drive.copy(src, options)

Make a copy of a file

- `src` `<String>`: The Id for a Google Drive file to copy.
- `options` `<Object>`: Extra configurations
- `options.destination` `<String>`: The Id of a Google Drive directory to put the copy in
- `options.title` `<String>`: A name for the new copy (defaults to "Copy of ...")

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  await goot.drive.copy('MY_FILE_ID', {
    destination: 'MY_FOLDER_ID',
    title: "New File"
  });
}

myFunc();
```
