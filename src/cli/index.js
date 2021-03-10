import yargs from 'yargs';
import token from './cmds/token';

yargs // eslint-disable-line
  .help()
  .scriptName('gootenberg')

  // New
  .command(
    'token [credentials] [output]', 'Generates a new OAuth token file',
    (args) => {
      args
        .positional('credentials', {
          alias: 'c',
          describe: 'The path to your credentials file',
          type: 'string',
          default: 'credentials.json',
        })
        .positional('output', {
          alias: 'o',
          describe: 'The path to the output of your token file',
          type: 'string',
          default: 'token.json',
        });
    }, async ({ credentials, output }) => {
      await token(credentials, output);
    },
  )

  .argv;
