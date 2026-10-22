import { useEffect, useState } from 'react'
import TableList from '../../Ui/payment&orders/TableList'
import SessionDetails from '../../Ui/payment&orders/sessionDetails';
import axios from 'axios';
import { Loader } from 'lucide-react';

const PaymentANDorders = ({ paymentProps }) => {
       const { tables } = paymentProps
       const [loading, setLoading] = useState(false)
       const [selectedTable, setSelectedTable] = useState(null);
       const [cashRequest, setCashRequest] = useState(null)
       const [tableMembers, setTableMembers] = useState(null)
       const [sessionOrders, setSessionOrders] = useState([])
       const fetchTableSession = async () => {
              setLoading(true)
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/payment/${selectedTable.sessionId}`,
                            {
                                   withCredentials: true,
                            }
                     )
                     if (data.success) {
                            setCashRequest(data.response.paymentRequest)
                            setTableMembers(data.response.members)
                            setSessionOrders(data.response.SessionOrders)
                     }
              } catch (error) {
                     console.log("error", error);
              } finally {
                     setLoading(false)
              }
       }
       useEffect(() => {
              if (selectedTable !== null && selectedTable.isOccupied) {
                     fetchTableSession()
              }
       }, [selectedTable])
       return (
              <section className="bg-[#1f1f1f] h-full text-white flex flex-col pb-24 ">
                     <div className="flex h-full w-full overflow-hidden bg-[#1f1f1f]">

                            {/* LEFT - TABLE LIST */}
                            <TableList
                                   tableListProps={{
                                          tables,
                                          selectedTable,
                                          setSelectedTable,
                                          cashRequest
                                   }} />

                            {/* RIGHT - TABLE DETAILS */}
                            <div className="min-w-0 flex-1 overflow-y-auto">
                                   {selectedTable ? (
                                          loading ? (
                                                 <div className='flex h-full items-center justify-center'>
                                                        <Loader size={35} className='animate-spin'></Loader>
                                                 </div>
                                          ) : (
                                                 <SessionDetails
                                                        sessionDetailsProps={{
                                                               table: selectedTable,
                                                               cashRequest,
                                                               members: tableMembers,
                                                               sessionOrders,
                                                               loading, setLoading
                                                        }}
                                                 />
                                          )

                                   ) : (
                                          <div className="flex flex-col h-full items-center justify-center">
                                                 <p className="text-lg font-semibold text-gray-300">
                                                        Select a table
                                                 </p>

                                                 <p className="mt-1 text-sm text-gray-500">
                                                        Select a table to view orders and payment details
                                                 </p>
                                          </div>
                                   )}
                            </div>

                     </div>
              </section>
       )
}

export default PaymentANDorders
