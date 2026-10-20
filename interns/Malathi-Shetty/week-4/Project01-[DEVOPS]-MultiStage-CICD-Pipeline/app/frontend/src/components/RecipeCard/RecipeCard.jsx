import "./RecipeCard.css";
import Card from "../ui/Card/Card";
import Badge from "../ui/Badge/Badge";

function RecipeCard({ recipe }) {
  return (
    <Card>
      <div className="recipe-card">

        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-image"
        />

        <div className="recipe-content">

          <h3>{recipe.name}</h3>

          <div className="recipe-badges">
            <Badge>{recipe.category}</Badge>
            <Badge>{recipe.difficulty}</Badge>
          </div>

          <p className="cook-time">
            ⏱ {recipe.cookTime}
          </p>

          <button type="button" className="view-button">
            View Recipe →
          </button>

        </div>

      </div>
    </Card>
  );
}

export default RecipeCard;