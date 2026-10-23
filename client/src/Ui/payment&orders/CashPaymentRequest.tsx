import axios from "axios";
import { Banknote, CheckCircle2, Loader } from "lucide-react";
import { useState } from "react";
import { usePopup } from "../../context/Popup";
const CashPaymentRequest = ({ request }) => {
       const { setPopup, setShowPopUp } = usePopup();
       const [loading, setLoading] = useState(false)
       const acceptCash = async (requestId: any) => {
              try {
                     setLoading(true)
                     const { data } = await axios.patch(
                            `${import.meta.env.VITE_API}/api/payment/${requestId}`, {},
                            {
                                   withCredentials: true,
                            }
                     )
                     if (data.success) {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                     } else {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                     }
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
              <section className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">

                     {/* Header */}
                     <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/15">
                                          <Banknote
                                                 size={21}
                                                 className="text-yellow-400"
                                          />
                                   </div>

                                   <div>

                                          <h2 className="font-semibold text-yellow-400">
                                                 Cash Payment Request
                                          </h2>

                                          <p className="mt-1 text-xs text-gray-400">
                                                 Customer requested cash payment
                                          </p>

                                   </div>

                            </div>

                            <div className="text-right">

                                   <p className="text-xs text-gray-500">
                                          Total
                                   </p>

                                   <p className="text-xl font-bold text-white">
                                          ₹{request?.amount || 5}
                                   </p>

                            </div>

                     </div>

                     {/* Customer */}
                     <div className="mt-4 rounded-xl bg-black/10 p-3">

                            <p className="text-xs text-gray-500">
                                   Request By
                            </p>

                            <p className="mt-1 font-medium text-white">
                                   {request?.customerName || "Umesh"}
                            </p>

                     </div>

                     {/* Orders */}
                     <div className="mt-4">

                            <p className="mb-2 text-xs font-medium text-gray-400">
                                   Included Orders
                            </p>

                            <div className="space-y-2">

                                   {request.orderDetails.map((order: any, index: any) => (
                                          <div
                                                 key={index}
                                                 className="flex items-center justify-between rounded-lg bg-black/10 px-3 py-2.5"
                                          >
                                                 <div>
                                                        <p className="text-sm font-medium text-gray-200">
                                                               Order #
                                                               {order.orderId.slice(-6)}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                               {order?.Quantity} items
                                                        </p>
                                                 </div>
                                                 <span className="font-medium text-white">
                                                        ₹{order?.orderTotal}
                                                 </span>

                                          </div>

                                   ))}

                            </div>

                     </div>

                     {/* Message */}
                     <p className="mt-4 text-sm leading-5 text-gray-400">
                            The waiter has collected the cash from the customer.
                            Confirm only after receiving the complete amount.
                     </p>

                     {/* Confirm */}
                     <button
                            type="button"
                            onClick={() => acceptCash(request._id)}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                     >
                            {
                                   loading ? (
                                          <Loader className="animate-spin" />
                                   ) : (
                                          <>
                                                 <CheckCircle2 size={19} />
                                                 Confirm Cash Received · ₹{request?.amount || 5}
                                          </>
                                   )
                            }
                     </button>

              </section>
       );
};

export default CashPaymentRequest;