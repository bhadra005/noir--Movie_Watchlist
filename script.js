const API_KEY = `faf1eb835714e532f318e0c3aecd7e1c`
const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const popularContainer = document.getElementById('trending_slider');

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
