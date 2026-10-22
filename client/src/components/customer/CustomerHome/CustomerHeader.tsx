import { LucideMoreVertical } from 'lucide-react'
import { useCustomerAuth } from '../../../context/CustomerContext'

const CustomerHeader = ({ headerProps }) => {
  const { customerDetails } = useCustomerAuth()
  const { setIsOpenNavigation } = headerProps
  return (
    <div className="w-full max-w-full overflow-hidden bg-white px-2 py-1 flex flex-col gap-2">
      <div className="flex w-full h-1/2 items-center justify-between ">
        <div className="flex min-w-0 flex-col justify-center items-start">
          <h1 className="text-[24px] leading-[1.1] font-medium text-black">
            Welcome {customerDetails.customerName?.split(" ")[0]}
          </h1>
          <p className="text-[18px] text-gray-500">
            Table {customerDetails.tableNumber}
          </p>
        </div>
        <div className="flex shrink-0 items-center ml-5 mb-2">
          <button onClick={() => setIsOpenNavigation(true)}>
            <LucideMoreVertical size={28} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default CustomerHeader
