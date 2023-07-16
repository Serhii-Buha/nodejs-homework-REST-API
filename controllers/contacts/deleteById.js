const { isValidObjectId } = require("mongoose");
const { httpError } = require("../../utils/httpError");
const { Contact } = require("../../models/contact");

exports.deleteById = async (req, res, next) => {
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
