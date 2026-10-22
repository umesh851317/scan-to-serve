import { useState } from "react";
import {
       Power,
       LoaderCircle,
       AlertTriangle,
       X,
} from "lucide-react";
import axios from "axios";
import { usePopup } from "../../context/Popup";

const EndTableSessionButton = ({ EndTableSessionButtonProps }) => {
       const { sessionId, orders = [] } = EndTableSessionButtonProps;
       const { setPopup, setShowPopUp } = usePopup();
       const [loading, setLoading] = useState(false);
       const [showWarning, setShowWarning] = useState(false);
       const [unfinishedOrders, setUnfinishedOrders] = useState([]);

       const handleEndSession = async () => {
              // Find orders that are not Ready or Served
              const pendingOrders = orders.filter(
                     (order: any) => !["Ready", "Served", "Cancel"].includes(order.status)
              );

              // Block ending the session if unfinished orders exist
              if (pendingOrders.length > 0) {
                     setUnfinishedOrders(pendingOrders);
                     setShowWarning(true);
                     return;
              }

              // Ask for confirmation only if all orders are ready or served
              const confirmed = window.confirm("Are you sure you want to end this table session?");

              if (!confirmed) return;

              try {
                     setLoading(true);
                     const { data } = await axios.post(`
                            ${import.meta.env.VITE_API}/api/payment/endSession/${sessionId}`, {},
                            { withCredentials: true }
                     );
                     if (data.success) {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                            window.alert("Table session ended successfully.");
                     } else {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                            window.alert(
                                   data.message || "Unable to end the table session."
                            );
                     }
              } catch (error) {
                     console.error("Failed to end table session:", error);

                     window.alert(
                            error.response?.data?.message ||
                            "Failed to end table session. Please try again."
                     );
              } finally {
                     setLoading(false);
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       };

       return (
              <>
                     {/* End Session Button */}
                     <button
                            type="button"
                            onClick={handleEndSession}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                     >
                            {loading ? (
                                   <LoaderCircle
                                          size={18}
                                          className="animate-spin"
                                   />
                            ) : (
                                   <Power size={18} />
                            )}

                            {loading ? "Ending Session..." : "End Table Session"}
                     </button>

                     {/* Warning Modal */}
                     {showWarning && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                                   <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

                                          {/* Modal Header */}
                                          <div className="flex items-center justify-between border-b border-gray-100 p-5">

                                                 <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                                                               <AlertTriangle
                                                                      size={23}
                                                                      className="text-red-600"
                                                               />
                                                        </div>

                                                        <div>
                                                               <h2 className="text-lg font-bold text-gray-900">
                                                                      Cannot End Session
                                                               </h2>
                                                               <p className="text-sm text-gray-500">
                                                                      Unfinished orders found
                                                               </p>
                                                        </div>
                                                 </div>

                                                 <button
                                                        type="button"
                                                        onClick={() => setShowWarning(false)}
                                                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                                        aria-label="Close warning"
                                                 >
                                                        <X size={20} />
                                                 </button>
                                          </div>

                                          {/* Modal Body */}
                                          <div className="p-5">
                                                 <p className="mb-4 text-sm leading-6 text-gray-600">
                                                        You cannot end this table session until every
                                                        order is <strong>Ready</strong> or{" "}
                                                        <strong>Served</strong>. Please complete these
                                                        orders first.
                                                 </p>

                                                 <div className="max-h-60 space-y-3 overflow-y-auto">
                                                        {unfinishedOrders.map((order) => (
                                                               <div
                                                                      key={order._id}
                                                                      className="flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 p-3"
                                                               >
                                                                      <div className="min-w-0">
                                                                             <p className="truncate text-sm font-semibold text-gray-900">
                                                                                    Order #{order._id.slice(-6)}
                                                                             </p>

                                                                             <p className="mt-1 text-xs text-gray-500">
                                                                                    Amount: ₹{order.orderTotal}
                                                                             </p>
                                                                      </div>

                                                                      <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                                             {order.status || "Unknown"}
                                                                      </span>
                                                               </div>
                                                        ))}
                                                 </div>

                                                 <div className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                                                        <strong>Note:</strong> The table session is still
                                                        active. No changes have been made.
                                                 </div>
                                          </div>

                                          {/* Modal Footer */}
                                          <div className="border-t border-gray-100 p-5">
                                                 <button
                                                        type="button"
                                                        onClick={() => setShowWarning(false)}
                                                        className="w-full rounded-xl bg-gray-900  px-4 py-3 font-semibold text-white  transition hover:bg-gray-800"
                                                 >
                                                        Okay, I'll Wait
                                                 </button>
                                          </div>
                                   </div>
                            </div>
                     )}
              </>
       );
};

export default EndTableSessionButton;