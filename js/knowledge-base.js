// Find the search form, input, buttons, and status messages.
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-search");
const resultCount = document.getElementById("result-count");
const noResultsMessage = document.getElementById("no-results");
const articles = document.querySelectorAll("#articles .article");

// Search the articles using the text entered by the user.
function filterArticles() {
    // Convert the search phrase to lowercase and remove extra spaces.
    const searchText = searchInput.value.toLowerCase().trim();

    // Track how many articles match the search.
    let visibleCount = 0;

    // Check every article for the entered phrase.
    articles.forEach(function (article) {
        const articleText = article.textContent.toLowerCase();

        // An empty search shows every article.
        // Otherwise, the article must contain the search phrase.
        const matchesSearch = articleText.includes(searchText);

        // Show matching articles and hide the others.
        article.hidden = !matchesSearch;

        if (matchesSearch) {
            visibleCount++;
        }
    });

    // Display the number of matching articles.
    resultCount.textContent =
        "Showing " + visibleCount + " article(s).";

    // Display the no-results message only when nothing matches.
    noResultsMessage.hidden = visibleCount !== 0;
}

// Prevent the form from reloading the page.
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
});

// Run the search when the Search button is clicked.
searchButton.addEventListener("click", function () {
    filterArticles();
});

// Clear the search and show every article again.
clearButton.addEventListener("click", function () {
    // Clear the search input.
    searchInput.value = "";

    // Restore all articles.
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
