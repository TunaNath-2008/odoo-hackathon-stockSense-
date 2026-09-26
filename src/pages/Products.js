import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { stockStatus, totalStock } from "../data/mockData";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function StockBadge({ product }) {
  const status = stockStatus(product);
  const label = status === "out" ? "Out of stock" : status === "low" ? "Low stock" : "In stock";
  const tone = status === "out" ? "canceled" : status === "low" ? "waiting" : "done";
  return <span className={`badge ${tone}`}>{label}</span>;
}

export default function Products() {
  const { products, categories, addProduct } = useInventory();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", category: categories[0], uom: "pcs", reorderPoint: "" });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.sku) return;
    addProduct({ ...form, reorderPoint: Number(form.reorderPoint) || 0 });
    setForm({ name: "", sku: "", category: categories[0], uom: "pcs", reorderPoint: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Products</h1>
          <p>Search by name or SKU, filter by category, and manage reordering rules.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "New product"}
        </Button>
      </div>

      {showForm && (
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel__head">
            <h2>Create product</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              <Input
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="SKU / Code"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                required
              />
              <div className="field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="ui-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Unit of measure"
                value={form.uom}
                onChange={(e) => setForm({ ...form, uom: e.target.value })}
              />
              <Input
                label="Reorder point"
                type="number"
                value={form.reorderPoint}
                onChange={(e) => setForm({ ...form, reorderPoint: e.target.value })}
              />
            </div>
            <Button type="submit">Save product</Button>
          </form>
        </div>
      )}

      <div className="filter-row">
        <input
          className="ui-input"
          style={{ maxWidth: 260 }}
          placeholder="Search name or SKU"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`chip ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Total stock</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="mono">{p.sku}</td>
                <td>{p.category}</td>
                <td className="mono">
                  {totalStock(p)} {p.uom}
                </td>
                <td>
                  <StockBadge product={p} />
                </td>
                <td>
                  <Link to={`/products/${p.id}`} className="ui-btn ghost" style={{ padding: "4px 10px", fontSize: 12 }}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}