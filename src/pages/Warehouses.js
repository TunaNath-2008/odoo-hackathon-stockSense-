import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

export default function Warehouses() {
  const { warehouses, products } = useInventory();

  function stockAt(warehouseId) {
    return products.reduce((sum, p) => sum + (p.stockByLocation[warehouseId] || 0), 0);
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Warehouses</h1>
          <p>Every location tracked in StockSense, with a quick read on stock held there.</p>
        </div>
      </div>

      <div className="kpi-grid">
        {warehouses.map((w) => (
          <div className="kpi-card" key={w.id}>
            <div className="kpi-card__label">{w.name}</div>
            <div className="kpi-card__value">{stockAt(w.id)}</div>
            <div className="kpi-card__trend">{w.location} · {w.racks} racks</div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Link to={`/warehouses/${w.id}`} className="ui-btn secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                Details
              </Link>
              <Link to={`/warehouses/${w.id}/map`} className="ui-btn ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
                Rack map
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}