const express = require("express")
const { handleCreateOrder, handleGetAllSessionOrders } = require("../controllers/Orders")
const OrderRouter = express.Router({ mergeParams: true })

OrderRouter.post("/:sessionId", handleCreateOrder)
OrderRouter.get("/:sessionId", handleGetAllSessionOrders)

module.exports = OrderRouter
