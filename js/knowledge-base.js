// Find the Knowledge Base controls and status messages.
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const clearSearchButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const articlesContainer = document.querySelector("#articles");
const noResultsMessage = document.querySelector("#no-results");

// Get all help articles inside the article container.
const articles = articlesContainer
    ? Array.from(articlesContainer.querySelectorAll(".article"))
    : [];

// Check that the required HTML elements exist before adding event listeners.
if (
    searchForm &&
    searchInput &&
    categorySelect &&
    clearSearchButton &&
    resultCount &&
    noResultsMessage &&
    articlesContainer
) {
    // Set the initial count without filtering any articles.
    resultCount.textContent =
        "Showing all " + articles.length + " articles.";

    // Search and filter only when the form is submitted.
    searchForm.addEventListener("submit", function (event) {
        // Prevent the browser from reloading the page.
        event.preventDefault();

        // Read the submitted search phrase.
        const searchText = searchInput.value.trim().toLowerCase();

        // Read the selected category.
        const selectedCategory = categorySelect.value;

        // Count the articles matching both conditions.
        let visibleCount = 0;

        // Check each article against the submitted search and category.
        articles.forEach(function (article) {
            const articleText = article.textContent.toLowerCase();
            const articleCategory = article.dataset.category;

            // Match the search phrase. An empty phrase matches all text.
            const matchesSearch = articleText.includes(searchText);

            // Match the selected category or allow all categories.
            const matchesCategory =
                selectedCategory === "all" ||
                articleCategory === selectedCategory;

            // An article must match both conditions to remain visible.
            const shouldShow = matchesSearch && matchesCategory;

            article.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        // Display the number of matching articles.
        resultCount.textContent =
            "Showing " + visibleCount +
            (visibleCount === 1 ? " article." : " articles.");

        // Display a message if the search has no matches.
        noResultsMessage.hidden = visibleCount !== 0;
    });

    // Clear the search and restore every article.
    clearSearchButton.addEventListener("click", function () {
        // Reset both search controls.
        searchInput.value = "";
        categorySelect.value = "all";

        // Make all articles visible again.
        articles.forEach(function (article) {
            article.hidden = false;
        });

        // Reset the count and hide the no-results message.
        resultCount.textContent =
            "Showing all " + articles.length + " articles.";

        noResultsMessage.hidden = true;

        // Return focus to the search input.
        searchInput.focus();
    });
} else {
    // Identify missing elements in the browser console.
    console.error(
        "Knowledge Base search could not start. Check the IDs for the " +
        "search form, search input, category dropdown, clear button, " +
        "result count, articles container, and no-results message."
    );
}
