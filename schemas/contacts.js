const joi = require("joi");

const addShema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

module.exports = {
    addShema
};
