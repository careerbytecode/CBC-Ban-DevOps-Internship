import apiRequest from "../api/apiClient";

async function getRecipes() {
  return apiRequest("/recipes");
}

export { getRecipes };