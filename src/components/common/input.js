export default function Input({ label, id, error, ...rest }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="field">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={`ui-input ${error ? "has-error" : ""}`} {...rest} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}