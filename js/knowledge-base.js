// Find the Knowledge Base search controls and article elements.
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const clearSearchButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const articlesContainer = document.querySelector("#articles");
const noResultsMessage = document.querySelector("#no-results");

// Get all articles displayed inside the articles container.
const articles = articlesContainer
    ? Array.from(articlesContainer.querySelectorAll(".article"))
    : [];

// Search articles by their text and the selected category.
function filterArticles() {
    // Convert the search text to lowercase for case-insensitive matching.
    const searchText = searchInput.value.trim().toLowerCase();

    // Read the selected category from the dropdown.
    const selectedCategory = categorySelect.value;

    // Track how many articles match the current filters.
    let visibleCount = 0;

    // Check each article against the search text and category.
    articles.forEach(function (article) {
        // Read the article's text and category.
        const articleText = article.textContent.toLowerCase();
        const articleCategory = article.dataset.category;

        // An article matches if its text contains the search term.
        const matchesSearch = articleText.includes(searchText);

        // The "all" option allows every category.
        const matchesCategory =
            selectedCategory === "all" ||
            articleCategory === selectedCategory;

        // Show the article only when it matches both filters.
        const shouldShow = matchesSearch && matchesCategory;

        article.hidden = !shouldShow;

        // Count articles that remain visible.
        if (shouldShow) {
            visibleCount++;
        }
    });

    // Update the number of matching articles.
    if (resultCount !== null) {
        resultCount.textContent =
            visibleCount + (visibleCount === 1
                ? " article found."
                : " articles found.");
    }

    // Show a message when no articles match.
    if (noResultsMessage !== null) {
        noResultsMessage.hidden = visibleCount !== 0;
    }
}

// Prevent the form from reloading the page when Search is clicked.
if (searchForm !== null) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        filterArticles();
    });
}

// Clear the search text and restore all articles.
if (clearSearchButton !== null) {
    clearSearchButton.addEventListener("click", function () {
        searchInput.value = "";
        categorySelect.value = "all";

        // Refresh the results after clearing the filters.
        filterArticles();

        // Return the cursor to the search field.
        searchInput.focus();
    });
}

// Display the initial article count when the page first loads.
filterArticles();
