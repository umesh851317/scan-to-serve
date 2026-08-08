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
       sessionStartedAt: {
              type: Date,
              default: null
       },
       members: [
              {
                     name: {
                            type: String,
                            required: true,
                            trim: true,
                     },
                     joinedAt: {
                            type: Date,
                            default: Date.now,
                     },
              },
       ],
},
       {
              timestamps: true,
       }
)


const Table = mongoose.model("Table", tableSchema);

module.exports = Table;