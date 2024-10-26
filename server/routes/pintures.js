const { check, checkSchema } = require("express-validator");
const express = require("express");
const debug = require("debug")("firstnamesurname:server:routes:pintures");
const multer = require("multer");
const {
  listPintures,
  listPinturesByName,
  listPinturesAndOrderBy,
  showPintura,
  createPintura,
  modifyPintura,
  deletePintura,
} = require("../../db/controllers/pintures");
const { validationErrors, generateError } = require("../errors");
const { duplicateKeyError } = require("../errors");
const { authorization } = require("../authorization");
const { fireBase, fireBaseDel } = require("../fireBase");
const pinturaSchema = require("../checkSchemas/pinturaSchema");

const router = express.Router();
const upload = multer();

router.get("/list", async (req, res, next) => {
  try {
    const pinturesList = await listPintures();
    res.json(pinturesList);
  } catch (error) {
    next(error);
  }
});

/* ORDENAR I FILTRAR LLISTES */

router.get("/list-by-name/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const pinturesList = await listPinturesByName(name);
    res.json(pinturesList);
  } catch (error) {
    next(error);
  }
});

router.get("/list-by-field/:field", async (req, res, next) => {
  const { field } = req.params;
  try {
    const pinturesList = await listPinturesAndOrderBy(field);
    res.json(pinturesList);
  } catch (error) {
    next(error);
  }
});

/* */

router.get(
  "/pintura/:id",
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const pintura = await showPintura(id);
      res.json(pintura);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new-pintura",
  authorization(true),
  upload.single("photoUrl"),
  checkSchema(pinturaSchema),
  validationErrors,
  async (req, res, next) => {
    const pintura = req.body;
    try {
      fireBase(req, res, next, createPintura, pintura, false, "Pintures/");
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/pintura/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  upload.single("photoUrl"),
  checkSchema(pinturaSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const pintura = req.body;
    try {
      fireBase(req, res, next, modifyPintura, pintura, id, "Pintures/");
    } catch (error) {
      next(error);
    }
  }
);

/* MODIFICAR SENSE MODIFICAR IMATGE */

router.put(
  "/pintura-no-image/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  checkSchema(pinturaSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const pintura = req.body;
    try {
      const newPintura = await modifyPintura(id, pintura);
      res.json(newPintura);
    } catch (error) {
      duplicateKeyError(req, res, next, error);
    }
  }
);

/* */

router.delete(
  "/pintura/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const pintura = await deletePintura(id);
      // fireBaseDel(req, res, next, deletePintura, pintura, id, "Pintures/");
      res.json(pintura);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
