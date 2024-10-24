const Poema = require("../models/Poema");
const { list, read, create, update, deleteData } = require("./generalCrud");
const {
  listDataByName,
  listDataAndOrderBy,
} = require("./generalLists");

const model = Poema;
const modelName = "poema";

const listPoemes = async () => list(model, modelName);

const listPoemesByName = async (name) =>
  listDataByName(name, model, modelName);
const listPoemesAndOrderBy = async (field) =>
  listDataAndOrderBy(field, model, modelName);

const showPoema = async (poemaId) => read(poemaId, model, modelName);
const createPoema = async (newPoema) =>
  create(newPoema, model, modelName);
const modifyPoema = async (poemaId, modifiedPoema) =>
  update(poemaId, modifiedPoema, model, modelName);
const deletePoema = async (poemaId) =>
  deleteData(poemaId, model, modelName);

module.exports = {
  listPoemes,
  listPoemesByName,
  listPoemesAndOrderBy,
  showPoema,
  createPoema,
  modifyPoema,
  deletePoema,
};
