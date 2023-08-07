const { emailSchema } = require("../../schemas");
const { User } = require("../../models");
const { httpError, sendGridEmail } = require("../../utils");

const { BASE_URL } = process.env;

exports.resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) throw httpError(400, error);

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw httpError(401, "Email not found");
    if (user.verify)
      throw httpError(400, "Verification has already been passed");

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendGridEmail(verifyEmail);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};
