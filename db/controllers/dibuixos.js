const Dibuix = require("../models/Dibuix");
const { list, read, create, update, deleteData } = require("./generalCrud");
const {
  listDataByName,
  listDataAndOrderBy,
} = require("./generalLists");

const model = Dibuix;
const modelName = "dibuix";

const listDibuixos = async () => list(model, modelName);

const listDibuixosByName = async (name) =>
  listDataByName(name, model, modelName);
const listDibuixosAndOrderBy = async (field) =>
  listDataAndOrderBy(field, model, modelName);

const showDibuix = async (dibuixId) => read(dibuixId, model, modelName);
const createDibuix = async (newDibuix) =>
  create(newDibuix, model, modelName);
const modifyDibuix = async (dibuixId, modifiedDibuix) =>
  update(dibuixId, modifiedDibuix, model, modelName);
const deleteDibuix = async (dibuixId) =>
  deleteData(dibuixId, model, modelName);

module.exports = {
  listDibuixos,
  listDibuixosByName,
  listDibuixosAndOrderBy,
  showDibuix,
  createDibuix,
  modifyDibuix,
  deleteDibuix,
};
