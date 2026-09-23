const express = require("express");
const { GetAllOrders, handleUpdateOrderStatus } = require("../controllers/kitchen");

const kitchenRoutes = express.Router();

kitchenRoutes.get("/", GetAllOrders)
kitchenRoutes.patch("/:orderId", handleUpdateOrderStatus)
module.exports = kitchenRoutes 