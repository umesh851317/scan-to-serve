const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema(
       {
              restaurantId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Restaurant",
                     required: true,
              },
              sessionId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "TableSession",
                     required: true,
              },
              tableId: {
                     type: mongoose.Schema.Types.ObjectId,
                     required: true,
                     ref: "Table",
              },
              customerId: {
                     type: mongoose.Schema.Types.ObjectId,
              },
              orderDetails: [
                     {
                            orderId: {
                                   type: mongoose.Schema.Types.ObjectId,
                                   ref: "OrderDetails",
                            },
                            Quantity: {
                                   type: String,
                                   min: 1
                            },
                            orderTotal: {
                                   type: Number,
                            }
                     },
              ],
              amount: {
                     type: Number,
                     required: true,
              },
              paymentMethod: {
                     type: String,
                     enum: ["CASH", "ONLINE"],
                     required: true,
              },
              paymentstatus: {
                     type: String,
                     enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
                     default: "PENDING",
              },
              transactionId: {
                     type: String,
                     default: null
              },
              gatwayId: {
                     type: String,
                     default: null
              },
              paidAt: {
                     type: Date,
                     default: null
              },
       },
       {
              timestamps: true,
       }
);

const PaymentDetails = mongoose.model("Payment", paymentSchema);

module.exports = PaymentDetails;