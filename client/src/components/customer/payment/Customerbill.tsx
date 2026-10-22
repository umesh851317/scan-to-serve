import { useState } from "react";
import {
       ArrowLeft,
       Receipt,
} from "lucide-react";
import BillCard from "./BillCard";
import PaymentType from "./PaymentType";
import ReviewSelecedtOrders from "./ReviewSelecedtOrders";
import axios from "axios";
import { usePopup } from "../../../context/Popup";
declare global {
       interface Window {
              Razorpay: any;
       }
}
const CustomerBill = ({ CustomerBillProps }) => {
       const { setPopup, setShowPopUp } = usePopup();
       const { orders = [], setCustomerCompo, } = CustomerBillProps;
       const [selectedOrders, setSelectedOrders] = useState([]);
       const [paymentMethod, setPaymentMethod] = useState(null);
       const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
       const [paymentLoading, setPaymentLoading] = useState(false);

       const toggleOrder = (orderId: any) => {          // create array of selected orders id
              setSelectedOrders((prev: any) =>
                     prev.includes(orderId)
                            ? prev.filter((id) => id !== orderId)
                            : [...prev, orderId]
              );
       };

       const selectedOrderData = orders.filter((order: any) => // for store object of selected orders in array
              selectedOrders.includes(order._id)
       );

       const totalAmount = selectedOrderData.reduce(
              (total: any, order: any) => total + Number(order.totalAmount || 0),
              0
       );

       const handleConfirmPayment = async () => {
              setPaymentLoading(true);

              try {
                     const payload = {
                            orderIds: selectedOrders,
                     };

                     const endpoint =
                            paymentMethod === "CASH"
                                   ? "/payment/cash"
                                   : "/payment/online";

                     const { data } = await axios.post(
                            `${import.meta.env.VITE_API}/customer${endpoint}`,
                            { payload },
                            { withCredentials: true }
                     );

                     if (!data.success) {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                            return;
                     }

                     if (paymentMethod === "CASH") {
                            setShowPaymentConfirm(false);
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
                            return;
                     }

                     if (paymentMethod === "ONLINE") {
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
                     }

              } catch (error) {
                     console.error("Payment error:", error);
              } finally {
                     setPaymentLoading(false);
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
              <div className="min-h-full w-full bg-gray-50 pb-24">

                     {/* Header */}
                     <div className="sticky top-[8.9%] z-20 flex items-center gap-3 border-b bg-white px-2 py-2">
                            <button
                                   onClick={() => setCustomerCompo("menu")}
                                   className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100"
                            >
                                   <ArrowLeft size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                   <Receipt size={21} />
                                   <h2 className="text-lg font-semibold">
                                          Bill & Payment
                                   </h2>
                            </div>
                     </div>

                     {/* Orders */}
                     <div className="space-y-3 p-3 pb-7">
                            <h3 className="text-md font-semibold text-gray-700 pl-1">
                                   Select Orders
                            </h3>
                            {
                                   orders.length === 0 ?
                                          (
                                                 <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                                                        <Receipt size={40} className="mx-auto mb-3 text-gray-400" />
                                                        <p className="font-medium text-gray-700">
                                                               No orders found
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                               Place an order first to generate your bill.
                                                        </p>
                                                 </div>
                                          ) : (
                                                 <BillCard billCardProps={{
                                                        orders, selectedOrders, setSelectedOrders, toggleOrder
                                                 }} />
                                          )
                            }
                     </div>

                     {/* Bottom Payment Section */}
                     {selectedOrders.length > 0 && (
                            <PaymentType paymentTypeProps={{
                                   selectedOrders,
                                   totalAmount,
                                   setPaymentMethod,
                                   setShowPaymentConfirm,
                                   paymentLoading
                            }} />
                     )}

                     {showPaymentConfirm &&
                            <ReviewSelecedtOrders revieProps={{
                                   selectedOrderData, totalAmount, paymentMethod,
                                   setShowPaymentConfirm, setPaymentMethod,
                                   paymentLoading, handleConfirmPayment
                            }} />}
              </div>
       );
};

export default CustomerBill;