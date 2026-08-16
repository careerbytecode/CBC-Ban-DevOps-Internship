import "./BackendStatus.css";
import Card from "../ui/Card/Card";

import Loading from "../ui/Loading/Loading";
import Badge from "../ui/Badge/Badge";

function BackendStatus({ health, error }) {
  return (
    <section className="backend-status">
      <h2>Backend Status</h2>

      {error && (
        <Card>
          <p>{error}</p>
        </Card>
      )}

      {!health && !error && (
        <Card>
  <Loading message="Checking backend health..." />
</Card>
      )}

      {health && (
        <Card>
 <p>
  <strong>Status:</strong>{" "}
  <Badge
    variant={health.status === "UP" ? "success" : "error"}
  >
    {health.status}
  </Badge>
</p>
          <p><strong>Application:</strong> {health.application}</p>
          <p><strong>Version:</strong> {health.version}</p>
          <p><strong>Timestamp:</strong> {health.timestamp}</p>
        </Card>
      )}
    </section>
  );
}

export default BackendStatus;