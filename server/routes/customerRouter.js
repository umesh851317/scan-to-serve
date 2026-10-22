const express = require("express");
const { GetMenu, handleVerifyCustomer, HandleEndSession, clearSession, } = require("../controllers/customer");
const CustomerRouter = express.Router()

CustomerRouter.get("/verifyCustomer", handleVerifyCustomer)  // get customer data from cookies
CustomerRouter.get("/", GetMenu)   // fetch Menu data
CustomerRouter.post("/endSession", HandleEndSession)   // fetch Menu data
CustomerRouter.post("/clearSession", clearSession)  

module.exports = CustomerRouter;