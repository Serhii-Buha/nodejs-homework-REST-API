const { isValidObjectId } = require("mongoose");
const { Contact } = require("../models/contact");
const { addShema, updateFavoriteSchema } = require("../schemas/contacts");
const { httpError } = require("../utils/httpError");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId))
      throw httpError(400, `${contactId} is not valid id`);

    const result = await Contact.findOne({ _id: contactId });

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

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId))
      throw httpError(400, `${contactId} is not valid id`);

    const result = await Contact.findByIdAndRemove(contactId);

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

    if (!isValidObjectId(contactId))
      throw httpError(400, `${contactId} is not valid id`);

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) throw httpError(404, "Not found");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) throw httpError(400, "missing field favorite");

    const { contactId } = req.params;

    if (!isValidObjectId(contactId))
      throw httpError(400, `${contactId} is not valid id`);

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

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
  updateFavorite,
};
