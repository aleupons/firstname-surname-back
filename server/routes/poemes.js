const { check, checkSchema } = require("express-validator");
const express = require("express");
const debug = require("debug")("firstnamesurname:server:routes:poemes");
const multer = require("multer");
const {
  listPoemes,
  listPoemesByName,
  listPoemesAndOrderBy,
  showPoema,
  createPoema,
  modifyPoema,
  deletePoema,
} = require("../../db/controllers/poemes");
const { validationErrors, generateError } = require("../errors");
const { duplicateKeyError } = require("../errors");
const { authorization } = require("../authorization");
const { fireBase, fireBaseDel } = require("../fireBase");
const poemaSchema = require("../checkSchemas/poemaSchema");

const router = express.Router();
const upload = multer();

router.get("/list", async (req, res, next) => {
  try {
    const poemesList = await listPoemes();
    res.json(poemesList);
  } catch (error) {
    next(error);
  }
});

/* ORDENAR I FILTRAR LLISTES */

router.get("/list-by-name/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const poemesList = await listPoemesByName(name);
    res.json(poemesList);
  } catch (error) {
    next(error);
  }
});

router.get("/list-by-field/:field", async (req, res, next) => {
  const { field } = req.params;
  try {
    const poemesList = await listPoemesAndOrderBy(field);
    res.json(poemesList);
  } catch (error) {
    next(error);
  }
});

/* */

router.get(
  "/poema/:id",
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const poema = await showPoema(id);
      res.json(poema);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new-poema",
  authorization(true),
  upload.single("photoUrl"),
  checkSchema(poemaSchema),
  validationErrors,
  async (req, res, next) => {
    const poema = req.body;
    try {
      fireBase(req, res, next, createPoema, poema, false, "Poemes/");
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/poema/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  upload.single("photoUrl"),
  checkSchema(poemaSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const poema = req.body;
    try {
      fireBase(req, res, next, modifyPoema, poema, id), "Poemes/";
    } catch (error) {
      next(error);
    }
  }
);

/* MODIFICAR SENSE MODIFICAR IMATGE */

router.put(
  "/poema-no-image/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  checkSchema(poemaSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const poema = req.body;
    try {
      const newPoema = await modifyPoema(id, poema);
      res.json(newPoema);
    } catch (error) {
      duplicateKeyError(req, res, next, error);
    }
  }
);

/* */

router.delete(
  "/poema/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const poema = await deletePoema(id);
      await fireBaseDel(poema.photoUrl);
      res.json(poema);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
