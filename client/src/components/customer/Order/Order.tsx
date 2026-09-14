import {
       Clock3,
       Pencil,
       ChevronDown,
       ChevronUp,
       ChefHat,
       CheckCircle2,
       XCircle,
} from "lucide-react";
import { useState } from "react";

const Order = ({ order }) => {
       const [expanded, setExpanded] = useState(true);
       const isPending = order.status === "Pending";
       const isPreparing = order.status === "Preparing";
       const isReady = order.status === "Ready";

       // Status configuration
       const statusConfig = {
              Pending: {
                     bg: "bg-orange-50",
                     iconBg: "bg-orange-100",
                     iconColor: "text-orange-600",
                     textColor: "text-orange-600",
                     label: "Pending",
                     Icon: Clock3,
              },

              Preparing: {
                     bg: "bg-blue-50",
                     iconBg: "bg-blue-100",
                     iconColor: "text-blue-600",
                     textColor: "text-blue-600",
                     label: "Preparing",
                     Icon: ChefHat,
              },

              Ready: {
                     bg: "bg-green-50",
                     iconBg: "bg-green-100",
                     iconColor: "text-green-600",
                     textColor: "text-green-600",
                     label: "Ready",
                     Icon: CheckCircle2,
              },
       };

       const config = statusConfig[order.status];
       const StatusIcon = config.Icon;

       return (
              <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ">
                     {/* ================= HEADER ================= */}
                     <div
                            className={`flex min-h-15 items-center justify-between px-3 ${config.bg}`}
                     >
                            <div className="flex items-center gap-2">

                                   {/* Status Icon */}
                                   <div
                                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconBg} ${config.iconColor}`}
                                   >
                                          <StatusIcon size={21} />
                                   </div>

                                   <div>
                                          <p
                                                 className={`text-[15px] font-bold uppercase ${config.textColor}`}
                                          >
                                                 {config.label}
                                          </p>

                                          <p className="mt-0.5 text-[12px] text-gray-500">
                                                 Order by {order.customerName}
                                          </p>
                                   </div>

                            </div>

                            {/* Expand Button */}
                            <button
                                   onClick={() => setExpanded(!expanded)}
                                   className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-600 transition active:scale-90"
                            >
                                   {expanded ? (
                                          <ChevronUp size={20} />
                                   ) : (
                                          <ChevronDown size={20} />
                                   )}
                            </button>

                     </div>
                     {/* ================= ORDER CONTENT ================= */}

                     {
                            expanded && (
                                   <>
                                          <div className="px-3">
                                                 {order.ordersDetails.map((item: any) => (
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
                                                                             item.itemTotal
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
                                   ₹{order.totalOrderAmount.toFixed(2)}
                            </span>

                     </div>
                     {/* ================= ACTIONS ================= */}
                     <div className="p-2">

                            {/* PENDING */}
                            {isPending && (
                                   <div className="flex gap-3">

                                          {/* Edit */}
                                          <button
                                                 className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-orange-500 bg-white text-[15px] font-semibold text-orange-500 transition active:scale-95"
                                          >
                                                 <Pencil size={17} />
                                                 Edit Order
                                          </button>


                                          {/* Cancel */}
                                          <button
                                                 className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 text-[15px] font-semibold text-white transition active:scale-95"
                                          >
                                                 <XCircle size={17} />
                                                 Cancel Order
                                          </button>

                                   </div>
                            )}
                     </div>

                     {/* PREPARING */}
                     {isPreparing && (
                            <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3">

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
                            <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">

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
              </div>
       );
};


const Orders = ({ ordersProps }) => {
       const { allOrders } = ordersProps;
       return (
              <div className="flex w-full flex-col p-2 gap-2">

                     {allOrders.map((order: any) => (
                            // <div>7</div>
                            <Order
                                   key={order._id}
                                   order={order}
                            />
                     ))}

              </div>
       );
};

export default Orders;
