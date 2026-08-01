const express = require("express");
const AdminRouter = require("./adminRouter");
const { checkAuthentication, restricTo } = require("../middleware/auth");
const protectRouter = express.Router();

protectRouter.use(checkAuthentication)

protectRouter.use(
       "/admin",
       restricTo(["Admin"]),
       AdminRouter
);

module.exports = protectRouter;