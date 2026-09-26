import { useMemo, useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { documentTypes, statuses } from "../data/mockData";
import Button from "../components/common/Button";
import LineEditor from "../components/operations/LineEditor";

export default function MoveHistory() {
  const {
    operations,
    products,
    warehouses,
    addOperation,
    validateOperation,
    cancelOperation,
  } = useInventory();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [fromWarehouse, setFromWarehouse] = useState(warehouses[0]?.id || "");
  const [toWarehouse, setToWarehouse] = useState(warehouses[1]?.id || warehouses[0]?.id || "");
  const [lines, setLines] = useState([{ productId: products[0]?.id || "", qty: "" }]);
  const [formError, setFormError] = useState("");

  const rows = useMemo(() => {
    return operations
      .filter((op) => typeFilter === "All" || op.type === typeFilter)
      .filter((op) => statusFilter === "All" || op.status === statusFilter)
      .filter((op) => warehouseFilter === "All" || op.warehouse === warehouseFilter || op.fromWarehouse === warehouseFilter)
      .filter((op) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          op.id.toLowerCase().includes(q) ||
          op.reference.toLowerCase().includes(q) ||
          op.lines.some((l) => products.find((p) => p.id === l.productId)?.name.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [operations, typeFilter, statusFilter, warehouseFilter, query, products]);

  function warehouseName(id) {
    return warehouses.find((w) => w.id === id)?.name || id;
  }
  function productName(id) {
    return products.find((p) => p.id === id)?.name || "—";
  }

  function resetForm() {
    setFromWarehouse(warehouses[0]?.id || "");
    setToWarehouse(warehouses[1]?.id || warehouses[0]?.id || "");
    setLines([{ productId: products[0]?.id || "", qty: "" }]);
    setFormError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (fromWarehouse === toWarehouse) {
      setFormError("Choose two different warehouses for a transfer.");
      return;
    }
    const cleanLines = lines
      .filter((l) => l.productId && Number(l.qty) > 0)
      .map((l) => ({ productId: l.productId, qty: Math.abs(Number(l.qty)) }));
    if (cleanLines.length === 0) {
      setFormError("Add at least one product with a quantity greater than zero.");
      return;
    }
    addOperation({
      type: "Internal",
      reference: `${warehouseName(fromWarehouse)} → ${warehouseName(toWarehouse)}`,
      warehouse: toWarehouse,
      fromWarehouse,
      toWarehouse,
      lines: cleanLines,
    });
    resetForm();
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Move history</h1>
          <p>Every receipt, delivery, transfer, and adjustment — the full stock ledger in one place.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "New internal transfer"}
        </Button>
      </div>

      {showForm && (
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel__head">
            <h2>New internal transfer</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="field">
                <label htmlFor="from-wh">From warehouse</label>
                <select
                  id="from-wh"
                  className="ui-input"
                  value={fromWarehouse}
                  onChange={(e) => setFromWarehouse(e.target.value)}
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="to-wh">To warehouse</label>
                <select
                  id="to-wh"
                  className="ui-input"
                  value={toWarehouse}
                  onChange={(e) => setToWarehouse(e.target.value)}
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <LineEditor products={products} lines={lines} onChange={setLines} qtyLabel="Qty to move" />

            {formError && (
              <div className="field-error" style={{ margin: "10px 0" }}>
                {formError}
              </div>
            )}

            <Button type="submit" style={{ marginTop: 12 }}>
              Save transfer
            </Button>
          </form>
        </div>
      )}

      <div className="filter-row">
        <input
          className="ui-input"
          style={{ maxWidth: 220 }}
          placeholder="Search reference or product"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="ui-input" style={{ maxWidth: 170 }} value={warehouseFilter} onChange={(e) => setWarehouseFilter(e.target.value)}>
          <option value="All">All warehouses</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
        <select className="ui-input" style={{ maxWidth: 150 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className={`chip ${typeFilter === "All" ? "active" : ""}`} onClick={() => setTypeFilter("All")}>
          All types
        </button>
        {documentTypes.map((t) => (
          <button key={t} className={`chip ${typeFilter === t ? "active" : ""}`} onClick={() => setTypeFilter(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="panel">
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
                <td>
                  <div className="mono">{op.id}</div>
                  <div>{op.reference}</div>
                </td>
                <td>{op.type}</td>
                <td>{op.type === "Internal" && op.fromWarehouse ? `${warehouseName(op.fromWarehouse)} → ${warehouseName(op.toWarehouse)}` : warehouseName(op.warehouse)}</td>
                <td>{op.lines.map((l) => `${productName(l.productId)} × ${Math.abs(l.qty)}`).join(", ")}</td>
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
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">
                  No movements match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}