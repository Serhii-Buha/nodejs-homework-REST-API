const jwt = require("jsonwebtoken");
const { httpError } = require("../utils");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization?.split(" ");

    if (bearer !== "Bearer" || !token) next(httpError(401, "Not authorized"));

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token)
      next(httpError(401, "Not authorized"));

    req.user = user;

    next();
  } catch (error) {
    next(httpError(401, "Not authorized"));
  }
};
