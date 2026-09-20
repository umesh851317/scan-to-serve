const express = require("express")
const { handleCreateOrder,
       handleGetAllSessionOrders,
       handleCancelOrderByCustomer,
       handleupdateOrderByCustomer
} = require("../controllers/Orders")
const OrderRouter = express.Router({ mergeParams: true })

OrderRouter.post("/", handleCreateOrder)
OrderRouter.get("/:sessionId", handleGetAllSessionOrders)
OrderRouter.patch("/:OrderId", handleCancelOrderByCustomer)
OrderRouter.patch("/edit/:OrderId", handleupdateOrderByCustomer)

module.exports = OrderRouter
