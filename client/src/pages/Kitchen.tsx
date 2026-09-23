import { useEffect, useMemo, useState } from 'react'
import Header from '../components/shared/headers'
import axios from 'axios';
import KitchenTabs from '../components/Kitchen/KitchenTabs';
import KitchenOrderCard from '../components/Kitchen/KitchenOrderCard';
import EmptyOrders from '../components/Kitchen/EmptyOrders';
import PopUpMsg from '../components/popUpMsg/PopUpMsg';
import { usePopup } from '../context/Popup';

const Kitchen = () => {
       const { showPopUp, setPopup, setShowPopUp } = usePopup();
       const [loadingOrderId, setLoadingOrderId] = useState(null);
       const [loading, setLoading] = useState(false)
       const [activeTab, setActiveTab] = useState("all");
       const [currentTime, setCurrentTime] = useState(new Date());
       const [orders, setOrders] = useState([])

       const GetAllOrders = async () => {
              try {
                     const { data } = await axios.get(
                            `${import.meta.env.VITE_API}/api/kitchen`,
                            {
                                   withCredentials: true,
                            }
                     )
                     setOrders(data.AllOrders);
              } catch (error) {
                     console.log(error);
              } finally {
                     setLoading(false)
              }
       }

       const filteredOrders = useMemo(() => {
              if (activeTab === "all") return orders;

              return orders.filter((order) => order.status === activeTab);
       }, [orders, activeTab]);

       const getCount = (status: any) => {
              if (status === "all") {
                     return orders.length;
              }
              return orders.filter(
                     (order) => order.status === status
              ).length;
       };

       const getTimeAgo = (createdAt: any) => {
              const created = new Date(createdAt);
              const difference = Math.floor(
                     (currentTime.getTime() - created.getTime()) / 1000
              );
              if (difference < 60) {
                     return "Just now";
              }
              const minutes = Math.floor(difference / 60);
              if (minutes < 60) {
                     return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
              }
              const hours = Math.floor(minutes / 60);
              return `${hours} hr${hours > 1 ? "s" : ""} ago`;
       };

       const updateStatus = async (OrderId: any, newStatus: any) => {
              try {
                     setLoadingOrderId(OrderId);
                     const { data } = await axios.patch(`${import.meta.env.VITE_API}/api/kitchen/${OrderId}`, {},
                            {
                                   withCredentials: true,
                            }
                     )
                     if (data.success) {
                            setOrders((prevOrders) =>
                                   prevOrders.map((order) =>
                                          order._id === OrderId
                                                 ? {
                                                        ...order,
                                                        status: newStatus,
                                                 }
                                                 : order
                                   )
                            );
                     } else {
                            setShowPopUp(true)
                            setPopup({
                                   msg: data.message,
                                   bgColor: data.success ? ("bg-green-500") : ("bg-red-500")
                            })
                     }
              } catch (error) {
                     console.log(error);
              } finally {
                     setLoadingOrderId(null);
                     setTimeout(() => {
                            setPopup({
                                   msg: "",
                                   bgColor: ""
                            })
                            setShowPopUp(false)
                     }, 2500)
              }
       };

       useEffect(() => {
              GetAllOrders()
       }, [])
       return (
              <main className="relative h-screen overflow-hidden">

                     {/* Header */}
                     <header className="fixed left-0 top-0 z-50 h-[8vh] w-full">
                            <Header />
                     </header>

                     {/* Kitchen Area */}
                     <section className="fixed left-0 top-[8vh] flex h-[92vh] w-full flex-col px-4">
                            {/* Tabs - Fixed */}
                            <div className="shrink-0 py-2">
                                   <KitchenTabs
                                          KitchenTabsProps={{
                                                 activeTab,
                                                 setActiveTab,
                                                 getCount,
                                          }}
                                   />
                            </div>
                            {/* Orders - Scrollable */}
                            <div className="min-h-0 flex-1 overflow-y-auto pb-6">

                                   {
                                          filteredOrders.length === 0 ? (
                                                 <EmptyOrders activeTab={activeTab} />
                                          ) : (
                                                 <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                                        {filteredOrders.map((order) => (
                                                               <KitchenOrderCard
                                                                      key={order._id}
                                                                      OrderCardProps={{
                                                                             order,
                                                                             getTimeAgo,
                                                                             updateStatus,
                                                                             loading: loadingOrderId === order._id
                                                                      }}
                                                               />
                                                        ))}
                                                 </div>
                                          )
                                   }

                            </div>
                     </section>

                     {showPopUp && <PopUpMsg />}
              </main>
       )
}

export default Kitchen
