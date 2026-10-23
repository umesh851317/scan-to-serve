const razorpay = require("../config/razorpay");
const OrderDetails = require("../models/OrderDetails");
const PaymentDetails = require("../models/Payment");

async function handleCalculeteBill(req, res) {
       try {
              const { sessionId } = req.customerDetails;

              const sessionData = await OrderDetails.find({
                     sessionId: sessionId,
                     status: { $ne: "canceled" }
              });

              if (!sessionData) {
                     return res.status(404).json({
                            success: true,
                            message: "Bill data not found"
                     })
              }
              return res.json({
                     sessionData,
                     success: true,
                     message: "Bill data fetch succefully"
              })
       } catch (error) {
              return res.status(500).json({
                     success: true,
                     message: "request send for cash payment"
              })
       }
}
async function RequestCashPayment(req, res) {
       try {
              const { payload } = req.body
              const { tableId, customerId, restaurantId, sessionId } = req.customerDetails;
              if (!payload && payload.orderIds.length < 0) {
                     return res.json({
                            success: false,
                            message: "orders id not recieve"
                     })
              }

              const ordersData = await OrderDetails.find({
                     _id: { $in: payload.orderIds },
                     paymentStatus: "UNPAID",
              });

              if (!ordersData) {
                     return res.json({
                            success: false,
                            message: "orders Details not recieve"
                     })
              }
              const orderDetails = []
              const totalAmount = ordersData.reduce((total, order) => {
                     const orderTotal = order.orders.reduce((sum, item) => {
                            return sum + item.price * item.quantity;
                     }, 0);
                     const totatlQuantity = order.orders.reduce((sum, item) => {
                            return sum + item.quantity;
                     }, 0);
                     const orderPayLoad = {
                            orderId: order._id,
                            Quantity: totatlQuantity,
                            orderTotal: orderTotal
                     }
                     orderDetails.push(orderPayLoad)
                     return total + orderTotal;
              }, 0);

              if (!totalAmount) {
                     return res.json({
                            success: false,
                            message: "total amount not calculate..."
                     })
              }

              const paymentDetails = await PaymentDetails.create({
                     restaurantId: restaurantId,
                     sessionId: sessionId,
                     tableId: tableId,
                     customerId: customerId,
                     orderDetails: orderDetails,
                     amount: totalAmount,
                     paymentMethod: "CASH",
                     paymentstatus: "PENDING"
              })

              const updateOrdersData = await OrderDetails.updateMany(
                     {
                            _id: { $in: payload.orderIds },
                            paymentStatus: "UNPAID",
                     },
                     {
                            $set: {
                                   paymentStatus: "PENDING",
                                   paymentId: paymentDetails._id,
                            },
                     }
              );
              if (!updateOrdersData) {
                     return res.json({
                            success: false,
                            message: "request failed for cash payment"
                     })
              }
              return res.json({
                     success: true,
                     message: "request send for cash payment"
              })
       } catch (error) {
              return res.status(500).json({
                     success: true,
                     message: "request send for cash payment"
              })
       }
}

async function handleOnlinePayment(req, res) {
       try {
              return res.json({
                     success: false,
                     message: "online payment not accept yet...",
              });
       } catch (error) {
              console.error("Online payment error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Failed to create payment",
              });
       }
}


module.exports = { handleCalculeteBill, RequestCashPayment, handleOnlinePayment }