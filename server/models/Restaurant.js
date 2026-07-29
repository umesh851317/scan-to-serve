const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
       restaurantName: {
              type: String,
              required: true,
              trim: true,
       },

       ownerName: {
              type: String,
              required: true,
       },

       phone: {
              type: String,
              default: "",
       }, email: {
              type: String,
              required: true,
              unique: true,
              trim: true,
              lowercase: true,
       },
       role: {
              type: String,
              required: true,
              enum: ["Admin", "Staff", "Kitchen"],
              default: "Staff",
       },
       address: {
              type: String,
              default: "",
       },

       zipCode: {
              type: String,
              default: "",
       },

       gstNumber: {
              type: String,
              default: "",
       },

       isOpen: {
              type: Boolean,
              default: false,
       },
       openTime: {
              type: String,
              default: "",
       },

       closeTime: {
              type: String,
              default: "",
       },
},
       {
              timestamps: true,
       }
)

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;