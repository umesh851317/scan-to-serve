import { useState } from "react"
import { useNavigate } from "react-router-dom"

const OldSession = ({ customerData }) => {
       const navigate = useNavigate()
       const [loading, setLoading] = useState(false)
       const { handleSave } = customerData
       const [formData, setFormData] = useState<any>({
              name: "",
              phone: "",
              pin: ""
       })
       const handleSubmit = async (e: any) => {
              e.preventDefault()
              const response = await handleSave(formData);
              setLoading(true)
              if (response.success) {
                     navigate(`/customerMenu/${response.tableData.restaurantId}`);
              }
              setLoading(false)
       }
       return (
              <form onSubmit={handleSubmit} className="w-full px-4 md:max-w-[30%]">
                     {/* INFO CARD */}
                     <div className="w-full bg-amber-500/10 border border-amber-500 text-amber-400 rounded-2xl p-3 mb-6 text-sm text-center">
                            Table Already Occupied • Enter Pin To join Table
                     </div>
                     {/* NAME */}
                     <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">
                                   Your Name
                            </label>
                            <input
                                   type="text"
                                   placeholder="Ex : Rahul"
                                   required
                                   name='name'
                                   value={formData.name}
                                   onChange={(e) => {
                                          setFormData({
                                                 ...formData,
                                                 [e.target.name]: e.target.value,
                                          });
                                   }}
                                   className="w-full bg-[#262626] border border-[#333] rounded-2xl px-4 py-3 outline-none focus:border-yellow-400"
                            />
                     </div>
                     <div className="mb-5">
                            <label className="block text-sm text-gray-400 mb-2">
                                   Enter Your Mobile Number
                            </label>
                            <input
                                   type="number"
                                   required
                                   placeholder="Ex : 123456789"
                                   name='phone'
                                   value={formData.phone}
                                   onChange={(e) => {
                                          setFormData({
                                                 ...formData,
                                                 [e.target.name]: e.target.value,
                                          });
                                   }}
                                   className="w-full bg-[#262626] border border-[#333] rounded-2xl px-4 py-3 outline-none focus:border-yellow-400"
                            />
                     </div>
                     {/* PIN */}
                     <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2">
                                   Enter 4 Digit PIN
                            </label>
                            <input
                                   type="number"
                                   required
                                   placeholder="••••"
                                   name='pin'
                                   value={formData.pin}
                                   onChange={(e) => {
                                          setFormData({
                                                 ...formData,
                                                 [e.target.name]: e.target.value,
                                          });
                                   }}
                                   className="w-full bg-[#262626] border border-[#333] rounded-2xl px-4 py-3 outline-none focus:border-yellow-400"
                            />
                     </div>
                     {/* BUTTON */}
                     <button
                            type="submit"
                            // onClick={handleJoinTable}
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-2xl transition-all duration-300"
                     >
                            {
                                   loading
                                          ? "Joining..."
                                          : "Join Table"
                            }
                     </button>

              </form>
       )
}

export default OldSession
