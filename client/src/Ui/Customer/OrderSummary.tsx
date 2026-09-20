import axios from 'axios';
import { Loader, Loader2, X } from 'lucide-react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCustomerAuth } from '../../context/CustomerContext';
import { usePopup } from '../../context/Popup';

const OrderSummary = ({ orderSummaryProps }) => {
       const [loading, setLoading] = useState(false)
       const { setPopup, setShowPopUp } = usePopup();
       const { restaurantId } = useParams();
       const { customerDetails, cart, setCart } = useCustomerAuth()
       const { setShowOrderPopup } = orderSummaryProps
       const [description, setDescription] = useState("");

       const handlePlaceOrder = async () => {
              const menuItem = cart.map((item: any) => ({
                     menuId: item._id,
                     quantity: item.quantity
              }));
              const Orders = {
                     menuItem,
                     description
              }

              try {
                     setLoading(true)
                     const { data } = await axios.post(`${import.meta.env.VITE_API}/customer/Order/`, Orders, {
                            withCredentials: true,
                     })
                     if (data.success) {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                            setCart([])
                     } else {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                     }
              } catch (error) {
                     console.log(error);
              } finally {
                     setShowOrderPopup(false);
                     setDescription("");
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
                     setLoading(false)
              }

       };
       return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                     {/* Popup */}
                     <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">

                            {/* Header */}
                            <div className="mb-4 flex items-center justify-between">
                                   <h2 className="text-xl font-bold text-gray-800">
                                          Place Order
                                   </h2>

                                   <button
                                          onClick={() => setShowOrderPopup(false)}
                                          className="rounded-full p-2 hover:bg-gray-100"
                                   >
                                          <X size={20} />
                                   </button>
                            </div>


                            {/* Description */}
                            <div className="mb-5">
                                   <label className="mb-2 block text-sm font-medium text-gray-700">
                                          Special instructions
                                          <span className="ml-1 text-gray-400">
                                                 (Optional)
                                          </span>
                                   </label>

                                   <textarea
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          placeholder="Example: Less spicy, no onion..."
                                          rows={4}
                                          className="w-full resize-none rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                   />
                            </div>


                            {/* Buttons */}
                            <div className="flex gap-3">

                                   <button
                                          onClick={() => setShowOrderPopup(false)}
                                          className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                                   >
                                          Cancel
                                   </button>

                                   <button
                                          onClick={handlePlaceOrder}
                                          disabled={loading}
                                          className="flex flex-1 items-center justify-center rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                                   >
                                          {loading ? (
                                                 <Loader className="h-5 w-5 animate-spin" />
                                          ) : (
                                                 "Confirm Order"
                                          )}
                                   </button>

                            </div>
                     </div>
              </div>
       )
}

export default OrderSummary
