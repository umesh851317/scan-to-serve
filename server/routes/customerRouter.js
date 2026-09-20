const express = require("express");
const { GetMenu, handleVerifyCustomer, } = require("../controllers/customer");
const CustomerRouter = express.Router()

CustomerRouter.get("/verifyCustomer", handleVerifyCustomer)  // get customer data from cookies
CustomerRouter.get("/", GetMenu)   // fetch Menu data

module.exports = CustomerRouter;