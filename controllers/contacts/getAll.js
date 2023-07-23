const { Contact } = require("../../models");

exports.getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filter = { owner };

    if (favorite !== undefined) filter.favorite = favorite === "true";

    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "_id email");

    res.json(result);
  } catch (error) {
    next(error);
  }
};
