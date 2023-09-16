let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        imageLink,
        author
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let urlEl = document.createElement("img");
    urlEl.classList.add("result-img");
    urlEl.src = imageLink;
    resultItemEl.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-title");
    descriptionEl.textContent = author;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    if (searchResults.length === 0) {
        let noResultsEl = document.createElement("p");
        noResultsEl.textContent = "No results found";
        searchResultsEl.appendChild(noResultsEl);
    } else {
        let headingEl = document.createElement("h1");
        headingEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headingEl);
        for (let result of searchResults) {
            createAndAppendSearchResult(result);
        }
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let selectDisplayCount = selectDisplayCountEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput + "&maxResults=" + selectDisplayCount;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results,
                } = jsonData;
                displayResults(jsonData.search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
selectDisplayCountEl.addEventListener("change", searchWikipedia);