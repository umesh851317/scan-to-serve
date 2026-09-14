import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NewSession = ({ customerData }) => {
       const navigate = useNavigate();
       const [loading, setLoading] = useState(false)
       const { handleSave } = customerData
       const [formData, setFormData] = useState<any>({
              name: "",
              phone: ""
       })
       const handleSubmit = async (e: any) => {
              e.preventDefault()
              setLoading(true)
              const response = await handleSave(formData);
              setLoading(false)
              if (response.success) {
                     navigate(`/customerMenu/${response.tableData.restaurantId}`);
              }
              setLoading(true)
       }
       return (
              <form onSubmit={handleSubmit} className="w-full px-4 md:max-w-[30%]">
                     {/* INFO CARD */}
                     <div className="w-full bg-green-500/10 border border-green-500 text-green-400 rounded-2xl p-3 mb-6 text-sm text-center">
                            Table Available • Start a new dining session
                     </div>
                     {/* NAME */}
                     <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">
                                   Your Name
                            </label>
                            <input
                                   type="text"
                                   placeholder="Ex : Rahul"
                                   name='name'
                                   value={formData.name}
                                   required
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
                                   placeholder="Ex : 123456789"
                                   required
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

                     {/* BUTTON */}
                     <button
                            type='submit'
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-2xl transition-all duration-300"
                     >
                            {
                                   loading ? "Joining..." : "Join Table"
                            }
                     </button>

              </form>

       )
}

export default NewSession
