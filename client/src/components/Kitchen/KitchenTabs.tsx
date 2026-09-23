import React from "react";
import {
       CheckCircle,
       ChefHat,
       Clock,
       PackageCheck,
} from "lucide-react";

const KitchenTabs = ({ KitchenTabsProps }) => {
       const { activeTab, setActiveTab, getCount } = KitchenTabsProps
       const tabs = [
              {
                     id: "all",
                     label: "All Orders",
                     icon: PackageCheck,
              },
              {
                     id: "Pending",
                     label: "Pending",
                     icon: Clock,
              },
              {
                     id: "Preparing",
                     label: "Preparing",
                     icon: ChefHat,
              },
              {
                     id: "Ready",
                     label: "Ready",
                     icon: CheckCircle,
              },
       ];

       return (
              <div className="my-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                     {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                   <button key={tab.id}
                                          onClick={() => setActiveTab(tab.id)}
                                          className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${isActive
                                                 ? "border-orange-500 bg-orange-500 text-white shadow-md"
                                                 : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                                                 }`}
                                   >
                                          <div className="flex items-center gap-3">
                                                 <Icon size={19} />

                                                 <span className="text-sm font-medium">
                                                        {tab.label}
                                                 </span>
                                          </div>

                                          <span
                                                 className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isActive
                                                        ? "bg-white/20 text-white"
                                                        : "bg-gray-100 text-gray-700"
                                                        }`}
                                          >
                                                 {getCount(tab.id)}
                                          </span>
                                   </button>
                            );
                     })}
              </div>
       );
};

export default KitchenTabs;