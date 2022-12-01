// ** VARIABELEN ** //
const allMovies = movies; // nieuwe variabelen, als naam veranderd in film_data.js dan alleen hier aanpassen.
const grid = document.getElementById("store"); // betreft de "ul"
const filter = document.getElementsByName("selector"); // betreft de radio-buttons
const input = document.querySelector(".input"); // betreft de search-bar

// ** HERBRUIKBARE FUNCTIES ** //

// Functie - Leeghalen grid //
const clearGrid = function () {
  grid.innerHTML = "";
};

// Functie - Tonen resultaat //
const addMoviesToDom = function (movies) {
  movies.forEach((movies) => {
    // Bepalen variabelen binnen deze functie //
    const listElement = document.createElement("li");
    const anchorElement = document.createElement("a");
    anchorElement.target = "_blank";
    anchorElement.href = "https://imdb.com/title/" + movies.imdbID;
    const imgElement = document.createElement("img");
    imgElement.src = movies.poster;

    // Toevoegen van de elementen aan de grid //
    grid.appendChild(listElement);
    listElement.appendChild(anchorElement);
    anchorElement.appendChild(imgElement);
    imgElement.innerHTML = movies.poster;
  });
};

// Functie - Filteren op filmnaam //
const filterName = function (movies, query) {
  return movies.filter((list) =>
    list.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Functie - Filter op nieuwe films //
const filterNew = function (movies) {
  return movies.filter((list) => list.year > 2013);
};

// Functie - Selecteren filters //
Array.from(filter).forEach(function (event) {
  event.addEventListener("change", (filterInput) => {
    let filterType = filterInput.target.value;
    clearGrid();

    switch (filterType) {
      case "all-movies":
        addMoviesToDom(allMovies);
        break;
      case "new-movies":
        addMoviesToDom(filterNew(allMovies));
        break;
      case "avenger":
      case "x-men":
      case "princess":
      case "batman":
        addMoviesToDom(filterName(allMovies, filterType));
        break;
      default:
        addMoviesToDom(allMovies);
    }
  });
});

// ** TONEN FILMS BIJ LADEN ** //
addMoviesToDom(allMovies);

// ** FILTEREN INPUT SEARCH-BAR ** //
input.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  clearGrid();
  addMoviesToDom(filterName(allMovies, value));
});
