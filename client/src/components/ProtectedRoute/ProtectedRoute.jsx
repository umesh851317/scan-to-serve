import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
       const { authUser, loading } = useAuth();

       if (loading) {
              return <h1>Loading...</h1>;
       }

       if (!authUser) {
              return <Navigate to="/auth" replace />;
       }

       return children;
};

export default ProtectedRoute;