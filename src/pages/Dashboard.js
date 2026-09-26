import Layout from "../components/layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Inventory Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome to StockSense
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Products</p>
            <h2 className="text-4xl font-bold mt-2">1,248</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Warehouses</p>
            <h2 className="text-4xl font-bold mt-2">18</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Low Stock</p>
            <h2 className="text-4xl font-bold mt-2 text-red-500">37</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Orders Today</p>
            <h2 className="text-4xl font-bold mt-2 text-green-600">216</h2>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;