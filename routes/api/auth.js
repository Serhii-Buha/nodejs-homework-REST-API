const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers/users");
const authenticate = require("../../middleware");

const router = express.Router();

router.post("/users/register", register);

router.post("/users/login", login);

router.post("/users/logout", authenticate, logout);

router.get("/users/current", authenticate, current);

router.patch("/users", authenticate, updateSubscription);

module.exports = router;
