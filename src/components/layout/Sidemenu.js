import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  User,
  LogOut,
  PackagePlus,
  Truck,
  ArrowLeftRight,
  History,
} from "lucide-react";
import { useInventory } from "../../context/InventoryContext";

const linkClass = ({ isActive }) => "sidemenu__link" + (isActive ? " active" : "");

export default function SideMenu() {
  const { logout } = useInventory();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="sidemenu" aria-label="Primary">
      <div className="sidemenu__brand">
        <span className="sidemenu__brand-mark" aria-hidden="true" />
        <span>StockSense</span>
      </div>

      <div className="sidemenu__section-label">Operations</div>
      <NavLink to="/dashboard" className={linkClass}>
        <LayoutDashboard size={16} strokeWidth={1.75} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/products" className={linkClass}>
        <Package size={16} strokeWidth={1.75} />
        <span>Products</span>
      </NavLink>
      <NavLink to="/receipts" className={linkClass}>
        <PackagePlus size={16} strokeWidth={1.75} />
        <span>Receipts</span>
      </NavLink>
      <NavLink to="/deliveries" className={linkClass}>
        <Truck size={16} strokeWidth={1.75} />
        <span>Delivery Orders</span>
      </NavLink>
      <NavLink to="/adjustments" className={linkClass}>
        <ArrowLeftRight size={16} strokeWidth={1.75} />
        <span>Adjustments</span>
      </NavLink>
      <NavLink to="/move-history" className={linkClass}>
        <History size={16} strokeWidth={1.75} />
        <span>Move History</span>
      </NavLink>

      <div className="sidemenu__section-label">Settings</div>
      <NavLink to="/warehouses" className={linkClass}>
        <Warehouse size={16} strokeWidth={1.75} />
        <span>Warehouses</span>
      </NavLink>

      <div className="sidemenu__footer">
        <NavLink to="/profile" className={linkClass} style={{ width: "100%" }}>
          <User size={16} strokeWidth={1.75} />
          <span>My Profile</span>
        </NavLink>
        <button
          className="sidemenu__link"
          style={{ width: "100%", border: "none", background: "none" }}
          onClick={handleLogout}
        >
          <LogOut size={16} strokeWidth={1.75} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}