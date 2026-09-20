const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
       tableNumber: {
              type: String,
              required: true,
              trim: true,
       },
       seats: {
              type: Number,
              required: true,
       },
       isOccupied: {
              type: Boolean,
              default: false,
       },
       qrCode: {
              type: String,
       },
       restaurantId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Restaurant",
              required: true,
       },
       pin: {
              type: Number,
       },
       sessionId: {
              type: mongoose.Schema.Types.ObjectId,
              default: null
       },
},
       {
              timestamps: true,
       }
)


const Table = mongoose.model("Table", tableSchema);

module.exports = Table;