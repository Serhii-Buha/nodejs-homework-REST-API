const express = require("express");
const {
  getAll,
  getId,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getId);

router.post("/", add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

router.patch("/:contactId/favorite", updateFavorite);

module.exports = router;
