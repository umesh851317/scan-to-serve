const express = require("express");
const CustomerRouter = require("./customerRouter");
const { VarifyCustomer } = require("../middleware/customer");
const OrderRouter = require("./OrdersRouter");
const CustomerProtectRouter = express.Router({ mergeParams: true });


CustomerProtectRouter.use(VarifyCustomer)

CustomerProtectRouter.use("/fetchCustomerData", CustomerRouter);

CustomerProtectRouter.use("/Order", OrderRouter);

module.exports = CustomerProtectRouter;