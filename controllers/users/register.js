const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { registerSchema } = require("../../schemas");
const { httpError, sendGridEmail } = require("../../utils");
const { User } = require("../../models");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) throw httpError(400, error);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) throw httpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendGridEmail(verifyEmail);

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
