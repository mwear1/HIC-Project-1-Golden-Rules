// Find the search controls and status messages in knowledge-base.html.
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const searchForm = document.querySelector("#search-form");
const clearButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const noResultsMessage = document.querySelector("#no-results");

// Get all help articles so the script can filter them.
const articles = document.querySelectorAll(".article");

// Filter articles using the search phrase and selected category.
function filterArticles() {
    // Make the search case-insensitive.
    const searchText = searchInput.value.toLowerCase().trim();

    // Get the selected category, such as "Network" or "Hardware".
    const selectedCategory = categorySelect.value;

    // Count how many articles match the filters.
    let visibleCount = 0;

    // Check each article.
    articles.forEach(function (article) {
        // Include the article title and body in the text search.
        const articleText = article.textContent.toLowerCase();

        // Read the category from the article's data-category attribute.
        const articleCategory = article.dataset.category;

        // An article matches if its text contains the search phrase.
        const matchesSearch = articleText.includes(searchText);

        // "all" matches every category; otherwise categories must match.
        const matchesCategory =
            selectedCategory === "all" ||
            articleCategory === selectedCategory;

        // Show articles that match both filters.
        if (matchesSearch && matchesCategory) {
            article.hidden = false;
            visibleCount++;
        } else {
            // Hide articles that do not match.
            article.hidden = true;
        }
    });

    // Update the results message.
    resultCount.textContent =
        "Showing " + visibleCount + " article(s).";

    // Show the no-results message only if nothing matched.
    noResultsMessage.hidden = visibleCount !== 0;
}

// When the user submits the search form, filter without reloading the page.
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    filterArticles();
});

// Update results as the user types.
searchInput.addEventListener("input", filterArticles);

// Update results when the category dropdown changes.
categorySelect.addEventListener("change", filterArticles);

// Clear the search phrase and category filter.
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    categorySelect.value = "all";

    // Show all articles again.
    filterArticles();
});

// Display the initial article count when the page loads.
filterArticles();
