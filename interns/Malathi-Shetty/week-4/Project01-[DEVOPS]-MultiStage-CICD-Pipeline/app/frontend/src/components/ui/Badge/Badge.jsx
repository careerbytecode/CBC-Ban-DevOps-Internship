import "./Badge.css";

function Badge({ children, variant = "success" }) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}

export default Badge;