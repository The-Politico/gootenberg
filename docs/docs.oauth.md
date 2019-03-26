# auth.oauth(credentials, token)

Authenticate `Gootenberg` with Google using OAuth. Create a `credentials.json` file by going to the applicable API and clicking the "Enable the API" button and then clicking "Download Client Configuration".

- [Drive](https://developers.google.com/drive/api/v3/quickstart/nodejs)
- [Sheets](https://developers.google.com/sheets/api/quickstart/nodejs)
- [Docs](https://developers.google.com/docs/api/quickstart/nodejs)

Then, create a `token.json` file by running the following from within your node project:

```
$ npx gootenberg token [ PATH/TO/credentials.json ]
```

Follow the instructions, and you should have a `token.json` file in your current working directory.

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'
import token from './token.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.oauth(credentials, token);
}

myFunc();
```
