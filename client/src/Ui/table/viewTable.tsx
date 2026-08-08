import { QRCodeCanvas } from "qrcode.react";

// import { QRCodeCanvas } from "qrcode.react";
const ViewTable = ({ tableData }) => {
       const { viewTable, setViewTable } = tableData
       console.log("viewTable", viewTable);

       return (
              <div className="bg-[#262626] h-[85%] w-full max-w-4xl rounded-3xl border border-[#333] max-h-[90vh] overflow-y-auto scrollbar-hide">

                     {/* HEADER */}
                     <div className="sticky top-0 z-10 p-4 w-full border-white bg-[#141414] flex items-center justify-between">
                            <div>
                                   <h1 className="text-4xl font-bold text-white">
                                          {viewTable.tableNumber}
                                   </h1>

                                   <p className="text-[#ababab] mt-1">
                                          Live Table Information
                                   </p>
                            </div>

                            <button
                                   onClick={() => setViewTable(null)}
                                   className="text-white text-4xl hover:text-red-400 transition"
                            >
                                   ×
                            </button>

                     </div>

                     <div className="relative p-4">

                            {/* TOP CARDS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                                   {/* STATUS */}
                                   <div className="bg-[#1f1f1f] rounded-3xl p-5 border border-[#333]">

                                          <p className="text-[#ababab] mb-3">
                                                 Table Status
                                          </p>

                                          <div
                                                 className={`inline-flex px-5 py-2.5 rounded-2xl text-lg font-bold
                            ${viewTable.isOccupied
                                                               ? "bg-red-500/20 text-red-400"
                                                               : "bg-green-500/20 text-green-400"
                                                        }`}
                                          >
                                                 {viewTable.isOccupied
                                                        ? "Occupied"
                                                        : "Available"}
                                          </div>

                                   </div>


                                   {/* SEATS */}
                                   <div className="bg-[#1f1f1f] rounded-3xl p-5 border border-[#333]">

                                          <p className="text-[#ababab] mb-3">
                                                 Total Seats
                                          </p>

                                          <h1 className="text-5xl font-bold text-yellow-400">
                                                 {viewTable.seats}
                                          </h1>

                                   </div>


                                   {/* PIN */}
                                   <div className="bg-[#1f1f1f] rounded-3xl p-5 border border-[#333]">

                                          <p className="text-[#ababab] mb-3">
                                                 PIN
                                          </p>

                                          <h1 className="text-5xl font-bold text-blue-400">
                                                 {viewTable.pin != null
                                                        ? viewTable.pin
                                                        : "NA"}
                                          </h1>

                                   </div>

                            </div>


                            {/* QR CODE */}
                            <div className="bg-[#1f1f1f] rounded-3xl p-6 border border-[#333] mb-6">

                                   <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                                          <div className="w-full">

                                                 <h2 className="text-2xl font-bold text-white mb-2">
                                                        Table QR Code
                                                 </h2>

                                                 <p className="text-[#ababab] mb-4">
                                                        Scan this QR to join the table
                                                 </p>

                                                 <div className="bg-[#262626] px-4 py-3 rounded-2xl border border-[#333] break-all text-sm text-yellow-400">
                                                        {viewTable.qrCode}
                                                 </div>

                                          </div>


                                          <div className="bg-white p-4 rounded-3xl shrink-0">

                                                 <QRCodeCanvas
                                                        value={viewTable.qrCode}
                                                        size={200}
                                                 />

                                          </div>

                                   </div>

                            </div>


                            {/* MEMBERS */}
                            <div className="bg-[#1f1f1f] rounded-3xl p-6 border border-[#333] mb-6">

                                   <div className="flex items-center justify-between mb-5">

                                          <h2 className="text-2xl font-bold text-white">
                                                 Members
                                          </h2>

                                          <div className="bg-[#262626] px-4 py-2 rounded-xl text-yellow-400 font-semibold">
                                                 {viewTable.members.length} Joined
                                          </div>

                                   </div>


                                   {
                                          viewTable.members.length > 0 ? (

                                                 <div className="flex flex-wrap gap-3">

                                                        {
                                                               viewTable.members.map((member) => (

                                                                      <div
                                                                             key={member._id}
                                                                             className="bg-[#262626] px-5 py-3 rounded-2xl border border-[#333] text-white"
                                                                      >
                                                                             {member.name}
                                                                      </div>

                                                               ))
                                                        }

                                                 </div>

                                          ) : (

                                                 <div className="text-[#777] text-lg">
                                                        No members joined yet
                                                 </div>

                                          )
                                   }

                            </div>


                            {/* ORDERS */}
                            {/* <div className="bg-[#1f1f1f] rounded-3xl p-6 border border-[#333] mb-6">

                            <div className="flex items-center justify-between mb-5">

                                   <h2 className="text-2xl font-bold text-white">
                                          Orders
                                   </h2>

                                   <div className="bg-[#262626] px-4 py-2 rounded-xl text-green-400 font-semibold">
                                          {viewTable.orders.length} Orders
                                   </div>

                            </div>


                            {
                                   viewTable.orders.length > 0 ? (

                                          <div className="space-y-3">

                                                 {
                                                        viewTable.orders.map((order, index) => (

                                                               <div
                                                                      key={index}
                                                                      className="bg-[#262626] border border-[#333] rounded-2xl p-5"
                                                               >
                                                                      <h3 className="text-white font-semibold">
                                                                             Order #{index + 1}
                                                                      </h3>
                                                               </div>

                                                        ))
                                                 }

                                          </div>

                                   ) : (

                                          <div className="text-[#777] text-lg">
                                                 No orders yet
                                          </div>

                                   )
                            }

                     </div> */}


                            {/* FOOTER */}
                            {/* <div className="bg-yellow-400 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">

                            <div>

                                   <h2 className="text-2xl font-bold text-black">
                                          Table Created
                                   </h2>

                                   <p className="text-black/70 mt-1 font-medium">
                                          {
                                                 new Date(viewTable.createdAt)
                                                        .toLocaleString()
                                          }
                                   </p>

                            </div>


                            <button
                                   onClick={() => setViewTable(null)}
                                   className="bg-black hover:bg-[#111] transition text-white px-8 py-4 rounded-2xl font-semibold"
                            >
                                   Close
                            </button>

                     </div> */}
                     </div>

              </div>
       )
}

export default ViewTable
