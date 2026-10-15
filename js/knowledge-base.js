// Find the search form, input, buttons, and status messages.
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const clearButton = document.getElementById("clear-search");
const resultCount = document.getElementById("result-count");
const noResultsMessage = document.getElementById("no-results");
const articles = document.querySelectorAll("#articles .article");

// Check that the HTML elements needed for searching exist.
if (
    searchForm &&
    searchInput &&
    clearButton &&
    resultCount &&
    noResultsMessage
) {
    // Search the articles only after the form is submitted.
    searchForm.addEventListener("submit", function (event) {
        // Prevent the browser from refreshing the page.
        event.preventDefault();

        // Read the search phrase and ignore capitalization.
        const searchText = searchInput.value.toLowerCase().trim();

        // Count the articles that match.
        let visibleCount = 0;

        // Check each article for the search phrase.
        articles.forEach(function (article) {
            const articleText = article.textContent.toLowerCase();
            const matches = articleText.includes(searchText);

            // Show matching articles and hide the rest.
            article.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        // Update the results count.
        resultCount.textContent =
            "Showing " + visibleCount + " article(s).";

        // Show a message if no articles matched.
        noResultsMessage.hidden = visibleCount !== 0;
    });

    // Clear the search and restore all articles.
    clearButton.addEventListener("click", function () {
        searchInput.value = "";

        articles.forEach(function (article) {
            article.hidden = false;
        });

        resultCount.textContent =
            "Showing all " + articles.length + " articles.";

        noResultsMessage.hidden = true;
        searchInput.focus();
    });
} else {
    // Report missing HTML elements in the browser console.
    console.error(
        "Knowledge Base search could not start. Check that the HTML IDs " +
        "search-form, search, clear-search, result-count, and no-results exist."
    );
}
