import inquirer from 'inquirer';

export default () => inquirer.prompt([{
  type: 'input',
  name: 'answer',
  message: 'Enter the code from that page here: ',
}]).then(({ answer }) => answer);
