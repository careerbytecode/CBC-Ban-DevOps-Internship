import "./Hero.css";
import heroImage from "../../assets/hero.png";
import Button from "../ui/Button/Button";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Craft, Discover & Share Amazing Recipes</h1>

        <p>
          FlavorForge is a cloud-native recipe platform built with React,
          Express, Docker, Kubernetes, Azure, and DevSecOps best practices.
        </p>

        <div className="hero-buttons">
          <Button variant="primary">
            Get Started
          </Button>

          <Button variant="secondary">
            Learn More
          </Button>
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="FlavorForge Hero" />
      </div>
    </section>
  );
}

export default Hero;