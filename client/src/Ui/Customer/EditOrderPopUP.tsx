import axios from "axios";
import {
       AlertTriangle,
       Loader,
       XCircle,
       Minus,
       Plus,
} from "lucide-react";
import { usePopup } from "../../context/Popup";
import { useState } from "react";

const EditOrderPopUP = ({ editProps }) => {
       const { setEditOrderPopUP, order } = editProps;
       const { setPopup, setShowPopUp } = usePopup();
       const [loading, setLoading] = useState(false);

       // Store updated quantities
       const [items, setItems] = useState(
              order.orders.map((item: any) => ({
                     ...item,
              }))
       );

       // Increase quantity
       const increaseQuantity = (id: string) => {
              setItems((prev: any[]) =>
                     prev.map((item) =>
                            item._id === id
                                   ? {
                                          ...item,
                                          quantity: item.quantity + 1,
                                          itemTotal:
                                                 (item.quantity + 1) *
                                                 item.price,
                                   }
                                   : item
                     )
              );
       };

       // Decrease quantity
       const decreaseQuantity = (id: string) => {
              setItems((prev: any[]) =>
                     prev.map((item) =>
                            item._id === id
                                   ? {
                                          ...item,
                                          quantity: Math.max(
                                                 1,
                                                 item.quantity - 1
                                          ),
                                          itemTotal:
                                                 Math.max(
                                                        1,
                                                        item.quantity - 1
                                                 ) * item.price,
                                   }
                                   : item
                     )
              );
       };

       // Calculate total
       const totalAmount = items.reduce(
              (total: number, item: any) =>
                     total + item.price * item.quantity,
              0
       );

       const handleUpdateOrder = async () => {
              const OrderId = order._id
              try {
                     setLoading(true);

                     const updatedItems = items.map((item: any) => ({
                            menuId: item.menuId,
                            quantity: item.quantity,
                     }));

                     const { data } = await axios.patch(
                            `${import.meta.env.VITE_API}/customer/Order/edit/${OrderId}`,
                            {
                                   ordersDetails: updatedItems,
                            },
                            {
                                   withCredentials: true,
                            }
                     );
                     setPopup({
                            msg: data.message,
                            bgColor: data.success
                                   ? "bg-green-500"
                                   : "bg-red-500",
                     });

                     setShowPopUp(true);

                     if (data.success) {
                            setEditOrderPopUP(null);
                     }
              } catch (error) {
                     console.log(error);

                     setPopup({
                            msg: "Something went wrong",
                            bgColor: "bg-red-500",
                     });

                     setShowPopUp(true);
              } finally {
                     setLoading(false);

                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: "",
                            });

                            setShowPopUp(false);
                     }, 2500);
              }
       };

       return (
              <div className="w-full max-w-md overflow-hidden bg-white shadow-xl">

                     {/* Header */}
                     <div className="flex items-center justify-between border-b border-gray-100 px-3 py-3">
                            <div>
                                   <h2 className="text-lg font-bold text-gray-900">
                                          Edit Order
                                   </h2>

                                   <p className="mt-0.5 text-xs text-gray-500">
                                          Order by {order.customerName}
                                   </p>
                            </div>

                            <button
                                   onClick={() => setEditOrderPopUP(null)}
                                   className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:scale-95"
                            >
                                   <XCircle size={20} />
                            </button>
                     </div>

                     {/* Warning */}
                     <div className="mx-3 mt-2 flex items-center gap-3 rounded-xl bg-orange-50 p-2">
                            <AlertTriangle
                                   size={28}
                                   className="shrink-0 text-orange-500"
                            />

                            <div>
                                   <p className="text-sm font-semibold text-orange-700">
                                          Quantity update only
                                   </p>

                                   <p className="text-xs leading-5 text-orange-600">
                                          You can only update the quantity.
                                          You cannot add new items to this
                                          order.
                                   </p>
                            </div>
                     </div>

                     {/* Items */}
                     <div className="px-4 pt-3">

                            <div className="mb-2 flex items-center justify-between">
                                   <h3 className="text-sm font-semibold text-gray-800">
                                          Order Items
                                   </h3>

                                   <span className="text-xs text-gray-500">
                                          {items.length} items
                                   </span>
                            </div>

                            <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-100">

                                   {items.map((item: any) => (
                                          <div
                                                 key={item._id}
                                                 className="border-b border-gray-100 px-3 py-3 last:border-b-0"
                                          >
                                                 <div className="flex items-center justify-between gap-3">

                                                        {/* Left: Item Information */}
                                                        <div className="min-w-0 flex-1">
                                                               <p className="truncate text-[14px] font-semibold text-gray-900">
                                                                      {item.itemName}
                                                               </p>

                                                               <p className="mt-1 text-xs text-gray-500">
                                                                      ₹{item.price.toFixed(2)} each
                                                               </p>
                                                        </div>

                                                        {/* Right: Quantity + Total */}
                                                        <div className="flex flex-col shrink-0 items-center gap-3">

                                                               {/* Quantity */}
                                                               <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">

                                                                      <button
                                                                             onClick={() =>
                                                                                    decreaseQuantity(item._id)
                                                                             }
                                                                             disabled={item.quantity <= 1}
                                                                             className="flex h-7 w-7 items-center justify-center rounded-md text-gray-600 transition active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
                                                                      >
                                                                             <Minus size={14} />
                                                                      </button>

                                                                      <span className="w-7 text-center text-sm font-semibold text-gray-900">
                                                                             {item.quantity}
                                                                      </span>

                                                                      <button
                                                                             onClick={() =>
                                                                                    increaseQuantity(item._id)
                                                                             }
                                                                             className="flex h-7 w-7 items-center justify-center rounded-md text-orange-500 transition active:scale-90"
                                                                      >
                                                                             <Plus size={14} />
                                                                      </button>

                                                               </div>

                                                               {/* Item Total */}
                                                               <p className="w-[65px] text-right text-sm font-bold text-gray-900">
                                                                      ₹{(
                                                                             item.price * item.quantity
                                                                      ).toFixed(2)}
                                                               </p>

                                                        </div>
                                                 </div>
                                          </div>
                                   ))}

                            </div>
                     </div>

                     {/* Total */}
                     <div className="mx-3 mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                            <span className="text-sm font-medium text-gray-600">
                                   Updated Total
                            </span>

                            <span className="text-lg font-bold text-gray-900">
                                   ₹{totalAmount.toFixed(2)}
                            </span>
                     </div>

                     {/* Actions */}
                     <div className="flex gap-3 p-3">

                            {/* Keep Current */}
                            <button
                                   onClick={() => setEditOrderPopUP(null)}
                                   disabled={loading}
                                   className="h-11 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition active:scale-95"
                            >
                                   Keep Current
                            </button>

                            {/* Update */}
                            <button
                                   onClick={handleUpdateOrder}
                                   disabled={loading}
                                   className="flex h-11 flex-1 items-center justify-center rounded-xl bg-orange-500 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-70"
                            >
                                   {loading ? (
                                          <Loader className="h-5 w-5 animate-spin" />
                                   ) : (
                                          "Update Order"
                                   )}
                            </button>

                     </div>
              </div>
       );
};

export default EditOrderPopUP;