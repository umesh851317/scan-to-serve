const express = require("express")
const { handleCalculeteBill, RequestCashPayment, handleOnlinePayment } = require("../controllers/payment")
const PaymentRouter = express.Router({ mergeParams: true })

PaymentRouter.get("/", handleCalculeteBill)      // calculte total amount
PaymentRouter.post("/cash", RequestCashPayment)      // for cash request 
PaymentRouter.post("/online", handleOnlinePayment)      // for creating online payment...
PaymentRouter.post("/verify", handleOnlinePayment)      // verify payment...
module.exports = PaymentRouter