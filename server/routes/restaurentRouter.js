const express = require("express");
const { getResaurentDetail, handleUpdateRestaurent, updateRestaurantStatus } = require("../controllers/restaurent");
const ResaurentRouter = express.Router()

ResaurentRouter.get("/", getResaurentDetail)
ResaurentRouter.patch("/", handleUpdateRestaurent)
ResaurentRouter.patch("/restaurentStatus", updateRestaurantStatus)

module.exports = ResaurentRouter;