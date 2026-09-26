export default function Card({ label, value, tone, trend }) {
  return (
    <div className="kpi-card">
      <div className="kpi-card__label">{label}</div>
      <div className={`kpi-card__value ${tone || ""}`}>{value}</div>
      {trend && <div className="kpi-card__trend">{trend}</div>}
    </div>
  );
}