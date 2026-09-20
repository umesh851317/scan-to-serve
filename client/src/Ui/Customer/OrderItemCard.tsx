import { CheckCircle2, ChefHat, Pencil, XCircle } from 'lucide-react';
import OrderSummary from './OrderSummary';
import { useState } from 'react';
import CancelOrderPopUP from './CancelOrderPopUP';
import EditOrderPopUP from './EditOrderPopUP';

const OrderItemCard = ({ orderprops }) => {
       const { order, expanded } = orderprops
       const isPending = order.status === "Pending";
       const isPreparing = order.status === "Preparing";
       const isReady = order.status === "Ready";
       const isServed = order.status === "Served";
       // const isCancel = order.status === "Cancel";
       const [cancelOrderPopUP, setCancelOrderPopUP] = useState(null);
       const [editOrderPopUP, setEditOrderPopUP] = useState(null);
       // Calculate total
       const totalAmount = order.orders.reduce(
              (total: number, item: any) =>
                     total + item.price * item.quantity,
              0
       );
       return (
              <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ">
                     {
                            expanded && (
                                   <>
                                          <div className="px-3">
                                                 {order.orders.map((item: any) => (
                                                        <div
                                                               key={item._id}
                                                               className="flex items-center justify-between border-b border-gray-100 py-1"
                                                        >
                                                               {/* Item Information */}
                                                               <div className="min-w-0 pr-1">
                                                                      <h3 className="truncate text-[16px] font-medium text-gray-900">
                                                                             {item.itemName}
                                                                      </h3>

                                                                      <div className=" flex items-center gap-2">
                                                                             <span className="text-[13px] text-gray-500">
                                                                                    quantity: {item.quantity}
                                                                             </span>

                                                                             <span className="text-gray-300">
                                                                                    •
                                                                             </span>

                                                                             <span className="text-[13px] text-gray-500">
                                                                                    ₹{item.price.toFixed(2)} each
                                                                             </span>
                                                                      </div>

                                                               </div>
                                                               {/* Item Total */}
                                                               <p className="shrink-0 text-[16px] font-semibold text-gray-800">
                                                                      ₹{(
                                                                             item.quantity * item.price
                                                                      ).toFixed(2)}
                                                               </p>

                                                        </div>
                                                 ))}

                                          </div>
                                   </>
                            )
                     }
                     {/* ================= TOTAL ================= */}
                     <div className="flex items-center justify-between border-b border-gray-200 px-3 py-1">

                            <span className="text-[16px] font-medium text-gray-600">
                                   Total
                            </span>

                            <span className="text-[21px] font-bold text-gray-900">
                                   ₹{totalAmount.toFixed(2)}
                            </span>

                     </div>
                     {/* ================= ACTIONS ================= */}

                     {/* PENDING */}
                     {isPending && (
                            <div className="flex gap-3 m-1">
                                   {/* Edit */}
                                   <button onClick={() => { setEditOrderPopUP(order) }}
                                          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-orange-500 bg-white text-[15px] font-semibold text-orange-500 transition active:scale-95"
                                   >
                                          <Pencil size={17} />
                                          Edit Order
                                   </button>
                                   {/* Cancel */}
                                   <button onClick={() => { setCancelOrderPopUP(order) }}
                                          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 text-[15px] font-semibold text-white transition active:scale-95"
                                   >
                                          <XCircle size={17} />
                                          Cancel Order
                                   </button>
                            </div>
                     )}
                     {cancelOrderPopUP &&
                            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3">
                                   <div className="max-h-full w-full max-w-md overflow-hidden rounded-t-3xl bg-white">
                                          <CancelOrderPopUP
                                                 cancelProps={{
                                                        setCancelOrderPopUP,
                                                        order: cancelOrderPopUP,
                                                 }}
                                          />
                                   </div>
                            </div>
                     }
                     {
                            editOrderPopUP &&
                            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3">
                                   <div className="max-h-full w-full max-w-md overflow-hidden rounded-t-3xl bg-white">
                                          <EditOrderPopUP editProps={{
                                                 setEditOrderPopUP, order: editOrderPopUP
                                          }} />
                                   </div>
                            </div>
                     }
                     {/* PREPARING */}
                     {isPreparing && (
                            <div className="flex items-center gap-3  bg-blue-50 px-4 py-3">
                                   <ChefHat
                                          size={20}
                                          className="shrink-0 text-blue-600"
                                   />
                                   <div>
                                          <p className="text-[14px] font-semibold text-blue-700">
                                                 Your order is being prepared
                                          </p>

                                          <p className="mt-0.5 text-[12px] text-blue-500">
                                                 We'll let you know when it's ready
                                          </p>
                                   </div>
                            </div>
                     )}

                     {/* READY */}
                     {isReady && (
                            <div className="flex items-center gap-3 bg-green-50 px-4 py-3">
                                   <CheckCircle2
                                          size={21}
                                          className="shrink-0 text-green-600"
                                   />
                                   <div>
                                          <p className="text-[14px] font-bold text-green-700">
                                                 Your order is ready!
                                          </p>

                                          <p className="mt-0.5 text-[12px] text-green-600">
                                                 Waiter will serve it at your table within a minutes
                                          </p>
                                   </div>
                            </div>
                     )}

                     {
                            isServed && (
                                   <div className="m-1 rounded-xl bg-purple-50 p-3">

                                          {/* Acknowledgement */}
                                          <div className="mb-3">
                                                 <p className="text-[14px] font-bold text-purple-700">
                                                        Did you receive your order?
                                                 </p>

                                                 <p className="mt-1 text-[12px] text-purple-500">
                                                        Please confirm whether your order has been
                                                        served at your table.
                                                 </p>
                                          </div>

                                          {/* Actions */}
                                          <div className="flex gap-3">

                                                 {/* Not received */}
                                                 <button
                                                        onClick={() => {
                                                               console.log(
                                                                      "Order not received",
                                                                      order._id
                                                               );
                                                        }}
                                                        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-purple-500 bg-white text-[14px] font-semibold text-purple-600 transition active:scale-95"
                                                 >
                                                        Not Yet
                                                 </button>

                                                 {/* Received */}
                                                 <button
                                                        onClick={() => {
                                                               console.log(
                                                                      "Order received",
                                                                      order._id
                                                               );

                                                               // Call API here
                                                               // acknowledgeOrder(order._id)
                                                        }}
                                                        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 text-[14px] font-semibold text-white transition active:scale-95"
                                                 >
                                                        <CheckCircle2 size={17} />
                                                        Yes, Received
                                                 </button>

                                          </div>
                                   </div>
                            )
                     }
              </div>
       );
}

export default OrderItemCard
