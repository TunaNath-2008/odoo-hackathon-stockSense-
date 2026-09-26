export default function Button({
  variant = "primary",
  children,
  type = "button",
  ...rest
}) {
  return (
    <button type={type} className={`ui-btn ${variant}`} {...rest}>
      {children}
    </button>
  );
}