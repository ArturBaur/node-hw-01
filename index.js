const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (id) {
        getContactById(Number(id));
      } else {
        console.error('Error: ID is required for "get" action');
      }
      break;

    case "add":
      if (name && email && phone) {
        addContact(name, email, phone);
      } else {
        console.error(
          'Error: Name, email, and phone are required for "add" action'
        );
      }
      break;

    case "remove":
      if (id) {
        removeContact(Number(id));
      } else {
        console.error('Error: ID is required for "remove" action');
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
