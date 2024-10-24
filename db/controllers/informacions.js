const Informacio = require("../models/Informacio");
const { list, read, create, update, deleteData } = require("./generalCrud");

const model = Informacio;
const modelName = "informacio";

const listInformacions = async () => list(model, modelName);

const showInformacio = async (informacioId) => read(informacioId, model, modelName);
const createInformacio = async (newInformacio) =>
  create(newInformacio, model, modelName);
const modifyInformacio = async (informacioId, modifiedInformacio) =>
  update(informacioId, modifiedInformacio, model, modelName);
const deleteInformacio = async (informacioId) =>
  deleteData(informacioId, model, modelName);

module.exports = {
  listInformacions,
  showInformacio,
  createInformacio,
  modifyInformacio,
  deleteInformacio,
};
