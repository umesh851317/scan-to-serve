const express = require("express");
const { handleCreateResaurent,
       handleSignIn,
       getUserDetails,
       updateUserDetails,
       changePassword,
       logout,
} = require("../controllers/auth");
const AuthRouter = express.Router()

AuthRouter.post("/", handleCreateResaurent)
AuthRouter.post("/signIn", handleSignIn)
AuthRouter.get("/", getUserDetails)
AuthRouter.patch("/", updateUserDetails)
AuthRouter.patch("/changePassword", changePassword)
AuthRouter.post("/logout", logout)
module.exports = AuthRouter;