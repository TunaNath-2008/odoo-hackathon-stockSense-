import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
      <div className="relative w-96">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-2xl text-gray-600 hover:text-blue-600">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-blue-600" />
          <div>
            <h2 className="font-semibold">Admin</h2>
            <p className="text-sm text-gray-500">
              Inventory Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;