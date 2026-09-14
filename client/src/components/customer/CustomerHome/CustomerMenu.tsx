import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react'
import { useCustomerAuth } from '../../../context/CustomerContext';

const CustomerMenu = ({ menuProps }) => {
  const { cart, totalCartItems, increaseQty, decreaseQty } = useCustomerAuth();
  const { menu, setCustomerCompo } = menuProps
  return (
    <div className="w-full pb-18">
      <div className="flex w-full flex-col px-2">
        {menu.map((item: any) => {
          const cartItem = cart.find(
            (cartItem: any) => cartItem._id === item._id
          );
          const quantity = cartItem ? cartItem.quantity : 0;
          return (
            <div key={item._id}
              className=" w-full border-b-2 border-dashed border-gray-300 py-2"
            >
              <div className="flex w-full gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className=" h-27.5 w-27.5 shrink-0 rounded-2xl object-cover "
                />

                <div className="flex h-27.5 min-w-0 flex-1 flex-col">
                  <h2
                    className=" line-clamp-2 text-[18px] font-semibold leading-tight text-gray-900 "
                  >
                    {item.name}
                  </h2>
                  <p
                    className="mt-1 line-clamp-2 text-[14px] leading-[1.35] text-gray-500"
                  >
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between ">
                    {/* Price */}
                    <p className="text-[16px] font-semibold leading-none text-orange-500">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    {
                      quantity > 0 ? (
                        <div className="flex items-center gap-1">
                          {/* Minus */}
                          <button
                            onClick={() => decreaseQty(item._id)}
                            className=" flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white p-0 text-[18px] font-semibold leading-none text-gray-600 shadow-sm transition-all duration-150 hover:bg-gray-100 hover:border-gray-300 active:scale-90 active:bg-gray-200 "
                          >
                            −
                          </button>

                          {/* Quantity */}
                          <span className="flex h-7  items-center justify-between font-semibold leading-none text-black "
                          >
                            {quantity}
                          </span>

                          {/* Plus */}
                          <button
                            onClick={() => increaseQty(item)}
                            className=" flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 p-0 text-[18px] font-semibold leading-none text-white shadow-sm transition-all duration-150 hover:bg-orange-600 hover:shadow-md active:scale-90 active:bg-orange-700 "
                          >
                            +
                          </button>

                        </div>
                      ) : (
                        <div className="flex items-center w-[35%]">
                          <button
                            onClick={() => increaseQty(item)}
                            className=" flex h-7 w-full items-center justify-center rounded-lg bg-orange-500 p-0 text-[15px] font-semibold leading-none text-white shadow-sm transition-all duration-150 hover:bg-orange-600 hover:shadow-md active:scale-90 active:bg-orange-700 "
                          >
                            Add
                          </button>
                        </div>
                      )
                    }
                  </div>

                </div>
              </div>

            </div>
          );
        })}

      </div>

      {/* Floating Cart Button */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-2">

          <button onClick={() => { setCustomerCompo("cart") }}
            className=" group relative flex h-12 w-full max-w-45 items-center rounded-full bg-[#1593bd] px-2 text-white shadow-[0_8px_30px_rgba(0,0,0,0.20)] transition-all duration-300 hover:scale-[1.02] active:scale-95 animate-[cartIn_0.4s_ease-out] "
          >

            {/* Cart Icon */}
            <div className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-md transition-transform duration-300 group-hover:scale-105 "
            >
              <ShoppingCart
                size={20}
                className="text-[#1593bd]"
              />
            </div>


            {/* Text */}
            <div className="flex flex-1 flex-col items-start justify-center pl-3">
              <span className="text-[16px] font-semibold leading-4">
                View cart
              </span>

              <span className="mt-1 text-[12px] font-medium leading-3 text-white/90">
                {totalCartItems}{" "}
                {totalCartItems === 1 ? "item" : "items"}
              </span>
            </div>


            {/* Arrow */}
            <div className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1593bd] shadow-sm transition-all duration-300 group-hover:translate-x-1 "
            >
              <ArrowRight
                size={20}
                strokeWidth={2.5}
              />
            </div>

          </button>

        </div>
      )}
    </div>
  )
}

export default CustomerMenu
