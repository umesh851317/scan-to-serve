
const ReviewSelecedtOrders = ({ revieProps }) => {
       const { selectedOrderData, totalAmount, paymentMethod, setShowPaymentConfirm, setPaymentMethod, paymentLoading, handleConfirmPayment } = revieProps
       return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                     <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

                            {/* Header */}
                            <div className="border-b px-5 py-4">
                                   <h2 className="text-lg font-semibold text-gray-900">
                                          Confirm Payment
                                   </h2>

                                   <p className="mt-1 text-sm text-gray-500">
                                          Review your selected orders before continuing.
                                   </p>
                            </div>

                            {/* Selected Orders */}
                            <div className="max-h-64 space-y-2 overflow-y-auto px-5 py-4">

                                   {selectedOrderData.map((order) => {
                                          const itemCount = order.orders.reduce(
                                                 (total: number, item: any) =>
                                                        total + item.quantity,
                                                 0
                                          );

                                          return (
                                                 <div
                                                        key={order._id}
                                                        className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-3"
                                                 >
                                                        <div>
                                                               <p className="text-sm font-medium text-gray-800">
                                                                      Order #{order.orderNumber || order._id.slice(-10)}
                                                               </p>

                                                               <p className="mt-1 text-xs text-gray-500">
                                                                      {itemCount}{" "}
                                                                      {itemCount === 1 ? "item" : "items"}
                                                               </p>
                                                        </div>

                                                        <p className="font-semibold text-gray-900">
                                                               ₹{order.totalAmount}
                                                        </p>
                                                 </div>
                                          );
                                   })}

                            </div>

                            {/* Total */}
                            <div className="mx-5 flex items-center justify-between border-t border-dashed py-3">
                                   <span className="font-medium text-gray-600">
                                          Total Amount
                                   </span>

                                   <span className="text-xl font-bold text-gray-900">
                                          ₹{totalAmount.toFixed(2)}
                                   </span>
                            </div>

                            {/* Payment Message */}
                            <div className="px-5 pb-4">

                                   <div
                                          className={`rounded-xl p-3 ${paymentMethod === "CASH"
                                                 ? "bg-yellow-50 text-yellow-800"
                                                 : "bg-orange-50 text-orange-800"
                                                 }`}
                                   >
                                          {paymentMethod === "CASH" ? (
                                                 <>
                                                        <p className="text-sm font-semibold">
                                                               Cash Payment
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5">
                                                               A waiter will be available shortly to collect
                                                               your payment of ₹{totalAmount.toFixed(2)}.
                                                               Please keep the amount ready.
                                                        </p>
                                                 </>
                                          ) : (
                                                 <>
                                                        <p className="text-sm font-semibold">
                                                               Online Payment
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5">
                                                               You will be redirected to the secure payment
                                                               process to complete your payment of ₹
                                                               {totalAmount.toFixed(2)}.
                                                        </p>
                                                 </>
                                          )}
                                   </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 border-t px-5 py-4">

                                   {/* Cancel */}
                                   <button
                                          type="button"
                                          disabled={paymentLoading}
                                          onClick={() => {
                                                 setShowPaymentConfirm(false);
                                                 setPaymentMethod(null);
                                          }}
                                          className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                                   >
                                          Cancel
                                   </button>

                                   {/* Confirm */}
                                   <button
                                          type="button"
                                          disabled={paymentLoading}
                                          onClick={handleConfirmPayment}
                                          className="flex-1 rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                                   >
                                          {paymentLoading ? "Processing..." : "Confirm"}
                                   </button>

                            </div>

                     </div>
              </div>
       )
}

export default ReviewSelecedtOrders
