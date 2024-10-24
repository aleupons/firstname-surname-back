const { check, checkSchema } = require("express-validator");
const express = require("express");
const debug = require("debug")("firstnamesurname:server:routes:dibuixos");
const multer = require("multer");
const {
  listDibuixos,
  listDibuixosByName,
  listDibuixosAndOrderBy,
  showDibuix,
  createDibuix,
  modifyDibuix,
  deleteDibuix,
} = require("../../db/controllers/dibuixos");
const { validationErrors, generateError } = require("../errors");
const { duplicateKeyError } = require("../errors");
const { authorization } = require("../authorization");
const fireBase = require("../fireBase");
const dibuixSchema = require("../checkSchemas/dibuixSchema");

const router = express.Router();
const upload = multer();

router.get("/list", async (req, res, next) => {
  try {
    const dibuixosList = await listDibuixos();
    res.json(dibuixosList);
  } catch (error) {
    next(error);
  }
});

/* ORDENAR I FILTRAR LLISTES */

router.get("/list-by-name/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const dibuixosList = await listDibuixosByName(name);
    res.json(dibuixosList);
  } catch (error) {
    next(error);
  }
});

router.get("/list-by-field/:field", async (req, res, next) => {
  const { field } = req.params;
  try {
    const dibuixosList = await listDibuixosAndOrderBy(field);
    res.json(dibuixosList);
  } catch (error) {
    next(error);
  }
});

/* */

router.get(
  "/dibuix/:id",
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const dibuix = await showDibuix(id);
      res.json(dibuix);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new-dibuix",
  authorization(true),
  upload.single("photoUrl"),
  checkSchema(dibuixSchema),
  validationErrors,
  async (req, res, next) => {
    const dibuix = req.body;
    try {
      fireBase(req, res, next, createDibuix, dibuix, false, "Dibuixos/");
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/dibuix/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  upload.single("photoUrl"),
  checkSchema(dibuixSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const dibuix = req.body;
    try {
      fireBase(req, res, next, modifyDibuix, dibuix, id, "Dibuixos/");
    } catch (error) {
      next(error);
    }
  }
);

/* MODIFICAR SENSE MODIFICAR IMATGE */

router.put(
  "/dibuix-no-image/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  checkSchema(dibuixSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const dibuix = req.body;
    try {
      const newDibuix = await modifyDibuix(id, dibuix);
      res.json(newDibuix);
    } catch (error) {
      duplicateKeyError(req, res, next, error);
    }
  }
);

/* */

router.delete(
  "/dibuix/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const dibuix = await deleteDibuix(id);
      res.json(dibuix);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
