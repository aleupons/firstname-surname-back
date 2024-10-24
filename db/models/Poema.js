const { Schema, model } = require("mongoose");

const PoemaSchema = new Schema(
  {
    photoUrl: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Poema = model("Poema", PoemaSchema, "poemes");

module.exports = Poema;
