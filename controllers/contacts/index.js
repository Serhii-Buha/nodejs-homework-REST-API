const { getAll } = require("./getAll");
const { getId } = require("./getId");
const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { updateById } = require("./updateById");
const { updateFavorite } = require("./updateFavorite");

module.exports = {
  getAll,
  getId,
  add,
  deleteById,
  updateById,
  updateFavorite,
};
