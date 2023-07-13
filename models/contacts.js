const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "", "contacts.json");

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath);

    const contacts = JSON.parse(contactsData);

    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contactId === contact.id);

    return contact ?? null;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();

    const existingContact = contacts.find(
      (contact) =>
        contact.name === data.name &&
        contact.email === data.email &&
        contact.phone === data.phone
    );

    if (existingContact) {
      console.log("Contact already exists");
      return { message: "Contact already exists" };
    }

    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await getContactById(contactId);

    if (!removedContact) {
      console.log(null);
      return null;
    }

    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return removedContact ?? null;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (id, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index !== -1) {
      contacts[index] = { id, ...data };

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return contacts[index];
    }

    return null;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  contactsPath,
};
