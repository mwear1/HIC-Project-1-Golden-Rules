// Find the search controls and status messages in knowledge-base.html.
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#search-form");
const clearButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const noResultsMessage = document.querySelector("#no-results");

// Get all help articles so the script can filter them.
const articles = document.querySelectorAll(".article");

// Filter articles only when the user submits the search form.
function filterArticles() {
    // Make the search case-insensitive and remove extra spaces.
    const searchText = searchInput.value.toLowerCase().trim();

    // Count how many articles match the search.
    let visibleCount = 0;

    // Check each article against the search phrase.
    articles.forEach(function (article) {
        // Include the article title and body in the text search.
        const articleText = article.textContent.toLowerCase();

        // Check whether the article contains the search phrase.
        // An empty search phrase matches every article.
        const matchesSearch = articleText.includes(searchText);

        // Show matching articles and hide articles that do not match.
        article.hidden = !matchesSearch;

        // Count the articles that match the search.
        if (matchesSearch) {
            visibleCount++;
        }
    });

    // Update the number of articles found.
    resultCount.textContent =
        "Showing " + visibleCount + " article(s).";

    // Display a message if no articles match the search.
    noResultsMessage.hidden = visibleCount !== 0;
}

// Run the search only when the user presses the Search button.
searchForm.addEventListener("submit", function (event) {
    // Prevent the browser from reloading the page.
    event.preventDefault();

    // Filter the articles using the submitted search phrase.
    filterArticles();
});

// Clear the search phrase and display all articles again.
clearButton.addEventListener("click", function () {
    // Empty the search field.
    searchInput.value = "";

    // Show every article.
    articles.forEach(function (article) {
        article.hidden = false;
    });

    // Reset the result count and hide the no-results message.
    resultCount.textContent =
        "Showing " + articles.length + " article(s).";

    noResultsMessage.hidden = true;

    // Place the cursor back in the search field.
    searchInput.focus();
});
