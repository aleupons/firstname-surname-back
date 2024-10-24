const Pintura = require("../models/Pintura");
const { list, read, create, update, deleteData } = require("./generalCrud");
const {
  listDataByName,
  listDataAndOrderBy,
} = require("./generalLists");

const model = Pintura;
const modelName = "pintura";

const listPintures = async () => list(model, modelName);

const listPinturesByName = async (name) =>
  listDataByName(name, model, modelName);
const listPinturesAndOrderBy = async (field) =>
  listDataAndOrderBy(field, model, modelName);

const showPintura = async (pinturaId) => read(pinturaId, model, modelName);
const createPintura = async (newPintura) =>
  create(newPintura, model, modelName);
const modifyPintura = async (pinturaId, modifiedPintura) =>
  update(pinturaId, modifiedPintura, model, modelName);
const deletePintura = async (pinturaId) =>
  deleteData(pinturaId, model, modelName);

module.exports = {
  listPintures,
  listPinturesByName,
  listPinturesAndOrderBy,
  showPintura,
  createPintura,
  modifyPintura,
  deletePintura,
};
