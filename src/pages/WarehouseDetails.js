import { Link, useParams } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import ActivityTable from "../components/dashboard/ActivityTable";

export default function WarehouseDetails() {
  const { warehouseId } = useParams();
  const { warehouses, products } = useInventory();
  const warehouse = warehouses.find((w) => w.id === warehouseId);

  if (!warehouse) {
    return (
      <div className="empty-state">
        Warehouse not found. <Link to="/warehouses">Back to warehouses</Link>
      </div>
    );
  }

  const stockHere = products
    .map((p) => ({ ...p, qty: p.stockByLocation[warehouseId] || 0 }))
    .filter((p) => p.qty > 0);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{warehouse.name}</h1>
          <p>
            {warehouse.location} · {warehouse.racks} racks
          </p>
        </div>
        <Link to={`/warehouses/${warehouseId}/map`} className="ui-btn secondary">
          View rack map
        </Link>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2>Products stored here</h2>
        </div>
        {stockHere.length === 0 ? (
          <div className="empty-state">No stock currently held at this warehouse.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stockHere.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={`/products/${p.id}`}>{p.name}</Link>
                  </td>
                  <td className="mono">{p.sku}</td>
                  <td className="mono">
                    {p.qty} {p.uom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2>Operations at this warehouse</h2>
        </div>
        <ActivityTable limit={8} warehouseId={warehouseId} />
      </div>
    </div>
  );
}