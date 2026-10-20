import { useEffect, useState } from "react";

import "./RecipeList.css";

import { getRecipes } from "../../services/recipeService";

import RecipeCard from "../RecipeCard/RecipeCard";
import SearchBar from "../SearchBar/SearchBar";

import Loading from "../ui/Loading/Loading";
import Card from "../ui/Card/Card";
import EmptyState from "../EmptyState/EmptyState";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");




    useEffect(() => {
        async function loadRecipes() {
            try {
                const response = await getRecipes();

                setRecipes(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadRecipes();
    }, []);

    const categories = [
  "All",
  ...new Set(recipes.map((recipe) => recipe.category)),
];

    const filteredRecipes = recipes.filter((recipe) => {
  const matchesSearch = recipe.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    recipe.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

    if (loading) {
        return <Loading message="Loading recipes..." />;
    }

    if (error) {
        return (
            <Card>
                <p>❌ {error}</p>
            </Card>
        );
    }

    return (
        <section className="recipe-list">

            <h2>Featured Recipes</h2>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

<CategoryFilter
  categories={categories}
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>

            {filteredRecipes.length === 0 && (
                <EmptyState
                    title="No recipes found"
                    message="Try another search term."
                />
            )}

            {filteredRecipes.length > 0 && (
                <div className="recipe-grid">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}

export default RecipeList;