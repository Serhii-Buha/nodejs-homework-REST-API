const {
  addSchema,
  contactSchema,
  updateFavoriteSchema,
} = require("./contacts");
const {
  userSchema,
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("./users");

module.exports = {
  addSchema,
  contactSchema,
  updateFavoriteSchema,

  userSchema,
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
