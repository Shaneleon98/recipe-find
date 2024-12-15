const searchBox = document.querySelector('input');
const searchBtn = document.querySelector('.search_btn');
const recipeContainer = document.querySelector('.recipes-container');
const recipeDetailsContent = document.querySelector('.recipe_details_contents');
const recipeCloseBtn = document.querySelector('.close-btn')
// JavaScript for toggling the dropdown menu
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu_icon");
    const dropdownMenu = document.getElementById("dropdown_menu");

    menuIcon.addEventListener("click", function () {
        // Toggle the visibility of the dropdown menu
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "block";
        }
    });

    // Optional: Close the menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});


// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h2>Fetching Recipes....<h2>";
//     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response = await data.json();
//     console.log(response); 
    
//     recipeContainer.innerHTML = "";
//     response.meals.forEach(meal => {
//         const recipeDiv = document.createElement('div');
//         recipeDiv.classList.add('recipe');
//         recipeDiv.innerHTML = `
//              <img src="${meal.strMealThumb}">
//              <h3>${meal.strMeal}</h3>
//              <p><span>${meal.strArea}</span> Dish</p>
//              <p>${meal.strCategory}</p>
//         `;
        
//          Create the container for the button and heart icon
//         const actionContainer = document.createElement('div');
//         actionContainer.classList.add('action-container');
        
//         Button
//         const button = document.createElement('button');
//         button.textContent = "View Recipe";
//         actionContainer.appendChild(button);

//         add Event listener to recipe 
//         button.addEventListener('click', ()=>{
//             openRecipePage(meal);
//         });
        
//         Heart Icon
//         const heartIcon = document.createElement('i');
//         heartIcon.classList.add('fa-solid', 'fa-heart');

//         actionContainer.appendChild(heartIcon);
        
//         Append the action container to the recipeDiv
//         recipeDiv.appendChild(actionContainer);
        
//         Append the recipeDiv to the recipeContainer
//         recipeContainer.appendChild(recipeDiv);
//     });
    
   
// }
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....<h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    recipeContainer.innerHTML = "";
    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>${meal.strCategory}</p>
            `;
            
            // Create the container for the button and heart icon
            const actionContainer = document.createElement('div');
            actionContainer.classList.add('action-container');
            
            // View Recipe Button
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            button.addEventListener('click', () => {
                openRecipePage(meal); // View Recipe Functionality
            });
            actionContainer.appendChild(button);

            // Heart Icon
            const heartIcon = document.createElement('i');
            heartIcon.classList.add('fa-solid', 'fa-heart');
            heartIcon.style.cursor = "pointer";
            
            // Add to Favorites on Click
            heartIcon.addEventListener('click', () => {
                addToFavorites(meal);
                heartIcon.style.color = "red"; // Visual feedback for liked
            });
            
            actionContainer.appendChild(heartIcon);
            recipeDiv.appendChild(actionContainer);
            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = "<p>No recipes found.</p>";
    }
};

// Function to Add to Favorites
const addToFavorites = (meal) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Retrieve existing favorites
    const alreadyFavorited = favorites.some(fav => fav.idMeal === meal.idMeal); // Check for duplicates

    if (!alreadyFavorited) {
        favorites.push(meal); // Add new recipe
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Save to localStorage
        alert(`${meal.strMeal} added to favorites!`);
    } else {
        alert(`${meal.strMeal} is already in favorites.`);
    }
};




// function usedto fetch ingredients 
const fetchIngredients = (meal) =>{
 let ingredientsLists = "";
 for(let i =1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsLists += `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
 }
 return ingredientsLists
}

const openRecipePage = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class = "recipe_Name" >${meal.strMeal}</h2>
    <h3>Ingredients:<h3>
    <ul class = "ingredients_Name">${fetchIngredients(meal)}</ul>
     <div class = "recipeInstructions">
        <h3>Instructions: </h3>
        <p>${meal.strInstructions}</p>
     </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput)
    console.log("clicked");
    
});