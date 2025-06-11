import {addToWatchlist} from './fireStore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const API_KEY = `faf1eb835714e532f318e0c3aecd7e1c`
const movieId = getMovieIdFromURL();
let movieData = null;


async function fetchMovieDetails(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch movie data.');
        const movie = await response.json();
        movieData = movie;

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
    <button onclick="saveToWatchlist()">+ Add to Watchlist </button>
    </div>
    </div>
    `;
}
function getMovieIdFromURL(){
    const para = new URLSearchParams(window.location.search);
    return para.get('id');
}
function goBack(){
    window.location.href = "browse.html";
}
async function saveToWatchlist() {
    const movie = {
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        overview: movieData.overview,
        release_date: movieData.release_date,
        vote_average: movieData.vote_average
    };

    const watchlistName = prompt("enter watchlist name: ");
    if (!watchlistName) return;

    console.log("Attempting to add movie to watchlist:", { watchlistName, movie });

    try{
        await addToWatchlist(watchlistName, movie);
        console.log("addToWatchlist function called successfully.");
        alert(`"${movie.title}" added to ${watchlistName}.`);
    }
    catch (e) {
        alert("Failed to add movie.");
        console.error(e);
    }
}
window.saveToWatchlist = saveToWatchlist;
window.goBack = goBack;
fetchMovieDetails(movieId);