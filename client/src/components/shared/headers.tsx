import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";

import {
       Bell,
       UserCircle2,
       LogOut,
       Power,
} from "lucide-react";
import { usePopup } from "../../context/Popup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
       const [isOpen, setIsOpen] = useState(false);
       const { authUser, checkAuth } = useAuth();
       const { setPopup, setShowPopUp } = usePopup();
       const navigate = useNavigate();
       const userData = {
              name: authUser.name.split(" ")[0],
              role: authUser.role,
       };
       const getRestaurantStatus = async () => {
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/restaurent`,
                            {
                                   withCredentials: true,
                            }
                     );

                     if (data.success) {
                            setIsOpen(data.restaurent.isOpen);
                     }

              } catch (error) {
                     console.log(error);

                     setPopup({
                            msg: "Failed to get restaurant status",
                            bgColor: "bg-red-500",
                     });

                     setShowPopUp(true);

                     setTimeout(() => {
                            setShowPopUp(false);
                     }, 2500);
              }
       };


       const handleRestaurantStatus = async () => {
              try {
                     const newStatus = !isOpen;

                     const { data } = await axios.patch(
                            `${import.meta.env.VITE_API}/api/restaurent/restaurentStatus`,
                            {
                                   isOpen: newStatus,
                            },
                            {
                                   withCredentials: true,
                            }
                     );

                     if (data.success) {
                            setIsOpen(newStatus);

                            setPopup({
                                   msg: newStatus
                                          ? "Restaurant is now accepting order"
                                          : "Restaurant is not accepting order",
                                   bgColor: newStatus
                                          ? "bg-green-500"
                                          : "bg-red-500",
                            });

                            setShowPopUp(true);
                     }

              } catch (error) {
                     console.log(error);

                     setPopup({
                            msg: "Failed to update restaurant status",
                            bgColor: "bg-red-500",
                     });

                     setShowPopUp(true);

              } finally {
                     setTimeout(() => {
                            setShowPopUp(false);
                     }, 2500);
              }
       };

       const handleLogout = async () => {
              try {
                     const { data } = await axios.post(
                            `${import.meta.env.VITE_API}/api/user/logout`,
                            {},
                            {
                                   withCredentials: true,
                            }
                     );

                     setPopup({
                            msg: data.message,
                            bgColor: "bg-green-500",
                     });

                     setShowPopUp(true);
                     setTimeout(() => {
                            navigate("/auth");
                            checkAuth();
                     }, 1000)
              } catch (error) {
                     console.log("456");
                     setPopup({
                            msg: "error",
                            bgColor: "bg-red-500",
                     });

                     setShowPopUp(true);
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 900)
              }
       };
       useEffect(() => {
              getRestaurantStatus();
       }, []);
       return (
              <nav className=" h-full flex justify-between items-center py-4 px-6 bg-[#1a1a1a]">
                     {/* toggle btn */}
                     <button
                            type="button"
                            onClick={handleRestaurantStatus}
                            className={`relative w-20 h-10 rounded-full transition-colors duration-300 ${isOpen ? "bg-green-500" : "bg-[#3a3a3a]"
                                   }`}
                     >
                            <span
                                   className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md
                                           transition-transform duration-300 ease-in-out
                                           ${isOpen ? "translate-x-10" : "translate-x-0"}`}
                            />
                     </button>

                     {/* LOGO */}
                     <div
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 cursor-pointer"
                     >
                            <img src={logo} className="h-8 w-8" alt="restro logo" />

                            <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
                                   S2S
                            </h1>
                     </div>


                     {/* USER DETAILS */}
                     <div className="flex items-center gap-4">

                            {/* NOTIFICATION */}
                            <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-[#2a2a2a] transition">
                                   <Bell className="text-[#f5f5f5]" size={22} />
                            </div>

                            {/* USER */}
                            <div className="flex items-center gap-3 cursor-pointer">
                                   <UserCircle2 className="text-[#f5f5f5]" size={40} />

                                   <div className="flex flex-col items-start">
                                          <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
                                                 {userData?.name || "TEST USER"}
                                          </h1>

                                          <p className="text-xs text-[#ababab] font-medium">
                                                 {userData?.role || "Role"}
                                          </p>
                                   </div>

                                   {/* LOGOUT */}
                                   <LogOut
                                          onClick={handleLogout}
                                          className="text-[#f5f5f5] ml-2 hover:text-red-400 transition"
                                          size={24}
                                   />
                            </div>
                     </div>
              </nav>
       );
};

export default Header;