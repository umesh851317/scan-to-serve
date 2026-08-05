const express = require("express");
const AdminRouter = require("./adminRouter");
const { checkAuthentication, restricTo } = require("../middleware/auth");
const AuthRouter = require("./authRoutes");
const ResaurentRouter = require("./restaurentRouter");
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

protectRouter.use(
       "/restaurent",
       restricTo(["Admin"]),
       ResaurentRouter
);

module.exports = protectRouter;