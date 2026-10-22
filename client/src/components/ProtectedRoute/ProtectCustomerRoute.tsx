import axios from "axios";
import { useCustomerAuth } from "../../context/CustomerContext";
import { Loader } from "lucide-react";

const ProtectCustomerRoute = ({ children }) => {
       const { customerDetails, loading, sessionActive } = useCustomerAuth();
       const handleEndSession = async () => {
              try {
                     await axios.post(
                            `${import.meta.env.VITE_API}/customer/fetchCustomerData/clearSession`, {},
                            { withCredentials: true }
                     );
              } catch (error) {
                     console.log("error:", error)
              } finally {
                     // setLoading(false)
              }
       };
       if (loading) {
              return (
                     <div className=" h-full flex items-center justify-center">
                            <Loader className="animate-spin"></Loader>
                     </div>
              );
       }
       if (!sessionActive) {
              return (
                     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
                                   <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                                          <span className="text-3xl">⏳</span>
                                   </div>

                                   <h1 className="mb-3 text-2xl font-bold text-gray-900">
                                          Session Ended
                                   </h1>

                                   <p className="mb-6 text-sm leading-6 text-gray-500">
                                          This table session is no longer active. Please scan the table QR
                                          code again or ask the restaurant staff for assistance.
                                   </p>

                                   <button
                                          onClick={() => window.location.reload()}
                                          className="w-full rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
                                   >
                                          Try Again
                                   </button>
                            </div>
                     </div>
              );
       }

       if (!customerDetails) {
              return (
                     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
                                   <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                          <span className="text-3xl">!</span>
                                   </div>

                                   <h1 className="mb-3 text-2xl font-bold text-gray-900">
                                          Customer Details Missing
                                   </h1>

                                   <p className="mb-6 text-sm leading-6 text-gray-500">
                                          We couldn't find your customer information. Please scan the table
                                          QR code again and enter your details to continue.
                                   </p>

                                   <button
                                          onClick={() => { handleEndSession() }}
                                          className="w-full rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
                                   >
                                          Try Again
                                   </button>
                            </div>
                     </div>
              );
       }
       return children;
}

export default ProtectCustomerRoute
