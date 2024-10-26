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
    section1: {
      type: String,
      required: true,
    },
    section2: {
      type: String,
      required: true,
    },
    section3: {
      type: String,
      required: true,
    },
    home: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Informacio = model("Informacio", InformacioSchema, "informacions");

module.exports = Informacio;
