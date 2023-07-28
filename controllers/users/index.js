const { register } = require("./register");
const { login } = require("./login");
const { current } = require("./current");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
};
