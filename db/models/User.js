const { SchemaTypes, Schema, model } = require("mongoose");
require("mongoose-type-email");

SchemaTypes.Email.defaults.message =
  "L'adreça de correu electrònic és invàlida";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false }
);

const User = model("User", UserSchema, "users");

module.exports = User;
