const joi = require("joi");
const { Schema } = require("mongoose");
const { mongooseError } = require("../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const registerSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().required(),
});

const subscriptionSchema = joi.object({
  subscription: joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  userSchema,
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
