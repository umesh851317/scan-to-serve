import { Banknote, CreditCard } from 'lucide-react'
import React, { useState } from 'react'

const PaymentType = ({ paymentTypeProps }) => {
       const { selectedOrders, totalAmount, setPaymentMethod, setShowPaymentConfirm, paymentLoading } = paymentTypeProps

       const handlePaymentClick = (method: any) => {
              if (selectedOrders.length === 0) return;

              setPaymentMethod(method);
              setShowPaymentConfirm(true);
       };
       
       return (
              <div className="fixed bottom-0 left-0 z-30 w-full border-t bg-white p-2 shadow-lg">

                     <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                   {selectedOrders.length} order
                                   {selectedOrders.length > 1 ? "s" : ""} selected
                            </span>

                            <div className="text-right">
                                   <p className="text-xs text-gray-500">
                                          Total Amount
                                   </p>

                                   <p className="text-xl font-bold">
                                          ₹{totalAmount.toFixed(2)}
                                   </p>
                            </div>
                     </div>

                     <div className="flex gap-3">

                            {/* Cash */}
                            <button
                                   type="button"
                                   onClick={() => handlePaymentClick("CASH")}
                                   disabled={paymentLoading}
                                   className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                   <Banknote size={19} />
                                   Cash
                            </button>

                            {/* Online */}
                            <button
                                   type="button"
                                   onClick={() => handlePaymentClick("ONLINE")}
                                   disabled={paymentLoading}
                                   className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                   <CreditCard size={19} />
                                   Pay Online
                            </button>

                     </div>
              </div>
       )
}

export default PaymentType
