const { User } = require("../../models");

exports.logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
