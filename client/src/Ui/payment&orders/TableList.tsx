const TableList = ({ tableListProps }) => {
       const { tables, selectedTable, setSelectedTable, cashRequest } = tableListProps
       return (
              <aside className="w-70 shrink-0 border-r border-gray-700 bg-[#252525]">
                     {/* Header */}
                     <div className="border-b border-gray-700 px-4 py-4 h-20">
                            <h2 className="text-lg font-semibold text-white">
                                   Tables
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                   Select a table to manage payment
                            </p>
                     </div>

                     {/* Tables */}
                     <div className="h-[calc(100%-81px)] overflow-y-auto p-2">

                            {tables.length === 0 ? (
                                   <div className="py-10 text-center">
                                          <p className="text-sm text-gray-500">
                                                 No tables available
                                          </p>
                                   </div>
                            ) : (
                                   tables.map((table: any) => {
                                          const isSelected = selectedTable?._id === table._id;
                                          return (
                                                 <button
                                                        key={table._id}
                                                        type="button"
                                                        onClick={() => setSelectedTable(table)}
                                                        className={`mb-2 w-full rounded-xl p-3 text-left transition ${isSelected
                                                               ? "bg-orange-500/15 ring-1 ring-orange-500"
                                                               : "bg-[#303030] hover:bg-[#383838]"
                                                               }`}
                                                 >

                                                        {/* Table number + status */}
                                                        <div className="flex items-start justify-between">
                                                               <div className="flex gap-2">
                                                                      <p className="text-lg text-gray-500">
                                                                             TABLE
                                                                      </p>

                                                                      <p className="text-lg font-semibold text-white">
                                                                             {table.tableNumber}
                                                                      </p>
                                                               </div>
                                                               <span
                                                                      className={`mt-1 h-3 w-3 rounded-full ${table.isOccupied
                                                                             ? "bg-green-500"
                                                                             : "bg-gray-500"
                                                                             }`}
                                                               />

                                                        </div>

                                                        {/* PIN */}
                                                        <div className="mt-2 flex items-center justify-between">

                                                               <span className="text-xs text-gray-500">
                                                                      PIN
                                                               </span>

                                                               <span className="text-sm font-medium text-gray-300">
                                                                      {table.pin || "----"}
                                                               </span>

                                                        </div>

                                                        {/* Status */}
                                                        <div className="mt-2">
                                                               <span
                                                                      className={`text-xs ${table.isOccupied
                                                                             ? "text-green-400"
                                                                             : "text-gray-500"
                                                                             }`}
                                                               >
                                                                      {table.isOccupied
                                                                             ? "● Occupied"
                                                                             : "○ Available"}
                                                               </span>

                                                        </div>

                                                        {/* Payment request indicator
                                                        {table.hasCashRequest == cashRequest?.tableId && (
                                                               <div className="mt-3 flex items-center gap-2">
                                                                      <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                                                      <span className="text-xs font-medium text-yellow-400">
                                                                             Cash payment request
                                                                      </span>
                                                               </div>
                                                        )} */}

                                                 </button>
                                          );
                                   })
                            )}

                     </div>

              </aside>
       );
};

export default TableList;