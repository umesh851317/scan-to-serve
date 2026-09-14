import axios from "axios";
import { ArrowRight, Bell, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerHeader from "../../components/customer/CustomerHome/CustomerHeader";
import CustomerMenu from "../../components/customer/CustomerHome/CustomerMenu";
import Cart from "../../components/customer/Cart/Cart";
import { useCustomerAuth } from "../../context/CustomerContext";
import Order from "../../components/customer/Order/Order";
const categories = [
       "All",
       "Main Course",
       "Appetizer",
       "Dessert",
       "Drinks",
];
const CustomerHome = () => {
       const { customerDetails, totalCartItems, cart, setCart } = useCustomerAuth()
       const { restaurantId } = useParams();
       const [menu, setMenu] = useState([])
       const [customerCompo, setCustomerCompo] = useState("order")
       const [activeCategory, setActiveCategory] = useState("All");
       const [allOrders, setAllOrders] = useState([])
       const GetAllSessionOrders = async () => {
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/customerMenu/${restaurantId}/Order/${customerDetails.sessionId}`, {
                            withCredentials: true,
                     })
                     setAllOrders(data.orders.customerSummary)
              } catch (error) {
                     console.log(error);
              }
       }
       const getMenu = async () => {
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/customerMenu/${restaurantId}`, {
                            withCredentials: true,
                     })
                     setMenu(data.menuItemes)
                     // console.log(data.menuItemes)
              } catch (error) {
                     console.log(error);
              }
       }
       useEffect(() => {
              getMenu();
              GetAllSessionOrders();
       }, [])

       const increase = (id: string) => {
              setCart((prev: any[]) => {
                     return prev.map((item) =>
                            item._id === id
                                   ? { ...item, quantity: item.quantity + 1 }
                                   : item
                     );
              });
       };

       const decrease = (id: string) => {
              setCart((prev: any[]) => {
                     return prev
                            .map((item) =>
                                   item._id === id
                                          ? { ...item, quantity: item.quantity - 1 }
                                          : item
                            )
                            .filter((item) => item.quantity > 0);
              });
       };

       // const filteredFoods =
       //        activeCategory === "All"
       //               ? menu
       //               : menu.filter((food) => food.category === activeCategory);
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
                                   <CustomerMenu menuProps={{ menu, cart, increase, decrease, setCustomerCompo }} />
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
              </main>
       );
}

export default CustomerHome