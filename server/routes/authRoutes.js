const express = require("express");
const { handleCreateResaurent, handleSignIn, getUserDetails } = require("../controllers/auth");
const AuthRouter = express.Router()

AuthRouter.post("/", handleCreateResaurent)
AuthRouter.post("/signIn", handleSignIn)
AuthRouter.get("/", getUserDetails)
module.exports = AuthRouter;