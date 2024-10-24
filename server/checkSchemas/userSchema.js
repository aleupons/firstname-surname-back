const userSchema = {
  username: {
    notEmpty: true,
    matches: {
      options: [/^[a-zA-Z0-9._]+$/],
    },
    errorMessage:
      "El nom d'usuari només pot contenir, lletres sense accents, números i els caràcters '.' i '_'",
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: "La contrassenya ha de tenir mínim 6 caràcters",
    },
  },
  isAdmin: {
    isBoolean: true,
    errorMessage: "S'ha d'indicar si l'usuari és administrador o no",
  },
};

module.exports = userSchema;
