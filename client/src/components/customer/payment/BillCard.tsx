import { Check } from 'lucide-react';

const BillCard = ({ billCardProps }) => {
       const { orders, selectedOrders, toggleOrder } = billCardProps
       return (
              <>
                     {
                            orders.map((order: any) => {
                                   const isSelected = selectedOrders.includes(order._id);

                                   const isUnpaid = order.paymentStatus === "UNPAID";
                                   const isPending = order.paymentStatus === "PENDING";
                                   const isPaid = order.paymentStatus === "PAID";
                                   const canSelect = isUnpaid;
                                   const itemCount = order.orders.reduce(
                                          (total: number, item: any) => total + item.quantity,
                                          0
                                   );

                                   return (
                                          <button
                                                 key={order._id}
                                                 type="button"
                                                 disabled={!canSelect}
                                                 onClick={() => { if (!canSelect) return; toggleOrder(order._id) }}
                                                 className={`w-full rounded-2xl border p-4 text-left transition-all ${isUnpaid
                                                        ? isSelected
                                                               ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-500"
                                                               : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm"
                                                        : isPending
                                                               ? "cursor-not-allowed border-yellow-200 bg-yellow-50/40"
                                                               : isPaid
                                                                      ? "cursor-not-allowed border-green-200 bg-green-50/40"
                                                                      : "cursor-not-allowed border-gray-200 bg-gray-50"
                                                        }`}
                                          >
                                                 {/* Top Section */}
                                                 <div className="flex items-start justify-between gap-3">

                                                        {/* Order Information */}
                                                        <div className="min-w-0">
                                                               <p className={`font-semibold ${isUnpaid ? "text-gray-800" : "text-gray-600"}`}>
                                                                      Order by {order.customerName}
                                                               </p>
                                                               <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                                                      <span>#{order._id.slice(-10)}</span>
                                                                      <span className="text-gray-300">•</span>
                                                                      <span>
                                                                             {order.createdAt
                                                                                    ? new Date(order.createdAt).toLocaleTimeString([], {
                                                                                           hour: "2-digit",
                                                                                           minute: "2-digit",
                                                                                    })
                                                                                    : ""}
                                                                      </span>
                                                               </div>
                                                        </div>

                                                        {/* Right Section */}
                                                        <div className="flex shrink-0 flex-col items-end gap-2">

                                                               {/* Checkbox / Status Icon */}
                                                               {isUnpaid ? (
                                                                      <div
                                                                             className={`flex h-6 w-6 items-center justify-center rounded-md border ${isSelected
                                                                                    ? "border-orange-500 bg-orange-500 text-white"
                                                                                    : "border-gray-300 bg-white"
                                                                                    }`}
                                                                      >
                                                                             {isSelected && (
                                                                                    <Check size={16} strokeWidth={3} />
                                                                             )}
                                                                      </div>
                                                               ) : (
                                                                      <div
                                                                             className={`flex h-6 w-6 items-center justify-center rounded-full ${isPending
                                                                                    ? "bg-yellow-100 text-yellow-600"
                                                                                    : "bg-green-100 text-green-600"
                                                                                    }`}
                                                                      >
                                                                             {isPending ? (
                                                                                    <span className="text-xs">!</span>
                                                                             ) : (
                                                                                    <Check size={15} strokeWidth={3} />
                                                                             )}
                                                                      </div>
                                                               )}

                                                               {/* Payment Status */}
                                                               <span
                                                                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${isUnpaid
                                                                             ? "bg-gray-100 text-gray-600"
                                                                             : isPending
                                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                                    : isPaid
                                                                                           ? "bg-green-100 text-green-700"
                                                                                           : "bg-red-100 text-red-700"
                                                                             }`}
                                                               >
                                                                      {order.paymentStatus}
                                                               </span>
                                                        </div>
                                                 </div>

                                                 {/* Status Message */}
                                                 {isPending && (
                                                        <div className="mt-3 rounded-lg bg-yellow-100/60 px-3 py-2 text-xs text-yellow-700">
                                                               Waiting for confirmation.
                                                        </div>
                                                 )}

                                                 {isPaid && (
                                                        <div className="mt-3 rounded-lg bg-green-100/60 px-3 py-2 text-xs text-green-700">
                                                               Payment completed successfully.
                                                        </div>
                                                 )}

                                                 {/* Bottom Section */}
                                                 <div className="mt-4 flex items-center justify-between border-t border-dashed pt-3">

                                                        {/* Item Count */}
                                                        <div
                                                               className={`flex items-center gap-1 text-sm ${isUnpaid ? "text-gray-500" : "text-gray-400"
                                                                      }`}
                                                        >
                                                               <span className="font-medium">
                                                                      {itemCount}
                                                               </span>

                                                               <span>
                                                                      {itemCount === 1 ? "item" : "items"}
                                                               </span>
                                                        </div>

                                                        {/* Amount */}
                                                        <div className="text-right">
                                                               <p
                                                                      className={`text-lg font-bold ${isUnpaid ? "text-gray-900" : "text-gray-500"
                                                                             }`}
                                                               >
                                                                      ₹{order.totalAmount}
                                                               </p>
                                                        </div>
                                                 </div>
                                          </button>
                                   );
                            })
                     }
              </>
       )
}

export default BillCard
