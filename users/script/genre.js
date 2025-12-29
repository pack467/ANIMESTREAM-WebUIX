document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. HEADER & NAVIGATION FUNCTIONALITY
    ================================================== */
    const header = document.getElementById('mainHeader');
    const backToTop = document.getElementById('backToTop');
    const searchTrigger = document.getElementById('searchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    // Scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });
    
    // Search overlay
    searchTrigger.addEventListener('click', () => {
        searchOverlay.classList.add('active');
    });
    
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });
    
    // Close search on ESC key
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape" && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // Mobile menu
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
    
    // User dropdown
    userBtn.addEventListener('click', function(e) {
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
    
    // Back to top button
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ==================================================
       2. GENRE CAROUSEL FUNCTIONALITY
    ================================================== */
    const genreCarousel = document.getElementById('genreCarousel');
    const genrePrevBtn = document.getElementById('genrePrevBtn');
    const genreNextBtn = document.getElementById('genreNextBtn');
    
    let scrollPosition = 0;
    const scrollAmount = 200;
    
    function updateCarouselButtons() {
        const maxScroll = genreCarousel.scrollWidth - genreCarousel.clientWidth;
        
        genrePrevBtn.disabled = scrollPosition <= 0;
        genreNextBtn.disabled = scrollPosition >= maxScroll;
    }
    
    genrePrevBtn.addEventListener('click', () => {
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        genreCarousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        setTimeout(updateCarouselButtons, 300);
    });
    
    genreNextBtn.addEventListener('click', () => {
        const maxScroll = genreCarousel.scrollWidth - genreCarousel.clientWidth;
        scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
        genreCarousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        setTimeout(updateCarouselButtons, 300);
    });
    
    // Update buttons on scroll
    genreCarousel.addEventListener('scroll', () => {
        scrollPosition = genreCarousel.scrollLeft;
        updateCarouselButtons();
    });
    
    // Initialize buttons state
    updateCarouselButtons();
    
    // Update buttons on window resize
    window.addEventListener('resize', updateCarouselButtons);
    
    /* ==================================================
       3. LOAD ANIME DATA FROM HTML
    ================================================== */
    function loadAnimeData() {
        const animeItems = document.querySelectorAll('#animeData .anime-item');
        const animeArray = [];
        
        animeItems.forEach(item => {
            animeArray.push({
                id: item.dataset.id,
                title: item.dataset.title,
                genres: item.dataset.genres.split(','),
                year: parseInt(item.dataset.year),
                episodes: parseInt(item.dataset.episodes),
                rating: parseFloat(item.dataset.rating),
                thumbnail: item.dataset.thumbnail
            });
        });
        
        return animeArray;
    }
    
    const animeData = loadAnimeData();
    let selectedGenre = 'all';
    let currentSort = 'popular';
    let currentPage = 1;
    const itemsPerPage = 8;
    let favoriteAnimes = JSON.parse(localStorage.getItem('favoriteAnimes') || '[]');
    let listAnimes = JSON.parse(localStorage.getItem('listAnimes') || '[]');
    
    /* ==================================================
       4. GENRE SELECTION
    ================================================== */
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.dataset.genre;
            selectGenre(genre);
        });
    });
    
    function selectGenre(genreName) {
        selectedGenre = genreName;
        currentPage = 1;
        
        // Update active card
        genreCards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.genre === genreName) {
                card.classList.add('active');
            }
        });
        
        // Update genre title
        const genreTitle = document.getElementById('selectedGenreTitle');
        if (genreName === 'all') {
            genreTitle.textContent = 'Popular Anime';
        } else {
            const genreCard = document.querySelector(`.genre-card[data-genre="${genreName}"]`);
            const genreDisplayName = genreCard.querySelector('h3').textContent;
            genreTitle.textContent = `${genreDisplayName} Anime`;
        }
        
        // Render anime
        renderAnimeGrid();
    }
    
    /* ==================================================
       5. RENDER ANIME GRID
    ================================================== */
    const animeGrid = document.getElementById('animeGrid');
    const emptyAnime = document.getElementById('emptyAnime');
    const pagination = document.getElementById('pagination');
    const sortFilter = document.getElementById('sortFilter');
    
    function renderAnimeGrid() {
        // Filter anime by selected genre
        let filteredAnime = filterAnimeByGenre(animeData);
        
        // Sort anime
        filteredAnime = sortAnime(filteredAnime);
        
        // Paginate anime
        const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedAnime = filteredAnime.slice(startIndex, endIndex);
        
        // Clear grid
        animeGrid.innerHTML = '';
        
        if (paginatedAnime.length === 0) {
            emptyAnime.style.display = 'block';
            pagination.style.display = 'none';
        } else {
            emptyAnime.style.display = 'none';
            pagination.style.display = 'flex';
            
            // Render anime cards
            paginatedAnime.forEach(anime => {
                const animeCard = createAnimeCard(anime);
                animeGrid.appendChild(animeCard);
            });
            
            // Render pagination
            renderPagination(totalPages);
        }
    }
    
    function filterAnimeByGenre(animeList) {
        if (selectedGenre === 'all') {
            return animeList;
        }
        
        return animeList.filter(anime => 
            anime.genres.some(genre => 
                genre.toLowerCase() === selectedGenre
            )
        );
    }
    
    function sortAnime(animeList) {
        switch(currentSort) {
            case 'rating':
                return [...animeList].sort((a, b) => b.rating - a.rating);
            case 'newest':
                return [...animeList].sort((a, b) => b.year - a.year);
            case 'oldest':
                return [...animeList].sort((a, b) => a.year - b.year);
            case 'popular':
            default:
                return [...animeList].sort((a, b) => b.rating - a.rating);
        }
    }
    
    function createAnimeCard(anime) {
        const card = document.createElement('div');
        card.className = 'anime-card';
        
        const isFavorite = favoriteAnimes.includes(anime.id);
        const isInList = listAnimes.includes(anime.id);
        
        card.innerHTML = `
            <div class="anime-card-thumb">
                <img src="${anime.thumbnail}" alt="${anime.title}">
                <div class="anime-play-overlay">
                    <button class="play-btn-center">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="anime-card-badges">
                    <div class="episode-badge">${anime.episodes} EP</div>
                    <div class="rating-badge">
                        <i class="fas fa-star"></i>
                        ${anime.rating}
                    </div>
                </div>
            </div>
            <div class="anime-card-content">
                <div class="anime-card-title">
                    <h3>${anime.title}</h3>
                </div>
                <div class="anime-card-genres">
                    ${anime.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
                <div class="anime-card-meta">
                    <div class="anime-card-year">
                        <i class="far fa-calendar-alt"></i>
                        <span>${anime.year}</span>
                    </div>
                    <div class="anime-card-actions">
                        <button class="anime-action-btn add-list ${isInList ? 'active' : ''}" title="Add to list">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="anime-action-btn favorite ${isFavorite ? 'active' : ''}" title="Add to favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        const addListBtn = card.querySelector('.anime-action-btn.add-list');
        addListBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleList(anime.id, addListBtn);
        });
        
        const favoriteBtn = card.querySelector('.anime-action-btn.favorite');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(anime.id, favoriteBtn);
        });
        
        const playBtn = card.querySelector('.play-btn-center');
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playAnime(anime);
        });
        
        // Make entire card clickable
        card.addEventListener('click', () => {
            playAnime(anime);
        });
        
        return card;
    }
    
    function toggleFavorite(animeId, button) {
        const index = favoriteAnimes.indexOf(animeId);
        
        if (index > -1) {
            // Remove from favorites
            favoriteAnimes.splice(index, 1);
            button.classList.remove('active');
            showNotification('Removed from favorites', 'info');
        } else {
            // Add to favorites
            favoriteAnimes.push(animeId);
            button.classList.add('active');
            showNotification('Added to favorites', 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('favoriteAnimes', JSON.stringify(favoriteAnimes));
    }
    
    function toggleList(animeId, button) {
        const index = listAnimes.indexOf(animeId);
        
        if (index > -1) {
            // Remove from list
            listAnimes.splice(index, 1);
            button.classList.remove('active');
            showNotification('Removed from list', 'info');
        } else {
            // Add to list
            listAnimes.push(animeId);
            button.classList.add('active');
            showNotification('Added to list', 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('listAnimes', JSON.stringify(listAnimes));
    }
    
    function renderPagination(totalPages) {
        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderAnimeGrid();
                scrollToAnimeGrid();
            }
        });
        pagination.appendChild(prevBtn);
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            const firstPage = document.createElement('button');
            firstPage.className = 'page-btn';
            firstPage.textContent = '1';
            firstPage.addEventListener('click', () => {
                currentPage = 1;
                renderAnimeGrid();
                scrollToAnimeGrid();
            });
            pagination.appendChild(firstPage);
            
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.className = 'page-dots';
                dots.textContent = '...';
                pagination.appendChild(dots);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${currentPage === i ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderAnimeGrid();
                scrollToAnimeGrid();
            });
            pagination.appendChild(pageBtn);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'page-dots';
                dots.textContent = '...';
                pagination.appendChild(dots);
            }
            
            const lastPage = document.createElement('button');
            lastPage.className = 'page-btn';
            lastPage.textContent = totalPages;
            lastPage.addEventListener('click', () => {
                currentPage = totalPages;
                renderAnimeGrid();
                scrollToAnimeGrid();
            });
            pagination.appendChild(lastPage);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-btn ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderAnimeGrid();
                scrollToAnimeGrid();
            }
        });
        pagination.appendChild(nextBtn);
    }
    
    function scrollToAnimeGrid() {
        document.querySelector('.genre-content').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    /* ==================================================
       6. GENRE SEARCH FUNCTIONALITY
    ================================================== */
    const genreSearch = document.getElementById('genreSearch');
    const genreSearchBtn = document.getElementById('genreSearchBtn');
    
    genreSearch.addEventListener('input', () => {
        const searchTerm = genreSearch.value.toLowerCase().trim();
        filterGenreCards(searchTerm);
    });
    
    genreSearchBtn.addEventListener('click', () => {
        const searchTerm = genreSearch.value.toLowerCase().trim();
        filterGenreCards(searchTerm);
    });
    
    function filterGenreCards(searchTerm) {
        genreCards.forEach(card => {
            const genreName = card.querySelector('h3').textContent.toLowerCase();
            if (!searchTerm || genreName.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Update carousel buttons after filtering
        setTimeout(updateCarouselButtons, 100);
    }
    
    /* ==================================================
       7. SORT FUNCTIONALITY
    ================================================== */
    sortFilter.addEventListener('change', () => {
        currentSort = sortFilter.value;
        currentPage = 1;
        renderAnimeGrid();
    });
    
    /* ==================================================
       8. GENRE LINK FUNCTIONALITY (from dropdown)
    ================================================== */
    const genreLinks = document.querySelectorAll('.genre-link');
    
    genreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const genre = link.getAttribute('data-genre');
            selectGenre(genre);
            
            // Scroll to genre content
            document.querySelector('.genre-content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    /* ==================================================
       9. ANIME INTERACTIONS
    ================================================== */
    function playAnime(anime) {
        showNotification(`Playing "${anime.title}"`, 'info');
        // In a real app, this would redirect to watch page
        // window.location.href = `watch.html?anime=${anime.id}`;
    }
    
    /* ==================================================
       10. NOTIFICATION SYSTEM
    ================================================== */
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            border-left: 4px solid ${type === 'success' ? 'var(--accent)' : type === 'warning' ? '#ff4757' : 'var(--primary)'};
            border-radius: 8px;
            padding: 15px 20px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 10px 30px var(--shadow-heavy);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text-white);
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-gray);
            cursor: pointer;
            padding: 5px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to body
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
        
        // Add CSS animations if not already present
        if (!document.getElementById('notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /* ==================================================
       11. KEYBOARD SHORTCUTS
    ================================================== */
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        switch(e.key) {
            case 'Escape':
                // Close any open dropdowns
                if (userDropdown.classList.contains('active')) {
                    userDropdown.classList.remove('active');
                }
                break;
            case '/':
                e.preventDefault();
                genreSearch.focus();
                break;
            case 'ArrowLeft':
                if (currentPage > 1) {
                    currentPage--;
                    renderAnimeGrid();
                    scrollToAnimeGrid();
                }
                break;
            case 'ArrowRight':
                const filteredAnime = filterAnimeByGenre(animeData);
                const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderAnimeGrid();
                    scrollToAnimeGrid();
                }
                break;
        }
    });
    
    /* ==================================================
       12. URL HASH HANDLING
    ================================================== */
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const genreCard = Array.from(genreCards).find(card => {
                const genreName = card.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
                return genreName === hash;
            });
            
            if (genreCard) {
                selectGenre(genreCard.dataset.genre);
            }
        }
    }
    
    window.addEventListener('hashchange', handleHashChange);
    
    /* ==================================================
       13. INITIALIZE PAGE
    ================================================== */
    function initializePage() {
        renderAnimeGrid();
        handleHashChange();
    }
    
    // Initialize when DOM is loaded
    initializePage();
});