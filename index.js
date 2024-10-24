const debug = require("debug")("firstnamesurname");
const dbConnection = require("./db");
const serverStart = require("./server");

dbConnection(serverStart);
