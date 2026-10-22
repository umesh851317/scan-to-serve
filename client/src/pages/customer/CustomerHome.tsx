import axios from "axios";
import { useEffect, useState } from "react";
import CustomerHeader from "../../components/customer/CustomerHome/CustomerHeader";
import CustomerMenu from "../../components/customer/CustomerHome/CustomerMenu";
import Cart from "../../components/customer/Cart/Cart";
import { useCustomerAuth } from "../../context/CustomerContext";
import Order from "../../components/customer/Order/Order";
import CustomerPopUp from "../../components/popUpMsg/customerPopUp";
import { usePopup } from "../../context/Popup";
import NavigationPopUp from "../../Ui/Customer/NavigationPopUp";
import CustomerBill from "../../components/customer/payment/Customerbill";

const CustomerHome = () => {
       const { showPopUp } = usePopup();
       const { customerDetails, cart } = useCustomerAuth()
       const { setPopup, setShowPopUp } = usePopup();
       const [menu, setMenu] = useState([])
       const [customerCompo, setCustomerCompo] = useState("menu")
       const [activeCategory, setActiveCategory] = useState("All");
       const [allOrders, setAllOrders] = useState([])
       const [isOpenNavigation, setIsOpenNavigation] = useState(false);
       const [loading, setLoading] = useState(false)
       const activeOrders = allOrders.filter(
              (order) => order.status !== "Cancel"
       );
       const GetAllSessionOrders = async () => {
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/customer/Order/${customerDetails.sessionId}`, {
                            withCredentials: true,
                     })
                     setAllOrders(data.orders)
              } catch (error) {
                     console.log(error);
              }
       }
       const getMenu = async () => {
              try {
                     setLoading(true)
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/customer/fetchCustomerData/`, {
                            withCredentials: true,
                     })
                     setMenu(data.menuItemes)
              } catch (error) {
                     console.log(error);
              } finally {
                     setLoading(false)
              }
       }
       const handleEndSession = async () => {
              try {
                     const { data } = await axios.post(
                            `${import.meta.env.VITE_API}/customer/fetchCustomerData/endSession`, {},
                            { withCredentials: true }
                     );
                     if (data.success) {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                     } else {
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                            setShowPopUp(true)
                     }
              } catch (error) {
                     console.log("error:", error)
              } finally {
                     setIsOpenNavigation(false)
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
                     setLoading(false)
              }

       };
       useEffect(() => {
              getMenu();
              GetAllSessionOrders();
       }, [])
       const categories = ["All", ...new Set(menu.map(item => item.category))];
       const filteredFoods =
              activeCategory === "All"
                     ? menu
                     : menu.filter((food) => food.category === activeCategory);
       return (
              <main className="min-h-full w-full">
                     {/* Header */}
                     <header className="fixed top-0 left-0 z-50 w-full h-[8.9%]">
                            <CustomerHeader headerProps={{
                                   setIsOpenNavigation,
                                   setCustomerCompo,
                                   customerCompo,
                                   orderCount: allOrders.length
                            }} />
                     </header>
                     <section className="absolute h-fit w-full top-[8.9%] ">
                            {
                                   customerCompo == "menu" &&
                                   <CustomerMenu menuProps={{ menu, cart, setCustomerCompo, categories, activeCategory, setActiveCategory, filteredFoods,loading }} />
                            }
                            {
                                   customerCompo == "cart" &&
                                   <Cart cartProps={{ setCustomerCompo }} />
                            }
                            {
                                   customerCompo == "order" &&
                                   <Order ordersProps={{ allOrders }} />
                            }
                            {
                                   customerCompo == "payment" &&
                                   <CustomerBill CustomerBillProps={{
                                          orders: activeOrders, setCustomerCompo,
                                   }} />
                            }
                     </section>
                     {showPopUp && <CustomerPopUp />}
                     {isOpenNavigation &&
                            <NavigationPopUp
                                   navigationProps={{
                                          isOpenNavigation,
                                          setIsOpenNavigation,
                                          setCustomerCompo,
                                          onEndSession: handleEndSession,
                                   }} />
                     }
              </main>
       );
}

export default CustomerHome