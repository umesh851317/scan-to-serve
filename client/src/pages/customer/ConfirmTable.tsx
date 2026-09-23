import { useEffect, useState } from 'react'
import NewSession from '../../components/customer/confirmTable/newSession'
import OldSession from '../../components/customer/confirmTable/OldSession'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { usePopup } from '../../context/Popup';
import CustomerPopUp from '../../components/popUpMsg/customerPopUp';
const ConfirmTable = () => {
       const navigate = useNavigate()
       const { showPopUp } = usePopup();
       const { tableId } = useParams();
       const { setPopup, setShowPopUp } = usePopup();
       const [tableData, setTableData] = useState<any>({})
       const isAlreadyJoined = document.cookie.includes("isAlredyJoinTable=true");
       const fetchTableStatus = async () => {
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/verifyTable/${tableId}`)
                     setTableData(data.result);
                     if (isAlreadyJoined) {
                            navigate(`/customerMenu/${data.result.restaurantId}`);
                     }
              } catch (err) {
                     console.log(err);
              }
       }
       const handleSave = async (formData: any) => {
              try {
                     const { data } = await axios.post(
                            `${import.meta.env.VITE_API}/verifyTable/${tableId}`,
                            formData,
                            {
                                   withCredentials: true,
                            }
                     );
                     setPopup({
                            msg: data.message,
                            bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     setShowPopUp(true)
                     return data
              } catch (error) {
                     setPopup({
                            msg: error,
                            bgColor: "bg-green-500"
                     })
                     setShowPopUp(true)
                     console.error(error);
                     return error
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       }
       useEffect(() => {
              fetchTableStatus();
       }, [])

       if (!tableData?.isOpen) {
              return (
                     <main className="min-h-full bg-[#111]  py-4 text-white flex flex-col gap-3 items-center justify-center">
                            {/* RESTAURANT HEADER */}
                            <div className="text-center flex flex-col gap-6 items-center justify-center">
                                   <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
                                          <span className="text-3xl">🍽️</span>
                                   </div>

                                   <h1 className="text-3xl font-bold text-white tracking-tight">
                                          {tableData?.restaurantName}
                                   </h1>


                                   <div className="w-[90%] mx-auto flex flex-col gap-2 items-center max-w-md bg-[#1c1c1c] border border-red-500/20 rounded-2xl py-6 text-center">

                                          <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                                                 <span className="text-2xl">🔒</span>
                                          </div>

                                          <h2 className="text-xl font-semibold text-white">
                                                 Restaurant is currently closed
                                          </h2>

                                          <p className="text-sm text-gray-500 mt-2 text-shadow-white">
                                                 We're not accepting orders right now.
                                                 Please visit again when we're open.
                                          </p>

                                   </div>
                            </div>
                     </main>
              )
       }
       return (
              <main className="min-h-full bg-[#111]  py-4 text-white flex flex-col gap-4 items-center justify-center">
                     {/* RESTAURANT HEADER */}
                     <div className="text-center ">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 mb-4">
                                   <span className="text-3xl">🍽️</span>
                            </div>

                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                   {tableData?.restaurantName}
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                   Scan • Order • Enjoy
                            </p>
                     </div>

                     {/* TABLE INFO */}
                     <div className="flex flex-col gap-4 justify-center items-center w-full px-4 md:max-w-[30%]">

                            <div className="w-full bg-[#262626] border border-[#333] rounded-2xl p-4">
                                   <div className="flex items-center justify-between">

                                          {/* TABLE */}
                                          <div className="flex items-center gap-3">
                                                 <div className="w-11 h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                                                        <span className="text-xl">🪑</span>
                                                 </div>

                                                 <div>
                                                        <p className="text-xs uppercase tracking-wider text-gray-500">
                                                               Table
                                                        </p>

                                                        <h2 className="text-3xl font-bold text-yellow-400 leading-none mt-1">
                                                               {tableData?.tableNumber}
                                                        </h2>
                                                 </div>
                                          </div>

                                          {/* DIVIDER */}
                                          <div className="h-10 w-px bg-[#3a3a3a]" />

                                          {/* SEATS */}
                                          <div className="text-right">
                                                 <p className="text-xs uppercase tracking-wider text-gray-500">
                                                        Seats
                                                 </p>

                                                 <p className="text-2xl font-semibold text-white mt-1">
                                                        {tableData?.seats}
                                                 </p>
                                          </div>

                                   </div>
                            </div>
                     </div>

                     {/* SESSION */}

                     {tableData?.isOccupied ? (
                            <OldSession customerData={{ handleSave }} />
                     ) : (
                            <NewSession customerData={{ handleSave }} />
                     )}
                     {showPopUp && <CustomerPopUp />}
              </main>
       )
}

export default ConfirmTable
