const { Schema, model } = require("mongoose");

const InformacioSchema = new Schema(
  {
    language: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    welcome: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    title2: {
      type: String,
      required: true,
    },
    title3: {
      type: String,
      required: true,
    },
    title4: {
      type: String,
      required: true,
    },
    title5: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Informacio = model("Informacio", InformacioSchema, "informacions");

module.exports = Informacio;
