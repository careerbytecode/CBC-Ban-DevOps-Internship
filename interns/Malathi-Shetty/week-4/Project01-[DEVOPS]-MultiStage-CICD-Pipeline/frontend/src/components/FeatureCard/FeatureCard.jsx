import "./FeatureCard.css";
import Card from "../ui/Card/Card";

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>

        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </Card>
  );
}

export default FeatureCard;