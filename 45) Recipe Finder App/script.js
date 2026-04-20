document.addEventListener('DOMContentLoaded', function() {
    const recipes = [
        { 
            title: "Spaghetti Bolognese", 
            description: "Classic Italian pasta dish with rich meat sauce.", 
            image: "https://via.placeholder.com/250x150?text=Spaghetti+Bolognese" 
        },
        { 
            title: "Chicken Curry", 
            description: "Spicy and savory chicken curry with aromatic spices.", 
            image: "https://via.placeholder.com/250x150?text=Chicken+Curry" 
        },
        { 
            title: "Veggie Salad", 
            description: "Fresh and healthy vegetable salad with vinaigrette.", 
            image: "https://via.placeholder.com/250x150?text=Veggie+Salad" 
        },
        { 
            title: "Avocado Toast", 
            description: "Toasted bread topped with mashed avocado and lemon.", 
            image: "https://via.placeholder.com/250x150?text=Avocado+Toast" 
        },
        { 
            title: "Pancakes", 
            description: "Fluffy pancakes served with syrup and berries.", 
            image: "https://via.placeholder.com/250x150?text=Pancakes" 
        }
    ];

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const recipesContainer = document.getElementById('recipes');

    function displayRecipes(recipesToShow) {
        recipesContainer.innerHTML = '';
        if (recipesToShow.length === 0) {
            recipesContainer.innerHTML = '<p>No recipes found.</p>';
            return;
        }
        recipesToShow.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = recipe.image;
            card.appendChild(img);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'card-content';

            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = recipe.title;
            contentDiv.appendChild(title);

            const description = document.createElement('p');
            description.className = 'card-description';
            description.textContent = recipe.description;
            contentDiv.appendChild(description);

            card.appendChild(contentDiv);
            recipesContainer.appendChild(card);
        });
    }

    // Display all recipes initially
    displayRecipes(recipes);

    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase().trim();
        if (query === "") {
            displayRecipes(recipes);
        } else {
            const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(query));
            displayRecipes(filteredRecipes);
        }
    });

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });
});
