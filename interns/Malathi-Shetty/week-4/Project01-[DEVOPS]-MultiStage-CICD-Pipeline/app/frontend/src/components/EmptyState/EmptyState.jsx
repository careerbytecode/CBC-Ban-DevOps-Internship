import "./EmptyState.css";

function EmptyState({
  title = "Nothing Found",
  message = "Please try again."
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        🔍
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

    </div>
  );
}

export default EmptyState;