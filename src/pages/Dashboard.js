import Card from "../components/dashboard/Card";
import Chart from "../components/dashboard/Chart";
import ActivityTable from "../components/dashboard/ActivityTable";
import AlertBox from "../components/dashboard/AlertBox";
import { useInventory } from "../context/InventoryContext";
import { stockStatus } from "../data/mockData";

export default function Dashboard() {
  const { products, operations } = useInventory();

  const totalProducts = products.length;
  const lowOrOut = products.filter((p) => stockStatus(p) !== "ok").length;
  const pendingReceipts = operations.filter(
    (o) => o.type === "Receipt" && o.status !== "Done" && o.status !== "Canceled"
  ).length;
  const pendingDeliveries = operations.filter(
    (o) => o.type === "Delivery" && o.status !== "Done" && o.status !== "Canceled"
  ).length;
  const scheduledTransfers = operations.filter(
    (o) => o.type === "Internal" && o.status !== "Done" && o.status !== "Canceled"
  ).length;

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Inventory overview</h1>
          <p>A snapshot of stock levels and open operations across all warehouses.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <Card label="Total products in stock" value={totalProducts} />
        <Card
          label="Low / out of stock"
          value={lowOrOut}
          tone={lowOrOut > 0 ? "warn" : ""}
        />
        <Card label="Pending receipts" value={pendingReceipts} />
        <Card label="Pending deliveries" value={pendingDeliveries} />
        <Card label="Internal transfers scheduled" value={scheduledTransfers} />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel__head">
            <h2>Stock movement, last 7 days</h2>
          </div>
          <Chart />
        </div>

        <div className="panel">
          <div className="panel__head">
            <h2>Stock alerts</h2>
          </div>
          <AlertBox />
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2>Recent operations</h2>
        </div>
        <ActivityTable limit={6} />
      </div>
    </div>
  );
}
debug