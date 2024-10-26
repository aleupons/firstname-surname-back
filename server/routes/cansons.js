const { check, checkSchema } = require("express-validator");
const express = require("express");
const debug = require("debug")("firstnamesurname:server:routes:cansons");
const multer = require("multer");
const {
  listCansons,
  showCanso,
  createCanso,
  modifyCanso,
  deleteCanso,
} = require("../../db/controllers/cansons");
const { validationErrors, generateError } = require("../errors");
const { duplicateKeyError } = require("../errors");
const { authorization } = require("../authorization");
const cansoSchema = require("../checkSchemas/cansoSchema");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  try {
    const cansonsList = await listCansons();
    res.json(cansonsList);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/cansons/:id",
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const canso = await showCanso(id);
      res.json(canso);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new-canso",
  authorization(true),
  checkSchema(cansoSchema),
  validationErrors,
  async (req, res, next) => {
    const canso = req.body;
    try {
      const newCanso = await createInformacio(canso);
      res.json(newCanso);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/canso/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  checkSchema(cansoSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const canso = req.body;
    try {
      const newCanso = await modifyCanso(id, canso);
      res.json(newCanso);
    } catch (error) {
      duplicateKeyError(req, res, next, error);
    }
  }
);

router.delete(
  "/canso/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const canso = await deleteCanso(id);
      res.json(canso);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
