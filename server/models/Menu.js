const mongoose = require("mongoose");

const menu = new mongoose.Schema(
       {
              name: {
                     type: String,
                     required: true,
                     trim: true,
              },

              description: {
                     type: String,
                     required: true,
                     trim: true,
              },

              price: {
                     type: Number,
                     required: true,
              },

              category: {
                     type: String,
                     required: true,
              },

              image: {
                     type: String,
                     required: true,
              },

              isVeg: {
                     type: Boolean,
                     default: true,
              },

              isAvailable: {
                     type: Boolean,
                     default: false,
              },

              prepTime: {
                     type: Number,
                     default: 10,
              },

              rating: {
                     type: Number,
                     default: 0,
              },

              restaurantId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Restaurant",
                     required: true,
              },
       },
       {
              timestamps: true,
       }

);
const Menu = mongoose.model("Menu", menu);

module.exports = Menu;