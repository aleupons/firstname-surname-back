const pinturaSchema = {
    name: {
      notEmpty: true,
      matches: {
        options: [/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/],
      },
      errorMessage: "El nom només pot contenir lletres",
    },
    description: {
      optional: true,
      matches: {
        options: [/^[A-Za-zÀ-ÖØ-öø-ÿ.,0-9/\-!?¿¡' ]*$/],
      },
      errorMessage:
        "La descripció només pot contenir lletres, números i signes de puntuació",
    },
  };

  module.exports = pinturaSchema;
