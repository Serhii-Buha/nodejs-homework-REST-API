const { isValidObjectId } = require("mongoose");
const { addShema } = require("../../schemas/contacts");
const { httpError } = require("../../utils/httpError");
const { Contact } = require("../../models/contact");

exports.updateById = async (req, res, next) => {
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
