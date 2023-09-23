import * as contactsApi from './contacts.js';
import { program } from "commander";

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const allContacts = await contactsApi.listContacts();
          console.table(allContacts);
      break;

    case 'get':
          const contact = await contactsApi.getContactById(id);
          console.log(contact);
      break;

    case 'add':
      const contactAdd = await contactsApi.addContact(name, email, phone);
          console.log(contactAdd);
      break;

    case 'remove':
      const contactRemove = await contactsApi.removeContact(id);
          console.log(contactRemove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);