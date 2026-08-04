import { useState } from "react";
import axios from "axios";
import { usePopup } from "../../context/Popup";

export default function Register({ setIsRegister }) {
       const { setPopup, setShowPopUp } = usePopup();
       const [loading, setLoading] = useState(false);
       const [formData, setFormData] = useState({
              restaurantName: "",
              ownerName: "",
              phone: "",
              email: "",
              password: "",
              gstNumber: "",
              role: "Admin",
       });

       const handleChange = (e:any) => {
              setFormData((prev) => ({
                     ...prev,
                     [e.target.name]: e.target.value,
              }));
       };

       const handleSubmit = async (e:any) => {
              e.preventDefault();
              try {
                     setLoading(true);
                     const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/`, formData,
                            { withCredentials: true }
                     );                     
                     setShowPopUp(true)
                     setPopup({
                            msg: data.message,
                            bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                     })
                     if (data.success) {
                            setIsRegister(false)
                     }
              } catch (err) {
                     console.log(err.response?.data?.message || "Registration failed");
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
                     setLoading(false);
              }
       };

       return (
              <form
                     onSubmit={handleSubmit}
                     className="space-y-4"
              >
                     <input
                            type="text"
                            name="restaurantName"
                            placeholder="Restaurant Name"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-700 focus:border-yellow-400"
                            required
                     />

                     <input
                            type="text"
                            name="ownerName"
                            placeholder="Owner Name"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-700 focus:border-yellow-400"
                            required
                     />

                     <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-700 focus:border-yellow-400"
                            required
                     />

                     <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-700 focus:border-yellow-400"
                            required
                     />

                     <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-700 focus:border-yellow-400"
                            required
                     />

                     <input
                            type="text"
                            name="gstNumber"
                            placeholder="GST Number"
                            value={formData.gstNumber}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white outline-none border border-gray-700 focus:border-yellow-400"
                     />

                     <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
                     >
                            {loading ? "Creating..." : "Create Restaurant"}
                     </button>
              </form>
       );
}