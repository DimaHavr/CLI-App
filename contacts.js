const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    console.table(JSON.parse(data));
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId);
    console.log(contact);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact with ID ${contactId} has been removed.`);
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
    console.log('New contact has been added.');
  } catch (err) {
    console.error(err);
  }
}

module.exports = { listContacts, removeContact, addContact, getContactById };
