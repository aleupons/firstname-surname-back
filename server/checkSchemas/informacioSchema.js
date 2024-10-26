const informacioSchema = {
    language: {
      notEmpty: true,
      matches: {
        options: [/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/],
      },
      errorMessage: "El nom de l'idioma només pot contenir lletres",
    },
    lang: {
      notEmpty: true,
      matches: {
        options: [/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/],
      },
      errorMessage: "El llenguatge només pot contenir lletres",
    },
    welcome: {
      notEmpty: true,
    },
    section1: {
      notEmpty: true,
    },
    section2: {
      notEmpty: true,
    },
    section3: {
      notEmpty: true,
    },
    home: {
      notEmpty: true,
    },
  };

  module.exports = informacioSchema;
