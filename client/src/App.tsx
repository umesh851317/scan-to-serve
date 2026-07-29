import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="h-screen w-screen bg-gray-100 overflow-y-auto hide-scrollbar">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" replace />  // here replace used for remove /auth with /admin
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
        {/* <Route path="/customer/*" element={<Customer />} /> */}
      </Routes>
    </main>
  );
}

export default App;