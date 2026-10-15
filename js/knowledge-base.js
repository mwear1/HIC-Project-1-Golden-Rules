// Get the search, category, reset, and status elements from the page.
const searchInput = document.querySelector("#article-search");
const categorySelect = document.querySelector("#article-category");
const clearButton = document.querySelector("#clear-search");
const articleCount = document.querySelector("#article-count");
const noResultsMessage = document.querySelector("#no-results");

// Collect all articles so the script can show or hide them.
const articles = document.querySelectorAll(".article");

// Filter articles using the search text and selected category.
function filterArticles() {
    // Convert the search phrase to lowercase for case-insensitive matching.
    const searchText = searchInput.value.toLowerCase();

    // Read the selected category from the dropdown.
    const selectedCategory = categorySelect.value;

    // Track how many articles remain visible.
    let visibleCount = 0;

    // Check each article individually.
    articles.forEach(function (article) {
        const articleText = article.textContent.toLowerCase();
        const articleCategory = article.dataset.category;

        // The article must match both the text and category filters.
        const matchesSearch = articleText.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            articleCategory === selectedCategory;

        // Show matching articles and hide articles that do not match.
        if (matchesSearch && matchesCategory) {
            article.hidden = false;
            visibleCount = visibleCount + 1;
        } else {
            article.hidden = true;
        }
    });

    // Update the number of matching articles.
    articleCount.textContent =
        "Showing " + visibleCount + " article(s)";

    // Display a message if the search did not find anything.
    if (visibleCount === 0) {
        noResultsMessage.hidden = false;
    } else {
        noResultsMessage.hidden = true;
    }
}

// Refilter the articles whenever the user changes the search phrase.
searchInput.addEventListener("input", filterArticles);

// Refilter the articles whenever the category changes.
categorySelect.addEventListener("change", filterArticles);

// Reset both filters and show all articles again.
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    categorySelect.value = "all";

    filterArticles();
});

// Run once when the page loads so the count is correct.
filterArticles();
