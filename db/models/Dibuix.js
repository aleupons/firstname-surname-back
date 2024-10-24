const { Schema, model } = require("mongoose");

const DibuixSchema = new Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);

const Dibuix = model("Dibuix", DibuixSchema, "dibuixos");

module.exports = Dibuix;
