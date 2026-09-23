import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
       const { authUser, loading } = useAuth();
       if (loading) {
              return (
                     <div className="flex h-screen items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                     </div>);
       }

       if (!authUser) {
              return <Navigate to="/auth" replace />;
       }

       if (!allowedRoles.includes(authUser.role)) {
              return <Navigate to="/" replace />;
       }
       return children;
};

export default ProtectedRoute;