import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useCustomerAuth } from "../../../context/CustomerContext";
import OrderSummary from "../../../Ui/Customer/OrderSummary";

const Cart = ({ cartProps }) => {
       const [showOrderPopup, setShowOrderPopup] = useState(false);
       const { setCustomerCompo } = cartProps
       const { totalCartItems, cart, increaseQty, decreaseQty } = useCustomerAuth()

       // Total price
       const totalPrice = cart.reduce(
              (total: any, item: any) => total + item.price * item.quantity,
              0
       );

       return (
              <div className="min-h-full w-full bg-[#f8f9fa] pb-36 top-[21%]">

                     {/* Cart Items */}
                     <main className="px-3 pt-4">

                            {cart.length === 0 ? (
                                   <div className="flex min-h-[60vh] flex-col items-center justify-center">

                                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
                                                 🛒
                                          </div>

                                          <h2 className="mt-5 text-[20px] font-semibold">
                                                 Your cart is empty
                                          </h2>

                                          <p className="mt-2 text-[14px] text-gray-500">
                                                 Add some delicious items
                                          </p>

                                          <button
                                                 onClick={() => setCustomerCompo("menu")}
                                                 className="mt-5 rounded-xl bg-orange-500 px-6 py-3 text-white"
                                          >
                                                 Go to Menu
                                          </button>

                                   </div>
                            ) : (
                                   <div className="flex flex-col gap-3">

                                          {cart.map((item: any) => {

                                                 const itemTotal =
                                                        item.price * item.quantity;

                                                 return (
                                                        <div key={item._id}
                                                               className=" rounded-2xl bg-white p-3 shadow-sm"
                                                        >

                                                               {/* Top */}
                                                               <div className="flex gap-3">

                                                                      {/* Image */}
                                                                      <img
                                                                             src={item.image}
                                                                             alt={item.name}
                                                                             className=" h-[90px] w-[90px] shrink-0 rounded-xl object-cover"
                                                                      />

                                                                      {/* Details */}
                                                                      <div className="flex min-w-0 flex-1 flex-col">

                                                                             <h2 className="line-clamp-1 text-[18px] font-semibold text-gray-900">
                                                                                    {item.name}
                                                                             </h2>

                                                                             <p className="mt-1 line-clamp-2 text-[13px] leading-[1.4] text-gray-500">
                                                                                    {item.description}
                                                                             </p>

                                                                             {/* Price */}
                                                                             <p className="mt-auto pt-2 text-[16px] font-semibold text-orange-500">
                                                                                    ₹ {item.price.toFixed(2)}
                                                                             </p>

                                                                      </div>
                                                               </div>


                                                               {/* Bottom Row */}
                                                               <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-200 pt-3">

                                                                      {/* Item Total */}
                                                                      <div>
                                                                             <p className="text-[12px] text-gray-500">
                                                                                    Item total
                                                                             </p>

                                                                             <p className="text-[16px] font-semibold text-gray-900">
                                                                                    ₹ {itemTotal.toFixed(2)}
                                                                             </p>
                                                                      </div>
                                                                      {/* Quantity */}
                                                                      <div className="flex items-center gap-2">
                                                                             {/* Minus */}
                                                                             <button
                                                                                    onClick={() => decreaseQty(item._id)}
                                                                                    className=" flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition active:scale-90"
                                                                             >
                                                                                    <Minus size={16} />
                                                                             </button>
                                                                             {/* Quantity */}
                                                                             <span className="flex h-8 w-7 items-center justify-center text-[16px] font-semibold">
                                                                                    {
                                                                                           item.quantity
                                                                                    }
                                                                             </span>
                                                                             {/* Plus */}
                                                                             <button
                                                                                    onClick={() => increaseQty(item)}
                                                                                    className=" flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm transition active:scale-90 "
                                                                             >
                                                                                    <Plus size={16}
                                                                                    />
                                                                             </button>

                                                                      </div>

                                                               </div>

                                                        </div>
                                                 );
                                          })}

                                   </div>
                            )}

                     </main>

                     {/* Bottom Order Section */}
                     {cart.length > 0 && (
                            <div
                                   className=" fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 pb-4 pt-3 shadow-[0_-5px_20px_rgba(0,0,0,0.08)]"
                            >

                                   {/* Total Row */}
                                   <div className="mb-3 flex items-center justify-between">

                                          <div>
                                                 <p className="text-[14px] text-gray-500">
                                                        Total
                                                 </p>

                                                 <p className="text-[13px] text-gray-400">
                                                        {totalCartItems}{" "}
                                                        {totalCartItems === 1
                                                               ? "item"
                                                               : "items"}
                                                 </p>
                                          </div>

                                          <p className="text-[24px] font-bold text-gray-900">
                                                 ₹{totalPrice.toFixed(2)}
                                          </p>

                                   </div>


                                   {/* Place Order */}
                                   <button
                                          onClick={() => setShowOrderPopup(!showOrderPopup)}
                                          className=" flex h-14 w-full items-center justify-center rounded-2xl bg-orange-500 text-[19px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 active:scale-[0.98] "
                                   >
                                          Place Order
                                   </button>

                            </div>
                     )}
                     {
                            showOrderPopup && (
                                   <div>
                                          <OrderSummary orderSummaryProps={{ setShowOrderPopup, cart }} />
                                   </div>)
                     }
              </div>
       );
};

export default Cart;