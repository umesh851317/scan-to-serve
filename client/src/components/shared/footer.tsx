import { useEffect, useState } from "react";

import {
       Home,
       ClipboardList,
       Table2,
} from "lucide-react";

const Footer = ({ homeCompo }) => {
       const { adminCompo, setAdminCompo } = homeCompo
       return (
              <div
                     className={`h-full bg-[#262626] p-2 flex justify-around items-center transition-all duration-500 z-50 bottom-0 opacity-100`}>
                     {/* DASHBOARD */}
                     <button onClick={() => {
                            setAdminCompo("Dashboard")
                            sessionStorage.setItem("adminCompo", "Dashboard")
                     }
                     }
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full 
                     ${adminCompo === "Dashboard" ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"}`}
                     >
                            <Home className="mr-2" size={20} />
                            <p>Dashboard</p>
                     </button>

                     {/* ORDERS */}
                     <button
                            onClick={() => {
                                   setAdminCompo("Orders")
                                   sessionStorage.setItem("adminCompo", "Orders")
                            }}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full 
                                   ${adminCompo === "Orders"
                                          ? "text-[#f5f5f5] bg-[#343434]"
                                          : "text-[#ababab]"
                                   }`}
                     >
                            <ClipboardList className="mr-2" size={20} />
                            <p>Orders</p>
                     </button>

                     {/* ORDERS */}
                     <button
                            onClick={() => {
                                   setAdminCompo("Menu")
                                   sessionStorage.setItem("adminCompo", "Menu")
                            }}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full 
                                   ${adminCompo === "Orders"
                                          ? "text-[#f5f5f5] bg-[#343434]"
                                          : "text-[#ababab]"
                                   }`}
                     >
                            <ClipboardList className="mr-2" size={20} />
                            <p>Menu</p>
                     </button>

                     {/* TABLES */}
                     <button
                            onClick={() => {
                                   setAdminCompo("Tables")
                                   sessionStorage.setItem("adminCompo", "Tables")
                            }}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full 
                                   ${adminCompo === "Tables"
                                          ? "text-[#f5f5f5] bg-[#343434]"
                                          : "text-[#ababab]"
                                   }`}
                     >
                            <Table2 className="mr-2" size={20} />
                            <p>Tables</p>
                     </button>

                     {/* Profile */}
                     <button
                            onClick={() => {
                                   setAdminCompo("Profile")
                                   sessionStorage.setItem("adminCompo", "Profile")
                            }}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full 
                                   ${adminCompo === "More"
                                          ? "text-[#f5f5f5] bg-[#343434]"
                                          : "text-[#ababab]"
                                   }`}
                     >
                            <p>Profile</p>
                     </button>

                     {/* CENTER BUTTON */}
                     {/* <button className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 flex items-center justify-center shadow-lg hover:bg-yellow-600 transition">
        <UtensilsCrossed size={32} />
      </button> */}

              </div>
       );
};

export default Footer;