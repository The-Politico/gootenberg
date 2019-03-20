# oauth(\[credentials\])

Authenticate your `Gootenberg` with Google using OAuth. Create the `credentials.json` and `token.json` files by following [Google Sheets Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs) (or [Docs Quickstart](https://developers.google.com/docs/api/quickstart/nodejs) or [Drive Quickstart](https://developers.google.com/drive/api/v3/quickstart/nodejs)).

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'
import token from './token.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.oauth(credentials, token);
}

myFunc();
```
