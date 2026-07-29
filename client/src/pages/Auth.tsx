import { useState } from "react";
import logo from "../assets/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

export default function Auth() {
       const [isRegister, setIsRegister] = useState(false);
       const [isAuth, setIsAuth] = useState(false);

       return (
              <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
                     <div className="w-full max-w-md bg-[#1d1d1d] rounded-2xl shadow-2xl border border-gray-800 p-8">

                            {/* Logo */}
                            <div className="flex flex-col items-center mb-5">
                                   <img
                                          src={logo}
                                          alt="S2S Logo"
                                          className="w-16 h-16 rounded-full border-2 border-yellow-400 p-2"
                                   />

                                   {
                                          !isRegister && (
                                                 <>
                                                        <h1 className="text-2xl font-bold text-white mt-3">
                                                               Scan To Serve
                                                        </h1>

                                                        <p className="text-sm text-gray-400 mt-1">
                                                               Restaurant Management System
                                                        </p>
                                                 </>
                                          )
                                   }
                            </div>

                            {/* Heading */}
                            <h2 className="text-center text-3xl font-bold text-yellow-400 mb-5">
                                   {isRegister ? "Restaurant Registration" : "Employee Login"}
                            </h2>

                            {/* Form */}
                            {isRegister ? (
                                   <Register
                                          setIsRegister={setIsRegister}
                                   />
                            ) : (
                                   <Login setIsAuth={setIsAuth} />
                            )}

                            {/* Toggle */}
                            <div className="text-center mt-5">
                                   <p className="text-gray-400">
                                          {isRegister
                                                 ? "Already have an account?"
                                                 : "Don't have an account?"}

                                          <button
                                                 onClick={() => setIsRegister(!isRegister)}
                                                 className="ml-2 text-yellow-400 font-semibold hover:text-yellow-300 transition"
                                          >
                                                 {isRegister ? "Sign In" : "Sign Up"}
                                          </button>
                                   </p>
                            </div>
                     </div>
              </div>
       );
}