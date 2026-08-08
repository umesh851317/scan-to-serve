import axios from "axios";
import { Search } from "lucide-react"
import { useEffect, useState } from "react";
import TableCard from "../../Ui/table/tableCard";
import DeleteTable from "../../Ui/table/deleteTable";
import TableDataForm from "../../Ui/table/tableDataForm";
import ViewTable from "../../Ui/table/viewTable";

const Table = () => {
       const [tables, setTables] = useState([])
       const [query, setQuery] = useState("")
       const [selectCategory, setSelectCategory] = useState("All")
       const [deleteTableId, setDeleteTableId] = useState(null)
       const [showTableForm, setShowTableForm] = useState(false)
       const [editTable, setEditTable] = useState(null);
       const [viewTable, setViewTable] = useState(null)
       const fetchTables = async () => {
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/table`,
                            {
                                   withCredentials: true,
                            }
                     )
                     const sortedTables = [...data.tables].sort((a, b) => {
                            return (
                                   Number(a.tableNumber.slice(1)) -
                                   Number(b.tableNumber.slice(1))
                            );
                     });
                     setTables(sortedTables)
              } catch (error) {
                     console.log("error", error);
              }
       }

       const filterTable = tables.filter((item) => {
              const matchCategory =
                     selectCategory === "All" ||
                     (selectCategory === "Booked" && item.isOccupied) ||
                     (selectCategory === "Available" && !item.isOccupied);

              const matchSearch =
                     item.tableNumber.toLowerCase().includes(query.toLowerCase());

              return matchCategory && matchSearch
       })

       useEffect(() => {
              fetchTables()
       }, [])
       return (
              <section className="bg-[#171717] h-full text-white flex flex-col pb-26">
                     {/* FIXED / STICKY TOOLBAR */}
                     <div className="sticky top-0 z-20 bg-[#1f1f1f] px-4 py-3">
                            <div className="bg-[#242424] border border-[#333] rounded-xl p-3 flex items-center gap-3">

                                   {/* SEARCH */}
                                   <div className="flex items-center gap-2 bg-[#303030] rounded-lg px-3 py-2 flex-1">
                                          <Search size={18} className="text-gray-500" />

                                          <input
                                                 type="text"
                                                 value={query}
                                                 onChange={(e) => setQuery(e.target.value)}
                                                 placeholder="Search by table number..."
                                                 className="bg-transparent outline-none text-white text-sm w-full"
                                          />
                                   </div>

                                   <div className="h-7 w-px bg-[#444]" />

                                   {/* FILTERS */}
                                   <button onClick={() => { setSelectCategory("All") }}
                                          className={`px-4 py-2 rounded-lg text-sm font-semibold
                                          ${selectCategory == "All" ?
                                                        (" bg-yellow-400 text-black") :
                                                        ("text-gray-400")}`}>
                                          All
                                   </button>

                                   <button onClick={() => { setSelectCategory("Booked") }}
                                          className={`px-4 py-2 rounded-lg text-sm font-semibold
                                          ${selectCategory == "Booked" ?
                                                        (" bg-yellow-400 text-black") :
                                                        ("text-gray-400")}`}>
                                          Booked
                                   </button>

                                   <button onClick={() => { setSelectCategory("Available") }}
                                          className={`px-4 py-2 rounded-lg text-sm font-semibold
                                          ${selectCategory == "Available" ?
                                                        (" bg-yellow-400 text-black") :
                                                        ("text-gray-400")}`}>
                                          Available
                                   </button>

                                   {/* ADD */}
                                   <button onClick={() => { setShowTableForm(true) }}
                                          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold">
                                          + Add Table
                                   </button>

                            </div>
                     </div>
                     {/* SCROLLABLE TABLE AREA */}
                     <div className="flex-1 overflow-y-auto p-4 pb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                   {filterTable.length > 0 ? (
                                          filterTable.map((table) => (
                                                 <TableCard key={table._id}
                                                        tableData={{
                                                               table, setTables, setDeleteTableId, setEditTable,
                                                               setShowTableForm, setViewTable
                                                        }} />
                                          ))) : (
                                          selectCategory === "All" ? (
                                                 <div className="col-span-full text-center text-gray-400 py-10">
                                                        <div>No table added yet</div>

                                                 </div>
                                          ) : selectCategory === "Booked" ? (
                                                 <div className="col-span-full text-center text-gray-400 py-10">
                                                        No booked table
                                                 </div>
                                          ) : (
                                                 <div className="col-span-full text-center text-gray-400 py-10">
                                                        No available table
                                                 </div>
                                          )
                                   )}
                            </div>
                     </div>
                     {
                            showTableForm && (
                                   <TableDataForm
                                          tableData={{ setTables, showTableForm, setShowTableForm, editTable, setEditTable }} />
                            )
                     }
                     {
                            viewTable && (
                                   <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto scrollbar-hide">
                                          <ViewTable tableData={{ viewTable, setViewTable }} />
                                   </div>
                            )
                     }
                     {
                            deleteTableId && (
                                   <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                                          <DeleteTable deleteData={{ deleteTableId, setDeleteTableId, setTables }} />
                                   </div>
                            )
                     }
              </section>
       )
}

export default Table
