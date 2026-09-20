const mongoose = require("mongoose")

const TableSessionSchema = new mongoose.Schema(
       {
              tableId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Table",
                     required: true,
              },
              tableNumber: {
                     type: String,
                     required: true,
                     trim: true,
              },
              restaurantId: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Restaurant",
                     required: true,
              },
              customerSummary: [
                     {
                            name: {
                                   type: String,
                                   required: true,
                                   trim: true,
                            },
                            phone: {
                                   type: Number,
                                   required: true,
                            },
                            joinedAt: {
                                   type: Date,
                                   default: Date.now,
                            },
                     },
              ],
              isSessionActive: {
                     type: Boolean,
                     default: false
              }
       }, {
       timestamps: true,
}
)

const TableSession = mongoose.model("TableSession", TableSessionSchema);

module.exports = TableSession;