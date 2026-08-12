const express = require("express");
const { CreateMenu, GetMenu, UpdateMenu, DeleteMenu } = require("../controllers/menu");
const MenuRouter = express.Router()

MenuRouter.post("/", CreateMenu);
MenuRouter.get("/", GetMenu);
MenuRouter.patch("/:id", UpdateMenu);
MenuRouter.delete("/:id", DeleteMenu);

module.exports = MenuRouter;