const { isValidObjectId } = require("mongoose");
const { updateFavoriteSchema } = require("../../schemas");
const { httpError } = require("../../utils");
const { Contact } = require("../../models");

exports.updateFavorite = async (req, res, next) => {
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
