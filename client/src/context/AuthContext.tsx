import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
       const [user, setUser] = useState(null);
       const [loading, setLoading] = useState(true);

       const checkAuth = async () => {    // function for get user data 
              try {
                     const { data } = await axios.get("http://localhost:8000/auth", {
                            withCredentials: true,
                     });
                     setUser(data.response);
              } catch (err) {
                     setUser(null);
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
                            user,
                            loading,
                            checkAuth,
                            isAuthenticated: !!user,    // double NOT (!!) operator to convert any value into a boolean
                     }}
              >
                     {children}
              </AuthContext.Provider>
       );
}

export const useAuth = () => useContext(AuthContext);