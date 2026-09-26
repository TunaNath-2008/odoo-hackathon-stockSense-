import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBoxOpen,
  FaWarehouse,
  FaMapMarkedAlt,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaChartPie />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <FaBoxOpen />,
  },
  {
    name: "Warehouses",
    path: "/warehouses",
    icon: <FaWarehouse />,
  },
  {
    name: "Warehouse Map",
    path: "/warehouse-map",
    icon: <FaMapMarkedAlt />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          StockSense
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Inventory Intelligence
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 mx-3 my-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">
          StockSense v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;