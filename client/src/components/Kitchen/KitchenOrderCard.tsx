import {
       Clock3,
       Check,
       ChefHat,
       Truck,
       Loader,
} from "lucide-react";

const KitchenOrderCard = ({ OrderCardProps }) => {
       const { order, getTimeAgo, updateStatus, loading } = OrderCardProps;

       const getNextStatus = (status: any) => {
              if (status === "Pending") return "Preparing";
              if (status === "Preparing") return "Ready";
              if (status === "Ready") return "served";
              return null;
       };

       const getButtonText = (status: any) => {
              if (status === "Pending") {
                     return "Start Priparing";
              }

              if (status === "Preparing") {
                     return "Mark Ready";
              }

              if (status === "Ready") {
                     return "Request for served";
              }

              return "Completed";
       };

       const getButtonIcon = (status: any) => {
              if (status === "Pending") {
                     return <ChefHat size={17} />;
              }

              if (status === "Preparing") {
                     return <Check size={18} />;
              }

              if (status === "Ready") {
                     return <Truck size={17} />;
              }

              return null;
       };

       const getCardStyle = (status: any) => {
              switch (status) {
                     case "Pending":
                            return {
                                   header: "bg-gradient-to-r from-orange-100 to-orange-50",
                                   status: "text-orange-700",
                                   button: "bg-orange-500 hover:bg-orange-600",
                                   icon: "text-orange-600",
                            };

                     case "Preparing":
                            return {
                                   header: "bg-gradient-to-r from-amber-100 to-yellow-50",
                                   status: "text-amber-700",
                                   button: "bg-green-500 hover:bg-green-600",
                                   icon: "text-amber-600",
                            };

                     case "Ready":
                            return {
                                   header: "bg-gradient-to-r from-green-100 to-emerald-50",
                                   status: "text-green-700",
                                   button: "bg-blue-500 hover:bg-blue-600",
                                   icon: "text-green-600",
                            };

                     default:
                            return {
                                   header: "bg-gray-100",
                                   status: "text-gray-600",
                                   button: "bg-gray-500",
                                   icon: "text-gray-500",
                            };
              }
       };

       const style = getCardStyle(order.status);

       return (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col">

                     {/* CARD HEADER  */}
                     <div className={`px-3 py-2 ${style.header}`}>
                            <div className="flex items-center justify-between">
                                   {/* Table + Time */}
                                   <div>
                                          <h2 className="text-xl font-semibold text-gray-900">
                                                 Table {order.tableNumber}
                                          </h2>

                                          <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-600">
                                                 <Clock3 size={15} />
                                                 <span> {getTimeAgo(order.createdAt)} </span>
                                          </div>
                                   </div>

                                   {/* Status */}
                                   <span className={`pt-1 text-md font-semibold uppercase ${style.status}`}>
                                          {order.status}
                                   </span>

                            </div>
                     </div>

                     {/* ITEMS */}
                     <div className="px-3 py-1">
                            <div className="space-y-2">
                                   {order.orders.map(
                                          (item: any) => (
                                                 <div key={item._id}
                                                        className="flex items-center justify-between gap-2 border-b border-dashed pb-1">
                                                        {/* Item name */}
                                                        <p className="min-w-0 truncate text-[15px] font-medium text-gray-800">
                                                               {item.itemName}
                                                        </p>
                                                        {/* Quantity */}
                                                        <span className="flex h-9 min-w-[52px] items-center justify-center rounded-lg bg-gray-100 px-3 text-lg font-semibold text-gray-700">
                                                               x{item.quantity}
                                                        </span>

                                                 </div>
                                          )
                                   )}

                            </div>

                     </div>
                     {/* BUTTON */}
                     <div className="px-3 pb-3 mt-auto flex">
                            <button
                                   disabled={order.status === "served" || loading}
                                   onClick={() => updateStatus(order._id, getNextStatus(order.status))}
                                   className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 ${style.button}`}>
                                   {
                                          loading ? (
                                                 <Loader className="animate-spin" />
                                          ) : (
                                                 <>
                                                        {getButtonIcon(order.status)}
                                                        {getButtonText(order.status)}
                                                 </>
                                          )}
                            </button>
                     </div>
              </div>
       );
};

export default KitchenOrderCard;