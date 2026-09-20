const { default: mongoose } = require("mongoose");
const Table = require("../models/Table");
const Menu = require("../models/Menu");
const TableSession = require("../models/TableSession");

async function getTableStatus(req, res) {
       const { id } = req.params;
       if (!id) {
              return res.json({
                     success: false,
                     message: "Table id not recieve....",
              })
       }
       const response = await Table.findById(id)
              .select("_id tableNumber seats isOccupied restaurantId sessionStartedAt")
              .populate("restaurantId", "restaurantName address isOpen");
       if (!response) {
              return res.json({
                     success: false,
                     message: "Table data not found....",
              })
       }
       const result = {
              ...response.toObject(),
              restaurantId: response.restaurantId._id,
              restaurantName: response.restaurantId.restaurantName,
              address: response.restaurantId.address,
              isOpen: response.restaurantId.isOpen,
       };

       return res.json({
              success: true,
              message: "Fetch succefully....",
              result
       })
}

async function handleJoinTable(req, res) {
       const { id } = req.params;
       const { name, phone, pin } = req.body
       if (!id) {
              return res.json({
                     success: false,
                     message: "Table id not recieve....",
              })
       }
       const tableData = await Table.findById(id)
       if (!tableData) {
              return res.json({
                     success: false,
                     message: "Table data not found....",
              })
       }
       let tableSession;
       // for create customer session
       if (!tableData.isOccupied) {
              tableSession = await TableSession.create({
                     tableId: tableData._id,
                     tableNumber: tableData.tableNumber,
                     restaurantId: tableData.restaurantId,
                     isSessionActive:true
              });
              tableData.isOccupied = true;
              tableData.pin = Math.floor(1000 + Math.random() * 9000);
              tableData.sessionId = tableSession._id;
       } else {
              if (!pin) {
                     return res.json({
                            success: false,
                            message: "input pin is not recieve....",
                     })
              }
              if (Number(pin) !== tableData.pin) {
                     return res.json({
                            success: false,
                            message: "Entered wrong pin....",
                     })
              }
       }
       // Get existing table session
       tableSession = await TableSession.findById(tableData.sessionId);

       if (!tableSession) {
              return res.json({
                     success: false,
                     message: "Table session not found",
              });
       }
       const memberId = new mongoose.Types.ObjectId();
       const newMember = {
              _id: memberId,
              name,
              phone
       };
       // Add customer to the session
       tableSession.customerSummary.push(newMember)

       await tableSession.save();
       await tableData.save();

       const customeCookies = {
              customerId: newMember._id,
              customerName: newMember.name,
              tableId: tableData._id,
              tableNumber: tableData.tableNumber,
              restaurantId: tableData.restaurantId,
              sessionId: tableSession._id,
       }
       res.cookie("customerInfo", customeCookies, {
              httpOnly: true,      // prevents JavaScript running in the browser
              maxAge: 1 * 2 * 60 * 60 * 1000,   // The cookie expires after 1 days.(3,600,000ms)
       });
       res.cookie("isAlredyJoinTable", true, {
              httpOnly: false,
              maxAge: 1 * 2 * 60 * 60 * 1000
       })

       return res.json({
              success: true,
              message: "join table succefully....",
              tableData
       })
}

async function handleVerifyCustomer(req, res) {
       const customerDetails = req.cookies.customerInfo // recieve token as cookies....

       if (!customerDetails) {
              return res.json({
                     success: false,
                     message: "customer token is not recieve...",
              });
       }
       return res.json({
              success: true,
              message: "customer details fecth succefully...",
              response: customerDetails
       });

}

async function GetMenu(req, res) {
       try {
              const { restaurantId } = req.customerDetails

              if (!restaurantId) {
                     return res.json({
                            success: false,
                            message: "restaurant id is required....",
                     })
              }
              const menuItemes = await Menu.find({ restaurantId })
              if (!menuItemes) {
                     return res.json({
                            success: false,
                            message: "menu not fetch....",
                     })
              }
              return res.json({
                     success: true,
                     message: "Menu fetch Succefully...",
                     menuItemes,
              })
       } catch (error) {
              console.log(error);
       }
}
module.exports = { getTableStatus, handleJoinTable, GetMenu, handleVerifyCustomer }