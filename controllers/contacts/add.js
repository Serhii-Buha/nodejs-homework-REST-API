const { Contact } = require("../../models");
const { addSchema } = require("../../schemas");
const { httpError } = require("../../utils");

exports.add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw httpError(400, "missing required name field");

    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
