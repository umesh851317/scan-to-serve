const express = require("express");
const AdminRouter = require("./adminRouter");
const { checkAuthentication, restricTo } = require("../middleware/auth");
const AuthRouter = require("./authRoutes");
const ResaurentRouter = require("./restaurentRouter");
const TableRouter = require("./tableRouter");
const MenuRouter = require("./menuRouter");
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

protectRouter.use(
       "/table",
       restricTo(["Admin"]),
       TableRouter
);

protectRouter.use(
       "/menu",
       restricTo(["Admin"]),
       MenuRouter
);

module.exports = protectRouter;