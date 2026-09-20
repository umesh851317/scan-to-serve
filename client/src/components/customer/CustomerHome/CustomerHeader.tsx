import { Bell, ShoppingCart } from 'lucide-react'
import React from 'react'
import { useCustomerAuth } from '../../../context/CustomerContext'

const CustomerHeader = ({ headerProps }) => {
  const { customerDetails, totalCartItems } = useCustomerAuth()
  const { customerCompo, setCustomerCompo, orderCount } = headerProps
  return (
    <div className="w-full max-w-full overflow-hidden bg-white px-2 py-2 flex flex-col gap-2">
      <div className="flex w-full h-1/2 items-center justify-between ">
        <div className="flex min-w-0 flex-col justify-center items-start">
          <h1 className="text-[24px] leading-[1.1] font-medium text-black">
            Welcome {customerDetails.customerName?.split(" ")[0]}
          </h1>
          <p className="text-[18px] text-gray-500">
            Table {customerDetails.tableNumber}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 ml-5">
          <button onClick={() => setCustomerCompo("cart")}
            className="relative flex items-center justify-center shrink-0 text-gray-700 mr-3">
            <ShoppingCart size={28} />

            {totalCartItems > 0 && (
              <span className=" absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white "
              >
                {totalCartItems}
              </span>
            )}
          </button>
          {/* Cart */}
        </div>
      </div>

      {/* Main Tabs */}
      {
        (
          <div className="grid w-full h-1/2 grid-cols-2 gap-2 items-center">
            <button onClick={() => setCustomerCompo("menu")}
              className={`h-12 w-full min-w-0 rounded-2xl text-[20px] font-medium 
          ${customerCompo == "menu"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
                }`}
            >
              Menu
            </button>
            <button onClick={() => setCustomerCompo("order")}
              className={` relative h-12 w-full min-w-0 rounded-2xl text-[20px] font-medium
            ${customerCompo == "order"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
                }`}
            >
              My Orders
              {orderCount > 0 && (
                <span className=" absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-white"
                >
                  {orderCount}
                </span>
              )}
            </button>
          </div>
        )
      }
    </div>
  )
}

export default CustomerHeader
