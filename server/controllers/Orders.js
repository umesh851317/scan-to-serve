const Menu = require("../models/Menu");
const OrderDetails = require("../models/OrderDetails");

async function handleCreateOrder(req, res) {
       const { menuItem, description } = req.body
       const { tableId, tableNumber, customerId, customerName, restaurantId, sessionId } = req.customerDetails;
       const ordersDetails = await Promise.all(
              menuItem.map(async (item) => {
                     const menu = await Menu.findById(item.menuId);
                     if (!menu) {
                            return res.json({
                                   success: false,
                                   message: "Menu item not found...."
                            })
                     }
                     return {
                            itemName: menu.name,
                            menuId: menu._id,
                            quantity: item.quantity,
                            price: menu.price,
                            // description: item.description,
                            // status: "Pending"
                     };
              })
       );
       const order = await OrderDetails.create({
              sessionId,
              tableId,
              tableNumber,
              restaurantId,
              customerId,
              customerName,
              orders: ordersDetails,
              description
       })
       if (!order) {
              return res.json({
                     success: false,
                     message: "Order not  created....."
              })
       }
       return res.json({
              success: true,
              message: "Order placed Succefully....."
       })
}

async function handleGetAllSessionOrders(req, res) {
       const { sessionId } = req.params;
       if (!sessionId) {
              return res.json({
                     success: false,
                     message: "session id not found....."
              })
       }
       const sessionDetails = await OrderDetails.find({ sessionId: sessionId })
       if (!sessionDetails) {
              return res.json({
                     success: false,
                     message: "session data not found....."
              })
       }
       return res.json({
              success: false,
              message: "session data fatch succefully.....",
              orders: sessionDetails
       })

}

async function handleCancelOrderByCustomer(req, res) {
       const { sessionId, OrderId } = req.params;

       const order = await OrderDetails.findById({ _id: OrderId })

       if (!order) {
              return res.json({
                     success: false,
                     message: "orders details not found....."
              })
       } else {
              await OrderDetails.findOneAndUpdate(
                     {
                            _id: OrderId,
                     },
                     {
                            $set: {
                                   "status": "Cancel",
                            },
                     },
                     { new: true }
              );
       }

       return res.json({
              sessionId, OrderId,
              success: true,
              message: "Order cancel Succefully....."
       })
}

async function handleupdateOrderByCustomer(req, res) {
       const { OrderId } = req.params;
       const { ordersDetails } = req.body;

       const order = await OrderDetails.findById(OrderId);

       if (!order) {
              return res.json({
                     success: false,
                     message: "Order not found"
              });
       }

       if (order.status !== "Pending") {
              return res.json({
                     success: false,
                     message: "Order is already accepted by kitchen. Contact the restaurant staff or admin."
              });
       }

       ordersDetails.forEach((updatedItem) => {
              const item = order.orders.find(
                     (orderItem) =>
                            orderItem.menuId.toString() === updatedItem.menuId.toString()
              );

              if (item) {
                     item.quantity = updatedItem.quantity;
              }
       });
       order.save()

       return res.json({
              order, OrderId,
              success: true,
              message: "Order Update Succefully....."
       })
}

module.exports = {
       handleCreateOrder,
       handleGetAllSessionOrders,
       handleCancelOrderByCustomer,
       handleupdateOrderByCustomer
}