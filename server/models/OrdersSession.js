const mongoose = require("mongoose")

const OrdersSessionSchema = new mongoose.Schema(
       {
              tableId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Table",
                     required: true,
              },
              tableNumber: {
                     type: String,
                     required: true,
                     trim: true,
              },
              restaurantId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Restaurant",
                     required: true,
              },
              customerSummary: [
                     {
                            customerName: {
                                   type: String,
                                   required: true
                            },
                            customerId: {
                                   type: mongoose.Schema.Types.ObjectId,
                                   ref: "Table",
                                   required: true,
                            },
                            ordersDetails: [
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
                                          },
                                          itemTotal: {
                                                 type: Number,
                                                 required: true
                                          },
                                   }
                            ],
                            description: {
                                   type: String,
                                   default: null
                            },
                            status: {
                                   type: String,
                                   enum: ["Pending", "Preparing", "Ready", "Served"],
                                   default: "Pending",
                            },
                            totalOrderAmount: {
                                   type: Number,
                                   required: true
                            }
                     }
              ],

              totalTableAmount: {
                     type: Number,
                     required: true,
                     default: 0
              }
       },
       {
              timestamps: true,
       })


const Orders = mongoose.model("OrdersSession", OrdersSessionSchema);

module.exports = Orders;