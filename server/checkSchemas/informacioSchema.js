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
    title: {
      notEmpty: true,
    },
    title2: {
      notEmpty: true,
    },
    title3: {
      notEmpty: true,
    },
    title4: {
      notEmpty: true,
    },
    title5: {
      notEmpty: true,
    },
  };

  module.exports = informacioSchema;
