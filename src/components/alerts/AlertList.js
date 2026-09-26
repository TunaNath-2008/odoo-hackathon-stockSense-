import { useMemo, useState } from "react";
import { useInventory } from "../../../context/InventoryContext";
import { stockStatus, totalStock } from "../../../data/mockData";
import AlertCard from "./AlertCard";

// Pulls low/out-of-stock products straight from InventoryContext and
// renders them as a dismissible list of AlertCards.
export default function AlertList({ limit }) {
  const { products } = useInventory();
  const [dismissed, setDismissed] = useState([]);

  const alerts = useMemo(() => {
    return products
      .filter((p) => stockStatus(p) !== "ok")
      .filter((p) => !dismissed.includes(p.id))
      .map((p) => {
        const out = stockStatus(p) === "out";
        return {
          id: p.id,
          severity: out ? "out" : "low",
          title: `${p.name} (${p.sku})`,
          message: out
            ? "Out of stock across all warehouses."
            : `${totalStock(p)} ${p.uom} left, below reorder point of ${p.reorderPoint}.`,
        };
      });
  }, [products, dismissed]);

  const visible = limit ? alerts.slice(0, limit) : alerts;

  function handleDismiss(id) {
    setDismissed((prev) => [...prev, id]);
  }

  if (visible.length === 0) {
    return <div className="empty-state">No active stock alerts.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {visible.map((alert) => (
        <AlertCard
          key={alert.id}
          severity={alert.severity}
          title={alert.title}
          message={alert.message}
          productId={alert.id}
          onDismiss={() => handleDismiss(alert.id)}
        />
      ))}
    </div>
  );
}