const Table = require("../models/Table");
const TableSession = require("../models/TableSession");

async function VarifyCustomer(req, res, next) {
       const { restaurentId } = req.params;
       const customerDetails = req.cookies.customerInfo // recieve token as cookies....
       const { customerId, customerName, tableId, tableNumber, restaurantId, sessionId } = customerDetails
       if (!customerDetails) {
              return res.json({
                     success: false,
                     message: "Token not provided...",
              });
       }

       if (!customerId, !customerName, !tableId, !tableNumber, !restaurantId, !sessionId) {
              return res.json({
                     success: false,
                     message: "Token data is missing...",
              });
       }
       const isCustomerVerify = await TableSession.findOne({
              "customerSummary._id": customerDetails.customerId
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