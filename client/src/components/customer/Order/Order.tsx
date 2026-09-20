import {
       Clock3,
       ChevronDown,
       ChevronUp,
       ChefHat,
       CheckCircle2,
       XCircle,
} from "lucide-react";
import { useState } from "react";
import OrderItemCard from "../../../Ui/Customer/OrderItemCard";

const Orders = ({ ordersProps }) => {
       const { allOrders } = ordersProps;
       const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
       const [statusFilter, setStatusFilter] = useState("All");
       const statusFilters = [
              "All",
              "Pending",
              "Preparing",
              "Ready",
              "Served",
              "Cancel",
       ];
       const filteredOrders =
              statusFilter === "All"
                     ? allOrders
                     : allOrders.filter(
                            (order: any) => order.status === statusFilter
                     );
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

              Served: {
                     bg: "bg-purple-50",
                     iconBg: "bg-purple-100",
                     iconColor: "text-purple-600",
                     textColor: "text-purple-600",
                     label: "Served",
                     Icon: CheckCircle2,
              },

              Cancel: {
                     bg: "bg-red-50",
                     iconBg: "bg-red-100",
                     iconColor: "text-red-600",
                     textColor: "text-red-600",
                     label: "Cancelled",
                     Icon: XCircle,
              },
       };
       return (
              <div className="flex w-full flex-col gap-2">
                     <div className="sticky top-[21%] z-40 overflow-x-auto bg-white p-2">
                            <div className="flex min-w-max gap-2">
                                   {statusFilters.map((status) => {
                                          const isActive = statusFilter === status;

                                          return (
                                                 <button
                                                        key={status}
                                                        onClick={() => setStatusFilter(status)}
                                                        className={`
                                          rounded-full px-4 py-2 text-sm font-semibold
                                          transition active:scale-95
                                          ${isActive
                                                                      ? "bg-orange-500 text-white"
                                                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                               }
                                   `}
                                                 >
                                                        {status === "Cancel"
                                                               ? "Cancelled"
                                                               : status}
                                                 </button>
                                          );
                                   })}

                            </div>
                     </div>
                     <div className=" px-2">
                            {filteredOrders.map((order: any) => {
                                   const config = statusConfig[order.status];
                                   const StatusIcon = config.Icon;
                                   return (
                                          <div key={order._id}
                                                 className="mb-2 w-full overflow-hidden rounded-2xl bg-white shadow-sm relative">
                                                 <div className={`flex min-h-15 items-center justify-between px-3 ${config.bg}`}>
                                                        <div className="flex items-center gap-2">
                                                               {/* Status Icon */}
                                                               <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconBg} ${config.iconColor}`}>
                                                                      <StatusIcon size={21} />
                                                               </div>

                                                               <div>
                                                                      <p className={`text-[15px] font-bold uppercase ${config.textColor}`} >
                                                                             {config.label}
                                                                      </p>

                                                                      <p className="mt-0.5 text-[12px] text-gray-500">
                                                                             Order by {order.customerName}
                                                                      </p>
                                                               </div>

                                                        </div>

                                                        {/* Expand Button */}
                                                        <button
                                                               onClick={() => {
                                                                      setExpandedOrder(
                                                                             expandedOrder === order._id ? null : order._id
                                                                      );
                                                               }}
                                                               className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-600 transition active:scale-90"
                                                        >
                                                               {expandedOrder === order._id ? (
                                                                      <ChevronUp size={20} />
                                                               ) : (
                                                                      <ChevronDown size={20} />
                                                               )}
                                                        </button>
                                                 </div>
                                                 <OrderItemCard key={order._id}
                                                        orderprops={{
                                                               order,
                                                               expanded: expandedOrder === order._id,
                                                        }}
                                                 />
                                          </div>
                                   )
                            })}
                     </div>
              </div>
       );
};

export default Orders;
