import axios from "axios";
import { useEffect, useState } from "react";
import CustomerHeader from "../../components/customer/CustomerHome/CustomerHeader";
import CustomerMenu from "../../components/customer/CustomerHome/CustomerMenu";
import Cart from "../../components/customer/Cart/Cart";
import { useCustomerAuth } from "../../context/CustomerContext";
import Order from "../../components/customer/Order/Order";
import CustomerPopUp from "../../components/popUpMsg/customerPopUp";
import { usePopup } from "../../context/Popup";

const CustomerHome = () => {
       const { showPopUp } = usePopup();
       const { customerDetails, cart, } = useCustomerAuth()       
       const [menu, setMenu] = useState([])
       const [customerCompo, setCustomerCompo] = useState("order")
       const [activeCategory, setActiveCategory] = useState("All");
       const [allOrders, setAllOrders] = useState([])
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
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/customer/fetchCustomerData/`, {
                            withCredentials: true,
                     })
                     setMenu(data.menuItemes)
              } catch (error) {
                     console.log(error);
              }
       }
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
                     <header className="fixed top-0 left-0 z-50 w-full h-[20%]">
                            <CustomerHeader headerProps={{
                                   setCustomerCompo,
                                   customerCompo,
                                   orderCount: allOrders.length
                            }} />
                     </header>
                     <section className="absolute w-full top-[21%] ">
                            {
                                   customerCompo == "menu" &&
                                   <CustomerMenu menuProps={{ menu, cart, setCustomerCompo, categories, activeCategory, setActiveCategory, filteredFoods }} />
                            }
                            {
                                   customerCompo == "cart" &&
                                   <Cart cartProps={{ setCustomerCompo }} />
                            }
                            {
                                   customerCompo == "order" &&
                                   <Order ordersProps={{ allOrders }} />
                            }
                     </section>
                     {showPopUp && <CustomerPopUp />}
              </main>
       );
}

export default CustomerHome