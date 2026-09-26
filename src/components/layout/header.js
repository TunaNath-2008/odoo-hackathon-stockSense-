import { useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { useInventory } from "../../context/InventoryContext";

const TITLES = {
  dashboard: "Dashboard",
  products: "Products",
  warehouses: "Warehouses",
  receipts: "Receipts",
  deliveries: "Delivery Orders",
  adjustments: "Adjustments",
  "move-history": "Move History",
  profile: "My Profile",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useInventory();

  const segment = location.pathname.split("/").filter(Boolean)[0] || "dashboard";
  const title = TITLES[segment] || "StockSense";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header__title">{title}</div>
      <div className="header__meta">
        <Bell size={17} strokeWidth={1.75} aria-hidden="true" />
        <span>{currentUser?.name || "Guest"}</span>
        <button
          className="ui-btn ghost"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={15} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}