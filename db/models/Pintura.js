const { Schema, model } = require("mongoose");

const PinturaSchema = new Schema(
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

const Pintura = model("Pintura", PinturaSchema, "pintures");

module.exports = Pintura;
