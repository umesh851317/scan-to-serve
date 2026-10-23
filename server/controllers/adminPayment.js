const OrderDetails = require("../models/OrderDetails");
const PaymentDetails = require("../models/Payment");
const Table = require("../models/Table");
const TableSession = require("../models/TableSession");

async function GetTableSessionDetails(req, res) {
       try {
              const { sessionId } = req.params;
              const sessionDetails = await TableSession.findOne({
                     _id: sessionId,
                     isSessionActive: true
              })
              if (!sessionDetails) {
                     return res.status(404).json({
                            error: error,
                            success: true,
                            message: "Session details not found...."
                     })
              }
              // Members
              const members = sessionDetails.customerSummary;

              // payment Request
              const paymentRequest = await PaymentDetails.find({
                     sessionId: sessionId,
                     paymentMethod: "CASH",
                     paymentstatus: "PENDING"
              })

              if (!paymentRequest) {
                     return res.status(404).json({
                            error: error,
                            success: true,
                            message: "Fetch succefully...."
                     })
              }

              const orders = await OrderDetails.find({ sessionId })
              if (!orders) {
                     return res.status(404).json({
                            error: error,
                            success: true,
                            message: "Order not found...."
                     })
              }

              const orderData = orders.map((order) => {
                     const orderTotal = order.orders.reduce((total, item) => {
                            return total + (item.price * item.quantity);
                     }, 0);

                     return {
                            ...order.toObject(),
                            orderTotal
                     };
              });

              return res.status(200).json({
                     response: { members, paymentRequest, SessionOrders: orderData },
                     success: true,
                     message: "Fetch succefully...."
              })
       } catch (error) {
              return res.status(500).json({
                     error: error,
                     success: true,
                     message: "Fetch succefully...."
              })
       }
}

async function handleAcceptRequestCashPayment(req, res) {
       const { cashPaymentId } = req.params;

       const cashRequest = await PaymentDetails.findById(cashPaymentId);
       if (!cashRequest) {
              return res.status(404).json({
                     error: error,
                     success: true,
                     message: "Payment request not found...."
              })
       }

       const orderIds = cashRequest.orderDetails.map(
              (order) => order.orderId
       );
       const updatedOrders = await OrderDetails.updateMany(
              {
                     _id: { $in: orderIds },
                     paymentStatus: "PENDING"
              },
              {
                     $set: {
                            paymentStatus: "PAID"
                     }
              }
       );
       cashRequest.paymentstatus = "SUCCESS"

       cashRequest.save();

       return res.json({
              cashRequest, updatedOrders,
              success: true,
              message: "cash Accepted...."
       })
}

async function handleCreateCashPaymentByAdmin(req, res) {
       try {
              const { selectOrderIds, sessionId, tableId } = req.body.payload
              const { restaurantId } = req.user
              if (!selectOrderIds && selectOrderIds.length < 0) {
                     return res.json({
                            success: false,
                            message: "orders id not recieve"
                     })
              }
              const ordersData = await OrderDetails.find({
                     _id: { $in: selectOrderIds },
                     paymentStatus: "UNPAID",
              });
              if (!ordersData.length) {
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
                            message: `total amount not calculate... `
                     })
              }
              const paymentDetails = await PaymentDetails.create({
                     restaurantId: restaurantId,
                     sessionId: sessionId,
                     tableId: tableId,
                     customerId: null,
                     orderDetails: orderDetails,
                     amount: totalAmount,
                     paymentMethod: "CASH",
                     paymentstatus: "SUCCESS"
              })
              const updateOrdersData = await OrderDetails.updateMany(
                     {
                            _id: { $in: selectOrderIds },
                            paymentStatus: "UNPAID",
                     },
                     {
                            $set: {
                                   paymentStatus: "PAID",
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

              return res.status(201).json({
                     success: true,
                     message: `cash payment accepted`
              })
       } catch (error) {
              console.log(error)
              return res.status(500).json({
                     success: false,
                     message: error
              })
       }
}

async function handleEndTableSessionByAdmin(req, res) {
       const { sessionId } = req.params;
       const isSessionExist = await TableSession.findById(sessionId);
       if (!isSessionExist) {
              return res.json({
                     success: false,
                     message: "session not found..."
              })
       }
       if (!isSessionExist.isSessionActive) {
              return res.status(404).json({
                     success: false,
                     message: "session already end..."
              })
       }
       const isAllorderPaid = await OrderDetails.find({
              sessionId: sessionId,
              paymentStatus: { $ne: "PAID" },
              status: { $ne: "Cancel" },
       });
       if (isAllorderPaid.length > 0) {
              return res.json({
                     success: false,
                     message: "Paid all orders first..."
              })
       }
       await TableSession.findByIdAndUpdate(
              sessionId,
              { isSessionActive: false },
              { new: true }
       );
       await Table.findOneAndUpdate(
              { sessionId: sessionId },
              {
                     $set: {
                            isOccupied: false,
                            sessionId: null,
                     },
                     $unset: {
                            pin: 1,
                     },
              },
              { returnDocument: "after", }
       );
       return res.status(200).json({
              success: true,
              message: "session end succefully..."
       })


}
module.exports = { GetTableSessionDetails, handleAcceptRequestCashPayment, handleCreateCashPaymentByAdmin, handleEndTableSessionByAdmin }