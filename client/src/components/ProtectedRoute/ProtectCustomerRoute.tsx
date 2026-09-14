import { useCustomerAuth } from "../../context/CustomerContext";

const ProtectCustomerRoute = ({ children }) => {
       const { customerDetails, loading } = useCustomerAuth();

       if (loading) {
              return (
                     <div className="flex h-screen items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                     </div>);
       }

       if (!customerDetails) {
              return <h1>customer details is not recieve</h1>
       }
       return children;
}

export default ProtectCustomerRoute
