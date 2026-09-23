import React from "react";
import { PackageOpen } from "lucide-react";

const EmptyOrders = ({ activeTab }) => {
       const getMessage = () => {
              if (activeTab === "all") {
                     return "There are no orders right now.";
              }

              return `There are no ${activeTab} orders right now.`;
       };

       return (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
                     <div className="text-center">

                            <PackageOpen
                                   size={48}
                                   className="mx-auto mb-3 text-gray-300"
                            />

                            <h3 className="font-semibold text-gray-700">
                                   No Orders Found
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                   {getMessage()}
                            </p>

                     </div>
              </div>
       );
};

export default EmptyOrders;