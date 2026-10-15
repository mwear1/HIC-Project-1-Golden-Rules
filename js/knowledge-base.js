// Find the search controls and status messages.
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#search-form");
const clearButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const noResultsMessage = document.querySelector("#no-results");
const articles = document.querySelectorAll("#articles .article");

// Filter articles only after the user submits the search form.
function filterArticles() {
    // Read the search phrase without regard to capitalization.
    const searchText = searchInput.value.toLowerCase().trim();

    // Track the number of matching articles.
    let visibleCount = 0;

    // Check every article against the submitted search phrase.
    articles.forEach(function (article) {
        const articleText = article.textContent.toLowerCase();
        const matchesSearch = articleText.includes(searchText);

        // Show matching articles and hide nonmatching articles.
        article.hidden = !matchesSearch;

        if (matchesSearch) {
            visibleCount++;
        }
    });

    // Update the number of matching articles.
    resultCount.textContent =
        "Showing " + visibleCount + " article(s).";

    // Display a message if no articles match.
    noResultsMessage.hidden = visibleCount !== 0;
}

// Search only when the form is submitted using the Search button
// or the Enter key. Typing alone does not trigger a search.
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    filterArticles();
});

// Clear the search and restore every article.
clearButton.addEventListener("click", function () {
    // Empty the search field.
    searchInput.value = "";

    // Make all articles visible again.
    articles.forEach(function (article) {
        article.hidden = false;
    });

    // Reset the result count and hide the no-results message.
    resultCount.textContent =
        "Showing all " + articles.length + " articles.";

    noResultsMessage.hidden = true;
    searchInput.focus();
});
