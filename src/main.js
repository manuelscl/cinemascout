const LANGUAGES = {
  en: 'en-US',
  es: 'es-ES'
};
const currentLanguage = 'en';

const BASE_URL = 'https://api.themoviedb.org/3';

/* ---------- Render Helpers ---------- */

function renderMovieList(movies, container) {
  container.innerHTML = ''; // Clean before re-rendering
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');

    movieContainer.classList.add('movie-container');
    movieImage.classList.add('movie-img');
    movieImage.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    movieImage.alt = movie.title;

    movieContainer.appendChild(movieImage);
    container.appendChild(movieContainer);
  });
}

function renderCategoryList(categories, container) {
  container.innerHTML = '';
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    const categoryTitle = document.createElement('h3');

    categoryContainer.classList.add('category-container');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = category.name;
    categoryContainer.id = `id${category.id}`;

    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

/* ---------- API Calls ---------- */

async function fetchTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?language=${LANGUAGES[currentLanguage]}&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

async function fetchMovieGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?language=${LANGUAGES[currentLanguage]}&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
}

/* ---------- Render Functions ---------- */

async function displayTrendingMovies() {
  const container = document.querySelector('.trendingPreview-movieList');
  const movies = await fetchTrendingMovies();
  renderMovieList(movies, container);
}

async function displayCategoryPreview() {
  const container = document.querySelector('.categoriesPreview-list');
  const genres = await fetchMovieGenres();
  renderCategoryList(genres, container);
}


displayTrendingMovies();
displayCategoryPreview();