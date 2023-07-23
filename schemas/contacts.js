const joi = require("joi");
const { Schema } = require("mongoose");
const { mongooseError } = require("../utils");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", mongooseError);

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = {
  addSchema,
  contactSchema,
  updateFavoriteSchema,
};
