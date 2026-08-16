import "./Button.css";

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;