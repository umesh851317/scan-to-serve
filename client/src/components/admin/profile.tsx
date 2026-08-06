
import React, { useEffect, useState } from "react";

import {
       User,
       Store,
       Users,
       LogOut,
} from "lucide-react";
import AdminInfo from "../../Ui/profile/AdminInfo";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { usePopup } from "../../context/Popup";
import ResaurentSetting from "../../Ui/profile/ResaurentSetting";
import StaffManagement from "../../Ui/profile/StaffManagement";
const bottomNav = [
       {
              id: 1,
              title: "Profile",
              description: "Manage admin profile",
              icon: <User size={22} />,
       },

       {
              id: 2,
              title: "Restaurant Settings",
              description: "Update restaurant details",
              icon: <Store size={22} />,
       },

       {
              id: 3,
              title: "Staff Management",
              description: "Add/manage staff members",
              icon: <Users size={22} />,
       }
];
const Profile = () => {
       const { authUser } = useAuth();
       const { setPopup, setShowPopUp } = usePopup();
       const [activeTab, setActiveTab] = useState("Profile");
       const [user, setUser] = useState<any>(authUser);

       const handleSave = async (formData: any) => {
              try {
                     const { data } = await axios.patch(
                            `${import.meta.env.VITE_API}/api/user`,
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
                     setUser(data.response);
                     return true
              } catch (error) {
                     setPopup({
                            msg: error,
                            bgColor: "bg-green-500"
                     })
                     setShowPopUp(true)
                     console.error(error);
                     return false
              } finally {
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       };

       return (
              <div className="pb-28 grid py-4 px-4 grid-cols-[23%_76%] grid-rows-1 gap-4 h-full ">
                     {/* LEFT SIDEBAR */}
                     <div className="max-h-full flex flex-col gap-4 ">
                            <div className=" h-full bg-[#262626] rounded-2xl px-4 py-6 overflow-auto flex flex-col">
                                   {/* USER CARD */}
                                   <div className="flex flex-col items-center border-b pb-4 border-[#3a3a3a]">

                                          <div className="h-20 w-20 rounded-full bg-yellow-400 flex items-center justify-center text-black text-3xl font-bold">
                                                 {user?.restaurantName?.charAt(0) || "A"}
                                          </div>

                                          <h1 className="text-[#f5f5f5] text-xl font-semibold mt-2">
                                                 {user.restaurantName || "Admin"}
                                          </h1>

                                          <p className="text-[#ababab] text-sm mt-1">
                                                 {user.email || "feach@gmail.com"}
                                          </p>

                                          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold mt-3">
                                                 {user?.role}
                                          </span>

                                   </div>

                                   {/* bottomNav */}
                                   <div className="mt-4 flex flex-col gap-5">

                                          {bottomNav.map((menu) => {

                                                 return (

                                                        <button
                                                               key={menu.id}
                                                               onClick={() => setActiveTab(menu.title)}
                                                               className={`flex items-center gap-3 px-4 py-4 rounded-xl font-medium transition ${activeTab === menu.title
                                                                      ? "bg-yellow-400 text-black"
                                                                      : "bg-[#1f1f1f] text-[#f5f5f5] hover:bg-[#333333]"
                                                                      }`}
                                                        >

                                                               {menu.icon}

                                                               {menu.title}

                                                        </button>

                                                 );

                                          })}

                                          {/* LOGOUT */}
                                          <button
                                                 className="flex items-center gap-3 px-4 py-4 rounded-xl font-medium bg-red-500 hover:bg-red-600 transition text-white"
                                          >

                                                 <LogOut size={20} />

                                                 Logout

                                          </button>

                                   </div>

                            </div>
                     </div>

                     {/* RIGHT CONTENT */}
                     <div className=" bg-[#262626] rounded-2xl text-white ">
                            {/* PROFILE */}
                            {activeTab == "Profile" && <AdminInfo
                                   userDetails={{ user, setUser, handleSave }} />}

                            {/* RESTAURANT SETTINGS */}
                            {activeTab === "Restaurant Settings" && <ResaurentSetting />}

                            {/* STAFF MANAGEMENT */}
                            {activeTab === "Staff Management" && <StaffManagement />}

                     </div>
              </div>
       );
};

export default Profile;