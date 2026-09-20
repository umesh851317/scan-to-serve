const Table = require("../models/Table");
const TableSession = require("../models/TableSession");

async function createTable(req, res) {
       const { restaurantId } = req.user
       const { tableNumber, seats } = req.body
       if (!restaurantId) {
              return res.json({
                     success: false,
                     message: "restaurant id is required....",
              })
       }
       if (!tableNumber || !seats) {
              return res.json({
                     success: false,
                     message: "table number and Seats are required....",
              })
       }
       const newtableNum = "T" + tableNumber
       const isExistTable = await Table.findOne({
              restaurantId: restaurantId,
              tableNumber: newtableNum,
       })
       if (isExistTable) {
              return res.json({
                     success: false,
                     message: "table number are already Exist....",
              })
       }
       const createTable = await Table.create({
              restaurantId: restaurantId,
              tableNumber: newtableNum,
              seats: seats
       })
       if (!createTable) {
              return res.json({
                     success: false,
                     message: "Error during table creation....",
              })
       }
       return res.json({
              success: true,
              message: "Table create succefully....",
              newTable: createTable
       })
}
async function getAlltables(req, res) {
       const { restaurantId } = req.user
       if (!restaurantId) {
              return res.json({
                     success: false,
                     message: "restaurant id is required....",
              })
       }

       const tables = await Table.find({ restaurantId })
       if (!tables) {
              return res.json({
                     success: false,
                     message: "Error during table data fetch....",
              })
       }
       return res.json({
              success: true,
              message: "Table data fetch succefully....",
              tables
       })
}
async function updateTable(req, res) {
       const { restaurantId } = req.user
       if (!restaurantId) {
              return res.json({
                     success: false,
                     message: "unAuthorized....",
              })
       }
       const { id } = req.params;
       if (!id) {
              return res.json({
                     success: false,
                     message: "table id is not recieve...",
              });
       }
       const { tableNumber, seats } = req.body
       if (!tableNumber || !seats) {
              return res.json({
                     success: false,
                     message: "table number and Seats are required....",
              })
       }
       const newtableNum = "T" + tableNumber
       const isExist = await Table.findOne({
              tableNumber: newtableNum,
              _id: { $ne: id }            // for avoid current table
       })
       if (isExist) {
              return res.json({
                     success: false,
                     message: "table number are already Exist....",
              })
       }
       const updateTable = await Table.findByIdAndUpdate(
              id,
              {
                     tableNumber: newtableNum,
                     seats: seats
              },
              {
                     returnDocument: "after",    // return the new updated document 
                     runValidators: true,        // validate the schema
              }
       )
       if (!updateTable) {
              return res.json({
                     success: false,
                     message: "Error during table creation....",
              })
       }
       return res.json({
              success: true,
              message: "Table update succefully....",
              updateTable
       })
}
async function deleteTable(req, res) {
       const { restaurantId } = req.user
       if (!restaurantId) {
              return res.json({
                     success: false,
                     message: "unAuthorized....",
              })
       }
       const { id } = req.params;
       if (!id) {
              return res.json({
                     success: false,
                     message: "table id is not recieve...",
              });
       }
       const deleteTable = await Table.findByIdAndDelete(id)
       if (!deleteTable) {
              return res.json({
                     success: false,
                     message: "Error during table deletion....",
              })
       }
       return res.json({
              success: true,
              message: "Table delete succefully...."
       })
}
async function getCurrentSessionData(req, res) {
       const { sessionId } = req.params
       if (!sessionId) {
              return res.json({
                     success: false,
                     message: "session id not recieve....",
              })
       }
       const sessionData = await TableSession.findById({ _id: sessionId })
       if (!sessionData) {
              return res.json({
                     success: false,
                     message: "session data not recieve....",
              })
       }
       return res.json({
              sessionData,
              success: true,
              message: "current session data fetch succefully....",
       })
}
module.exports = {
       createTable,
       getAlltables,
       updateTable,
       deleteTable,
       getCurrentSessionData
}