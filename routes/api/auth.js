const express = require("express");
const { authenticate, upload } = require("../../middleware");
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/users");

const router = express.Router();

router.post("/users/register", register);

router.get("/users/verify/:verificationToken", verifyEmail);

router.post("/users/verify", resendVerifyEmail);

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
