const express = require("express");
const { GetMenu, handleVerifyCustomer, } = require("../controllers/customer");
const CustomerRouter = express.Router()

CustomerRouter.get("/verifyCustomer", handleVerifyCustomer)   // fetch Menu data
CustomerRouter.get("/", GetMenu)   // fetch Menu data

module.exports = CustomerRouter;