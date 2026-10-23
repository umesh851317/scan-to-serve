const BillSummary = ({ billSummaryProps }) => {
       const { totalTableAmount, paidAmount, pendingAmount, remainingAmount,tableNumber } = billSummaryProps
       return (
              <div className="rounded-2xl bg-[#292929] p-4 w-full">

                     <div className="mb-2 flex justify-between text-lg font-semibold text-gray-300">
                            <p>Bill Summary</p>
                            <span>Table { tableNumber}</span>
                     </div>

                     <div className="space-y-3">

                            <div className="flex justify-between">
                                   <span className="text-sm text-gray-500">
                                          Total Table Amount
                                   </span>

                                   <span className="font-medium text-white">
                                          ₹{totalTableAmount.toFixed(2)}
                                   </span>
                            </div>

                            <div className="flex justify-between">
                                   <span className="text-sm text-gray-500">
                                          Paid Amount
                                   </span>

                                   <span className="font-medium text-green-400">
                                          ₹{paidAmount.toFixed(2)}
                                   </span>
                            </div>

                            <div className="flex justify-between">
                                   <span className="text-sm text-gray-500">
                                          Pending Payment
                                   </span>

                                   <span className="font-medium text-yellow-400">
                                          ₹{pendingAmount.toFixed(2)}
                                   </span>
                            </div>

                            <div className="border-t border-dashed border-gray-700 pt-3">

                                   <div className="flex items-center justify-between">

                                          <span className="font-semibold text-gray-300">
                                                 Remaining Amount
                                          </span>

                                          <span className="text-xl font-bold text-white">
                                                 ₹{remainingAmount.toFixed(2)}
                                          </span>

                                   </div>

                            </div>

                     </div>

              </div>
       );
};

export default BillSummary;