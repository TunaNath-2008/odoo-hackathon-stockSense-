import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Warehouses from "./pages/Warehouses";
import WarehouseDetails from "./pages/WarehouseDetails";
import WarehouseMap from "./pages/WarehouseMap";
import Receipts from "./pages/Receipts";
import DeliveryOrders from "./pages/DeliveryOrders";
import Adjustments from "./pages/Adjustments";
import MoveHistory from "./pages/MoveHistory";
import Profile from "./pages/Profile";
import { useInventory } from "./context/InventoryContext";

function RequireAuth({ children }) {
  const { isAuthenticated } = useInventory();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="warehouses" element={<Warehouses />} />
        <Route path="warehouses/:warehouseId" element={<WarehouseDetails />} />
        <Route path="warehouses/:warehouseId/map" element={<WarehouseMap />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="deliveries" element={<DeliveryOrders />} />
        <Route path="adjustments" element={<Adjustments />} />
        <Route path="move-history" element={<MoveHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}