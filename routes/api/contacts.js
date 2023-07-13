const express = require("express");
const {
  getAll,
  getId,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getId);

router.post("/", add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

module.exports = router;
