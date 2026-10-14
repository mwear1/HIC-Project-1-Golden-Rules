const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category");
const articles = [...document.querySelectorAll(".article")];
const resultCount = document.getElementById("result-count");
const noResults = document.getElementById("no-results");
const clearButton = document.getElementById("clear-search");

function filterArticles() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    let visibleCount = 0;

    articles.forEach(article => {
        const matchesText =
            article.textContent.toLowerCase().includes(query);

        const matchesCategory =
            category === "all" ||
            article.dataset.category === category;

        const show = matchesText && matchesCategory;
        article.hidden = !show;

        if (show) {
            visibleCount++;
        }
    });

    resultCount.textContent =
        `Showing ${visibleCount} of ${articles.length} articles.`;

    noResults.hidden = visibleCount !== 0;
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    filterArticles();
});

searchInput.addEventListener("input", filterArticles);
categoryFilter.addEventListener("change", filterArticles);

clearButton.addEventListener("click", function() {
    searchInput.value = "";
    categoryFilter.value = "all";
    filterArticles();
    searchInput.focus();
});

filterArticles();
