const { check, checkSchema } = require("express-validator");
const express = require("express");
const debug = require("debug")("firstnamesurname:server:routes:informacions");
const multer = require("multer");
const {
  listInformacions,
  showInformacio,
  createInformacio,
  modifyInformacio,
  deleteInformacio,
} = require("../../db/controllers/informacions");
const { validationErrors, generateError } = require("../errors");
const { duplicateKeyError } = require("../errors");
const { authorization } = require("../authorization");
const informacioSchema = require("../checkSchemas/informacioSchema");

const router = express.Router();
const upload = multer();

router.get("/list", async (req, res, next) => {
  try {
    const informacionsList = await listInformacions();
    res.json(informacionsList);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/informacio/:id",
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const informacio = await showInformacio(id);
      res.json(informacio);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/new-informacio",
  authorization(true),
  checkSchema(informacioSchema),
  validationErrors,
  async (req, res, next) => {
    const informacio = req.body;
    try {
      const newInformacio = await createInformacio(informacio);
      res.json(newInformacio);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/informacio/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  checkSchema(informacioSchema),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    const informacio = req.body;
    try {
      const newInformacio = await modifyInformacio(id, informacio);
      res.json(newInformacio);
    } catch (error) {
      duplicateKeyError(req, res, next, error);
    }
  }
);

router.delete(
  "/informacio/:id",
  authorization(true),
  check("id", "Id incorrecta").isMongoId(),
  validationErrors,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const informacio = await deleteInformacio(id);
      res.json(informacio);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
