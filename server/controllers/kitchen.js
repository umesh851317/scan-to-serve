const OrderDetails = require("../models/OrderDetails")

async function GetAllOrders(req, res) {
       const { restaurantId } = req.user
       const AllOrders = await OrderDetails.find({
              restaurantId: restaurantId,
              status: { $in: ["Pending", "Preparing", "Ready"] }
       })
       if (!AllOrders) {
              return res.json({
                     success: false,
                     message: "Order not fetch..."
              })
       }
       return res.json({
              AllOrders,
              success: true,
              message: "Order fetch succefully...."
       })
}

async function handleUpdateOrderStatus(req, res) {      // update by kitchen
       const { orderId } = req.params;
       if (!orderId) {
              return res.json({
                     success: false,
                     message: "OrderId not fetch..."
              })
       }
       const OrderData = await OrderDetails.findOne({ _id: orderId, })
       if (!OrderData) {
              return res.json({
                     success: false,
                     message: "OrderData not fetch..."
              })
       }
       if (OrderData.status == "Pending") {
              OrderData.status = "Preparing"
       } else if (OrderData.status == "Preparing") {
              OrderData.status = "Ready"
       } else {
              return res.json({
                     success: false,
                     message: "Order status not update..."
              })
       }
       await OrderData.save();
       return res.json({
              success: true,
              message: "Order status update succefully....",
              response: {
                     orderId: OrderData._id,
                     status: OrderData.status,
              },
       })
}
module.exports = { GetAllOrders, handleUpdateOrderStatus }