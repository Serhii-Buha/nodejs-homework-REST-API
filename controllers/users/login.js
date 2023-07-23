const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../schemas");
const { httpError } = require("../../utils");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw httpError(400, error);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw httpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) throw httpError(401, "Email or password is wrong");

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
