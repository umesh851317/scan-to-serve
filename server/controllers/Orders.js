const Menu = require("../models/Menu");
const Orders = require("../models/OrdersSession");
const Table = require("../models/Table");

async function handleCreateOrder(req, res) {
       const { menuItem, description } = req.body
       const { restaurentId, sessionId } = req.params;
       const { tableId, tableNumber, customerId, customerName, restaurantId } = req.customerDetails;

       const tableDetails = await Table.findById({ _id: tableId })
       // -------->>>>>>>>>>> compre session id
       if (tableDetails.sessionId.toString() !== sessionId.toString()) {
              return res.json({
                     success: false,
                     message: "session id is not match....."
              })
       }
       const sessionOrder = await Orders.findById({ _id: sessionId })

       // --------->>>>>>>>>>> search all menu items

       const ordersDetails = await Promise.all(
              menuItem.map(async (item) => {
                     const menu = await Menu.findById(item.menuId);

                     if (!menu) {
                            throw new Error(`Menu item not found: ${item.menuId}`);
                     }

                     return {
                            itemName: menu.name,
                            menuId: menu._id,
                            quantity: item.quantity,
                            price: menu.price,
                            // description: item.description,
                            itemTotal: item.quantity * menu.price,
                            // status: "Pending"
                     };
              })
       );
       const totalOrderAmount = ordersDetails.reduce(          // total amount of individual customer
              (total, curr) => total + curr.itemTotal
              , 0)
       const customerSummary = {
              customerName,
              customerId,
              ordersDetails,
              description: description,   // from req.body
              totalOrderAmount
       };

       sessionOrder.customerSummary.push(customerSummary)  // add order details
       const totalTableAmount = sessionOrder.customerSummary.reduce(
              (total, curr) => total + curr.totalOrderAmount, 0
       )

       sessionOrder.totalTableAmount = totalTableAmount
       await sessionOrder.save()

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
       const sessionDetails = await Orders.findById({ _id: sessionId })
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

module.exports = { handleCreateOrder, handleGetAllSessionOrders }