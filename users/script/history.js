document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. SAMPLE HISTORY DATA
    ================================================== */
    const historyData = [
        {
            id: 1,
            animeTitle: "Fate/Stay Night: Unlimited Blade Works",
            episodeNumber: 1,
            episodeTitle: "Winter Days, A Fateful Night",
            thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop",
            duration: "24:10",
            watchedDuration: "24:10",
            progress: 100,
            genre: "Action, Fantasy",
            watchDate: new Date("2025-12-07T14:30:00"),
            continueWatching: false
        },
        {
            id: 2,
            animeTitle: "Demon Slayer: Kimetsu no Yaiba",
            episodeNumber: 7,
            episodeTitle: "Deadly Duel",
            thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=300&auto=format&fit=crop",
            duration: "24:05",
            watchedDuration: "18:30",
            progress: 77,
            genre: "Action, Demon",
            watchDate: new Date("2025-12-07T10:15:00"),
            continueWatching: true
        },
        {
            id: 3,
            animeTitle: "Sword Art Online: Alicization",
            episodeNumber: 12,
            episodeTitle: "The Final Decision",
            thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=300&auto=format&fit=crop",
            duration: "24:15",
            watchedDuration: "24:15",
            progress: 100,
            genre: "Sci-Fi, Adventure",
            watchDate: new Date("2025-12-06T20:45:00"),
            continueWatching: false
        },
        {
            id: 4,
            animeTitle: "Attack on Titan Season 3",
            episodeNumber: 15,
            episodeTitle: "Descent",
            thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=300&auto=format&fit=crop",
            duration: "23:50",
            watchedDuration: "12:20",
            progress: 52,
            genre: "Action, Drama",
            watchDate: new Date("2025-12-06T18:30:00"),
            continueWatching: true
        },
        {
            id: 5,
            animeTitle: "Jujutsu Kaisen",
            episodeNumber: 8,
            episodeTitle: "Boredom",
            thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop",
            duration: "24:20",
            watchedDuration: "24:20",
            progress: 100,
            genre: "Action, Fantasy",
            watchDate: new Date("2025-12-06T16:00:00"),
            continueWatching: false
        },
        {
            id: 6,
            animeTitle: "Your Name",
            episodeNumber: 0,
            episodeTitle: "Movie",
            thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=300&auto=format&fit=crop",
            duration: "106:00",
            watchedDuration: "106:00",
            progress: 100,
            genre: "Romance, Drama",
            watchDate: new Date("2025-12-05T21:00:00"),
            continueWatching: false
        },
        {
            id: 7,
            animeTitle: "Tokyo Ghoul",
            episodeNumber: 3,
            episodeTitle: "Dove",
            thumbnail: "https://images.unsplash.com/photo-1578632748624-fbd20d345187?q=80&w=300&auto=format&fit=crop",
            duration: "24:00",
            watchedDuration: "24:00",
            progress: 100,
            genre: "Action, Horror",
            watchDate: new Date("2025-12-05T19:30:00"),
            continueWatching: false
        },
        {
            id: 8,
            animeTitle: "Made in Abyss",
            episodeNumber: 5,
            episodeTitle: "Incinerator",
            thumbnail: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=300&auto=format&fit=crop",
            duration: "25:10",
            watchedDuration: "25:10",
            progress: 100,
            genre: "Adventure, Mystery",
            watchDate: new Date("2025-12-04T20:00:00"),
            continueWatching: false
        },
        {
            id: 9,
            animeTitle: "Gintama: The Final",
            episodeNumber: 0,
            episodeTitle: "Movie",
            thumbnail: "https://images.unsplash.com/photo-1590955559144-a82332cf2c08?q=80&w=300&auto=format&fit=crop",
            duration: "104:00",
            watchedDuration: "56:30",
            progress: 54,
            genre: "Action, Comedy",
            watchDate: new Date("2025-12-04T15:30:00"),
            continueWatching: true
        },
        {
            id: 10,
            animeTitle: "Boruto: Next Generation",
            episodeNumber: 1,
            episodeTitle: "Uzumaki Boruto",
            thumbnail: "https://images.unsplash.com/photo-1542256844-d3d05538a5b8?q=80&w=300&auto=format&fit=crop",
            duration: "23:45",
            watchedDuration: "23:45",
            progress: 100,
            genre: "Action, Adventure",
            watchDate: new Date("2025-12-03T22:00:00"),
            continueWatching: false
        }
    ];

    /* ==================================================
       2. STATE MANAGEMENT
    ================================================== */
    let currentFilter = 'all';
    let currentSort = 'recent';
    let currentPage = 1;
    const itemsPerPage = 5;
    let filteredData = [...historyData];
    
    /* ==================================================
       3. DOM ELEMENTS
    ================================================== */
    const historyTimeline = document.getElementById('historyTimeline');
    const emptyState = document.getElementById('emptyState');
    const filterSelect = document.getElementById('filterSelect');
    const sortSelect = document.getElementById('sortSelect');
    const historySearch = document.getElementById('historySearch');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const confirmModal = document.getElementById('confirmModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmClearBtn = document.getElementById('confirmClearBtn');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumbers = document.getElementById('pageNumbers');
    
    // Stats elements
    const totalWatchedEl = document.getElementById('totalWatched');
    const totalHoursEl = document.getElementById('totalHours');
    const totalAnimeEl = document.getElementById('totalAnime');
    const recentDaysEl = document.getElementById('recentDays');

    /* ==================================================
       4. UTILITY FUNCTIONS
    ================================================== */
    function formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
            }
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days === 1) {
            return 'Yesterday';
        } else if (days < 7) {
            return `${days} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }
    
    function getDateGroup(date) {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return 'This Week';
        if (days < 30) return 'This Month';
        return 'Older';
    }
    
    function parseDuration(duration) {
        const parts = duration.split(':');
        if (parts.length === 2) {
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
        return 0;
    }
    
    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }

    /* ==================================================
       5. FILTER & SORT FUNCTIONS
    ================================================== */
    function filterData() {
        const searchTerm = historySearch.value.toLowerCase();
        
        filteredData = historyData.filter(item => {
            // Search filter
            const matchesSearch = item.animeTitle.toLowerCase().includes(searchTerm) ||
                                 item.episodeTitle.toLowerCase().includes(searchTerm);
            
            // Date filter
            const now = new Date();
            const diff = now - item.watchDate;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            let matchesDate = true;
            switch(currentFilter) {
                case 'today':
                    matchesDate = days === 0;
                    break;
                case 'week':
                    matchesDate = days < 7;
                    break;
                case 'month':
                    matchesDate = days < 30;
                    break;
            }
            
            return matchesSearch && matchesDate;
        });
        
        sortData();
    }
    
    function sortData() {
        switch(currentSort) {
            case 'recent':
                filteredData.sort((a, b) => b.watchDate - a.watchDate);
                break;
            case 'oldest':
                filteredData.sort((a, b) => a.watchDate - b.watchDate);
                break;
            case 'title':
                filteredData.sort((a, b) => a.animeTitle.localeCompare(b.animeTitle));
                break;
        }
        
        currentPage = 1;
        renderHistory();
        renderPagination();
    }

    /* ==================================================
       6. RENDER FUNCTIONS
    ================================================== */
    function renderHistory() {
        historyTimeline.innerHTML = '';
        
        if (filteredData.length === 0) {
            emptyState.style.display = 'block';
            document.getElementById('pagination').style.display = 'none';
            return;
        }
        
        emptyState.style.display = 'none';
        document.getElementById('pagination').style.display = 'flex';
        
        // Group by date
        const grouped = {};
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);
        
        pageData.forEach(item => {
            const group = getDateGroup(item.watchDate);
            if (!grouped[group]) {
                grouped[group] = [];
            }
            grouped[group].push(item);
        });
        
        // Render groups
        Object.keys(grouped).forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'timeline-group';
            
            const dateEl = document.createElement('div');
            dateEl.className = 'timeline-date';
            dateEl.textContent = group;
            groupEl.appendChild(dateEl);
            
            const itemsEl = document.createElement('div');
            itemsEl.className = 'timeline-items';
            
            grouped[group].forEach(item => {
                const itemEl = createHistoryItem(item);
                itemsEl.appendChild(itemEl);
            });
            
            groupEl.appendChild(itemsEl);
            historyTimeline.appendChild(groupEl);
        });
    }
    
    function createHistoryItem(item) {
        const itemEl = document.createElement('div');
        itemEl.className = 'history-item';
        
        itemEl.innerHTML = `
            <div class="history-thumbnail">
                <img src="${item.thumbnail}" alt="${item.animeTitle}">
                <div class="play-overlay">
                    <div class="play-icon">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="progress-indicator">
                    <div class="progress-bar" style="width: ${item.progress}%"></div>
                </div>
            </div>
            <div class="history-info">
                <div class="history-header">
                    <h3 class="anime-title">${item.animeTitle}</h3>
                    <div class="episode-info">
                        ${item.episodeNumber > 0 ? `Episode ${item.episodeNumber}: ${item.episodeTitle}` : item.episodeTitle}
                    </div>
                </div>
                <div class="history-meta">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${item.watchedDuration} / ${item.duration}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${item.genre}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(item.watchDate)}</span>
                    </div>
                    ${item.continueWatching ? `
                        <div class="meta-item">
                            <i class="fas fa-pause-circle"></i>
                            <span>Continue Watching</span>
                        </div>
                    ` : ''}
                </div>
                <div class="history-footer">
                    <div class="action-buttons">
                        <button class="action-btn-small btn-watch" data-id="${item.id}">
                            <i class="fas fa-play"></i>
                            ${item.continueWatching ? 'Continue' : 'Watch Again'}
                        </button>
                        <button class="action-btn-small btn-remove" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                            Remove
                        </button>
                    </div>
                    <div class="watch-time">
                        Watched ${formatDate(item.watchDate)}
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        const watchBtn = itemEl.querySelector('.btn-watch');
        const removeBtn = itemEl.querySelector('.btn-remove');
        
        watchBtn.addEventListener('click', () => {
            // In a real app, navigate to watch page
            alert(`Continue watching ${item.animeTitle}`);
        });
        
        removeBtn.addEventListener('click', () => {
            removeHistoryItem(item.id);
        });
        
        return itemEl;
    }
    
    function renderPagination() {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        
        // Update buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        
        // Render page numbers
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            // Show first, last, current, and adjacent pages
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                const pageBtn = document.createElement('div');
                pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    renderHistory();
                    renderPagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                pageNumbers.appendChild(pageBtn);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                // Show ellipsis
                const ellipsis = document.createElement('div');
                ellipsis.className = 'page-number';
                ellipsis.textContent = '...';
                ellipsis.style.cursor = 'default';
                pageNumbers.appendChild(ellipsis);
            }
        }
    }
    
    function updateStats() {
        // Total episodes watched
        const totalEpisodes = historyData.filter(item => item.progress === 100).length;
        totalWatchedEl.textContent = totalEpisodes;
        
        // Total watch time
        let totalSeconds = 0;
        historyData.forEach(item => {
            totalSeconds += parseDuration(item.watchedDuration);
        });
        const totalHours = Math.floor(totalSeconds / 3600);
        totalHoursEl.textContent = `${totalHours}h`;
        
        // Total different anime
        const uniqueAnime = new Set(historyData.map(item => item.animeTitle));
        totalAnimeEl.textContent = uniqueAnime.size;
        
        // Recent days active
        const dates = historyData.map(item => {
            const d = new Date(item.watchDate);
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        });
        const uniqueDates = new Set(dates);
        recentDaysEl.textContent = uniqueDates.size;
    }

    /* ==================================================
       7. EVENT HANDLERS
    ================================================== */
    filterSelect.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        filterData();
    });
    
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortData();
    });
    
    historySearch.addEventListener('input', () => {
        filterData();
    });
    
    clearAllBtn.addEventListener('click', () => {
        confirmModal.classList.add('active');
    });
    
    cancelBtn.addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });
    
    confirmClearBtn.addEventListener('click', () => {
        // Clear all history
        historyData.length = 0;
        filteredData.length = 0;
        confirmModal.classList.remove('active');
        renderHistory();
        updateStats();
    });
    
    // Close modal on overlay click
    confirmModal.querySelector('.modal-overlay').addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });
    
    function removeHistoryItem(id) {
        const index = historyData.findIndex(item => item.id === id);
        if (index !== -1) {
            historyData.splice(index, 1);
            filterData();
            updateStats();
        }
    }
    
    // Pagination
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderHistory();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderHistory();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    /* ==================================================
       8. HEADER & NAVIGATION FUNCTIONALITY
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
        if(e.key === "Escape") {
            if(searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
            if(confirmModal.classList.contains('active')) {
                confirmModal.classList.remove('active');
            }
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
    
    // Back to top button
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==================================================
       9. INITIALIZATION
    ================================================== */
    function init() {
        updateStats();
        filterData();
        renderPagination();
    }
    
    init();
});