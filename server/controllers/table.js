const Table = require("../models/Table");

async function createTable(req, res) {
       const { restaurantId } = req.user
       const { tableNumber, seats } = req.body
       // console.log(restaurantId, tableNumber, seats);
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
       const isExist = await Table.findOne({
              tableNumber: newtableNum,
       })
       if (isExist) {
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
       const createTable = await Table.findByIdAndUpdate(
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
       if (!createTable) {
              return res.json({
                     success: false,
                     message: "Error during table creation....",
              })
       }
       return res.json({
              success: true,
              message: "Table update succefully...."
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
       if (!createTable) {
              return res.json({
                     success: false,
                     message: "Error during table creation....",
              })
       }
       return res.json({
              success: true,
              message: "Table delete succefully...."
       })
}
module.exports = {
       createTable,
       getAlltables,
       updateTable,
       deleteTable
}