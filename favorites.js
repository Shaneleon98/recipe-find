document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites-container");

    // Retrieve Favorites from LocalStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorites yet. Go add some!</p>";
        return;
    }

    // Display Favorite Recipes
    favorites.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>${meal.strCategory}</p>
            <button class="remove-btn">Remove</button>
        `;

        // Remove from Favorites
        recipeDiv.querySelector(".remove-btn").addEventListener('click', () => {
            removeFromFavorites(meal.idMeal);
            recipeDiv.remove();
        });

        favoritesContainer.appendChild(recipeDiv);
    });
});

// Function to Remove from Favorites
const removeFromFavorites = (idMeal) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(meal => meal.idMeal !== idMeal);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Recipe removed from favorites.");
};
