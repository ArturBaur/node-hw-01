const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.log("Contacts:");
    contacts.forEach((contact) => {
      console.log(`- ${contact.name}: ${contact.email} (${contact.phone})`);
    });
  } catch (error) {
    console.error("Error reading contacts file:", error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.log(
        `Contact found: ${contact.name}: ${contact.email} (${contact.phone})`
      );
    } else {
      console.log("Contact not found");
    }
  } catch (error) {
    console.error("Error reading contacts file:", error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log("Contact removed successfully");
    } else {
      console.log("Contact not found");
    }
  } catch (error) {
    console.error("Error reading or writing contacts file:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added successfully");
  } catch (error) {
    console.error("Error reading or writing contacts file:", error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
