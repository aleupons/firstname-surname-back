const { Schema, model } = require("mongoose");

const CansoSchema = new Schema(
  {
    iframe: {
      type: String,
      required: true,
    },
    spotify: {
      type: Boolean,
      required: false,
    },
  },
  { versionKey: false }
);

const Canso = model("Canso", CansoSchema, "cansons");

module.exports = Canso;
