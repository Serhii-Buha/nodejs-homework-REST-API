const { User } = require("../../models");
const { subscriptionSchema } = require("../../schemas");
const { httpError } = require("../../utils");

exports.updateSubscription = async (req, res, next) => {
  try {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) throw httpError(400, error);

    const { _id } = req.user;
    const { subscription } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!updatedUser) throw httpError(404, "Not found");

    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};
