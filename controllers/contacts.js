const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { addShema } = require("../schemas/contacts");
const { httpError } = require("../utils/httpError");

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) throw httpError(404, "Not found");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw httpError(400, "missing required name field");

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) throw httpError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw httpError(400, "missing fields");

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) throw httpError(404, "Not found");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getId,
  add,
  deleteById,
  updateById,
};
