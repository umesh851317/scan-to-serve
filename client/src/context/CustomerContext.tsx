import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
       const { restaurantId } = useParams();
       const [loading, setLoading] = useState(true);
       const [customerDetails, setCustomerDetails] = useState();
       const [cart, setCart] = useState([])

       const verifyCustomer = async () => {
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/customerMenu/${restaurantId}/verifyCustomer`, {
                            withCredentials: true,
                     })
                     // console.log(data.sessionId);
                     
                     if (data.success) {
                            setCustomerDetails(data.response)  // customer and table details
                     }
              } catch (error) {
                     console.log(error);
              } finally {
                     setLoading(false);
              }
       }

       const increaseQty = (item: any) => {
              setCart((prev: any[]) => {
                     const exists = prev.some(
                            (cartItem) => cartItem._id === item._id
                     );

                     // Item already exists in cart
                     if (exists) {
                            return prev.map((cartItem) =>
                                   cartItem._id === item._id
                                          ? {
                                                 ...cartItem,
                                                 quantity: cartItem.quantity + 1,
                                          }
                                          : cartItem
                            );
                     }

                     // Item does not exist in cart
                     // Add it with qty = 1
                     return [
                            ...prev,
                            {
                                   ...item,
                                   quantity: 1,
                            },
                     ];
              });
       };
       const decreaseQty = (id: string) => {
              setCart((prev: any[]) => {
                     return prev
                            .map((cartItem) =>
                                   cartItem._id === id
                                          ? {
                                                 ...cartItem,
                                                 quantity: cartItem.quantity - 1,
                                          }
                                          : cartItem
                            )
                            .filter((cartItem) => cartItem.quantity > 0); // used for remove to cart if qty is zero
              });
       };
       const totalCartItems = cart.reduce(
              (total, item) => total + item.quantity,
              0
       );
       useEffect(() => {
              verifyCustomer()
       }, [])
       return (
              <CustomerContext.Provider
                     value={{
                            verifyCustomer,
                            customerDetails,
                            loading,
                            cart, setCart,
                            totalCartItems, increaseQty, decreaseQty
                     }}
              >
                     {children}
              </CustomerContext.Provider>
       );
}

export const useCustomerAuth = () => useContext(CustomerContext);     // context provider