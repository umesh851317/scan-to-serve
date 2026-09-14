const Table = require("../models/Table");

async function VarifyCustomer(req, res, next) {
       const { restaurentId } = req.params;
       const customerDetails = req.cookies.customerInfo // recieve token as cookies....
       if (!customerDetails) {
              return res.json({
                     success: false,
                     message: "Token not provided...",
              });
       }

       if (restaurentId != customerDetails.restaurantId) {
              console.log(restaurentId ,customerDetails.restaurantId);
              return res.json({
                     success: false,
                     message: "unauthorised action...",
              });
       }
       const isCustomerVerify = await Table.findOne({
              "members._id": customerDetails.customerId
       });

       if (!isCustomerVerify) {
              return res.json({
                     success: false,
                     message: "customer is not verify...",
              });
       }
       req.customerDetails = customerDetails
       next()
}

module.exports = { VarifyCustomer }