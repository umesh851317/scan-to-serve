const express = require("express");
const { getTableStatus, handleJoinTable, } = require("../controllers/customer");
const verifyTable = express.Router()

verifyTable.get("/:id", getTableStatus)
verifyTable.post("/:id", handleJoinTable)

module.exports = verifyTable;