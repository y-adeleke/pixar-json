let fileButton = document.getElementById("moviefile");
let yearsFilter = document.getElementById("movie-year");
let directorFilter = document.getElementById("movie-director");
let orderFilter = document.getElementById("movie-order");
let moviePoster = document.getElementById("movie-posters");

/*
I created a class for all movies..
in each object, movie informtion such as title, director, releaseDate, imdbRating, posterUrl
it also includes a movie generator method that generate a html movie template.
 */
class Movie {
  constructor(movie) {
    let { title, director, releaseDate, imdbRating, posterUrl } = movie;
    this.title = title;
    this.director = director;
    this.releaseYear = releaseDate.split(" ")[2];
    this.imdbRating = imdbRating;
    this.posterUrl = posterUrl;
  }
  MovieGenerator = () => {
    let imgcontainer = document.createElement("div");
    imgcontainer.className = "movie";
    moviePoster.appendChild(imgcontainer);
    let imgelement = document.createElement("img");
    imgelement.src = "./images/" + this.posterUrl;
    imgcontainer.appendChild(imgelement);
  };
}

//objects of the movie class are stored here
let moviesobject = [];

///////////////////////////////////////////////////////////
fileButton.addEventListener("change", function (e) {
  let reader = new FileReader();
  reader.onload = () => {
    //read the json file
    let moviesData = JSON.parse(reader.result);
    moviePoster.innerHTML = "";
    //map through the movies dat and create a new movie object for each data
    //aslo push it to the movies =object array
    moviesData.movies.map((movie) => {
      moviesobject.push(new Movie(movie));
    });
    moviesobject.map((movie) => movie.MovieGenerator());
  };
  reader.readAsText(e.target.files[0]);
});

///////////////////////////////////////////////////////////
yearsFilter.addEventListener("change", function () {
  //reset the other two select element
  directorFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  // Your Code Here
  moviePoster.innerHTML = "";
  let moviesfound = 0;

  if (yearsFilter.value == "All Years") {
    moviesobject.map((movie) => movie.MovieGenerator());
    moviesfound++;
  } else {
    moviesobject.map((movie) => {
      if (movie.releaseYear >= yearsFilter.value) {
        movie.MovieGenerator();
        moviesfound++;
      }
    });
  }
  if (moviesfound == 0) console.log("no movies found!");
});

///////////////////////////////////////////////////////////
directorFilter.addEventListener("change", function () {
  //reset the other two select element
  yearsFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  // Your Code Here
  moviePoster.innerHTML = "";
  let moviesfound = 0;
  if (directorFilter.value == "All Directors") {
    moviesobject.map((movie) => movie.MovieGenerator());
    moviesfound++;
  } else {
    moviesobject.map((movie) => {
      if (movie.director == directorFilter.value) {
        movie.MovieGenerator();
        moviesfound++;
      }
    });
  }
  if (moviesfound == 0) console.log("no movies found!");
});

///////////////////////////////////////////////////////////
orderFilter.addEventListener("change", function () {
  //reset the other two select element
  directorFilter.selectedIndex = 0;
  yearsFilter.selectedIndex = 0;
  // Your Code Here
  moviePoster.innerHTML = "";
  if (orderFilter.value == "Descending") {
    let reversedMovies = [...moviesobject].reverse();
    reversedMovies.map((movie) => movie.MovieGenerator());
  } else moviesobject.map((movie) => movie.MovieGenerator());
});
