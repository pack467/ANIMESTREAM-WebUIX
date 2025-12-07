document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. PRELOADER
    ================================================== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 500);
        }
    }, 150);
    
    /* ==================================================
       2. HEADER & NAVIGATION FUNCTIONALITY
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
       3. ANIME LIST DATA
    ================================================== */
    const animeListData = [
        {
            id: 1,
            title: "Fate/Stay Night: Unlimited Blade Works",
            status: "watching",
            progress: 85,
            rating: 4.8,
            episodes: "12/26",
            thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Fantasy"],
            addedDate: "2024-03-15",
            isFavorite: true,
            tags: ["Ufotable", "Holy Grail War", "Saber"],
            notes: "Great animation! Loving the fight scenes."
        },
        {
            id: 2,
            title: "Demon Slayer: Kimetsu no Yaiba",
            status: "completed",
            progress: 100,
            rating: 4.9,
            episodes: "26/26",
            thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Supernatural"],
            addedDate: "2024-02-28",
            isFavorite: true,
            tags: ["Hashira", "Demons", "Beautiful Art"],
            notes: "One of the best anime ever! Animation is stunning."
        },
        {
            id: 3,
            title: "Sword Art Online: Alicization",
            status: "watching",
            progress: 45,
            rating: 4.5,
            episodes: "8/24",
            thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Sci-Fi"],
            addedDate: "2024-03-10",
            isFavorite: false,
            tags: ["VR", "Kirito", "Underworld"],
            notes: "Good storyline, better than previous seasons."
        },
        {
            id: 4,
            title: "Attack on Titan: The Final Season",
            status: "completed",
            progress: 100,
            rating: 4.9,
            episodes: "28/28",
            thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Drama"],
            addedDate: "2024-01-20",
            isFavorite: true,
            tags: ["Eren", "Titans", "Masterpiece"],
            notes: "Absolutely amazing finale. 10/10!"
        },
        {
            id: 5,
            title: "Jujutsu Kaisen",
            status: "watching",
            progress: 65,
            rating: 4.8,
            episodes: "18/24",
            thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Supernatural"],
            addedDate: "2024-03-05",
            isFavorite: true,
            tags: ["Gojo", "Curses", "Awesome Fights"],
            notes: "Animation and fights are top tier."
        },
        {
            id: 6,
            title: "My Hero Academia",
            status: "watching",
            progress: 30,
            rating: 4.7,
            episodes: "42/138",
            thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Superhero"],
            addedDate: "2024-02-15",
            isFavorite: false,
            tags: ["Deku", "All Might", "UA Academy"],
            notes: "Taking a break, will continue later."
        },
        {
            id: 7,
            title: "Made in Abyss",
            status: "completed",
            progress: 100,
            rating: 4.8,
            episodes: "13/13",
            thumbnail: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=600&auto=format&fit=crop",
            genre: ["Adventure", "Fantasy"],
            addedDate: "2024-01-10",
            isFavorite: true,
            tags: ["Adventure", "Mystery", "Beautiful"],
            notes: "Dark but beautiful. The world-building is incredible."
        },
        {
            id: 8,
            title: "Tokyo Ghoul: Re",
            status: "watching",
            progress: 25,
            rating: 4.6,
            episodes: "5/12",
            thumbnail: "https://images.unsplash.com/photo-1578632748624-fbd20d345187?q=80&w=600&auto=format&fit=crop",
            genre: ["Action", "Horror"],
            addedDate: "2024-03-12",
            isFavorite: false,
            tags: ["Ghouls", "Kaneki", "CCG"],
            notes: "Better than previous seasons."
        },
        {
            id: 9,
            title: "One Piece",
            status: "planned",
            progress: 0,
            rating: 4.9,
            episodes: "0/1074",
            thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
            genre: ["Adventure", "Action"],
            addedDate: "2024-03-20",
            isFavorite: false,
            tags: ["Luffy", "Pirates", "Long Series"],
            notes: "Planning to start this epic journey soon!"
        },
        {
            id: 10,
            title: "Your Name",
            status: "completed",
            progress: 100,
            rating: 4.9,
            episodes: "Movie",
            thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=600&auto=format&fit=crop",
            genre: ["Romance", "Drama"],
            addedDate: "2024-02-14",
            isFavorite: true,
            tags: ["Makoto Shinkai", "Beautiful", "Emotional"],
            notes: "Cried like a baby. Absolute masterpiece."
        }
    ];
    
    let customLists = [
        {
            id: 1,
            name: "Top Favorites",
            description: "My all-time favorite anime",
            color: "#ff6b6b",
            privacy: "private",
            animeIds: [1, 2, 4, 7, 10],
            createdAt: "2024-02-01"
        },
        {
            id: 2,
            name: "To Watch Next",
            description: "Anime I plan to watch soon",
            color: "#6c5ce7",
            privacy: "private",
            animeIds: [9],
            createdAt: "2024-03-01"
        },
        {
            id: 3,
            name: "Action Packed",
            description: "Best action anime",
            color: "#0984e3",
            privacy: "public",
            animeIds: [1, 2, 4, 5],
            createdAt: "2024-01-15"
        }
    ];
    
    let selectedAnime = new Set();
    let currentTab = 'all';
    let currentSort = 'recent';
    let currentView = 'grid';
    let currentPage = 1;
    const itemsPerPage = 6;
    
    /* ==================================================
       4. UPDATE STATS
    ================================================== */
    function updateStats() {
        const totalAnime = animeListData.length;
        const watchingCount = animeListData.filter(anime => anime.status === 'watching').length;
        const completedCount = animeListData.filter(anime => anime.status === 'completed').length;
        const plannedCount = animeListData.filter(anime => anime.status === 'planned').length;
        
        document.getElementById('totalAnime').textContent = totalAnime;
        document.getElementById('watchingCount').textContent = watchingCount;
        document.getElementById('completedCount').textContent = completedCount;
        document.getElementById('plannedCount').textContent = plannedCount;
    }
    
    /* ==================================================
       5. TAB NAVIGATION
    ================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const listTabs = document.getElementById('listTabs');
    const customListsSection = document.getElementById('customListsSection');
    const viewTitle = document.getElementById('viewTitle');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Update current tab
            currentTab = btn.getAttribute('data-tab');
            currentPage = 1;
            
            // Update view title
            updateViewTitle();
            
            // Show/hide custom lists section
            if (currentTab === 'custom') {
                customListsSection.classList.add('active');
                document.querySelector('.anime-view-section').style.display = 'none';
                renderCustomLists();
            } else {
                customListsSection.classList.remove('active');
                document.querySelector('.anime-view-section').style.display = 'block';
                renderAnimeView();
            }
            
            // Clear selection
            selectedAnime.clear();
            updateSelectionUI();
        });
    });
    
    function updateViewTitle() {
        const titles = {
            'all': 'All Anime',
            'watching': 'Currently Watching',
            'completed': 'Completed',
            'planned': 'Plan to Watch',
            'favorites': 'Favorites',
            'custom': 'Custom Lists'
        };
        
        viewTitle.textContent = titles[currentTab] || 'My Anime List';
    }
    
    /* ==================================================
       6. VIEW TOGGLE (Grid/List)
    ================================================== */
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const animeGridView = document.getElementById('animeGridView');
    const animeListView = document.getElementById('animeListView');
    
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        animeGridView.classList.add('active');
        animeListView.classList.remove('active');
        currentView = 'grid';
        renderAnimeView();
    });
    
    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        animeListView.classList.add('active');
        animeGridView.classList.remove('active');
        currentView = 'list';
        renderAnimeView();
    });
    
    /* ==================================================
       7. SORTING
    ================================================== */
    const sortSelect = document.getElementById('sortBy');
    
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        currentPage = 1;
        renderAnimeView();
    });
    
    /* ==================================================
       8. RENDER ANIME VIEW (Grid/List)
    ================================================== */
    const animeGrid = document.getElementById('animeGrid');
    const animeList = document.getElementById('animeList');
    const emptyList = document.getElementById('emptyList');
    const pagination = document.getElementById('pagination');
    
    function renderAnimeView() {
        // Filter data based on current tab
        let filteredData = filterAnimeData(animeListData);
        
        // Sort data
        filteredData = sortAnimeData(filteredData);
        
        // Paginate data
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        // Clear containers
        animeGrid.innerHTML = '';
        animeList.innerHTML = '';
        
        if (paginatedData.length === 0) {
            emptyList.style.display = 'block';
            pagination.style.display = 'none';
        } else {
            emptyList.style.display = 'none';
            pagination.style.display = 'flex';
            
            // Render based on current view
            if (currentView === 'grid') {
                paginatedData.forEach(item => {
                    const card = createAnimeCard(item);
                    animeGrid.appendChild(card);
                });
            } else {
                paginatedData.forEach(item => {
                    const listItem = createAnimeListItem(item);
                    animeList.appendChild(listItem);
                });
            }
            
            // Render pagination
            renderPagination(totalPages);
        }
    }
    
    function filterAnimeData(data) {
        switch(currentTab) {
            case 'watching':
                return data.filter(item => item.status === 'watching');
            case 'completed':
                return data.filter(item => item.status === 'completed');
            case 'planned':
                return data.filter(item => item.status === 'planned');
            case 'favorites':
                return data.filter(item => item.isFavorite);
            default:
                return data;
        }
    }
    
    function sortAnimeData(data) {
        switch(currentSort) {
            case 'recent':
                return [...data].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
            case 'title':
                return [...data].sort((a, b) => a.title.localeCompare(b.title));
            case 'rating':
                return [...data].sort((a, b) => b.rating - a.rating);
            case 'episodes':
                return [...data].sort((a, b) => {
                    const aEp = parseInt(a.episodes.split('/')[1]) || 0;
                    const bEp = parseInt(b.episodes.split('/')[1]) || 0;
                    return bEp - aEp;
                });
            case 'progress':
                return [...data].sort((a, b) => b.progress - a.progress);
            default:
                return data;
        }
    }
    
    function createAnimeCard(item) {
        const card = document.createElement('div');
        card.className = `anime-card ${selectedAnime.has(item.id) ? 'selected' : ''}`;
        card.setAttribute('data-id', item.id);
        
        // Determine badge class
        let badgeClass = '';
        switch(item.status) {
            case 'watching': badgeClass = 'badge-watching'; break;
            case 'completed': badgeClass = 'badge-completed'; break;
            case 'planned': badgeClass = 'badge-planned'; break;
            case 'dropped': badgeClass = 'badge-dropped'; break;
        }
        
        // Format added date
        const addedDate = new Date(item.addedDate);
        const formattedDate = addedDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        card.innerHTML = `
            <div class="anime-card-select ${selectedAnime.has(item.id) ? 'checked' : ''}"></div>
            <div class="anime-card-badge ${badgeClass}">${item.status}</div>
            <div class="anime-card-thumb">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="anime-card-overlay">
                    <div class="anime-card-progress">
                        <div class="progress-info">
                            <span class="progress-label">Watch Progress</span>
                            <span class="progress-percent">${item.progress}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-fill" style="width: ${item.progress}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="anime-card-content">
                <div class="anime-card-header">
                    <div class="anime-card-title">
                        <h3>${item.title}</h3>
                        <div class="anime-card-episode">${item.episodes}</div>
                    </div>
                    <div class="anime-card-rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                <div class="anime-card-meta">
                    <div class="anime-meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Added ${formattedDate}</span>
                    </div>
                    <div class="anime-meta-item">
                        <i class="fas fa-tags"></i>
                        <span>${item.genre.join(', ')}</span>
                    </div>
                </div>
                <div class="anime-card-tags">
                    ${item.tags.map(tag => `<span class="anime-tag">${tag}</span>`).join('')}
                </div>
                <div class="anime-card-footer">
                    <div class="anime-card-actions">
                        <button class="anime-action-btn favorite ${item.isFavorite ? 'active' : ''}" title="${item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="anime-action-btn edit" title="Edit details">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="anime-action-btn delete" title="Remove from list">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <button class="anime-continue-btn">
                        <i class="fas fa-play"></i>
                        Continue
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const selectBtn = card.querySelector('.anime-card-select');
        selectBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAnimeSelection(item.id, card);
        });
        
        const favoriteBtn = card.querySelector('.favorite');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(item.id, favoriteBtn);
        });
        
        const editBtn = card.querySelector('.edit');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditModal(item);
        });
        
        const deleteBtn = card.querySelector('.delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteAnimeFromList(item.id);
        });
        
        const continueBtn = card.querySelector('.anime-continue-btn');
        continueBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            continueWatching(item);
        });
        
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.anime-card-select') && 
                !e.target.closest('.anime-action-btn') && 
                !e.target.closest('.anime-continue-btn')) {
                viewAnimeDetails(item);
            }
        });
        
        return card;
    }
    
    function createAnimeListItem(item) {
        const listItem = document.createElement('div');
        listItem.className = `anime-list-item ${selectedAnime.has(item.id) ? 'selected' : ''}`;
        listItem.setAttribute('data-id', item.id);
        
        // Determine status class
        let statusClass = '';
        switch(item.status) {
            case 'watching': statusClass = 'status-watching'; break;
            case 'completed': statusClass = 'status-completed'; break;
            case 'planned': statusClass = 'status-planned'; break;
            case 'dropped': statusClass = 'status-dropped'; break;
        }
        
        // Format added date
        const addedDate = new Date(item.addedDate);
        const formattedDate = addedDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        listItem.innerHTML = `
            <div class="anime-list-select">
                <div class="list-checkbox ${selectedAnime.has(item.id) ? 'checked' : ''}"></div>
            </div>
            <div class="anime-list-thumb">
                <img src="${item.thumbnail}" alt="${item.title}">
            </div>
            <div class="anime-list-content">
                <div class="anime-list-header">
                    <div class="anime-list-title">
                        <h3>${item.title}</h3>
                        <div class="anime-list-status ${statusClass}">${item.status}</div>
                    </div>
                    <div class="anime-list-rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                <div class="anime-list-details">
                    <div class="list-detail-item">
                        <span class="list-detail-label">Episodes</span>
                        <span class="list-detail-value">${item.episodes}</span>
                    </div>
                    <div class="list-detail-item">
                        <span class="list-detail-label">Genre</span>
                        <span class="list-detail-value">${item.genre.join(', ')}</span>
                    </div>
                    <div class="list-detail-item">
                        <span class="list-detail-label">Added</span>
                        <span class="list-detail-value">${formattedDate}</span>
                    </div>
                    <div class="list-detail-item">
                        <span class="list-detail-label">Rating</span>
                        <span class="list-detail-value rating">
                            <i class="fas fa-star"></i>
                            ${item.rating}
                        </span>
                    </div>
                </div>
                <div class="anime-list-progress">
                    <div class="progress-row">
                        <label>Progress</label>
                        <div class="progress-bar-container">
                            <div class="progress-fill" style="width: ${item.progress}%"></div>
                        </div>
                        <span class="progress-percent">${item.progress}%</span>
                    </div>
                </div>
                <div class="anime-list-footer">
                    <div class="anime-list-tags">
                        ${item.tags.map(tag => `<span class="anime-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="anime-list-actions">
                        <button class="anime-action-btn favorite ${item.isFavorite ? 'active' : ''}" title="${item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="anime-action-btn edit" title="Edit details">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="anime-action-btn delete" title="Remove from list">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="anime-continue-btn">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        const checkbox = listItem.querySelector('.list-checkbox');
        checkbox.addEventListener('click', () => {
            toggleAnimeSelection(item.id, listItem);
        });
        
        const favoriteBtn = listItem.querySelector('.favorite');
        favoriteBtn.addEventListener('click', () => {
            toggleFavorite(item.id, favoriteBtn);
        });
        
        const editBtn = listItem.querySelector('.edit');
        editBtn.addEventListener('click', () => {
            openEditModal(item);
        });
        
        const deleteBtn = listItem.querySelector('.delete');
        deleteBtn.addEventListener('click', () => {
            deleteAnimeFromList(item.id);
        });
        
        const continueBtn = listItem.querySelector('.anime-continue-btn');
        continueBtn.addEventListener('click', () => {
            continueWatching(item);
        });
        
        listItem.addEventListener('click', (e) => {
            if (!e.target.closest('.list-checkbox') && 
                !e.target.closest('.anime-action-btn') && 
                !e.target.closest('.anime-continue-btn')) {
                viewAnimeDetails(item);
            }
        });
        
        return listItem;
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
                renderAnimeView();
                scrollToAnimeSection();
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
                renderAnimeView();
                scrollToAnimeSection();
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
                renderAnimeView();
                scrollToAnimeSection();
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
                renderAnimeView();
                scrollToAnimeSection();
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
                renderAnimeView();
                scrollToAnimeSection();
            }
        });
        pagination.appendChild(nextBtn);
    }
    
    function scrollToAnimeSection() {
        document.querySelector('.anime-view-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    /* ==================================================
       9. SELECTION MANAGEMENT
    ================================================== */
    const selectAllBtn = document.getElementById('selectAllBtn');
    const bulkEditBtn = document.getElementById('bulkEditBtn');
    
    function toggleAnimeSelection(id, element) {
        if (selectedAnime.has(id)) {
            selectedAnime.delete(id);
            element.classList.remove('selected');
            
            // Update checkbox
            const checkbox = element.querySelector('.anime-card-select, .list-checkbox');
            if (checkbox) checkbox.classList.remove('checked');
        } else {
            selectedAnime.add(id);
            element.classList.add('selected');
            
            // Update checkbox
            const checkbox = element.querySelector('.anime-card-select, .list-checkbox');
            if (checkbox) checkbox.classList.add('checked');
        }
        
        updateSelectionUI();
    }
    
    function updateSelectionUI() {
        const totalSelected = selectedAnime.size;
        const totalItems = document.querySelectorAll('.anime-card, .anime-list-item').length;
        
        // Update select all button
        if (totalSelected === totalItems && totalItems > 0) {
            selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Deselect All';
        } else {
            selectAllBtn.innerHTML = '<i class="far fa-square"></i> Select All';
        }
        
        // Update bulk edit button
        bulkEditBtn.disabled = totalSelected === 0;
        bulkEditBtn.style.opacity = totalSelected === 0 ? '0.5' : '1';
        
        // Update export button
        const exportBtn = document.getElementById('exportBtn');
        exportBtn.disabled = totalSelected === 0;
        exportBtn.style.opacity = totalSelected === 0 ? '0.5' : '1';
    }
    
    selectAllBtn.addEventListener('click', () => {
        const totalItems = document.querySelectorAll('.anime-card, .anime-list-item').length;
        
        if (selectedAnime.size === totalItems && totalItems > 0) {
            // Deselect all
            selectedAnime.clear();
            document.querySelectorAll('.anime-card, .anime-list-item').forEach(item => {
                item.classList.remove('selected');
                const checkbox = item.querySelector('.anime-card-select, .list-checkbox');
                if (checkbox) checkbox.classList.remove('checked');
            });
        } else {
            // Select all
            document.querySelectorAll('.anime-card, .anime-list-item').forEach(item => {
                const id = parseInt(item.getAttribute('data-id'));
                selectedAnime.add(id);
                item.classList.add('selected');
                const checkbox = item.querySelector('.anime-card-select, .list-checkbox');
                if (checkbox) checkbox.classList.add('checked');
            });
        }
        
        updateSelectionUI();
    });
    
    /* ==================================================
       10. FAVORITE TOGGLE
    ================================================== */
    function toggleFavorite(id, button) {
        const anime = animeListData.find(item => item.id === id);
        if (anime) {
            anime.isFavorite = !anime.isFavorite;
            
            // Update button
            button.classList.toggle('active');
            button.setAttribute('title', anime.isFavorite ? 'Remove from favorites' : 'Add to favorites');
            
            // Update stats if needed
            updateStats();
            
            // Show notification
            showNotification(
                anime.isFavorite 
                    ? `${anime.title} added to favorites` 
                    : `${anime.title} removed from favorites`,
                anime.isFavorite ? 'success' : 'info'
            );
            
            // Re-render if on favorites tab
            if (currentTab === 'favorites') {
                renderAnimeView();
            }
        }
    }
    
    /* ==================================================
       11. EDIT ANIME MODAL
    ================================================== */
    const editAnimeModal = document.getElementById('editAnimeModal');
    const editAnimeModalClose = document.getElementById('editAnimeModalClose');
    const editAnimeCancel = document.getElementById('editAnimeCancel');
    const editAnimeSave = document.getElementById('editAnimeSave');
    const editStatus = document.getElementById('editStatus');
    const editProgress = document.getElementById('editProgress');
    const progressValue = document.getElementById('progressValue');
    const starRating = document.getElementById('starRating');
    const ratingValue = document.getElementById('ratingValue');
    const editNotes = document.getElementById('editNotes');
    const tagsContainer = document.getElementById('tagsContainer');
    const tagInput = document.getElementById('tagInput');
    
    let currentEditAnimeId = null;
    let currentTags = [];
    
    editProgress.addEventListener('input', () => {
        progressValue.textContent = `${editProgress.value}%`;
    });
    
    starRating.querySelectorAll('i').forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setRating(rating);
        });
        
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        const currentRating = parseInt(ratingValue.textContent.split('/')[0]);
        highlightStars(currentRating);
    });
    
    function setRating(rating) {
        ratingValue.textContent = `${rating}/5`;
        highlightStars(rating);
    }
    
    function highlightStars(rating) {
        starRating.querySelectorAll('i').forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
    
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && tagInput.value.trim()) {
            e.preventDefault();
            addTag(tagInput.value.trim());
            tagInput.value = '';
        }
    });
    
    function addTag(tag) {
        if (!currentTags.includes(tag)) {
            currentTags.push(tag);
            renderTags();
        }
    }
    
    function removeTag(tag) {
        currentTags = currentTags.filter(t => t !== tag);
        renderTags();
    }
    
    function renderTags() {
        tagsContainer.innerHTML = '';
        currentTags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="tag-remove" data-tag="${tag}">
                    <i class="fas fa-times"></i>
                </span>
            `;
            tagsContainer.appendChild(tagElement);
        });
        
        // Add event listeners to remove buttons
        tagsContainer.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const tag = btn.getAttribute('data-tag');
                removeTag(tag);
            });
        });
    }
    
    function openEditModal(anime) {
        currentEditAnimeId = anime.id;
        currentTags = [...anime.tags];
        
        // Set form values
        editStatus.value = anime.status;
        editProgress.value = anime.progress;
        progressValue.textContent = `${anime.progress}%`;
        setRating(anime.rating);
        editNotes.value = anime.notes || '';
        
        renderTags();
        
        // Show modal
        editAnimeModal.classList.add('active');
    }
    
    editAnimeModalClose.addEventListener('click', () => {
        editAnimeModal.classList.remove('active');
    });
    
    editAnimeCancel.addEventListener('click', () => {
        editAnimeModal.classList.remove('active');
    });
    
    editAnimeSave.addEventListener('click', () => {
        if (currentEditAnimeId) {
            const anime = animeListData.find(item => item.id === currentEditAnimeId);
            if (anime) {
                anime.status = editStatus.value;
                anime.progress = parseInt(editProgress.value);
                anime.rating = parseInt(ratingValue.textContent.split('/')[0]);
                anime.tags = currentTags;
                anime.notes = editNotes.value;
                
                // Update stats
                updateStats();
                
                // Re-render view
                renderAnimeView();
                
                // Show notification
                showNotification(`${anime.title} updated successfully`, 'success');
                
                // Close modal
                editAnimeModal.classList.remove('active');
            }
        }
    });
    
    /* ==================================================
       12. DELETE ANIME FROM LIST
    ================================================== */
    function deleteAnimeFromList(id) {
        if (confirm('Are you sure you want to remove this anime from your list?')) {
            const animeIndex = animeListData.findIndex(item => item.id === id);
            if (animeIndex !== -1) {
                const anime = animeListData[animeIndex];
                animeListData.splice(animeIndex, 1);
                
                // Remove from selection
                selectedAnime.delete(id);
                
                // Update stats
                updateStats();
                
                // Re-render view
                renderAnimeView();
                
                // Show notification
                showNotification(`${anime.title} removed from your list`, 'warning');
            }
        }
    }
    
    /* ==================================================
       13. BULK EDIT MODAL
    ================================================== */
    const bulkEditModal = document.getElementById('bulkEditModal');
    const bulkEditModalClose = document.getElementById('bulkEditModalClose');
    const bulkEditCancel = document.getElementById('bulkEditCancel');
    const bulkEditApply = document.getElementById('bulkEditApply');
    const selectedCount = document.getElementById('selectedCount');
    const bulkStatus = document.getElementById('bulkStatus');
    const bulkList = document.getElementById('bulkList');
    const bulkTags = document.getElementById('bulkTags');
    
    bulkEditBtn.addEventListener('click', () => {
        if (selectedAnime.size > 0) {
            selectedCount.textContent = selectedAnime.size;
            
            // Populate custom lists
            populateBulkLists();
            
            // Show modal
            bulkEditModal.classList.add('active');
        }
    });
    
    function populateBulkLists() {
        // Clear existing options except the first one
        while (bulkList.options.length > 1) {
            bulkList.remove(1);
        }
        
        // Add custom lists
        customLists.forEach(list => {
            const option = document.createElement('option');
            option.value = list.id;
            option.textContent = list.name;
            bulkList.appendChild(option);
        });
    }
    
    bulkEditModalClose.addEventListener('click', () => {
        bulkEditModal.classList.remove('active');
    });
    
    bulkEditCancel.addEventListener('click', () => {
        bulkEditModal.classList.remove('active');
    });
    
    bulkEditApply.addEventListener('click', () => {
        const status = bulkStatus.value;
        const listId = parseInt(bulkList.value);
        const tags = bulkTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        // Apply changes to selected anime
        selectedAnime.forEach(id => {
            const anime = animeListData.find(item => item.id === id);
            if (anime) {
                if (status) {
                    anime.status = status;
                }
                
                if (tags.length > 0) {
                    tags.forEach(tag => {
                        if (!anime.tags.includes(tag)) {
                            anime.tags.push(tag);
                        }
                    });
                }
                
                // Add to custom list if specified
                if (listId) {
                    const list = customLists.find(l => l.id === listId);
                    if (list && !list.animeIds.includes(id)) {
                        list.animeIds.push(id);
                    }
                }
            }
        });
        
        // Update stats
        updateStats();
        
        // Re-render view
        renderAnimeView();
        
        // Clear selection
        selectedAnime.clear();
        updateSelectionUI();
        
        // Show notification
        showNotification(`Applied changes to ${selectedAnime.size} anime`, 'success');
        
        // Close modal
        bulkEditModal.classList.remove('active');
    });
    
    /* ==================================================
       14. CUSTOM LISTS
    ================================================== */
    const customListsGrid = document.getElementById('customListsGrid');
    const createListBtn = document.getElementById('createListBtn');
    const createListModal = document.getElementById('createListModal');
    const createListModalClose = document.getElementById('createListModalClose');
    const createListCancel = document.getElementById('createListCancel');
    const createListConfirm = document.getElementById('createListConfirm');
    const listName = document.getElementById('listName');
    const listDescription = document.getElementById('listDescription');
    const listPrivacy = document.getElementById('listPrivacy');
    const colorOptions = document.querySelectorAll('.color-option');
    
    let selectedColor = '#ff6b6b';
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedColor = option.getAttribute('data-color');
        });
    });
    
    createListBtn.addEventListener('click', () => {
        createListModal.classList.add('active');
    });
    
    createListModalClose.addEventListener('click', () => {
        createListModal.classList.remove('active');
    });
    
    createListCancel.addEventListener('click', () => {
        createListModal.classList.remove('active');
    });
    
    createListConfirm.addEventListener('click', () => {
        if (listName.value.trim()) {
            const newList = {
                id: customLists.length + 1,
                name: listName.value.trim(),
                description: listDescription.value.trim(),
                color: selectedColor,
                privacy: listPrivacy.value,
                animeIds: [],
                createdAt: new Date().toISOString().split('T')[0]
            };
            
            customLists.push(newList);
            
            // Clear form
            listName.value = '';
            listDescription.value = '';
            
            // Close modal
            createListModal.classList.remove('active');
            
            // Re-render custom lists if on that tab
            if (currentTab === 'custom') {
                renderCustomLists();
            }
            
            // Show notification
            showNotification(`List "${newList.name}" created`, 'success');
        } else {
            alert('Please enter a list name');
        }
    });
    
    function renderCustomLists() {
        customListsGrid.innerHTML = '';
        
        if (customLists.length === 0) {
            const emptyCard = document.createElement('div');
            emptyCard.className = 'empty-list-card';
            emptyCard.innerHTML = `
                <i class="fas fa-folder-plus"></i>
                <h4>No Custom Lists Yet</h4>
                <p>Create your first custom list to organize anime by theme, mood, or any category you want!</p>
                <button class="btn-primary" id="createFirstListBtn">
                    <i class="fas fa-plus-circle"></i>
                    Create Your First List
                </button>
            `;
            customListsGrid.appendChild(emptyCard);
            
            document.getElementById('createFirstListBtn').addEventListener('click', () => {
                createListModal.classList.add('active');
            });
        } else {
            customLists.forEach(list => {
                const listCard = createCustomListCard(list);
                customListsGrid.appendChild(listCard);
            });
        }
    }
    
    function createCustomListCard(list) {
        const card = document.createElement('div');
        card.className = 'custom-list-card';
        card.style.borderTopColor = list.color;
        
        // Get anime for this list (limited to 3 for preview)
        const listAnime = animeListData.filter(anime => list.animeIds.includes(anime.id)).slice(0, 3);
        
        card.innerHTML = `
            <div class="list-card-header">
                <div class="list-card-icon" style="background: ${list.color}">
                    <i class="fas fa-folder"></i>
                </div>
                <div class="list-card-info">
                    <h4>${list.name}</h4>
                    <p>${list.description}</p>
                    <div class="list-card-meta">
                        <span>
                            <i class="fas fa-video"></i>
                            ${list.animeIds.length} anime
                        </span>
                        <span>
                            <i class="fas fa-globe"></i>
                            ${list.privacy}
                        </span>
                        <span>
                            <i class="fas fa-calendar"></i>
                            ${new Date(list.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>
            <div class="list-card-content">
                ${listAnime.length > 0 ? listAnime.map(anime => `
                    <div class="list-card-anime">
                        <div class="anime-thumb">
                            <img src="${anime.thumbnail}" alt="${anime.title}">
                        </div>
                        <div class="anime-details">
                            <h5>${anime.title}</h5>
                            <span>${anime.episodes} • ${anime.rating} <i class="fas fa-star"></i></span>
                        </div>
                    </div>
                `).join('') : '<p style="color: var(--text-gray); text-align: center; padding: 20px;">No anime in this list yet</p>'}
            </div>
            <div class="list-card-footer">
                <div class="list-card-actions">
                    <button class="list-card-btn view-list-btn" data-id="${list.id}">
                        View List
                    </button>
                    <button class="list-card-btn edit" data-id="${list.id}">
                        Edit
                    </button>
                </div>
                <button class="list-card-btn delete-list-btn" data-id="${list.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        const viewBtn = card.querySelector('.view-list-btn');
        viewBtn.addEventListener('click', () => {
            viewCustomList(list);
        });
        
        const editBtn = card.querySelector('.edit');
        editBtn.addEventListener('click', () => {
            editCustomList(list);
        });
        
        const deleteBtn = card.querySelector('.delete-list-btn');
        deleteBtn.addEventListener('click', () => {
            deleteCustomList(list.id);
        });
        
        return card;
    }
    
    function viewCustomList(list) {
        showNotification(`Viewing list: ${list.name}`, 'info');
        // In a real app, this would navigate to a list detail page
    }
    
    function editCustomList(list) {
        showNotification(`Editing list: ${list.name}`, 'info');
        // In a real app, this would open an edit modal
    }
    
    function deleteCustomList(id) {
        if (confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
            const listIndex = customLists.findIndex(list => list.id === id);
            if (listIndex !== -1) {
                const listName = customLists[listIndex].name;
                customLists.splice(listIndex, 1);
                
                // Re-render custom lists
                renderCustomLists();
                
                // Show notification
                showNotification(`List "${listName}" deleted`, 'warning');
            }
        }
    }
    
    /* ==================================================
       15. QUICK ADD FUNCTIONALITY
    ================================================== */
    const quickSearch = document.getElementById('quickSearch');
    const quickSearchBtn = document.getElementById('quickSearchBtn');
    const quickResults = document.getElementById('quickResults');
    
    // Sample search results data
    const sampleAnimeResults = [
        {
            id: 101,
            title: "Naruto: Shippuden",
            thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
            episodes: "500/500",
            rating: 4.7,
            genre: "Action, Adventure"
        },
        {
            id: 102,
            title: "One Punch Man",
            thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
            episodes: "12/12",
            rating: 4.5,
            genre: "Action, Comedy"
        },
        {
            id: 103,
            title: "Hunter x Hunter",
            thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop",
            episodes: "148/148",
            rating: 4.9,
            genre: "Action, Adventure"
        }
    ];
    
    quickSearch.addEventListener('input', () => {
        if (quickSearch.value.trim().length >= 2) {
            performQuickSearch(quickSearch.value.trim());
        } else {
            quickResults.classList.remove('active');
        }
    });
    
    quickSearchBtn.addEventListener('click', () => {
        if (quickSearch.value.trim().length >= 2) {
            performQuickSearch(quickSearch.value.trim());
        }
    });
    
    function performQuickSearch(query) {
        // In a real app, this would be an API call
        // For demo, we'll filter sample results
        const filteredResults = sampleAnimeResults.filter(anime => 
            anime.title.toLowerCase().includes(query.toLowerCase())
        );
        
        renderQuickResults(filteredResults);
    }
    
    function renderQuickResults(results) {
        quickResults.innerHTML = '';
        
        if (results.length === 0) {
            quickResults.innerHTML = '<p style="color: var(--text-gray); text-align: center; padding: 20px;">No results found</p>';
            quickResults.classList.add('active');
            return;
        }
        
        results.forEach(anime => {
            const isInList = animeListData.some(item => item.title === anime.title);
            
            const resultItem = document.createElement('div');
            resultItem.className = 'quick-result-item';
            resultItem.innerHTML = `
                <div class="quick-result-thumb">
                    <img src="${anime.thumbnail}" alt="${anime.title}">
                </div>
                <div class="quick-result-info">
                    <h4>${anime.title}</h4>
                    <p>${anime.genre}</p>
                    <div class="quick-result-meta">
                        <span>${anime.episodes}</span>
                        <span>${anime.rating} <i class="fas fa-star"></i></span>
                    </div>
                </div>
                <div class="quick-result-actions">
                    <button class="quick-add-btn ${isInList ? 'added' : ''}" data-id="${anime.id}">
                        ${isInList ? 'Added' : 'Add to List'}
                    </button>
                </div>
            `;
            
            const addBtn = resultItem.querySelector('.quick-add-btn');
            addBtn.addEventListener('click', () => {
                if (!isInList) {
                    addAnimeToQuickList(anime);
                    addBtn.textContent = 'Added';
                    addBtn.classList.add('added');
                    showNotification(`${anime.title} added to your list`, 'success');
                } else {
                    showNotification(`${anime.title} is already in your list`, 'info');
                }
            });
            
            quickResults.appendChild(resultItem);
        });
        
        quickResults.classList.add('active');
    }
    
    function addAnimeToQuickList(anime) {
        const newAnime = {
            id: animeListData.length + 1,
            title: anime.title,
            status: "planned",
            progress: 0,
            rating: anime.rating,
            episodes: anime.episodes,
            thumbnail: anime.thumbnail,
            genre: anime.genre.split(', '),
            addedDate: new Date().toISOString().split('T')[0],
            isFavorite: false,
            tags: ["Quick Add"],
            notes: "Added via quick search"
        };
        
        animeListData.push(newAnime);
        
        // Update stats
        updateStats();
        
        // Re-render view if on all or planned tab
        if (currentTab === 'all' || currentTab === 'planned') {
            renderAnimeView();
        }
    }
    
    /* ==================================================
       16. RECOMMENDATIONS
    ================================================== */
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    
    // Sample recommendations data
    const recommendationsData = [
        {
            id: 201,
            title: "Mob Psycho 100",
            thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
            genre: "Action, Comedy",
            rating: 4.8,
            reason: "Similar to Jujutsu Kaisen"
        },
        {
            id: 202,
            title: "Vinland Saga",
            thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
            genre: "Action, Drama",
            rating: 4.9,
            reason: "Based on your interest in Attack on Titan"
        },
        {
            id: 203,
            title: "Violet Evergarden",
            thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop",
            genre: "Drama, Fantasy",
            rating: 4.7,
            reason: "If you liked Your Name"
        },
        {
            id: 204,
            title: "Cyberpunk: Edgerunners",
            thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=300&auto=format&fit=crop",
            genre: "Action, Sci-Fi",
            rating: 4.8,
            reason: "Similar to Sword Art Online"
        }
    ];
    
    function renderRecommendations() {
        recommendationsGrid.innerHTML = '';
        
        recommendationsData.forEach(anime => {
            const isInList = animeListData.some(item => item.title === anime.title);
            
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <div class="recommendation-thumb">
                    <img src="${anime.thumbnail}" alt="${anime.title}">
                    <div class="recommendation-badge">Recommended</div>
                </div>
                <div class="recommendation-content">
                    <h4>${anime.title}</h4>
                    <div class="recommendation-genre">${anime.genre}</div>
                    <div class="recommendation-meta">
                        <div class="recommendation-rating">
                            <i class="fas fa-star"></i>
                            <span>${anime.rating}</span>
                        </div>
                        <button class="recommendation-add-btn ${isInList ? 'added' : ''}" title="${isInList ? 'Already in list' : 'Add to list'}">
                            <i class="fas fa-${isInList ? 'check' : 'plus'}"></i>
                        </button>
                    </div>
                </div>
            `;
            
            const addBtn = card.querySelector('.recommendation-add-btn');
            addBtn.addEventListener('click', () => {
                if (!isInList) {
                    addAnimeFromRecommendation(anime);
                    addBtn.innerHTML = '<i class="fas fa-check"></i>';
                    addBtn.classList.add('added');
                    addBtn.setAttribute('title', 'Already in list');
                    showNotification(`${anime.title} added to your list`, 'success');
                } else {
                    showNotification(`${anime.title} is already in your list`, 'info');
                }
            });
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.recommendation-add-btn')) {
                    viewAnimeDetails(anime);
                }
            });
            
            recommendationsGrid.appendChild(card);
        });
    }
    
    function addAnimeFromRecommendation(anime) {
        const newAnime = {
            id: animeListData.length + 1,
            title: anime.title,
            status: "planned",
            progress: 0,
            rating: anime.rating,
            episodes: "0/?",
            thumbnail: anime.thumbnail,
            genre: anime.genre.split(', '),
            addedDate: new Date().toISOString().split('T')[0],
            isFavorite: false,
            tags: ["Recommendation", anime.reason.split(': ')[0]],
            notes: `Recommended because: ${anime.reason}`
        };
        
        animeListData.push(newAnime);
        
        // Update stats
        updateStats();
        
        // Re-render view if on all or planned tab
        if (currentTab === 'all' || currentTab === 'planned') {
            renderAnimeView();
        }
    }
    
    /* ==================================================
       17. EXPORT FUNCTIONALITY
    ================================================== */
    const exportBtn = document.getElementById('exportBtn');
    
    exportBtn.addEventListener('click', () => {
        if (selectedAnime.size > 0) {
            exportSelectedAnime();
        } else {
            exportAllAnime();
        }
    });
    
    function exportSelectedAnime() {
        const selectedAnimeData = animeListData.filter(anime => selectedAnime.has(anime.id));
        exportAnimeList(selectedAnimeData, 'selected_anime_list');
        showNotification(`Exported ${selectedAnime.size} anime to file`, 'success');
    }
    
    function exportAllAnime() {
        exportAnimeList(animeListData, 'my_anime_list');
        showNotification('Exported all anime to file', 'success');
    }
    
    function exportAnimeList(data, filename) {
        // Create CSV content
        let csvContent = "Title,Status,Progress,Rating,Episodes,Genre,Tags,Added Date,Notes\n";
        
        data.forEach(anime => {
            const row = [
                `"${anime.title}"`,
                anime.status,
                `${anime.progress}%`,
                anime.rating,
                `"${anime.episodes}"`,
                `"${anime.genre.join(', ')}"`,
                `"${anime.tags.join(', ')}"`,
                anime.addedDate,
                `"${anime.notes || ''}"`
            ];
            
            csvContent += row.join(',') + "\n";
        });
        
        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    /* ==================================================
       18. UTILITY FUNCTIONS
    ================================================== */
    function continueWatching(anime) {
        showNotification(`Continuing ${anime.title}`, 'info');
        // In a real app, this would redirect to the watch page
        // window.location.href = `watch.html?anime=${anime.id}`;
    }
    
    function viewAnimeDetails(anime) {
        showNotification(`Viewing details for ${anime.title}`, 'info');
        // In a real app, this would redirect to the anime details page
        // window.location.href = `anime.html?id=${anime.id}`;
    }
    
    function showNotification(message, type = 'info') {
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
        
        // Add CSS animations
        const style = document.createElement('style');
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
    
    /* ==================================================
       19. KEYBOARD SHORTCUTS
    ================================================== */
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        switch(e.key) {
            case 'Escape':
                // Close any open modals
                [editAnimeModal, bulkEditModal, createListModal].forEach(modal => {
                    if (modal.classList.contains('active')) {
                        modal.classList.remove('active');
                    }
                });
                break;
            case 'g':
                if (e.ctrlKey) {
                    e.preventDefault();
                    gridViewBtn.click();
                }
                break;
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    listViewBtn.click();
                }
                break;
            case 'a':
                if (e.ctrlKey) {
                    e.preventDefault();
                    selectAllBtn.click();
                }
                break;
            case 'Delete':
                if (selectedAnime.size > 0) {
                    if (confirm(`Delete ${selectedAnime.size} selected anime from your list?`)) {
                        selectedAnime.forEach(id => {
                            const animeIndex = animeListData.findIndex(item => item.id === id);
                            if (animeIndex !== -1) {
                                animeListData.splice(animeIndex, 1);
                            }
                        });
                        
                        selectedAnime.clear();
                        updateStats();
                        renderAnimeView();
                        showNotification('Selected anime removed from list', 'warning');
                    }
                }
                break;
        }
    });
    
    /* ==================================================
       20. INITIALIZE PAGE
    ================================================== */
    function initializePage() {
        updateStats();
        updateViewTitle();
        renderAnimeView();
        renderCustomLists();
        renderRecommendations();
        
        // Close quick results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.quick-add-section') && quickResults.classList.contains('active')) {
                quickResults.classList.remove('active');
            }
        });
    }
    
    // Initialize when DOM is loaded
    initializePage();
});