# auth(credentials)

Authenticate your `Gootenberg` with Google. Service account credentials must be exchanged for temporary tokens. This method handles that. If tokens expire, this method can be called again to refresh the tokens.

- `credentials` `<Object>`
  - `client_email` `<String>`: The email for your service account (see below)
  - `private_key` `<String>`: The private key for your service account (see below)

## Example
```javascript
import Gootenberg from '@politico/gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);
}

myFunc();
```

## Authenticating

In order to use this app you'll need a Google Service Account which has write access to your Google Doc. For help with creating a Google Service Account, see [Making A Google Service Account](GoogleServiceAccount.md).

Once you have your credentials file, you can import it into your app and pass it as the argument to `auth()`.

Finally, also make sure to share the Google Doc you're using with the `client_email`. It may look long and not like a valid email, but Google will allow it.
