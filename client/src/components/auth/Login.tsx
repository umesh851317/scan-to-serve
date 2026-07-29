import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login({ setIsAuth }) {
       const { checkAuth } = useAuth();
       const navigate = useNavigate()
       const [formData, setFormData] = useState({
              email: "",
              password: "",
       });

       const [loading, setLoading] = useState(false);

       const handleChange = (e: any) => {
              setFormData((prev) => ({
                     ...prev,
                     [e.target.name]: e.target.value,
              }));
       };

       const handleSubmit = async (e: any) => {
              e.preventDefault();
              try {
                     setLoading(true);
                     const { data } = await axios.post(
                            "http://localhost:8000/auth/signIn",
                            formData,
                            {
                                   withCredentials: true,      // sends cookies automatically
                            }
                     );
                     console.log(data);
                     // setIsAuth(true);
                     await checkAuth();
                     navigate("/admin");
              } catch (err) {
                     console.log(err);
                     alert(
                            err.response?.data?.message || "Login failed"
                     );
              } finally {
                     setLoading(false);
              }
       };

       return (
              <form
                     onSubmit={handleSubmit}
                     className="space-y-5"
              >
                     <div>
                            <label className="block text-gray-300 mb-2">
                                   Email
                            </label>

                            <input
                                   type="email"
                                   name="email"
                                   placeholder="Enter your email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   required
                                   className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-yellow-400"
                            />
                     </div>

                     <div>
                            <label className="block text-gray-300 mb-2">
                                   Password
                            </label>

                            <input
                                   type="password"
                                   name="password"
                                   placeholder="Enter your password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   required
                                   className="w-full p-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 outline-none focus:border-yellow-400"
                            />
                     </div>

                     <div className="flex justify-end">
                            <button
                                   type="button"
                                   className="text-sm text-yellow-400 hover:underline"
                            >
                                   Forgot Password?
                            </button>
                     </div>

                     <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
                     >
                            {loading ? "Signing In..." : "Sign In"}
                     </button>
              </form>
       );
}