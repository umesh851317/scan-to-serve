const express = require("express");
const {
       GetTableSessionDetails,
       handleAcceptRequestCashPayment,
       handleCreateCashPaymentByAdmin,
       handleEndTableSessionByAdmin
} = require("../controllers/adminPayment");

const AdminPaymentRoutes = express.Router({ mergeParams: true });

AdminPaymentRoutes.get("/:sessionId", GetTableSessionDetails)
AdminPaymentRoutes.patch("/:cashPaymentId", handleAcceptRequestCashPayment)
AdminPaymentRoutes.post("/:sessionId", handleCreateCashPaymentByAdmin)
AdminPaymentRoutes.post("/endSession/:sessionId", handleEndTableSessionByAdmin)
module.exports = AdminPaymentRoutes 