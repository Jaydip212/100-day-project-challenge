document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const newsContainer = document.getElementById('news-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentYearSpan = document.getElementById('current-year');
    const topicButtonsContainer = document.getElementById('topic-buttons');
    const sortBySelect = document.getElementById('sort-by');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const resultsInfoDiv = document.getElementById('results-info');

    // --- CONFIGURATION ---
    // !! YOUR API KEY IS PLACED HERE !!
    // !! Remember to REGENERATE this key at NewsAPI.org if it was shared publicly !!
    const API_KEY = '877dd6e1a3ac43c0a376107b54cdf50a'; // <--- YOUR KEY IS HERE
    const BASE_URL = 'https://newsapi.org/v2/everything';
    const DEFAULT_QUERY = 'Artificial Intelligence OR Machine Learning OR LLM OR OpenAI OR DeepMind';
    const LANGUAGE = 'en';
    const PAGE_SIZE = 12; // Load fewer per page for Load More feature

    // --- STATE VARIABLES ---
    let currentPage = 1;
    let currentQuery = DEFAULT_QUERY;
    let currentSortBy = 'publishedAt'; // Default sort
    let totalResults = 0;
    let isLoading = false; // Prevent multiple simultaneous requests
    let activeTopicButton = topicButtonsContainer.querySelector('.topic-btn.active');

    // --- API Fetching ---
    async function fetchNews(query, sortBy, page, append = false) {
        // CORRECTED Check: Check for loading state OR if API_KEY is missing/still the original placeholder string
        if (isLoading || !API_KEY || API_KEY === 'YOUR_NEWS_API_KEY') { // <-- This correctly checks for the PLACEHOLDER text, not your actual key!
            if (!API_KEY || API_KEY === 'YOUR_NEWS_API_KEY') { // If key is missing or is placeholder...
                 showError('API Key missing or is placeholder. Please add your real NewsAPI key in script.js');
            } else {
                 // This case should ideally not be hit if API_KEY is correctly defined above.
                 showError('Invalid API Key configuration.');
            }
            return; // Don't fetch if already loading or API key issue
        }

        setLoadingState(true, append); // Set loading visuals
        if (!append) { // Clear previous results only if it's a new search/sort
            newsContainer.innerHTML = '';
             resultsInfoDiv.style.display = 'none'; // Hide results count on new search
        }
        hideError();

        const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&language=${LANGUAGE}&sortBy=${sortBy}&page=${page}&pageSize=${PAGE_SIZE}`;
        console.log("Fetching URL:", url); // For debugging

        try {
            const response = await fetch(url);

             // Handle specific HTTP errors
             if (response.status === 401) throw new Error("Unauthorized (Check API Key is valid and active)");
             if (response.status === 429) throw new Error("Rate Limited (Too many requests - check NewsAPI plan limits)");
             if (response.status === 400) throw new Error("Bad Request (Likely issue with search query syntax)");
             if (response.status === 426) throw new Error("Upgrade Required (NewsAPI may require HTTPS or other changes)");
             if (!response.ok) {
                let errorData; try { errorData = await response.json(); } catch (e) {}
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData?.message || response.statusText}`);
             }

            const data = await response.json();

            if (data.status === 'ok') {
                 if (!append) {
                    totalResults = data.totalResults; // Update total results only on the first page
                    displayResultsInfo(totalResults, query);
                 }
                 displayNews(data.articles, append);
                 updateLoadMoreButton(data.articles.length); // Check if more can be loaded
            } else {
                // Handle API errors reported within the JSON response (e.g., 'apiKeyInvalid')
                throw new Error(`API Error: ${data.code || 'Unknown code'} - ${data.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error('Error fetching news:', error);
            showError(`Failed to fetch news: ${error.message}`);
             // Hide load more button on error
             loadMoreBtn.style.display = 'none';
             resultsInfoDiv.style.display = 'none';

        } finally {
            setLoadingState(false, append); // Reset loading visuals
        }
    }

    // --- DOM Manipulation & UI Updates ---
    function displayNews(articles, append = false) {
        // Ensure loading is hidden *before* potentially showing "No articles"
        loadingIndicator.style.display = 'none';

        if (!append && (!articles || articles.length === 0)) {
            newsContainer.innerHTML = `<p class="no-articles">No articles found for "${currentQuery}". Try a different search or topic.</p>`;
             loadMoreBtn.style.display = 'none'; // Hide button if no results on initial load
            return;
        }
        if (append && (!articles || articles.length === 0)){
            // If appending and get 0, means no more articles
            // You might want a less obtrusive message here or just hide the button
             console.log("No more articles found to load.");
             loadMoreBtn.style.display = 'none'; // Hide button permanently if empty append
             // Optional: Add a subtle message instead of using the main error div
             // showError("No more articles to load.", true);
             return;
        }

        const fragment = document.createDocumentFragment(); // Efficient DOM updates
        articles.forEach(article => {
            if (!article.title || !article.url || article.title === '[Removed]') {
                 console.log("Skipping article:", article); // Log skipped articles
                return;
            }

            const articleElement = document.createElement('article');
            articleElement.classList.add('news-article');

            // LAZY LOADING: use data-src and loading="lazy"
            const imageUrl = article.urlToImage || 'images/placeholder.png';
            let publishedDate = 'Date unknown';
             try { if (article.publishedAt) { publishedDate = new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); } } catch (e) { console.error("Date parse error:", e); }

            articleElement.innerHTML = `
                <img data-src="${imageUrl}" src="images/placeholder.png" alt="" class="lazy" loading="lazy" onerror="this.onerror=null; this.src='images/placeholder.png'; this.alt='Image failed to load'; this.classList.remove('lazy');">
                <div class="article-content">
                    <h2><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h2>
                    <p>${article.description || 'No description available.'}</p>
                    <div class="article-meta">
                        <span class="source">${article.source?.name || 'Unknown Source'}</span>
                        <span class="date">${publishedDate}</span>
                    </div>
                    <!-- Link is now on the title -->
                    <!-- <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="read-more">Read More</a> -->
                </div>
            `;
             // Add alt text after element creation to handle potential quotes in title
            const imgElement = articleElement.querySelector('img');
            if (imgElement) {
                imgElement.alt = article.title || 'News image';
             }
              // Make title clickable
            const titleLink = articleElement.querySelector('.article-content h2 a');
             if (!titleLink) { // Fallback if querySelector fails unexpectedly
                 const titleElement = articleElement.querySelector('.article-content h2');
                 if(titleElement){
                     const link = document.createElement('a');
                     link.href = article.url;
                     link.target = '_blank';
                     link.rel = 'noopener noreferrer';
                     link.textContent = titleElement.textContent;
                     titleElement.innerHTML = '';
                     titleElement.appendChild(link);
                 }
            }


            fragment.appendChild(articleElement);
        });

         if (append) {
            newsContainer.appendChild(fragment);
         } else {
            // newsContainer.innerHTML = ''; // Clear container (already done in setLoadingState/fetchNews)
             newsContainer.appendChild(fragment);
         }

        // Simple check to make sure images load, relying mostly on native lazy loading
        requestAnimationFrame(() => {
             const lazyImages = newsContainer.querySelectorAll('img.lazy[data-src]');
             lazyImages.forEach(img => {
                 if (img.complete && img.naturalWidth === 0 && img.src.includes('placeholder')) {
                     // If browser reports complete but size is 0 (failed load) and it's placeholder
                     img.src = img.dataset.src; // Attempt setting src again (fallback)
                 } else if (!img.src.includes('placeholder') || img.complete){
                     // If already loaded (src set) or image is fully loaded remove the class
                     img.classList.remove('lazy');
                 }
            });
         });
    }

     function displayResultsInfo(count, query) {
         // Only display if we have a positive count
         if (count > 0) {
            resultsInfoDiv.textContent = `Found approximately ${count.toLocaleString()} results for "${query}"`;
             resultsInfoDiv.style.display = 'block';
         } else if(count === 0) {
            // Explicitly state if zero results were found by the API
            resultsInfoDiv.textContent = `Found 0 results for "${query}".`;
             resultsInfoDiv.style.display = 'block';
         } else {
            resultsInfoDiv.style.display = 'none'; // Hide if count is undefined or negative (error)
         }
     }


    function setLoadingState(loading, isAppending) {
        isLoading = loading;
        if (loading) {
            if (!isAppending) { // Show main loading indicator only for new searches
                errorMessage.style.display = 'none';
                loadingIndicator.style.display = 'block';
                newsContainer.innerHTML = ''; // Clear visually immediately
                 loadMoreBtn.style.display = 'none'; // Hide load more during initial load
                 resultsInfoDiv.style.display = 'none'; // Hide old results count
            } else {
                 loadMoreBtn.textContent = 'Loading...'; // Update button text
                 loadMoreBtn.disabled = true;
            }
            // Disable controls
             searchButton.disabled = true;
             searchInput.disabled = true;
             sortBySelect.disabled = true;
             themeToggleButton.disabled = true;
            topicButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
        } else {
            loadingIndicator.style.display = 'none';
             loadMoreBtn.textContent = 'Load More Articles';
             loadMoreBtn.disabled = false; // Re-enable; updateLoadMoreButton will hide if needed
            // Re-enable controls
             searchButton.disabled = false;
             searchInput.disabled = false;
             sortBySelect.disabled = false;
             themeToggleButton.disabled = false;
            topicButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
             // Visibility of loadMoreBtn is handled by updateLoadMoreButton after fetch completes
        }
    }

     function showError(message, isInfo = false) {
         errorMessage.textContent = message;
         errorMessage.style.display = 'block';
        if(isInfo) {
             errorMessage.classList.add('info'); // You might need CSS for .error-message.info
        } else {
             errorMessage.classList.remove('info');
             // On major error, clear results area and hide load more
             newsContainer.innerHTML = '';
             loadMoreBtn.style.display = 'none';
             resultsInfoDiv.style.display = 'none';
             loadingIndicator.style.display = 'none';
        }
     }


     function hideError() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
        errorMessage.classList.remove('info');
     }

    function updateLoadMoreButton(articlesFetchedCount) {
         // Calculate total loaded articles so far AFTER the new batch has been potentially added
         const currentlyDisplayedCount = newsContainer.querySelectorAll('.news-article').length;

        console.log(`Fetched: ${articlesFetchedCount}, Displayed: ${currentlyDisplayedCount}, Total Available: ${totalResults}`);

        // Show button if:
        // 1. The API reported more total results than currently displayed
        // 2. The last fetch returned a full page (meaning more *might* be available, even if totalResults is inaccurate)
        if (currentlyDisplayedCount < totalResults && articlesFetchedCount >= PAGE_SIZE) {
             loadMoreBtn.style.display = 'block';
             loadMoreBtn.disabled = isLoading; // Should be false here, but as safeguard
         } else {
             loadMoreBtn.style.display = 'none'; // Hide button if no more results expected
             if(currentlyDisplayedCount > 0 && articlesFetchedCount < PAGE_SIZE) {
                 console.log("Reached end of results (API returned fewer articles than page size).");
             } else if (currentlyDisplayedCount >= totalResults && totalResults > 0) {
                console.log("Reached end of results (Displayed count meets or exceeds reported total).");
             }
         }
    }

     function setActiveTopicButton(buttonElement) {
         if (activeTopicButton) {
            activeTopicButton.classList.remove('active');
         }
         if(buttonElement){
             buttonElement.classList.add('active');
             activeTopicButton = buttonElement;
         } else {
            activeTopicButton = null; // Ensure reference is cleared if no button is active
         }
     }


    // --- Event Listeners ---
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm && searchTerm !== currentQuery) { // Only search if term is new
            currentPage = 1;
            currentQuery = searchTerm;
             setActiveTopicButton(null); // Deactivate topic buttons on custom search
            fetchNews(currentQuery, currentSortBy, currentPage, false);
            // resultsInfoDiv.textContent = `Searching for "${searchTerm}"...`; // SetLoading state handles visual queues
            // resultsInfoDiv.style.display = 'block';
        } else if (!searchTerm) {
            showError("Please enter a search term.", true);
        }
    });

    sortBySelect.addEventListener('change', (e) => {
        const newSortBy = e.target.value;
        if (newSortBy !== currentSortBy) {
            currentSortBy = newSortBy;
            currentPage = 1;
            fetchNews(currentQuery, currentSortBy, currentPage, false);
        }
    });

    loadMoreBtn.addEventListener('click', () => {
        if (!isLoading) { // Extra check
            currentPage++;
            fetchNews(currentQuery, currentSortBy, currentPage, true);
        }
    });

    topicButtonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('topic-btn') && !e.target.classList.contains('active')) { // Check if it's a button and not already active
            const topicQuery = e.target.getAttribute('data-topic');
            if (topicQuery) {
                currentPage = 1;
                currentQuery = topicQuery;
                searchInput.value = ''; // Clear search input
                setActiveTopicButton(e.target); // Highlight clicked button FIRST
                fetchNews(currentQuery, currentSortBy, currentPage, false); // Then fetch
                // resultsInfoDiv.textContent = `Loading news for "${e.target.textContent}"...`;
                // resultsInfoDiv.style.display = 'block';
            }
        }
    });

    themeToggleButton.addEventListener('click', toggleTheme);

    // --- Theme Handling ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleButton.textContent = 'Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Dark Mode';
        }
    }

    function toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('newsAggregatorTheme', currentTheme);
    }

    // --- Initialization ---
    function init() {
        if (currentYearSpan) {
             currentYearSpan.textContent = new Date().getFullYear();
        }
        const savedTheme = localStorage.getItem('newsAggregatorTheme') || 'light'; // Default to light
        applyTheme(savedTheme);

        // Set default sort selection in dropdown
         sortBySelect.value = currentSortBy;

        // Set initial active topic button based on DEFAULT_QUERY
        const initialActiveButton = topicButtonsContainer.querySelector(`button[data-topic="${DEFAULT_QUERY}"]`);
         setActiveTopicButton(initialActiveButton);


         // Initial fetch with defaults
         fetchNews(currentQuery, currentSortBy, currentPage, false);
    }

    init(); // Run initialization
});