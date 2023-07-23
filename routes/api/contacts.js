const express = require("express");
const {
  getAll,
  getId,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");
const authenticate = require("../../middleware");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, getId);

router.post("/", authenticate, add);

router.delete("/:contactId", authenticate, deleteById);

router.put("/:contactId", authenticate, updateById);

router.patch("/:contactId/favorite", authenticate, updateFavorite);

module.exports = router;
