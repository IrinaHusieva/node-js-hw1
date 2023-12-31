import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db','contacts.json');
console.log(contactsPath);

export const listContacts = async() => {
  return JSON.parse(await fs.readFile(contactsPath))
}

export const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
}

export const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await writeContact(contacts);
    return result;
}

export const writeContact = async (contacts) => { 
return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

export const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await writeContact(contacts);
    return newContact;
}