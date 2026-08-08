import { Eye, Pencil, Trash2, Users } from 'lucide-react';

const TableCard = ({ tableData }) => {
       const { table, setDeleteTableId, setShowTableForm, setEditTable, setViewTable } = tableData;
       return (
              <div className="bg-[#242424] border border-[#333] rounded-2xl p-4 hover:border-[#555] transition">

                     {/* TOP */}
                     <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                   {/* TABLE NUMBER */}
                                   <div className="w-12 h-12 rounded-xl bg-[#333]
                            flex items-center justify-center">

                                          <span className="text-yellow-400 font-bold text-xl">
                                                 {table.tableNumber.replace("T", "")}
                                          </span>

                                   </div>

                                   {/* TABLE INFO */}
                                   <div>
                                          <h2 className="font-semibold text-base leading-tight">
                                                 {table.tableNumber}
                                          </h2>

                                          <p className="text-gray-500 text-xs mt-1">
                                                 Restaurant table
                                          </p>
                                   </div>

                            </div>


                            {/* STATUS */}
                            <span
                                   className={`px-3 py-1.5 rounded-full text-xs font-semibold ${table.isOccupied
                                          ? "bg-red-500/10 text-red-400"
                                          : "bg-green-500/10 text-green-400"
                                          }`}
                            >
                                   {table.isOccupied ? "Booked" : "Available"}
                            </span>

                     </div>


                     {/* SEATS */}
                     <div className="flex items-center justify-between
                    bg-[#1d1d1d] rounded-xl
                    px-4 py-3 mt-4">

                            <div className="flex items-center gap-2">

                                   <Users
                                          size={17}
                                          className="text-gray-500"
                                   />

                                   <span className="text-gray-400 text-sm">
                                          Seats
                                   </span>

                            </div>

                            <span className="text-yellow-400 font-bold text-base">
                                   {table.seats}
                            </span>

                     </div>


                     {/* ACTIONS */}
                     <div className="grid grid-cols-3 gap-2 mt-3">

                            <button onClick={() => { setViewTable(table) }}
                                   className="flex items-center justify-center gap-1.5
                       bg-blue-500/10 hover:bg-blue-500
                       text-blue-400 hover:text-white
                       py-2.5 rounded-lg
                       text-xs font-medium transition"
                            >
                                   <Eye size={14} />
                                   View
                            </button>

                            <button onClick={() => {
                                   setShowTableForm(true)
                                   setEditTable(table)
                            }}
                                   className="flex items-center justify-center gap-1.5
                       bg-yellow-400/10 hover:bg-yellow-400
                       text-yellow-400 hover:text-black
                       py-2.5 rounded-lg
                       text-xs font-medium transition"
                            >
                                   <Pencil size={14} />
                                   Edit
                            </button>

                            <button onClick={() => { setDeleteTableId(table._id) }}
                                   className="flex items-center justify-center gap-1.5
                       bg-red-500/10 hover:bg-red-500
                       text-red-400 hover:text-white
                       py-2.5 rounded-lg
                       text-xs font-medium transition"
                            >
                                   <Trash2 size={14} />
                                   Delete
                            </button>

                     </div>

              </div>
       )
}

export default TableCard
