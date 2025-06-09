const API_KEY = `faf1eb835714e532f318e0c3aecd7e1c`
const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const popularContainer = document.getElementById('pop_slider');

function search(){
    let filter = document.getElementById('find').ariaValueMax.toUpperCase();
    let item = document.querySelectorAll('')
}



fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
.then(response => response.json())
.then(data => {
    const movies = data.results;
    movies.forEach(movie => {
        const link = document.createElement('a');
        link.href = `movieDetails.html?id=${movie.id}`;
        link.classList.add('card');

        link.innerHTML = `
        <img src="${BASE_IMG_URL + movie.poster_path}" alt="${movie.title}" />
        <div class="info">
        <div class="title">${movie.title}</div>
        </div>
        `;

        popularContainer.appendChild(link);
    });
})
.catch(error => {
    console.error('Error fetching trending movies: ', error);
});

const hollywoodContainer = document.getElementById('holl_slider')
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=en`)
.then(response => response.json())
.then(data => {
    const movies = data.results;
    movies.forEach(movie => {
        const link = document.createElement('a');
        link.href = `movieDetails.html?id=${movie.id}`;
        link.classList.add('card');

        link.innerHTML = `
        <img src="${BASE_IMG_URL + movie.poster_path}" alt="${movie.title}" />
        <div class="info">
        <div class="title">${movie.title}</div>
        </div>
        `;

        hollywoodContainer.appendChild(link);
    });
})
.catch(error => {
    console.error('Error fetching trending movies: ', error);
});

const bollywoodContainer = document.getElementById('boll_slider')
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi`)
.then(response => response.json())
.then(data => {
    const movies = data.results;
    movies.forEach(movie => {
        const link = document.createElement('a');
        link.href = `movieDetails.html?id=${movie.id}`;
        link.classList.add('card');

        link.innerHTML = `
        <img src="${BASE_IMG_URL + movie.poster_path}" alt="${movie.title}" />
        <div class="info">
        <div class="title">${movie.title}</div>
        </div>
        `;

        bollywoodContainer.appendChild(link);
    });
})
.catch(error => {
    console.error('Error fetching trending movies: ', error);
});

const actionContainer = document.getElementById('act_slider')
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`)
.then(response => response.json())
.then(data => {
    const movies = data.results;
    movies.forEach(movie => {
        const link = document.createElement('a');
        link.href = `movieDetails.html?id=${movie.id}`;
        link.classList.add('card');

        link.innerHTML = `
        <img src="${BASE_IMG_URL + movie.poster_path}" alt="${movie.title}" />
        <div class="info">
        <div class="title">${movie.title}</div>
        </div>
        `;

        actionContainer.appendChild(link);
    });
})
.catch(error => {
    console.error('Error fetching trending movies: ', error);
});

const movieId = getMovieIdFromURL();

async function fetchMovieDetails(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch movie data.');
        const movie = await response.json();

        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
        const creditsData = await creditsResponse.json();
        const topCast = creditsData.cast.slice(0,5);

        document.title = `${movie.title} | Movie Watchlist`;

        displayMovieDetails(movie, topCast);
    }
    catch(error){
        console.error('Error: ',error);
        document.getElementById('movie-container').textContent = 'Movie not found.';
    }
}

function displayMovieDetails(movie,cast){
    const container = document.getElementById('movie-container');
    const castHTML = cast.map(actor => `
            <div class="actor-card">
            <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="${actor.name}"/>
            <p>${actor.name}</p>
            </div>
            `).join('');
    container.innerHTML = `
    <div class="movie-img">
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </div>
    <div class="movie-details">
    <p><b>Overview:</b> ${movie.overview}</p>
    <p><b>Date:</b>  ${movie.release_date}</p>
    <p><b>Runtime:</b>  ${movie.runtime} minutes</p>
    <p><b>Rating:</b>  ${movie.vote_average.toFixed(1)} / 10</p>
    <div class="cast">
    <h4>Cast</h4>
    <div class="cast-list">
    ${castHTML}
    </div>
    </div>
    <div class="buttons">
    <button onclick="goBack()">← Back </button>
    <button onclick="addToWatchlist(${movie.id},'${movie.title}')">+ Add to Watchlist </button>
    <button onclick="watchTrailer()">▷ Watch Trailer </button>
    </div>
    </div>
    `;
}
function getMovieIdFromURL(){
    const para = new URLSearchParams(window.location.search);
    return para.get('id');
}
function goBack(){
    window.location.href = "index.html";
}
function addToWatchlist(id, title) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.find(movie => movie.id === id)) {
        watchlist.push({id, title});
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`"${title}" added to watchlist!`);
    }
    else{
        alert(`"${title}" already in your watchlist.`);
    }
}
function watchTrailer(){
    
}

fetchMovieDetails(movieId);


document.querySelectorAll('[data-year-range]').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();

        const range = e.target.getAttribute('data-year-range');
        const [startYear, endYear] = range.split('-');

        const url = `${BASE_URL}?api_key=${API_KEY}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&sort_by=popularity.desc`;

        console.log("Fetching from URL:", url);

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("Fetched data:", data);
            if (data.results) {
                displayMovies(data.results);
            }
            else {
                console.warn("No results key in response:", data);
                document.getElementById('movie-list').innerHTML = '<p>No movies found.</p>';
            }
        }
        catch (err) {
            console.error("Error fetching movies: ", err);
        }
    });
});

function displayMovies(movies) {
  const container = document.getElementById("movie-list");
  container.innerHTML = '';


    if (movies.length === 0) {
        container.innerHTML = '<p>No movies found in this range.</p>';
        return;
    }
    movies.forEach(movie => {
        const link = document.createElement('a');
        link.href = `movieDetails.html?id=${movie.id}`;
        link.classList.add('card2');

        link.innerHTML = `
        <img src="${BASE_IMG_URL + movie.poster_path}" alt="${movie.title}"/>
        <div class="info2">
        <div class="title2">${movie.title}</div>
        </div>
        `;
        container.appendChild(link);
  });
}