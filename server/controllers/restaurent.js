const bcrypt = require("bcrypt");
const Restaurant = require("../models/restaurant");

async function getResaurentDetail(req, res) {
       try {
              const { restaurantId } = req.user;
              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "Unauthorized...",
                     })
              }
              const restaurent = await Restaurant.findById(restaurantId)
              if (!restaurent) {
                     return res.json({
                            success: false,
                            message: "resturent data not fetch...",
                     })
              }
              return res.json({
                     success: true,
                     message: "fetch restaurent details suceefully...",
                     restaurent
              })
       } catch (error) {
              console.log(error);
              return res.json({
                     success: false,
                     message: "server error",
              })
       }
}

async function handleUpdateRestaurent(req, res) {
       try {
              const { restaurantId } = req.user;
              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "Unauthorized...",
                     })
              }
              const { restaurantName, ownerName, phone, email, address, zipCode, gstNumber, openTime, closeTime } = req.body
              if (!restaurantName || !ownerName || !phone || !email || !address || !zipCode || !gstNumber || !openTime || !closeTime) {
                     console.log(restaurantName, ownerName, phone, email, address, zipCode, gstNumber, openTime, closeTime);
                     return res.json({
                            success: false,
                            message: "data not recieved...",
                     })
              }
              const restaurent = await Restaurant.findByIdAndUpdate(
                     restaurantId,
                     {
                            restaurantName, ownerName, phone, email, address, zipCode, gstNumber, openTime, closeTime
                     },
                     {
                            returnDocument: "after",    // return the new updated document 
                            runValidators: true,        // validate the schema
                     }
              )
              if (!restaurent) {
                     return res.json({
                            success: false,
                            message: "resturent data not fetch...",
                     })
              }
              return res.json({
                     success: true,
                     message: "update restaurent details suceefully...",
                     restaurent
              })
       } catch (error) {
              console.log(error);
              return res.json({
                     success: false,
                     message: "server error",
              })
       }
}

const updateRestaurantStatus = async (req, res) => {
       try {
              const { isOpen } = req.body;

              if (typeof isOpen !== "boolean") {
                     return res.status(400).json({
                            success: false,
                            message: "isOpen must be boolean",
                     });
              }

              const restaurantId = req.user.restaurantId;

              const restaurant = await Restaurant.findByIdAndUpdate(
                     restaurantId,
                     { isOpen },
                     {
                            returnDocument: "after",
                            runValidators: true,
                     }
              );

              if (!restaurant) {
                     return res.status(404).json({
                            success: false,
                            message: "Restaurant not found",
                     });
              }

              return res.status(200).json({
                     success: true,
                     message: isOpen
                            ? "Restaurant opened successfully"
                            : "Restaurant closed successfully",
                     isOpen: restaurant.isOpen,
              });

       } catch (error) {
              console.log(error);

              return res.status(500).json({
                     success: false,
                     message: error.message,
              });
       }
};

module.exports = { getResaurentDetail, handleUpdateRestaurent, updateRestaurantStatus }