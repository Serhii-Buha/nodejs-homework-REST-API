const express = require("express");
const { authenticate, upload } = require("../../middleware");
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users");

const router = express.Router();

router.post("/users/register", register);

router.post("/users/login", login);

router.post("/users/logout", authenticate, logout);

router.get("/users/current", authenticate, current);

router.patch("/users", authenticate, updateSubscription);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
