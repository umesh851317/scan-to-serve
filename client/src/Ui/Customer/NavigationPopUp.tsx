
import { useEffect, useState } from "react";
import {
       X,
       Utensils,
       ShoppingCart,
       ClipboardList,
       CreditCard,
       LogOut,
} from "lucide-react";

const NavigationPopUp = ({ navigationProps }) => {
       const {
              setIsOpenNavigation,
              setCustomerCompo,
              onEndSession
       } = navigationProps;

       const [isVisible, setIsVisible] = useState(false);

       useEffect(() => {
              const timer = setTimeout(() => {
                     setIsVisible(true);
              }, 20);

              return () => clearTimeout(timer);
       }, []);

       const closeNavigation = () => {
              setIsVisible(false);

              // Wait for the slide-out animation before unmounting.
              setTimeout(() => {
                     setIsOpenNavigation(false);
              }, 500);
       };

       const handleNavigation = (component) => {
              setCustomerCompo(component);
              closeNavigation();
       };

       const menuItems = [
              {
                     label: "Menu",
                     icon: Utensils,
                     component: "menu",
              },
              {
                     label: "Cart",
                     icon: ShoppingCart,
                     component: "cart",
              },
              {
                     label: "My Orders",
                     icon: ClipboardList,
                     component: "order",
              },
              {
                     label: "Bills & Payment",
                     icon: CreditCard,
                     component: "payment",
              },
       ];

       return (
              <div className="fixed inset-0 z-50">
                     {/* Background overlay */}
                     <div onClick={closeNavigation}
                            className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
                     />
                     {/* Side drawer */}
                     <div className={`absolute right-0 top-0 flex h-dvh w-3/4 flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-500 ease-in-out sm:w-1/3 ${isVisible ? "translate-x-0" : "translate-x-full"}`}>
                            {/* Header */}
                            <div className="flex items-center justify-between border-b px-3 py-3">
                                   <div>
                                          <h2 className="text-xl font-bold text-gray-800">
                                                 Quick Menu
                                          </h2>
                                          <p className="mt-1 text-sm text-gray-500">
                                                 Navigate your dining experience
                                          </p>
                                   </div>

                                   <button
                                          onClick={closeNavigation}
                                          aria-label="Close navigation"
                                          className="rounded-full p-2 transition-colors hover:bg-gray-100"
                                   >
                                          <X size={23} />
                                   </button>
                            </div>

                            {/* Navigation items */}
                            <div className="flex-1 space-y-2 overflow-y-auto p-3">
                                   {menuItems.map(({ label, icon: Icon, component }) => (
                                          <button
                                                 key={component}
                                                 onClick={() => handleNavigation(component)}
                                                 className="flex w-full items-center gap-4 rounded-xl text-left text-gray-700 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
                                          >
                                                 <Icon size={21} className="shrink-0" />

                                                 <span className="font-medium">{label}</span>
                                          </button>
                                   ))}
                            </div>

                            {/* Fixed bottom action */}
                            <div className="border-t bg-white p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                                   <button onClick={() => { onEndSession(); }}
                                          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-4 font-semibold text-white transition-colors duration-200 hover:bg-red-700 active:bg-red-800"
                                   >
                                          <LogOut size={20} />
                                          <span>End Session</span>
                                   </button>
                            </div>
                     </div>
              </div>
       );
};

export default NavigationPopUp;
