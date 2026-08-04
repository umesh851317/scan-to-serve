import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";

import {
       Bell,
       UserCircle2,
       LogOut,
} from "lucide-react";
import { usePopup } from "../../context/Popup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
       const { checkAuth } = useAuth();
       const { setPopup, setShowPopUp } = usePopup();
       const navigate = useNavigate();

       // TEMP USER DATA
       const userData = {
              name: "Umesh",
              role: "Admin",
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
                     },1000)
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
       return (
              <nav className=" h-full flex justify-between items-center py-4 px-6 bg-[#1a1a1a]">
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

                     {/* SEARCH */}
                     {/* <div className="flex items-center gap-4 bg-[#424242] rounded-[15px] px-5 py-2 w-[600px]">
        <Search className="text-[#f5f5f5]" size={20} />

        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-[#f5f5f5] w-full"
        />
      </div> */}

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