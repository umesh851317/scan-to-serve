const express = require("express");
const { createTable, getAlltables, updateTable, deleteTable } = require("../controllers/table");
const TableRouter = express.Router()

TableRouter.post("/", createTable)
TableRouter.get("/", getAlltables)
TableRouter.patch("/:id", updateTable)
TableRouter.delete("/:id", deleteTable)

module.exports = TableRouter;