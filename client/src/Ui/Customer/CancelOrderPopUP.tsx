import axios from 'axios';
import { AlertTriangle, Loader, XCircle } from 'lucide-react';
import { useCustomerAuth } from '../../context/CustomerContext';
import { usePopup } from '../../context/Popup';
import { useState } from 'react';

const CancelOrderPopUP = ({ cancelProps }) => {
       const [loading, setLoading] = useState(false)
       const { setPopup, setShowPopUp } = usePopup();
       const { setCancelOrderPopUP, order } = cancelProps
       const { customerDetails } = useCustomerAuth()

       const handleCancelOrder = async (OrderId: any) => {
              try {
                     setLoading(true)
                     const { data } = await axios.patch(`${import.meta.env.VITE_API}/customer/Order/${OrderId}`, {},
                            {
                                   withCredentials: true,
                            })
                     setPopup({
                            msg: data.message,
                            bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     setShowPopUp(true)
                     setCancelOrderPopUP(false)
              } catch (error) {
                     console.log(error);
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
                     setLoading(false)
              }
       }
       // Calculate total
       const totalAmount = order.orders.reduce(
              (total: number, item: any) =>
                     total + item.price * item.quantity,
              0
       );
       return (
              <div className="w-full max-w-md overflow-hidden bg-white shadow-xl">
                     {/* Header */}
                     <div className="flex items-center justify-between border-b border-gray-100 px-3 py-3">
                            <div>
                                   <h2 className="text-lg font-bold text-gray-900">
                                          Cancel Order?
                                   </h2>

                                   <p className="mt-0.5 text-xs text-gray-500">
                                          Order by {order.customerName}
                                   </p>
                            </div>

                            <button
                                   onClick={() => setCancelOrderPopUP(null)}
                                   className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:scale-95"
                            >
                                   <XCircle size={20} />
                            </button>
                     </div>

                     {/* Warning */}
                     <div className="mx-3 mt-2 flex gap-3 rounded-xl bg-red-50 p-2 items-center">
                            <AlertTriangle
                                   size={28}
                                   className="mt-0.5 shrink-0 text-red-500"
                            />
                            <div>
                                   <p className="text-sm font-semibold text-red-700">
                                          Are you sure you want to cancel?
                                   </p>

                                   <p className="text-xs leading-5 text-red-600">
                                          This action cannot be undone once the
                                          order is cancelled.
                                   </p>
                            </div>
                     </div>

                     {/* Order Items */}
                     <div className="px-4 pt-2">

                            <div className="mb-2 flex items-center justify-between">
                                   <h3 className="text-sm font-semibold text-gray-800">
                                          Items in this order
                                   </h3>

                                   <span className="text-xs text-gray-500">
                                          {order.orders.length} items
                                   </span>
                            </div>

                            <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-100">
                                   {order.orders.map(
                                          (item: any) => (
                                                 <div
                                                        key={item._id}
                                                        className="flex items-center justify-between border-b border-gray-100 px-3 py-3 last:border-b-0"
                                                 >
                                                        {/* Item */}
                                                        <div className="min-w-0">
                                                               <p className="truncate text-sm font-medium text-gray-900">
                                                                      {item.itemName}
                                                               </p>

                                                               <p className="mt-1 text-xs text-gray-500">
                                                                      ₹{item.price.toFixed(2)}
                                                                      {" "}×{" "}
                                                                      {item.quantity}
                                                               </p>
                                                        </div>

                                                        {/* Item Total */}
                                                        <p className="ml-3 shrink-0 text-sm font-semibold text-gray-800">
                                                               ₹{item.price * item.quantity}
                                                        </p>
                                                 </div>
                                          )
                                   )}
                            </div>
                     </div>

                     {/* Total */}
                     <div className="mx-3 mt-2 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                            <span className="text-sm font-medium text-gray-600">
                                   Order Total
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                                   ₹{totalAmount.toFixed(2)}
                            </span>
                     </div>

                     {/* Actions */}
                     <div className="flex gap-3 p-3">

                            {/* Keep Order */}
                            <button
                                   onClick={() => setCancelOrderPopUP(null)}
                                   className="h-11 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition active:scale-95"
                            >
                                   Keep Order
                            </button>

                            {/* Confirm Cancel */}
                            <button
                                   onClick={() => { handleCancelOrder(order._id) }}
                                   className="h-11 flex flex-1 items-center justify-center rounded-xl bg-red-500 text-sm font-semibold text-white transition active:scale-95"
                            >
                                   {loading ? (
                                          <Loader className="h-5 w-5 animate-spin" />
                                   ) : (
                                          "Yes, Cancel"
                                   )}
                            </button>

                     </div>

              </div>
       )
}

export default CancelOrderPopUP

