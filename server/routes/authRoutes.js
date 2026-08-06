const express = require("express");
const { handleCreateResaurent,
       handleSignIn,
       getUserDetails,
       updateUserDetails,
       changePassword,
       logout,
       createStaff,
       getAllStaff,
       deleteStaff,
       handleUpdateStaffByAdmin,
} = require("../controllers/auth");
const AuthRouter = express.Router()

AuthRouter.post("/", handleCreateResaurent)
AuthRouter.post("/signIn", handleSignIn)
AuthRouter.get("/", getUserDetails)
AuthRouter.patch("/", updateUserDetails)
AuthRouter.patch("/changePassword", changePassword)
AuthRouter.post("/logout", logout)
AuthRouter.post("/createStaff", createStaff)
AuthRouter.get("/getAllStaff", getAllStaff)
AuthRouter.delete("/:id", deleteStaff)
AuthRouter.patch("/:id", handleUpdateStaffByAdmin)
module.exports = AuthRouter;