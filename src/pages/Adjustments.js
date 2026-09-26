import { useMemo, useState } from "react";
import { useInventory } from "../context/InventoryContext";
import Button from "../components/common/Button";

const STATUS_FILTERS = ["All", "Draft", "Waiting", "Ready", "Done", "Canceled"];

export default function Adjustments() {
  const { operations, products, warehouses, addOperation, validateOperation, cancelOperation } =
    useInventory();

  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [productId, setProductId] = useState(products[0]?.id || "");
  const [warehouse, setWarehouse] = useState(warehouses[0]?.id || "");
  const [counted, setCounted] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");

  const product = products.find((p) => p.id === productId);
  const recorded = product ? product.stockByLocation[warehouse] || 0 : 0;
  const delta = counted === "" ? null : Number(counted) - recorded;

  const rows = useMemo(() => {
    return operations
      .filter((op) => op.type === "Adjustment")
      .filter((op) => statusFilter === "All" || op.status === statusFilter)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [operations, statusFilter]);

  function productName(id) {
    return products.find((p) => p.id === id)?.name || "—";
  }
  function warehouseName(id) {
    return warehouses.find((w) => w.id === id)?.name || id;
  }

  function resetForm() {
    setProductId(products[0]?.id || "");
    setWarehouse(warehouses[0]?.id || "");
    setCounted("");
    setNote("");
    setFormError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (counted === "" || Number.isNaN(Number(counted))) {
      setFormError("Enter the counted quantity.");
      return;
    }
    if (delta === 0) {
      setFormError("Counted quantity matches recorded stock — nothing to adjust.");
      return;
    }
    addOperation({
      type: "Adjustment",
      reference: note.trim() || `Cycle count - ${warehouseName(warehouse)}`,
      warehouse,
      lines: [{ productId, qty: delta }],
    });
    resetForm();
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Inventory adjustments</h1>
          <p>Fix mismatches between recorded stock and a physical count. Every adjustment is logged.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "New adjustment"}
        </Button>
      </div>

      {showForm && (
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel__head">
            <h2>New adjustment</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              <div className="field">
                <label htmlFor="adj-product">Product</label>
                <select
                  id="adj-product"
                  className="ui-input"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="adj-warehouse">Location</label>
                <select
                  id="adj-warehouse"
                  className="ui-input"
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Recorded quantity</label>
                <input className="ui-input mono" value={`${recorded} ${product?.uom || ""}`} disabled />
              </div>
              <div className="field">
                <label htmlFor="adj-counted">Counted quantity</label>
                <input
                  id="adj-counted"
                  className="ui-input"
                  type="number"
                  placeholder="0"
                  value={counted}
                  onChange={(e) => setCounted(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="adj-note">Note / reference</label>
              <input
                id="adj-note"
                className="ui-input"
                placeholder="e.g. Cycle count - Rack A4"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {delta !== null && (
              <div className={`alert-box ${delta < 0 ? "out" : "low"}`} style={{ marginBottom: 14 }}>
                {delta > 0
                  ? `Stock will increase by ${delta} ${product?.uom || ""}.`
                  : delta < 0
                  ? `Stock will decrease by ${Math.abs(delta)} ${product?.uom || ""}.`
                  : "No change."}
              </div>
            )}

            {formError && (
              <div className="field-error" style={{ marginBottom: 12 }}>
                {formError}
              </div>
            )}

            <Button type="submit">Save adjustment</Button>
          </form>
        </div>
      )}

      <div className="filter-row">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            className={`chip ${statusFilter === s ? "active" : ""}`}
            onClick={() => setStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Warehouse</th>
              <th>Product</th>
              <th>Δ Qty</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((op) => {
              const line = op.lines[0];
              return (
                <tr key={op.id}>
                  <td>
                    <div className="mono">{op.id}</div>
                    <div>{op.reference}</div>
                  </td>
                  <td>{warehouseName(op.warehouse)}</td>
                  <td>{productName(line.productId)}</td>
                  <td className="mono" style={{ color: line.qty < 0 ? "var(--red)" : "var(--green)" }}>
                    {line.qty > 0 ? `+${line.qty}` : line.qty}
                  </td>
                  <td>
                    <span className={`badge ${op.status.toLowerCase()}`}>{op.status}</span>
                  </td>
                  <td>{op.date}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      {op.status !== "Done" && op.status !== "Canceled" && (
                        <>
                          <button
                            className="ui-btn ghost"
                            style={{ padding: "4px 10px", fontSize: 12 }}
                            onClick={() => validateOperation(op.id)}
                          >
                            Validate
                          </button>
                          <button
                            className="ui-btn ghost"
                            style={{ padding: "4px 10px", fontSize: 12, color: "var(--red)" }}
                            onClick={() => cancelOperation(op.id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">
                  No adjustments match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}