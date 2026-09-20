const express = require("express");
const { createTable, getAlltables, updateTable, deleteTable, getCurrentSessionData } = require("../controllers/table");
const TableRouter = express.Router()

TableRouter.post("/", createTable)
TableRouter.get("/", getAlltables)
TableRouter.patch("/:id", updateTable)
TableRouter.delete("/:id", deleteTable)
TableRouter.get("/:sessionId", getCurrentSessionData)

module.exports = TableRouter;