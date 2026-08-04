import { useEffect, useState } from "react";

import {
       Home,
       ClipboardList,
       Table2,
} from "lucide-react";

const Footer = ({ homeCompo }) => {
       return (
              <div
                     className={`h-full bg-[#262626] p-2 flex justify-around items-center transition-all duration-500 z-50 bottom-0 opacity-100`}>
                     {/* DASHBOARD */}
                     <button onClick={() => homeCompo.setAdminCompo("Dashboard")}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full ${homeCompo.adminCompo === "Dashboard" ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"}`}
                     >
                            <Home className="mr-2" size={20} />
                            <p>Dashboard</p>
                     </button>

                     {/* ORDERS */}
                     <button
                            onClick={() => homeCompo.setAdminCompo("Orders")}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full ${homeCompo.adminCompo === "Orders"
                                   ? "text-[#f5f5f5] bg-[#343434]"
                                   : "text-[#ababab]"
                                   }`}
                     >
                            <ClipboardList className="mr-2" size={20} />
                            <p>Orders</p>
                     </button>

                     {/* ORDERS */}
                     <button
                            onClick={() => homeCompo.setAdminCompo("Menu")}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full ${homeCompo.adminCompo === "Orders"
                                   ? "text-[#f5f5f5] bg-[#343434]"
                                   : "text-[#ababab]"
                                   }`}
                     >
                            <ClipboardList className="mr-2" size={20} />
                            <p>Menu</p>
                     </button>

                     {/* TABLES */}
                     <button
                            onClick={() => homeCompo.setAdminCompo("Tables")}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full ${homeCompo.adminCompo === "Tables"
                                   ? "text-[#f5f5f5] bg-[#343434]"
                                   : "text-[#ababab]"
                                   }`}
                     >
                            <Table2 className="mr-2" size={20} />
                            <p>Tables</p>
                     </button>

                     {/* Profile */}
                     <button
                            onClick={() => homeCompo.setAdminCompo("Profile")}
                            className={`flex items-center justify-center font-bold w-75 rounded-[20px] h-full ${homeCompo.adminCompo === "More"
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