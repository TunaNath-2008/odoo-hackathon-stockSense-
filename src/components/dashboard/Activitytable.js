import { useInventory } from "../../context/InventoryContext";

function StatusBadge({ status }) {
  return <span className={`badge ${status.toLowerCase()}`}>{status}</span>;
}

export default function ActivityTable({ limit = 6, warehouseId }) {
  const { operations, products, warehouses, validateOperation } = useInventory();

  const rows = operations
    .filter((op) => !warehouseId || op.warehouse === warehouseId)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);

  function productNames(op) {
    return op.lines
      .map((line) => products.find((p) => p.id === line.productId)?.name || "—")
      .join(", ");
  }

  function warehouseName(id) {
    return warehouses.find((w) => w.id === id)?.name || id;
  }

  if (rows.length === 0) {
    return <div className="empty-state">No operations recorded yet.</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Reference</th>
          <th>Type</th>
          <th>Warehouse</th>
          <th>Products</th>
          <th>Status</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((op) => (
          <tr key={op.id}>
            <td className="mono">{op.id}</td>
            <td>{op.type}</td>
            <td>{warehouseName(op.warehouse)}</td>
            <td>{productNames(op)}</td>
            <td>
              <StatusBadge status={op.status} />
            </td>
            <td>{op.date}</td>
            <td>
              {op.status !== "Done" && op.status !== "Canceled" && (
                <button
                  className="ui-btn ghost"
                  style={{ padding: "4px 10px", fontSize: 12 }}
                  onClick={() => validateOperation(op.id)}
                >
                  Validate
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}