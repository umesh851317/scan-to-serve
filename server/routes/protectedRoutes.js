const express = require("express");
const AdminRouter = require("./adminRouter");
const { checkAuthentication, restricTo } = require("../middleware/auth");
const AuthRouter = require("./authRoutes");
const protectRouter = express.Router();

protectRouter.use(checkAuthentication)

protectRouter.use(
       "/admin",
       restricTo(["Admin"]),
       AdminRouter
);

protectRouter.use(
       "/user",
       restricTo(["Admin"]),
       AuthRouter
);

module.exports = protectRouter;