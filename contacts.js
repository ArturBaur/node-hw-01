const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContactsFile() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

async function writeContactsFile(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  try {
    const contacts = await readContactsFile();
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContactsFile();
    const contact = contacts.find(({ id }) => id === contactId);
    console.table(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContactsFile();
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    await writeContactsFile(newContacts);
    console.table(newContacts);
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContactsFile();
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];
    await writeContactsFile(newContacts);
    console.table(newContacts);
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
