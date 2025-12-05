document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. SEARCH FUNCTIONALITY
    ================================================== */
    const mainSearchInput = document.getElementById('mainSearchInput');
    const mainSearchBtn = document.getElementById('mainSearchBtn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const totalResults = document.getElementById('totalResults');
    const noResults = document.getElementById('noResults');
    const activeFilters = document.getElementById('activeFilters');
    const resetSearch = document.getElementById('resetSearch');
    const hasilPencarianBtn = document.getElementById('hasilPencarianBtn');
    
    // Sample anime data
    const animeData = [
        {
            id: 1,
            title: "Fate/Stay Night: Unlimited Blade Works",
            image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Fantasy"],
            year: 2014,
            status: "Completed",
            type: "TV Series",
            rating: 4.8,
            episodes: 26,
            description: "Shirou Emiya is a high school student and amateur magus living in Fuyuki City. He is dragged into the Fifth Holy Grail War, a secret magical tournament."
        },
        {
            id: 2,
            title: "Demon Slayer: Kimetsu no Yaiba",
            image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Fantasy", "Adventure"],
            year: 2019,
            status: "Completed",
            type: "TV Series",
            rating: 4.9,
            episodes: 26,
            description: "Tanjiro sets out to become a demon slayer to avenge his family and cure his sister."
        },
        {
            id: 3,
            title: "Sword Art Online: Alicization",
            image: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Adventure", "Sci-Fi"],
            year: 2018,
            status: "Completed",
            type: "TV Series",
            rating: 4.5,
            episodes: 47,
            description: "Kirito awakens in a vast, fantasy-like virtual world. With only murky memories, he starts his journey."
        },
        {
            id: 4,
            title: "Attack on Titan: The Final Season",
            image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Drama", "Fantasy"],
            year: 2020,
            status: "Completed",
            type: "TV Series",
            rating: 4.9,
            episodes: 28,
            description: "The epic conclusion to the story of Eren Yeager and the battle for Paradis Island."
        },
        {
            id: 5,
            title: "Jujutsu Kaisen",
            image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Supernatural", "Fantasy"],
            year: 2020,
            status: "Completed",
            type: "TV Series",
            rating: 4.7,
            episodes: 24,
            description: "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse."
        },
        {
            id: 6,
            title: "My Hero Academia Season 6",
            image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Superhero", "Comedy"],
            year: 2022,
            status: "Completed",
            type: "TV Series",
            rating: 4.6,
            episodes: 25,
            description: "The students of U.A. High School face their greatest challenge yet in the Paranormal Liberation War."
        },
        {
            id: 7,
            title: "One Piece: Film Red",
            image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Adventure", "Fantasy"],
            year: 2022,
            status: "Completed",
            type: "Movie",
            rating: 4.8,
            episodes: 1,
            description: "The Straw Hat Pirates attend a concert by the famous singer Uta, only to find themselves in a new adventure."
        },
        {
            id: 8,
            title: "Spy x Family",
            image: "https://images.unsplash.com/photo-1590955559144-a82332cf2c08?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Comedy", "Slice of Life"],
            year: 2022,
            status: "Ongoing",
            type: "TV Series",
            rating: 4.8,
            episodes: 25,
            description: "A spy, an assassin, and a telepath form a fake family to achieve their individual goals."
        },
        {
            id: 9,
            title: "Chainsaw Man",
            image: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Horror", "Supernatural"],
            year: 2022,
            status: "Completed",
            type: "TV Series",
            rating: 4.7,
            episodes: 12,
            description: "Denji becomes Chainsaw Man, a devil-human hybrid, and joins the Public Safety Devil Hunters."
        },
        {
            id: 10,
            title: "Vinland Saga Season 2",
            image: "https://images.unsplash.com/photo-1542256844-d3d05538a5b8?q=80&w=400&auto=format&fit=crop",
            genres: ["Action", "Adventure", "Drama"],
            year: 2023,
            status: "Completed",
            type: "TV Series",
            rating: 4.9,
            episodes: 24,
            description: "Thorfinn's journey continues as he seeks redemption and a new purpose in life."
        }
    ];
    
    // Search suggestions
    const searchSuggestionsData = [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Romance",
        "Sci-Fi",
        "Slice of Life",
        "2024",
        "2023",
        "Ongoing",
        "Completed",
        "Movie",
        "TV Series"
    ];
    
    // Current search state
    let currentSearchTerm = '';
    let currentFilters = {
        genres: [],
        years: [],
        status: [],
        rating: [],
        type: []
    };
    let currentSort = 'popular';
    let currentView = 'grid';
    
    // Initialize search functionality
    function initSearch() {
        // Render initial results
        renderResults(animeData);
        
        // Event listeners
        mainSearchInput.addEventListener('input', handleSearchInput);
        mainSearchBtn.addEventListener('click', performSearch);
        mainSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Button Hasil Pencarian functionality
        if (hasilPencarianBtn) {
            hasilPencarianBtn.addEventListener('click', () => {
                performSearch();
            });
        }
        
        if (resetSearch) {
            resetSearch.addEventListener('click', resetAll);
        }
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-search-bar')) {
                searchSuggestions.classList.remove('active');
            }
        });
    }
    
    function handleSearchInput() {
        const value = mainSearchInput.value.trim();
        
        if (value.length > 0) {
            // Filter suggestions based on input
            const filteredSuggestions = searchSuggestionsData.filter(suggestion => 
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            
            renderSearchSuggestions(filteredSuggestions);
            searchSuggestions.classList.add('active');
        } else {
            searchSuggestions.classList.remove('active');
        }
    }
    
    function renderSearchSuggestions(suggestions) {
        searchSuggestions.innerHTML = '';
        
        if (suggestions.length === 0) {
            const noSuggestion = document.createElement('div');
            noSuggestion.className = 'suggestion-item';
            noSuggestion.textContent = 'Tidak ada saran ditemukan';
            searchSuggestions.appendChild(noSuggestion);
            return;
        }
        
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                <i class="fas fa-search"></i>
                <span>${suggestion}</span>
            `;
            
            suggestionItem.addEventListener('click', () => {
                mainSearchInput.value = suggestion;
                performSearch();
                searchSuggestions.classList.remove('active');
            });
            
            searchSuggestions.appendChild(suggestionItem);
        });
    }
    
    function performSearch() {
        const searchTerm = mainSearchInput.value.trim();
        currentSearchTerm = searchTerm;
        
        // Filter anime based on search term and current filters
        let filteredAnime = animeData.filter(anime => {
            // Search term filter
            const matchesSearch = searchTerm === '' || 
                anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                anime.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                anime.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Genre filter
            const matchesGenre = currentFilters.genres.length === 0 || 
                currentFilters.genres.some(genre => anime.genres.includes(genre));
            
            // Year filter
            const matchesYear = currentFilters.years.length === 0 || 
                currentFilters.years.includes(anime.year.toString());
            
            // Status filter
            const matchesStatus = currentFilters.status.length === 0 || 
                currentFilters.status.includes(anime.status.toLowerCase());
            
            // Type filter
            const matchesType = currentFilters.type.length === 0 || 
                currentFilters.type.includes(anime.type.toLowerCase());
            
            // Rating filter
            const matchesRating = currentFilters.rating.length === 0 || 
                currentFilters.rating.some(rating => {
                    const numRating = parseInt(rating);
                    return anime.rating >= numRating && anime.rating < numRating + 1;
                });
            
            return matchesSearch && matchesGenre && matchesYear && matchesStatus && matchesType && matchesRating;
        });
        
        // Sort results
        filteredAnime = sortResults(filteredAnime, currentSort);
        
        // Render results
        renderResults(filteredAnime);
        
        // Update active filters display
        updateActiveFilters();
    }
    
    function sortResults(results, sortBy) {
        switch(sortBy) {
            case 'newest':
                return results.sort((a, b) => b.year - a.year);
            case 'rating':
                return results.sort((a, b) => b.rating - a.rating);
            case 'title':
                return results.sort((a, b) => a.title.localeCompare(b.title));
            case 'popular':
            default:
                return results; // Default order (already sorted by popularity in sample data)
        }
    }
    
    function renderResults(results) {
        resultsGrid.innerHTML = '';
        
        if (results.length === 0) {
            noResults.style.display = 'block';
            resultsGrid.style.display = 'none';
            resultsCount.textContent = '0';
            return;
        }
        
        noResults.style.display = 'none';
        resultsGrid.style.display = 'grid';
        resultsCount.textContent = results.length;
        totalResults.textContent = animeData.length;
        
        results.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.className = `anime-card ${currentView === 'list' ? 'list-view' : ''}`;
            
            const statusBadge = anime.status === 'Ongoing' ? '<span class="status-badge">Ongoing</span>' : '';
            
            animeCard.innerHTML = `
                <a href="watch.html" class="card-link">
                    <div class="card-poster">
                        <img src="${anime.image}" alt="${anime.title}">
                        <div class="card-overlay">
                            <div class="play-indicator">
                                <i class="fas fa-play"></i>
                                <span>Watch Now</span>
                            </div>
                        </div>
                        <div class="card-badges">
                            <span class="ep-badge">${anime.episodes} EP</span>
                            ${statusBadge}
                        </div>
                    </div>
                    <div class="card-detail">
                        <h3 class="anime-title">${anime.title}</h3>
                        <div class="genre-badges-bottom">
                            ${anime.genres.map(genre => `<span class="genre-badge">${genre}</span>`).join('')}
                        </div>
                        <div class="anime-meta">
                            <span><i class="fas fa-star"></i> ${anime.rating}</span>
                        </div>
                    </div>
                </a>
            `;
            
            resultsGrid.appendChild(animeCard);
        });
    }
    
    function updateActiveFilters() {
        activeFilters.innerHTML = '';
        
        // Add search term if exists
        if (currentSearchTerm) {
            const searchFilter = document.createElement('div');
            searchFilter.className = 'active-filter';
            searchFilter.innerHTML = `
                <span>Search: "${currentSearchTerm}"</span>
                <button class="remove" data-type="search">
                    <i class="fas fa-times"></i>
                </button>
            `;
            activeFilters.appendChild(searchFilter);
        }
        
        // Add genre filters
        currentFilters.genres.forEach(genre => {
            const genreFilter = document.createElement('div');
            genreFilter.className = 'active-filter';
            genreFilter.innerHTML = `
                <span>Genre: ${genre}</span>
                <button class="remove" data-type="genre" data-value="${genre}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            activeFilters.appendChild(genreFilter);
        });
        
        // Add year filters
        currentFilters.years.forEach(year => {
            const yearFilter = document.createElement('div');
            yearFilter.className = 'active-filter';
            yearFilter.innerHTML = `
                <span>Year: ${year}</span>
                <button class="remove" data-type="year" data-value="${year}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            activeFilters.appendChild(yearFilter);
        });
        
        // Add status filters
        currentFilters.status.forEach(status => {
            const statusFilter = document.createElement('div');
            statusFilter.className = 'active-filter';
            statusFilter.innerHTML = `
                <span>Status: ${status}</span>
                <button class="remove" data-type="status" data-value="${status}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            activeFilters.appendChild(statusFilter);
        });
        
        // Add type filters
        currentFilters.type.forEach(type => {
            const typeFilter = document.createElement('div');
            typeFilter.className = 'active-filter';
            typeFilter.innerHTML = `
                <span>Type: ${type}</span>
                <button class="remove" data-type="type" data-value="${type}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            activeFilters.appendChild(typeFilter);
        });
        
        // Add rating filters
        currentFilters.rating.forEach(rating => {
            const ratingFilter = document.createElement('div');
            ratingFilter.className = 'active-filter';
            ratingFilter.innerHTML = `
                <span>Rating: ${rating}+</span>
                <button class="remove" data-type="rating" data-value="${rating}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            activeFilters.appendChild(ratingFilter);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.active-filter .remove').forEach(button => {
            button.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const value = this.getAttribute('data-value');
                
                if (type === 'search') {
                    mainSearchInput.value = '';
                    currentSearchTerm = '';
                } else {
                    currentFilters[type] = currentFilters[type].filter(item => item !== value);
                    
                    // Uncheck the corresponding checkbox
                    const checkbox = document.querySelector(`input[name="${type}"][value="${value}"]`);
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                }
                
                performSearch();
            });
        });
    }
    
    function resetAll() {
        // Reset search input
        mainSearchInput.value = '';
        currentSearchTerm = '';
        
        // Reset filters
        currentFilters = {
            genres: [],
            years: [],
            status: [],
            rating: [],
            type: []
        };
        
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset sort to default
        const defaultSort = document.querySelector('input[name="sort"][value="popular"]');
        if (defaultSort) {
            defaultSort.checked = true;
        }
        currentSort = 'popular';
        
        // Perform search with reset values
        performSearch();
    }
    
    /* ==================================================
       2. FILTER FUNCTIONALITY
    ================================================== */
    const filterToggles = document.querySelectorAll('.filter-toggle');
    const applyFilters = document.getElementById('applyFilters');
    const resetFilters = document.getElementById('resetFilters');
    const viewOptions = document.querySelectorAll('.view-option');
    
    function initFilters() {
        // Filter toggle functionality
        filterToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                const options = document.getElementById(target);
                
                if (options) {
                    options.classList.toggle('collapsed');
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                }
            });
        });
        
        // Apply filters
        if (applyFilters) {
            applyFilters.addEventListener('click', function() {
                // Get selected genres
                currentFilters.genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
                    .map(checkbox => checkbox.value);
                
                // Get selected years
                currentFilters.years = Array.from(document.querySelectorAll('input[name="year"]:checked'))
                    .map(checkbox => checkbox.value);
                
                // Get selected status
                currentFilters.status = Array.from(document.querySelectorAll('input[name="status"]:checked'))
                    .map(checkbox => checkbox.value);
                
                // Get selected rating
                currentFilters.rating = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
                    .map(checkbox => checkbox.value);
                
                // Get selected type
                currentFilters.type = Array.from(document.querySelectorAll('input[name="type"]:checked'))
                    .map(checkbox => checkbox.value);
                
                // Get selected sort
                const selectedSort = document.querySelector('input[name="sort"]:checked');
                if (selectedSort) {
                    currentSort = selectedSort.value;
                }
                
                // Perform search with new filters
                performSearch();
            });
        }
        
        // Reset filters
        if (resetFilters) {
            resetFilters.addEventListener('click', function() {
                // Uncheck all filter checkboxes
                document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                // Reset sort to default
                const defaultSort = document.querySelector('input[name="sort"][value="popular"]');
                if (defaultSort) {
                    defaultSort.checked = true;
                }
                
                // Reset current filters
                currentFilters = {
                    genres: [],
                    years: [],
                    status: [],
                    rating: [],
                    type: []
                };
                
                // Update active filters
                updateActiveFilters();
            });
        }
        
        // View options
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                
                // Update active view option
                viewOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update current view
                currentView = view;
                
                // Update results grid
                resultsGrid.classList.toggle('list-view', view === 'list');
                
                // Re-render results with new view
                performSearch();
            });
        });
    }
    
    /* ==================================================
       3. HEADER & NAVIGATION FUNCTIONALITY (FIXED)
    ================================================== */
    const header = document.getElementById('mainHeader');
    const backToTop = document.getElementById('backToTop');
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const searchTrigger = document.getElementById('searchTrigger');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    function initHeader() {
        // Scroll effects
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                if (header) header.classList.add('scrolled');
                if (backToTop) backToTop.classList.add('show');
            } else {
                if (header) header.classList.remove('scrolled');
                if (backToTop) backToTop.classList.remove('show');
            }
        });
        
        // Mobile menu
        if (mobileToggle && navbar) {
            mobileToggle.addEventListener('click', () => {
                navbar.classList.toggle('active');
                // Simple animation for hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                if (navbar.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
        
        // FIXED: Search trigger - Instant response
        if (searchTrigger && mainSearchInput) {
            searchTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Immediate focus - no delay
                mainSearchInput.focus();
                
                // Optional: Add visual feedback
                const searchContainer = document.querySelector('.search-input-container');
                if (searchContainer) {
                    searchContainer.style.borderColor = 'var(--primary)';
                    searchContainer.style.boxShadow = '0 0 0 3px var(--primary-glow)';
                    
                    // Remove highlight after blur
                    mainSearchInput.addEventListener('blur', function removeHighlight() {
                        searchContainer.style.borderColor = '';
                        searchContainer.style.boxShadow = '';
                        mainSearchInput.removeEventListener('blur', removeHighlight);
                    }, { once: true });
                }
                
                // Smooth scroll to search (non-blocking)
                requestAnimationFrame(() => {
                    const searchHeader = document.querySelector('.search-header');
                    if (searchHeader) {
                        searchHeader.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                });
            });
        }
        
        // User dropdown functionality
        if (userBtn && userDropdown) {
            userBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
            });
            
            // Close dropdown when pressing Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
                    userDropdown.classList.remove('active');
                }
            });
            
            // Handle dropdown item clicks
            const dropdownItems = userDropdown.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const itemText = this.querySelector('span').textContent;
                    
                    // Log action (dalam aplikasi nyata, ini akan melakukan navigasi atau aksi tertentu)
                    console.log('Dropdown item clicked:', itemText);
                    
                    // Close dropdown after click
                    userDropdown.classList.remove('active');
                    
                    // Show notification
                    if (itemText === 'Log Out') {
                        alert('Logging out...');
                    } else {
                        alert(`Opening ${itemText}...`);
                    }
                });
            });
        }
        
        // Back to top button
        if (backToTop) {
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    /* ==================================================
       4. QUICK SEARCH TAGS
    ================================================== */
    const quickSearchTags = document.querySelectorAll('.quick-search-tags .tag');
    
    function initQuickSearch() {
        quickSearchTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                const tagText = this.textContent;
                
                // Set search input to tag text
                mainSearchInput.value = tagText;
                
                // Perform search
                performSearch();
                
                // Scroll to results
                const resultsSection = document.querySelector('.results-header');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
    }
    
    /* ==================================================
       5. PAGINATION
    ================================================== */
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    
    function initPagination() {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('prev')) {
                    console.log('Previous page');
                    // Scroll to top of results
                    scrollToResults();
                } else if (this.classList.contains('next')) {
                    console.log('Next page');
                    // Scroll to top of results
                    scrollToResults();
                }
            });
        });
        
        paginationNumbers.forEach(number => {
            number.addEventListener('click', function() {
                // Remove active class from all numbers
                paginationNumbers.forEach(num => num.classList.remove('active'));
                
                // Add active class to clicked number
                this.classList.add('active');
                
                console.log(`Go to page ${this.textContent}`);
                
                // Scroll to top of results
                scrollToResults();
            });
        });
    }
    
    function scrollToResults() {
        const resultsHeader = document.querySelector('.results-header');
        if (resultsHeader) {
            resultsHeader.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    /* ==================================================
       6. INITIALIZATION
    ================================================== */
    function init() {
        initSearch();
        initFilters();
        initHeader();
        initQuickSearch();
        initPagination();
        
        // Collapse all filter options by default
        document.querySelectorAll('.filter-options').forEach(options => {
            options.classList.add('collapsed');
        });
        
        console.log('Search page initialized successfully!');
    }
    
    // Initialize the application
    init();
});