const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, '/db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Contact with ID ${contactId} has been removed.`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('New contact has been added.');
    });
  });
}

module.exports = { listContacts, removeContact, addContact, getContactById };
