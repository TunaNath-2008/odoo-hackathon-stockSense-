import { AlertTriangle, XCircle, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Presentational card for a single stock alert. Purely props-driven so it
// can be reused anywhere (dashboard, an AI insights page, notifications, etc).
export default function AlertCard({
  severity = "low", // "low" | "out"
  title,
  message,
  productId,
  onDismiss,
}) {
  const isOut = severity === "out";

  return (
    <div
      className={`alert-box ${isOut ? "out" : "low"}`}
      style={{ alignItems: "center", justifyContent: "space-between", gap: 12 }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {isOut ? (
          <XCircle size={16} strokeWidth={1.75} style={{ marginTop: 1, flexShrink: 0 }} />
        ) : (
          <AlertTriangle size={16} strokeWidth={1.75} style={{ marginTop: 1, flexShrink: 0 }} />
        )}
        <div>
          <strong>{title}</strong>
          <div style={{ marginTop: 2 }}>{message}</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {productId && (
          <Link
            to={`/products/${productId}`}
            className="ui-btn ghost"
            style={{ padding: "4px 8px", fontSize: 12 }}
          >
            View
            <ArrowRight size={13} strokeWidth={1.75} />
          </Link>
        )}
        {onDismiss && (
          <button
            className="ui-btn ghost"
            aria-label="Dismiss alert"
            style={{ padding: "4px 6px" }}
            onClick={onDismiss}
          >
            <X size={13} strokeWidth={1.75} />
          </button>
        )}
      </div>
    </div>
  );
}