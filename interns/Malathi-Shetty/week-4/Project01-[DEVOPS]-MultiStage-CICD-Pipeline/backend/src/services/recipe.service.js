function getRecipes() {
  console.log("Recipe Service reached");

  return [
    {
      id: 1,
      name: "Paneer Butter Masala",
      category: "Indian",
      difficulty: "Medium",
      cookTime: "30 mins",
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Italian",
      difficulty: "Easy",
      cookTime: "20 mins",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      category: "Dessert",
      difficulty: "Easy",
      cookTime: "45 mins",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    },
    {
      id: 4,
      name: "Veg Fried Rice",
      category: "Asian",
      difficulty: "Easy",
      cookTime: "25 mins",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    },
    {
      id: 5,
      name: "Chickpea Salad",
      category: "Healthy",
      difficulty: "Easy",
      cookTime: "15 mins",
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    },
    {
      id: 6,
      name: "Masala Dosa",
      category: "South Indian",
      difficulty: "Hard",
      cookTime: "35 mins",
      image:
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
    },
  ];
}

module.exports = {
  getRecipes,
};