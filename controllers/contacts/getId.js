const { isValidObjectId } = require("mongoose");
const { httpError } = require("../../utils");
const { Contact } = require("../../models");

exports.getId = async (req, res, next) => {
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
