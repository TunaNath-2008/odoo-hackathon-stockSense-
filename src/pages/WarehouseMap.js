import { Link, useParams } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

// Deterministic mock fill levels per rack, derived from the rack index
// so the layout is stable across renders without needing real rack data.
function fillFor(index) {
  const pattern = [92, 78, 15, 0, 60, 45, 88, 5, 70, 33, 0, 95];
  return pattern[index % pattern.length];
}

export default function WarehouseMap() {
  const { warehouseId } = useParams();
  const { warehouses } = useInventory();
  const warehouse = warehouses.find((w) => w.id === warehouseId);

  if (!warehouse) {
    return (
      <div className="empty-state">
        Warehouse not found. <Link to="/warehouses">Back to warehouses</Link>
      </div>
    );
  }

  const racks = Array.from({ length: warehouse.racks }, (_, i) => ({
    label: `Rack ${String.fromCharCode(65 + Math.floor(i / 4))}${(i % 4) + 1}`,
    fill: fillFor(i),
  }));

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{warehouse.name} · Rack map</h1>
          <p>Fill level per rack. Amber marks low stock, red marks an empty rack.</p>
        </div>
        <Link to={`/warehouses/${warehouseId}`} className="ui-btn secondary">
          Back to details
        </Link>
      </div>

      <div className="panel">
        <div className="warehouse-map">
          {racks.map((rack) => {
            const state = rack.fill === 0 ? "empty" : rack.fill < 30 ? "low" : "";
            return (
              <div key={rack.label} className={`map-rack ${state}`}>
                <div>{rack.label}</div>
                <div className="map-rack__fill">
                  <span style={{ width: `${rack.fill}%` }} />
                </div>
                <div className="mono">{rack.fill}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}