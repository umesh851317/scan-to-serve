import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
       const [authUser, setAuthUser] = useState(null);
       const [loading, setLoading] = useState(true);

       const checkAuth = async () => {    // function for get user data 
              try {
                     const { data } = await axios.get(`${import.meta.env.VITE_API}/auth`, {
                            withCredentials: true,
                     });                     
                     setAuthUser(data.response);
              } catch (err) {
                     setAuthUser(null);
              } finally {
                     setLoading(false);
              }
       };

       useEffect(() => {
              checkAuth();
       }, []);

       return (
              <AuthContext.Provider
                     value={{
                            authUser,
                            loading,
                            checkAuth,
                            isAuthenticated: !!authUser,    // double NOT (!!) operator to convert any value into a boolean
                     }}
              >
                     {children}
              </AuthContext.Provider>
       );
}

export const useAuth = () => useContext(AuthContext);