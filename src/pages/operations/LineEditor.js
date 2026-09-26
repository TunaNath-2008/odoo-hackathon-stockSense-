import { Trash2, Plus } from "lucide-react";

// Reusable editor for the product/quantity line items on a receipt,
// delivery, transfer, or adjustment. `qtyLabel` lets callers rename the
// quantity column (e.g. "Counted qty" for adjustments).
export default function LineEditor({ products, lines, onChange, qtyLabel = "Quantity" }) {
  function updateLine(index, patch) {
    onChange(lines.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  }

  function addLine() {
    onChange([...lines, { productId: products[0]?.id || "", qty: "" }]);
  }

  function removeLine(index) {
    onChange(lines.filter((_, i) => i !== index));
  }

  return (
    <div className="line-editor">
      <div className="line-editor__head">
        <span>Product</span>
        <span>{qtyLabel}</span>
        <span></span>
      </div>
      {lines.map((line, index) => (
        <div className="line-editor__row" key={index}>
          <select
            className="ui-input"
            value={line.productId}
            onChange={(e) => updateLine(index, { productId: e.target.value })}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.sku})
              </option>
            ))}
          </select>
          <input
            className="ui-input"
            type="number"
            value={line.qty}
            placeholder="0"
            onChange={(e) => updateLine(index, { qty: e.target.value })}
          />
          <button
            type="button"
            className="ui-btn ghost"
            aria-label="Remove line"
            onClick={() => removeLine(index)}
            disabled={lines.length === 1}
          >
            <Trash2 size={14} strokeWidth={1.75} />
          </button>
        </div>
      ))}
      <button type="button" className="ui-btn secondary" onClick={addLine} style={{ marginTop: 6 }}>
        <Plus size={14} strokeWidth={1.75} />
        Add line
      </button>
    </div>
  );
}