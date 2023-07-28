const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { registerSchema } = require("../../schemas");
const { httpError } = require("../../utils");
const { User } = require("../../models");

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) throw httpError(400, error);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) throw httpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
