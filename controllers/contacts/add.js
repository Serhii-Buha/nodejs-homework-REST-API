const { Contact } = require("../../models/contact");
const { addShema } = require("../../schemas/contacts");
const { httpError } = require("../../utils/httpError");

exports.add = async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw httpError(400, "missing required name field");

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
