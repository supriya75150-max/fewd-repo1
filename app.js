// Recipe Data
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// Select Container
const recipeContainer = document.querySelector('#recipe-container');

// Create Recipe Card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Render Recipes
const renderRecipes = (recipesToRender) => {
    const allCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');

    recipeContainer.innerHTML = allCardsHTML;
};

// Initialize
renderRecipes(recipes);
const RecipeApp = (() => {
    console.log("RecipeApp initializing...");

    /* ============================
       STATE
    ============================ */

    let currentFilter = "all";
    let currentSort = "default";

    /* ============================
       RECIPE DATA
    ============================ */

    const recipes = [
        {
            id: 1,
            title: "Spaghetti Pasta",
            difficulty: "easy",
            ingredients: [
                "Pasta",
                "Salt",
                "Tomato Sauce",
                "Olive Oil",
                "Garlic"
            ],
            steps: [
                "Boil water",
                "Add salt",
                "Cook pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add garlic",
                        {
                            text: "Make base",
                            substeps: [
                                "Add tomato sauce",
                                "Simmer for 5 minutes"
                            ]
                        }
                    ]
                },
                "Mix pasta with sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Grilled Sandwich",
            difficulty: "easy",
            ingredients: [
                "Bread slices",
                "Butter",
                "Cheese",
                "Tomato",
                "Onion"
            ],
            steps: [
                "Butter bread slices",
                "Add vegetables",
                "Place cheese",
                "Grill for 5 minutes",
                "Serve warm"
            ]
        },
        {
            id: 3,
            title: "Chicken Curry",
            difficulty: "medium",
            ingredients: [
                "Chicken",
                "Onion",
                "Tomato",
                "Spices",
                "Oil"
            ],
            steps: [
                "Heat oil",
                "Add onions",
                {
                    text: "Add spices",
                    substeps: [
                        "Add turmeric",
                        "Add chili powder",
                        "Mix well"
                    ]
                },
                "Add chicken",
                "Cook for 20 minutes",
                "Serve hot"
            ]
        },
        {
            id: 4,
            title: "Chocolate Cake",
            difficulty: "hard",
            ingredients: [
                "Flour",
                "Sugar",
                "Cocoa Powder",
                "Eggs",
                "Butter"
            ],
            steps: [
                "Preheat oven",
                "Mix dry ingredients",
                "Add wet ingredients",
                "Pour into pan",
                "Bake for 30 minutes",
                "Cool and serve"
            ]
        }
    ];

    /* ============================
       RECURSIVE STEP RENDERING
    ============================ */

    const renderSteps = (steps, level = 0) => {
        let html = `<ol class="step-level-${level}">`;

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else if (step.substeps) {
                html += `<li>
                            ${step.text}
                            ${renderSteps(step.substeps, level + 1)}
                         </li>`;
            }
        });

        html += `</ol>`;
        return html;
    };

    const createStepsHTML = (steps) => {
        return `
            <div class="steps-container" data-type="steps">
                ${renderSteps(steps)}
            </div>
        `;
    };

    const createIngredientsHTML = (ingredients) => {
        return `
            <div class="ingredients-container" data-type="ingredients">
                <ul>
                    ${ingredients.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        `;
    };

    /* ============================
       CARD CREATION
    ============================ */

    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <p>Difficulty: ${recipe.difficulty}</p>

                <button class="toggle-btn"
                        data-recipe-id="${recipe.id}"
                        data-toggle="steps">
                    Show Steps
                </button>

                <button class="toggle-btn"
                        data-recipe-id="${recipe.id}"
                        data-toggle="ingredients">
                    Show Ingredients
                </button>

                ${createStepsHTML(recipe.steps)}
                ${createIngredientsHTML(recipe.ingredients)}
            </div>
        `;
    };

    /* ============================
       DISPLAY UPDATE
    ============================ */

    const updateDisplay = () => {
        const container = document.getElementById("recipe-container");
        let filtered = [...recipes];

        // FILTER
        if (currentFilter !== "all") {
            filtered = filtered.filter(r => r.difficulty === currentFilter);
        }

        // SORT
        if (currentSort === "az") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        container.innerHTML = filtered.map(createRecipeCard).join("");
    };

    /* ============================
       TOGGLE HANDLER (Event Delegation)
    ============================ */

    const handleToggleClick = (e) => {
        const button = e.target.closest(".toggle-btn");
        if (!button) return;

        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;

        const card = document.querySelector(
            `.recipe-card[data-id="${recipeId}"]`
        );

        const container = card.querySelector(
            `.${toggleType}-container`
        );

        container.classList.toggle("visible");

        button.textContent =
            container.classList.contains("visible")
                ? `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`
                : `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
    };

    /* ============================
       EVENT LISTENERS
    ============================ */

    const setupEventListeners = () => {
        document
            .getElementById("recipe-container")
            .addEventListener("click", handleToggleClick);

        console.log("Event listeners attached!");
    };

    /* ============================
       INIT
    ============================ */

    const init = () => {
        updateDisplay();
        setupEventListeners();
        console.log("RecipeApp ready!");
    };

    return {
        init,
        updateDisplay
    };
})();

document.addEventListener("DOMContentLoaded", RecipeApp.init);
