import "./Features.css";
import FeatureCard from "../FeatureCard/FeatureCard";


const features = [
  {
    icon: "🍳",
    title: "Recipe Management",
    description: "Create, organize, and manage recipes with ease."
  },
  {
    icon: "☁️",
    title: "Cloud Native",
    description: "Built using Docker, Kubernetes, and Azure."
  },
  {
    icon: "🛡️",
    title: "DevSecOps",
    description: "Integrated security, CI/CD, and best practices."
  }
];

function Features() {
  return (
    <section className="features">
      <h2>Why FlavorForge?</h2>

      <div className="feature-grid">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;