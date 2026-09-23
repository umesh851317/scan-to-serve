const mongoose = require("mongoose")

const OrderDetailsSchema = new mongoose.Schema({
       sessionId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "TableSession",
              required: true,
       },
       tableId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Table",
              required: true,
       },
       tableNumber: {
              type: String,
              required: true
       },
       restaurantId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Restaurant",
              required: true,
       },
       customerName: {
              type: String,
              required: true
       },
       customerId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "TableSession",
              required: true,
       },
       orders: [
              {
                     itemName: {
                            type: String,
                            required: true
                     },
                     menuId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Menu",
                            required: true,
                     },
                     quantity: {
                            type: Number,
                            required: true,
                            min: 1
                     },
                     price: {
                            type: Number,
                            required: true,
                     }
              }],
       status: {
              type: String,
              enum: ["Pending", "Preparing", "Ready", "Served", "Cancel","Completed"],
              default: "Pending",
       },
       description: {
              type: String,
       }
}, {
       timestamps: true,
}
)

const OrderDetails = mongoose.model("OrderDetails", OrderDetailsSchema);

module.exports = OrderDetails;