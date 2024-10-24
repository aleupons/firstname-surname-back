require("dotenv").config();
const express = require("express");
const debug = require("debug")("firstnamesurname:server:main");
const morgan = require("morgan");
const cors = require("cors");

const { app, serverInit } = require("./init");
const usersRoute = require("./routes/users");
const dibuixosRoute = require("./routes/dibuixos");
const pinturesRoute = require("./routes/pintures");
const poemesRoute = require("./routes/poemes");
const informacioRoute = require("./routes/informacions");
const { error404, generalError } = require("./errors");
const { authorization } = require("./authorization");

const serverStart = () => {
  serverInit();

  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  app.use("/users", usersRoute);
  app.use("/dibuixos", dibuixosRoute);
  app.use("/pintures", pinturesRoute);
  app.use("/poemes", poemesRoute);
  app.use("/informacions", informacioRoute);

  app.use(error404);
  app.use(generalError);
};

module.exports = serverStart;