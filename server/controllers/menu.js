const Menu = require("../models/Menu");

async function CreateMenu(req, res) {
       try {
              const { restaurantId } = req.user
              const { name, description, price, category, isVeg, image } = req.body
              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "restaurant id is required....",
                     })
              }
              if (!name || !description || !price || !category || !isVeg || !image) {
                     return res.json({
                            success: false,
                            message: "All field are mendetory....",
                     })
              }
              const menuItem = await Menu.create({
                     name: name,
                     description: description,
                     price: price,
                     category: category,
                     isVeg: isVeg,
                     restaurantId: restaurantId,
                     image: image
              })
              if (!menuItem) {
                     return res.json({
                            success: false,
                            message: "menu not created....",
                     })
              }
              return res.json({
                     success: true,
                     message: "Menu create Succefully...",
                     menuItem,
              })
       } catch (error) {
              console.log(error);
       }
}
async function GetMenu(req, res) {
       try {
              const { restaurantId } = req.user
              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "restaurant id is required....",
                     })
              }
              const menuItemes = await Menu.find({ restaurantId })
              if (!menuItemes) {
                     return res.json({
                            success: false,
                            message: "menu not fetch....",
                     })
              }
              return res.json({
                     success: true,
                     message: "Menu create Succefully...",
                     menuItemes,
              })
       } catch (error) {
              console.log(error);
       }
}
async function UpdateMenu(req, res) {
       try {
              const { restaurantId } = req.user
              const { name, description, price, category, isVeg, image } = req.body
              const { id } = req.params;
              if (!id) {
                     return res.json({
                            success: false,
                            message: "menu id is not recieve...",
                            id
                     });
              }
              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "restaurant id is required....",
                     })
              }
              if (!name || !description || !price || !category || !isVeg || !image) {
                     return res.json({
                            success: false,
                            message: "All field are mendetory....",
                     })
              }
              const IsExist = await Menu.findOne({ _id: id })
              if (!IsExist) {
                     return res.json({
                            success: false,
                            message: "Menu not exist....",
                     })
              }
              const updateMenu = await Menu.findByIdAndUpdate(
                     id,
                     {
                            name: name,
                            description: description,
                            price: price,
                            category: category,
                            isVeg: isVeg,
                            restaurantId: restaurantId,
                            image: image
                     },
                     {
                            returnDocument: "after",    // return the new updated document 
                            runValidators: true,        // validate the schema
                     }
              )
              if (!updateMenu) {
                     return res.json({
                            success: false,
                            message: "Error during menu update....",
                     })
              }
              return res.json({
                     message: "Upadate succefully...",
                     success: true,
                     updateMenu
              })

       } catch (error) {
              console.log("err", error);
       }
}
async function DeleteMenu(req, res) {
       try {
              const { restaurantId } = req.user
              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "unAuthorized....",
                     })
              }
              const { id } = req.params;
              if (!id) {
                     return res.json({
                            success: false,
                            message: "menu id is not recieve...",
                     });
              }
              const deleteMenu = await Menu.findByIdAndDelete(id)
              if (!deleteMenu) {
                     return res.json({
                            success: false,
                            message: "menu not remove....",
                     })
              }
              return res.json({
                     success: true,
                     message: "menu delete succefully...."
              })
       } catch (error) {
              console.log(error);

       }
}

module.exports = {
       CreateMenu,
       GetMenu,
       UpdateMenu,
       DeleteMenu
}