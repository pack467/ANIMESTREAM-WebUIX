document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. DATA & STATE MANAGEMENT
    ================================================== */
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
    let minRating = 0.0;
    
    // Get all anime cards from HTML
    const getAllAnimeCards = () => {
        return Array.from(document.querySelectorAll('.anime-card'));
    };
    
    // Extract anime data from card
    const getCardData = (card) => {
        return {
            id: card.dataset.id,
            title: card.dataset.title,
            genres: card.dataset.genres ? card.dataset.genres.split(',') : [],
            year: card.dataset.year,
            status: card.dataset.status,
            type: card.dataset.type,
            rating: parseFloat(card.dataset.rating),
            episodes: parseInt(card.dataset.episodes)
        };
    };
    
    /* ==================================================
       2. HEADER & NAVIGATION
    ================================================== */
    const header = document.getElementById('mainHeader');
    const backToTop = document.getElementById('backToTop');
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const searchTrigger = document.getElementById('searchTrigger');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const mainSearchInput = document.getElementById('mainSearchInput');
    
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
        
        // Search trigger - Instant focus
        if (searchTrigger && mainSearchInput) {
            searchTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                mainSearchInput.focus();
                
                const searchContainer = document.querySelector('.search-input-container');
                if (searchContainer) {
                    searchContainer.style.borderColor = 'var(--primary)';
                    searchContainer.style.boxShadow = '0 0 0 3px var(--primary-glow)';
                    
                    mainSearchInput.addEventListener('blur', function removeHighlight() {
                        searchContainer.style.borderColor = '';
                        searchContainer.style.boxShadow = '';
                        mainSearchInput.removeEventListener('blur', removeHighlight);
                    }, { once: true });
                }
                
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
        
        // User dropdown
        if (userBtn && userDropdown) {
            userBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', function(e) {
                if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
                    userDropdown.classList.remove('active');
                }
            });
            
            const dropdownItems = userDropdown.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const itemText = this.querySelector('span').textContent;
                    console.log('Dropdown item clicked:', itemText);
                    userDropdown.classList.remove('active');
                    
                    if (itemText === 'Log Out') {
                        alert('Logging out...');
                    } else {
                        alert(`Opening ${itemText}...`);
                    }
                });
            });
        }
        
        // Back to top
        if (backToTop) {
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    /* ==================================================
       3. SEARCH FUNCTIONALITY
    ================================================== */
    const mainSearchBtn = document.getElementById('mainSearchBtn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const totalResults = document.getElementById('totalResults');
    const noResults = document.getElementById('noResults');
    const activeFilters = document.getElementById('activeFilters');
    const resetSearch = document.getElementById('resetSearch');
    const hasilPencarianBtn = document.getElementById('hasilPencarianBtn');
    
    const searchSuggestionsData = [
        "Action", "Adventure", "Comedy", "Drama", "Fantasy",
        "Romance", "Sci-Fi", "Slice of Life", "Supernatural", "Horror",
        "2024", "2023", "2022", "Ongoing", "Completed", "Movie", "TV Series"
    ];
    
    function initSearch() {
        // Initial count
        updateResultsCount();
        
        // Search input
        if (mainSearchInput) {
            mainSearchInput.addEventListener('input', handleSearchInput);
            mainSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
        
        // Search button
        if (mainSearchBtn) {
            mainSearchBtn.addEventListener('click', performSearch);
        }
        
        // Hasil Pencarian button
        if (hasilPencarianBtn) {
            hasilPencarianBtn.addEventListener('click', performSearch);
        }
        
        // Reset search
        if (resetSearch) {
            resetSearch.addEventListener('click', resetAll);
        }
        
        // Close suggestions on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-search-bar')) {
                searchSuggestions.classList.remove('active');
            }
        });
    }
    
    function handleSearchInput() {
        const value = mainSearchInput.value.trim();
        
        if (value.length > 0) {
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
        currentSearchTerm = mainSearchInput.value.trim().toLowerCase();
        
        const allCards = getAllAnimeCards();
        let visibleCount = 0;
        
        allCards.forEach(card => {
            const data = getCardData(card);
            
            // Search term filter
            const matchesSearch = currentSearchTerm === '' || 
                data.title.toLowerCase().includes(currentSearchTerm) ||
                data.genres.some(genre => genre.toLowerCase().includes(currentSearchTerm));
            
            // Genre filter
            const matchesGenre = currentFilters.genres.length === 0 || 
                currentFilters.genres.some(genre => data.genres.includes(genre));
            
            // Year filter
            const matchesYear = currentFilters.years.length === 0 || 
                currentFilters.years.includes(data.year);
            
            // Status filter
            const matchesStatus = currentFilters.status.length === 0 || 
                currentFilters.status.includes(data.status);
            
            // Type filter
            const matchesType = currentFilters.type.length === 0 || 
                currentFilters.type.includes(data.type);
            
            // Rating filter
            const matchesRating = data.rating >= minRating;
            
            const shouldShow = matchesSearch && matchesGenre && matchesYear && 
                              matchesStatus && matchesType && matchesRating;
            
            card.style.display = shouldShow ? '' : 'none';
            if (shouldShow) visibleCount++;
        });
        
        // Update UI
        resultsCount.textContent = visibleCount;
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        resultsGrid.style.display = visibleCount === 0 ? 'none' : 'grid';
        
        // Sort results
        sortResults();
        
        // Update active filters
        updateActiveFilters();
    }
    
    function sortResults() {
        const allCards = getAllAnimeCards();
        const visibleCards = allCards.filter(card => card.style.display !== 'none');
        
        visibleCards.sort((a, b) => {
            const dataA = getCardData(a);
            const dataB = getCardData(b);
            
            switch(currentSort) {
                case 'newest':
                    return parseInt(dataB.year) - parseInt(dataA.year);
                case 'rating':
                    return dataB.rating - dataA.rating;
                case 'title':
                    return dataA.title.localeCompare(dataB.title);
                case 'popular':
                default:
                    return 0;
            }
        });
        
        // Reorder DOM elements
        visibleCards.forEach(card => {
            resultsGrid.appendChild(card);
        });
    }
    
    function updateResultsCount() {
        const allCards = getAllAnimeCards();
        const visibleCards = allCards.filter(card => card.style.display !== 'none');
        resultsCount.textContent = visibleCards.length;
        totalResults.textContent = allCards.length;
    }
    
    function updateActiveFilters() {
        activeFilters.innerHTML = '';
        
        // Search term
        if (currentSearchTerm) {
            addActiveFilter('search', `Search: "${currentSearchTerm}"`, 'search');
        }
        
        // Genres
        currentFilters.genres.forEach(genre => {
            addActiveFilter('genre', `Genre: ${genre}`, genre);
        });
        
        // Years
        currentFilters.years.forEach(year => {
            addActiveFilter('year', `Year: ${year}`, year);
        });
        
        // Status
        currentFilters.status.forEach(status => {
            addActiveFilter('status', `Status: ${status}`, status);
        });
        
        // Types
        currentFilters.type.forEach(type => {
            addActiveFilter('type', `Type: ${type}`, type);
        });
        
        // Ratings
        if (minRating > 0) {
            addActiveFilter('rating', `Rating: ${minRating.toFixed(1)}+`, minRating);
        }
    }
    
    function addActiveFilter(type, label, value) {
        const filterEl = document.createElement('div');
        filterEl.className = 'active-filter';
        filterEl.innerHTML = `
            <span>${label}</span>
            <button class="remove" data-type="${type}" data-value="${value}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        filterEl.querySelector('.remove').addEventListener('click', function() {
            const filterType = this.getAttribute('data-type');
            const filterValue = this.getAttribute('data-value');
            
            if (filterType === 'search') {
                mainSearchInput.value = '';
                currentSearchTerm = '';
            } else if (filterType === 'rating') {
                minRating = 0.0;
                if (ratingSlider) ratingSlider.value = 0;
                if (ratingValue) ratingValue.textContent = '0.0';
            } else {
                currentFilters[filterType] = currentFilters[filterType].filter(item => item !== filterValue);
                
                const checkbox = document.querySelector(`input[name="${filterType}"][value="${filterValue}"]`);
                if (checkbox) checkbox.checked = false;
            }
            
            performSearch();
        });
        
        activeFilters.appendChild(filterEl);
    }
    
    function resetAll() {
        mainSearchInput.value = '';
        currentSearchTerm = '';
        
        currentFilters = {
            genres: [],
            years: [],
            status: [],
            rating: [],
            type: []
        };
        
        // Reset rating slider
        minRating = 0.0;
        if (ratingSlider) ratingSlider.value = 0;
        if (ratingValue) ratingValue.textContent = '0.0';
        
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        const defaultSort = document.querySelector('input[name="sort"][value="popular"]');
        if (defaultSort) defaultSort.checked = true;
        currentSort = 'popular';
        
        performSearch();
    }
    
    /* ==================================================
       4. FILTER FUNCTIONALITY
    ================================================== */
    const filterToggles = document.querySelectorAll('.filter-toggle');
    const applyFilters = document.getElementById('applyFilters');
    const resetFilters = document.getElementById('resetFilters');
    const viewOptions = document.querySelectorAll('.view-option');
    const ratingSlider = document.getElementById('ratingSlider');
    const ratingValue = document.getElementById('ratingValue');
    
    function initFilters() {
        // Rating slider
        if (ratingSlider && ratingValue) {
            ratingSlider.addEventListener('input', function() {
                const value = (this.value / 10).toFixed(1);
                ratingValue.textContent = value;
                minRating = parseFloat(value);
            });
            
            ratingSlider.addEventListener('change', function() {
                performSearch();
            });
        }
        
        // Filter toggles
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
                currentFilters.genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
                    .map(cb => cb.value);
                
                currentFilters.years = Array.from(document.querySelectorAll('input[name="year"]:checked'))
                    .map(cb => cb.value);
                
                currentFilters.status = Array.from(document.querySelectorAll('input[name="status"]:checked'))
                    .map(cb => cb.value);
                
                currentFilters.type = Array.from(document.querySelectorAll('input[name="type"]:checked'))
                    .map(cb => cb.value);
                
                const selectedSort = document.querySelector('input[name="sort"]:checked');
                if (selectedSort) currentSort = selectedSort.value;
                
                performSearch();
            });
        }
        
        // Reset filters
        if (resetFilters) {
            resetFilters.addEventListener('click', function() {
                document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => {
                    cb.checked = false;
                });
                
                // Reset rating slider
                minRating = 0.0;
                if (ratingSlider) ratingSlider.value = 0;
                if (ratingValue) ratingValue.textContent = '0.0';
                
                const defaultSort = document.querySelector('input[name="sort"][value="popular"]');
                if (defaultSort) defaultSort.checked = true;
                
                currentFilters = {
                    genres: [],
                    years: [],
                    status: [],
                    rating: [],
                    type: []
                };
                
                updateActiveFilters();
            });
        }
        
        // View options
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                
                viewOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                currentView = view;
                
                if (view === 'list') {
                    resultsGrid.classList.add('list-view');
                    getAllAnimeCards().forEach(card => card.classList.add('list-view'));
                } else {
                    resultsGrid.classList.remove('list-view');
                    getAllAnimeCards().forEach(card => card.classList.remove('list-view'));
                }
            });
        });
        
        // Collapse all by default
        document.querySelectorAll('.filter-options').forEach(options => {
            if (!options.classList.contains('sort-options')) {
                options.classList.add('collapsed');
            }
        });
    }
    
    /* ==================================================
       5. CARD ACTIONS (List & Favorite)
    ================================================== */
    function initCardActions() {
        const allCards = getAllAnimeCards();
        
        allCards.forEach(card => {
            const addToListBtn = card.querySelector('.add-to-list');
            const addToFavoriteBtn = card.querySelector('.add-to-favorite');
            
            if (addToListBtn) {
                addToListBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.classList.toggle('active');
                    const isActive = this.classList.contains('active');
                    const animeTitle = getCardData(card).title;
                    
                    if (isActive) {
                        console.log(`Added "${animeTitle}" to list`);
                        alert(`✓ "${animeTitle}" ditambahkan ke daftar Anda!`);
                    } else {
                        console.log(`Removed "${animeTitle}" from list`);
                        alert(`"${animeTitle}" dihapus dari daftar Anda.`);
                    }
                });
            }
            
            if (addToFavoriteBtn) {
                addToFavoriteBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.classList.toggle('active');
                    const icon = this.querySelector('i');
                    const isActive = this.classList.contains('active');
                    const animeTitle = getCardData(card).title;
                    
                    if (icon) {
                        if (isActive) {
                            icon.classList.remove('far');
                            icon.classList.add('fas');
                            console.log(`Added "${animeTitle}" to favorites`);
                            alert(`❤️ "${animeTitle}" ditambahkan ke favorit!`);
                        } else {
                            icon.classList.remove('fas');
                            icon.classList.add('far');
                            console.log(`Removed "${animeTitle}" from favorites`);
                            alert(`"${animeTitle}" dihapus dari favorit.`);
                        }
                    }
                });
            }
        });
    }
    
    /* ==================================================
       6. QUICK SEARCH TAGS
    ================================================== */
    function initQuickSearch() {
        const quickSearchTags = document.querySelectorAll('.quick-search-tags .tag');
        
        quickSearchTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                const tagText = this.textContent;
                
                mainSearchInput.value = tagText;
                performSearch();
                
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
       7. PAGINATION
    ================================================== */
    function initPagination() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        const paginationNumbers = document.querySelectorAll('.pagination-number');
        
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('prev')) {
                    console.log('Previous page');
                } else if (this.classList.contains('next')) {
                    console.log('Next page');
                }
                scrollToResults();
            });
        });
        
        paginationNumbers.forEach(number => {
            number.addEventListener('click', function() {
                paginationNumbers.forEach(num => num.classList.remove('active'));
                this.classList.add('active');
                
                console.log(`Go to page ${this.textContent}`);
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
       8. INITIALIZATION
    ================================================== */
    function init() {
        initHeader();
        initSearch();
        initFilters();
        initCardActions();
        initQuickSearch();
        initPagination();
        
        console.log('Search page initialized successfully!');
    }
    
    // Initialize
    init();
});