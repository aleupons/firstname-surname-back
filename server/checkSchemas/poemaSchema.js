const poemaSchema = {
    name: {
      notEmpty: true,
      matches: {
        options: [/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/],
      },
      errorMessage: "El nom només pot contenir lletres",
    },
    text: {
      notEmpty: true,
    },
  };

  module.exports = poemaSchema;
