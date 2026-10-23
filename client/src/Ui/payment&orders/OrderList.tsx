import axios from "axios";
import { Check, Loader } from "lucide-react";
import { useState } from "react";
import { usePopup } from "../../context/Popup";
const OrderList = ({ ordersListProps }) => {
       const { setPopup, setShowPopUp } = usePopup();
       const { orders, sessionId, tableId, } = ordersListProps
       const [loading, setLoading] = useState(false)
       const [selectedOrders, setSelectedOrders] = useState([]);
       const toggleOrder = (orderId: any) => {
              setSelectedOrders((prev) =>
                     prev.includes(orderId)
                            ? prev.filter((id) => id !== orderId)
                            : [...prev, orderId]
              );
       };

       const selectedAmount = orders
              .filter((order: any) => selectedOrders.includes(order._id))
              .reduce((total: any, order: any) =>
                     total + Number(order?.orderTotal),
                     0);
       const handleAcceptCash = async (selectOrderIds: any) => {
              const payload = {
                     selectOrderIds,
                     sessionId,
                     tableId
              }
              try {
                     setLoading(true)
                     const { data } = await axios.post(
                            `${import.meta.env.VITE_API}/api/payment/${sessionId}`, { payload },
                            {
                                   withCredentials: true,
                            }
                     )
                     if (data.success) {
                            setSelectedOrders([])
                     }
                     setPopup({
                            msg: data.message,
                            bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     setShowPopUp(true)
                     console.log(data)
              } catch (error) {
                     console.log("error", error);
              } finally {
                     setLoading(false)
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       }
       return (
              <section className="rounded-2xl bg-[#292929] p-4 ">
                     <div className="mb-4 flex items-center justify-between">
                            <div>
                                   <h2 className="text-sm font-semibold text-gray-300">
                                          Orders
                                   </h2>

                                   <p className="mt-1 text-xs text-gray-500">
                                          Select unpaid orders for manual cash payment
                                   </p>
                            </div>
                            {selectedOrders.length > 0 && (
                                   <span className="text-sm font-semibold text-orange-400">
                                          ₹{selectedAmount.toFixed(2)}
                                   </span>
                            )}

                     </div>

                     <div className="grid grid-cols-2 gap-2">
                            {orders.length === 0 ? (
                                   <p className="col-span-2 py-5 text-center text-sm text-gray-500">
                                          No orders found
                                   </p>
                            ) : (
                                   orders.map((order: any) => {
                                          const isCancel = order.status === "Cancel";
                                          const isUnpaid = order.paymentStatus === "UNPAID";
                                          const isPaid = order.paymentStatus === "PAID";
                                          const isFailed = order.paymentStatus === "FAILED";

                                          const isSelected = selectedOrders.includes(order._id);

                                          const itemCount =
                                                 order.orders?.reduce(
                                                        (total: any, item: any) =>
                                                               total + Number(item.quantity),
                                                        0
                                                 );

                                          // Order status styling
                                          const statusStyle =
                                                 order.status === "Pending"
                                                        ? "bg-yellow-500/15 text-yellow-400"
                                                        : order.status === "Preparing"
                                                               ? "bg-blue-500/15 text-blue-400"
                                                               : order.status === "Ready"
                                                                      ? "bg-green-500/15 text-green-400"
                                                                      : order.status === "Served"
                                                                             ? "bg-purple-500/15 text-purple-400"
                                                                             : order.status === "Cancel"
                                                                                    ? "bg-red-500/15 text-red-400"
                                                                                    : "bg-gray-500/15 text-gray-400";

                                          return (
                                                 <div
                                                        key={order._id}
                                                        className={`rounded-xl border p-3 ${isCancel
                                                               ? "border-red-500/20 bg-red-950/10 opacity-70"
                                                               : isSelected
                                                                      ? "border-orange-500 bg-orange-500/5"
                                                                      : "border-gray-700 bg-[#232323]"
                                                               }`}
                                                 >

                                                        {/* Order top */}
                                                        <div className="flex items-start justify-between gap-2">

                                                               <div className="min-w-0">

                                                                      {/* Order number + Order status */}
                                                                      <div className="flex flex-wrap items-center gap-2">

                                                                             <p className="font-semibold text-white">
                                                                                    Order #
                                                                                    {order.orderNumber ||
                                                                                           order._id.slice(-6)}
                                                                             </p>

                                                                             {/* Order Status */}
                                                                             <span
                                                                                    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${statusStyle}`}
                                                                             >
                                                                                    {order.status}
                                                                             </span>

                                                                      </div>

                                                                      <p className="mt-1 text-xs text-gray-500">
                                                                             Customer: {order.customerName}
                                                                      </p>

                                                               </div>

                                                               <p className="shrink-0 text-lg font-bold text-white">
                                                                      ₹{order.orderTotal}
                                                               </p>

                                                        </div>

                                                        {/* Items + Payment information */}
                                                        <div className="mt-3 flex items-center justify-between">

                                                               {/* Item count */}
                                                               <span className="text-xs text-gray-500">
                                                                      {itemCount}{" "}
                                                                      {itemCount === 1 ? "item" : "items"}
                                                               </span>

                                                               <div className="flex items-center gap-2">

                                                                      {/* Payment Status */}
                                                                      {isCancel ? (
                                                                             <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-semibold text-red-400">
                                                                                    CANCELLED
                                                                             </span>
                                                                      ) : (
                                                                             <span
                                                                                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${isPaid
                                                                                           ? "bg-green-500/15 text-green-400"
                                                                                           : order.paymentStatus === "PENDING"
                                                                                                  ? "bg-yellow-500/15 text-yellow-400"
                                                                                                  : isFailed
                                                                                                         ? "bg-red-500/15 text-red-400"
                                                                                                         : "bg-gray-500/15 text-gray-400"
                                                                                           }`}
                                                                             >
                                                                                    {order.paymentStatus}
                                                                             </span>
                                                                      )}

                                                               </div>

                                                        </div>

                                                        {/* Select unpaid */}
                                                        {isUnpaid && !isCancel && (
                                                               <button
                                                                      type="button"
                                                                      onClick={() =>
                                                                             toggleOrder(order._id)
                                                                      }
                                                                      className="mt-4 flex w-full items-center justify-between rounded-lg border border-gray-700 bg-[#292929] px-3 py-2.5 text-sm hover:border-orange-500"
                                                               >

                                                                      <span className="text-gray-400">
                                                                             Select for cash payment
                                                                      </span>

                                                                      <span
                                                                             className={`flex h-5 w-5 items-center justify-center rounded border ${isSelected
                                                                                    ? "border-orange-500 bg-orange-500 text-white"
                                                                                    : "border-gray-600"
                                                                                    }`}
                                                                      >
                                                                             {isSelected && (
                                                                                    <Check
                                                                                           size={13}
                                                                                           strokeWidth={3}
                                                                                    />
                                                                             )}
                                                                      </span>

                                                               </button>
                                                        )}

                                                 </div>
                                          );
                                   })
                            )}

                     </div>

                     {/* Manual cash button */}
                     {selectedOrders.length > 0 && (
                            <div className="mt-4 border-t border-gray-700 pt-4">

                                   <div className="mb-3 flex justify-between">

                                          <span className="text-sm text-gray-400">
                                                 Selected Orders
                                          </span>

                                          <span className="font-semibold text-white">
                                                 ₹{selectedAmount.toFixed(2)}
                                          </span>

                                   </div>

                                   <button type="button"
                                          onClick={() => { handleAcceptCash(selectedOrders) }}
                                          className="w-full flex justify-center rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 "
                                   >
                                          {
                                                 loading ? (
                                                        <Loader className="animate-spin " />
                                                 ) : (
                                                        "Collect Cash Payment"
                                                 )
                                          }
                                   </button>

                            </div>
                     )}

              </section>
       );

};

export default OrderList;