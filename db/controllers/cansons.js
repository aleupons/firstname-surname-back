const Canso = require("../models/Canso");
const { list, read, create, update, deleteData } = require("./generalCrud");

const model = Canso;
const modelName = "canso";

const listCansons = async () => list(model, modelName);

const showCanso = async (cansoId) => read(cansoId, model, modelName);
const createCanso = async (newCanso) =>
  create(newCanso, model, modelName);
const modifyCanso = async (cansoId, modifiedCanso) =>
  update(cansoId, modifiedCanso, model, modelName);
const deleteCanso = async (cansoId) =>
  deleteData(cansoId, model, modelName);

module.exports = {
  listCansons,
  showCanso,
  createCanso,
  modifyCanso,
  deleteCanso,
};
