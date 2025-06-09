async function searchMovie() {
    const API_KEY = `faf1eb835714e532f318e0c3aecd7e1c`
    const BASE_IMG_URL = `https://image.tmdb.org/t/p/w500`
    const movieContainer = document.getElementById('film-search');
    const query = document.getElementById('find').value.trim();
    movieContainer.innerHTML = '';

    if (!query) return;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`);
        const data = await response.json();

        const movies = data.results;

        if (movies.length === 0) {
            movieContainer.innerHTML = `<p> No results found.</p>`;
            return;
        }

        movies.forEach(movie => {
            const link = document.createElement('a');
            link.href = `movieDetails.html?id=${movie.id}`;
            link.classList.add('card1');

            link.innerHTML = `
            <img src=${BASE_IMG_URL + movie.poster_path}" alt=${movie.title}" />
            <div class="info1">
                <div class="title1">${movie.title}</div>
            </div>
            `;

            movieContainer.appendChild(link);
        });
    }
    catch (error) {
        console.error("Error fetching movies: ", error);
        movieContainer.innerHTML = `<p>Something went wrong. Please try again.</p>.`;
    }
}