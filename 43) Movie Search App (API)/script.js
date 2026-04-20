const API_KEY = 'e9cf2501'; // Get from OMDB

async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const results = document.getElementById('results');
    
    if (!searchTerm) {
        results.innerHTML = '<p class="error">Please enter a search term</p>';
        return;
    }
    
    results.innerHTML = '<div class="loading">Searching movies...</div>';
    
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.Response === 'False') {
            results.innerHTML = `<p class="error">${data.Error}</p>`;
            return;
        }
        
        results.innerHTML = '';
        
        data.Search.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'no-poster.jpg'}" 
                     class="movie-poster" 
                     alt="${movie.Title}">
                <div class="movie-info">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <p>Type: ${movie.Type}</p>
                    <p>IMDB ID: ${movie.imdbID}</p>
                </div>
            `;
            results.appendChild(movieCard);
        });
    
    } catch (error) {
        results.innerHTML = `<p class="error">Failed to search: ${error.message}</p>`;
    }
}
