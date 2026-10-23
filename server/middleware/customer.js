const TableSession = require("../models/TableSession");

async function VarifyCustomer(req, res, next) {
       const customerDetails = req.cookies.customerInfo // recieve token as cookies....
       if (!customerDetails) {
              return res.status(401).json({
                     success: false,
                     message: "Customer session not provided",
              });
       }
       const { customerId, customerName, tableId, tableNumber, restaurantId, sessionId } = customerDetails
       if (!customerId, !customerName, !tableId, !tableNumber, !restaurantId, !sessionId) {
              return res.json({
                     success: false,
                     message: "Token data is missing...",
              });
       }
       const isCustomerVerify = await TableSession.findOne({
              "customerSummary._id": customerId
       });

       if (!isCustomerVerify && isCustomerVerify.restaurantId == restaurantId) {
              return res.json({
                     success: false,
                     message: "customer is not verify...",
              });
       }
       req.customerDetails = customerDetails
       next()
}

module.exports = { VarifyCustomer }