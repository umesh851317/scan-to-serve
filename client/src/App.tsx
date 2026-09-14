import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import ConfirmTable from "./pages/customer/ConfirmTable";
import CustomerHome from "./pages/customer/CustomerHome";
import ProtectCustomerRoute from "./components/ProtectedRoute/ProtectCustomerRoute";
import { CustomerProvider } from "./context/CustomerContext";

function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" replace />
            ) : (
              <Auth />
            )
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Customer routes */}
        <Route
          path="/confirmTable/:tableId"
          element={<ConfirmTable />}
        />

        <Route
          path="/customerMenu/:restaurantId"
          element={
            <CustomerProvider>
              <ProtectCustomerRoute>      {/* Protected routes for customer */}
                <CustomerHome />
              </ProtectCustomerRoute>
            </CustomerProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;