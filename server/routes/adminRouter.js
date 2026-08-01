const express = require("express");
const { handleAdmin } = require("../controllers/admin");
const AdminRouter = express.Router()

AdminRouter.get("/", handleAdmin)

module.exports = AdminRouter;