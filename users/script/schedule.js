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
       2. SCHEDULE DATA
    ================================================== */
    // Sample schedule data
    const scheduleData = {
        monday: [
            {
                id: 1,
                title: "Demon Slayer: Hashira Training Arc",
                episode: "Episode 8",
                time: "21:00",
                rating: 4.9,
                status: "ongoing",
                genres: ["Action", "Fantasy", "Adventure"],
                description: "Tanjiro and the other Demon Slayers undergo intense training with the Hashira to prepare for the final battle against Muzan Kibutsuji.",
                thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 2,
                title: "Jujutsu Kaisen Season 3",
                episode: "Episode 5",
                time: "20:30",
                rating: 4.8,
                status: "ongoing",
                genres: ["Action", "Supernatural", "Fantasy"],
                description: "Yuji Itadori continues his journey as a Jujutsu Sorcerer, facing new threats and uncovering more secrets about Sukuna.",
                thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 3,
                title: "Spy x Family Season 2",
                episode: "Episode 12 (Final)",
                time: "19:00",
                rating: 4.7,
                status: "completed",
                genres: ["Action", "Comedy", "Slice of Life"],
                description: "The final episode of the season wraps up Loid, Yor, and Anya's latest mission while setting up for future adventures.",
                thumbnail: "https://images.unsplash.com/photo-1590955559144-a82332cf2c08?q=80&w=400&auto=format&fit=crop"
            }
        ],
        tuesday: [
            {
                id: 4,
                title: "My Hero Academia Season 7",
                episode: "Episode 3",
                time: "22:00",
                rating: 4.6,
                status: "ongoing",
                genres: ["Action", "Superhero", "Comedy"],
                description: "The heroes face their greatest challenge yet as the war against the Paranormal Liberation Front intensifies.",
                thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 5,
                title: "One Piece: Egghead Arc",
                episode: "Episode 1089",
                time: "18:00",
                rating: 4.9,
                status: "ongoing",
                genres: ["Action", "Adventure", "Fantasy"],
                description: "The Straw Hat Pirates arrive at the futuristic Egghead Island and encounter the genius scientist Dr. Vegapunk.",
                thumbnail: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 6,
                title: "Chainsaw Man: Academy Arc",
                episode: "Episode 4",
                time: "23:30",
                rating: 4.7,
                status: "ongoing",
                genres: ["Action", "Horror", "Supernatural"],
                description: "Denji continues his life as a high school student while dealing with new devil threats and mysterious organizations.",
                thumbnail: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=400&auto=format&fit=crop"
            }
        ],
        wednesday: [
            {
                id: 7,
                title: "Attack on Titan: Final Chapters",
                episode: "Special Episode 2",
                time: "20:00",
                rating: 4.9,
                status: "completed",
                genres: ["Action", "Drama", "Fantasy"],
                description: "The epic conclusion to the story of Eren Yeager and the battle for Paradis Island reaches its climax.",
                thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 8,
                title: "Vinland Saga Season 3",
                episode: "Episode 6",
                time: "21:30",
                rating: 4.8,
                status: "ongoing",
                genres: ["Action", "Adventure", "Drama"],
                description: "Thorfinn's journey continues as he seeks to establish a peaceful settlement in Vinland.",
                thumbnail: "https://images.unsplash.com/photo-1542256844-d3d05538a5b8?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 9,
                title: "Blue Lock: Episode Nagi",
                episode: "Episode 7",
                time: "19:30",
                rating: 4.5,
                status: "ongoing",
                genres: ["Sports", "Drama", "Psychological"],
                description: "The Blue Lock project continues as players compete to become Japan's next star striker.",
                thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop"
            }
        ],
        thursday: [
            {
                id: 10,
                title: "Frieren: Beyond Journey's End",
                episode: "Episode 24",
                time: "20:00",
                rating: 4.8,
                status: "ongoing",
                genres: ["Fantasy", "Adventure", "Drama"],
                description: "Frieren continues her journey to understand humanity and come to terms with her immortal lifespan.",
                thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 11,
                title: "Mushoku Tensei: Jobless Reincarnation II",
                episode: "Episode 18",
                time: "22:30",
                rating: 4.7,
                status: "ongoing",
                genres: ["Fantasy", "Drama", "Isekai"],
                description: "Rudeus faces new challenges in his second life as he continues to grow and protect those he cares about.",
                thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 12,
                title: "The Apothecary Diaries",
                episode: "Episode 20",
                time: "21:00",
                rating: 4.6,
                status: "ongoing",
                genres: ["Mystery", "Historical", "Drama"],
                description: "Maomao continues to solve mysteries in the inner palace while navigating court politics.",
                thumbnail: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=400&auto=format&fit=crop"
            }
        ],
        friday: [
            {
                id: 13,
                title: "Solo Leveling",
                episode: "Episode 10",
                time: "20:00",
                rating: 4.9,
                status: "ongoing",
                genres: ["Action", "Fantasy", "Adventure"],
                description: "Sung Jin-Woo continues to level up and face increasingly powerful monsters and hunters.",
                thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 14,
                title: "That Time I Got Reincarnated as a Slime Season 3",
                episode: "Episode 5",
                time: "19:30",
                rating: 4.7,
                status: "ongoing",
                genres: ["Fantasy", "Comedy", "Isekai"],
                description: "Rimuru continues to build his nation and face new threats in the fantasy world.",
                thumbnail: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 15,
                title: "Dr. Stone: New World Part 2",
                episode: "Episode 8",
                time: "21:00",
                rating: 4.6,
                status: "ongoing",
                genres: ["Adventure", "Sci-Fi", "Comedy"],
                description: "Senku and the Kingdom of Science continue their journey to revive civilization and uncover the truth behind the petrification.",
                thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop"
            }
        ],
        saturday: [
            {
                id: 16,
                title: "One Punch Man Season 3",
                episode: "Episode 2",
                time: "18:00",
                rating: 4.8,
                status: "ongoing",
                genres: ["Action", "Comedy", "Superhero"],
                description: "Saitama continues his mundane hero life while new threats emerge that challenge the Hero Association.",
                thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 17,
                title: "Tokyo Revengers: Tenjiku Arc",
                episode: "Episode 10",
                time: "20:30",
                rating: 4.7,
                status: "ongoing",
                genres: ["Action", "Drama", "Supernatural"],
                description: "Takemichi faces his greatest challenge yet as he tries to save his friends from the ruthless Tenjiku gang.",
                thumbnail: "https://images.unsplash.com/photo-1578632748624-fbd20d345187?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 18,
                title: "Haikyuu!! The Dumpster Battle",
                episode: "Movie Part 2",
                time: "22:00",
                rating: 4.9,
                status: "upcoming",
                genres: ["Sports", "Drama", "Comedy"],
                description: "The long-awaited battle between Karasuno and Nekoma finally begins in this theatrical release.",
                thumbnail: "https://images.unsplash.com/photo-1595435934249-5df7ed86d428?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 19,
                title: "Classroom of the Elite Season 3",
                episode: "Episode 12",
                time: "21:00",
                rating: 4.6,
                status: "ongoing",
                genres: ["Psychological", "Drama", "School"],
                description: "Kiyotaka Ayanokoji continues to manipulate events from behind the scenes in the competitive school environment.",
                thumbnail: "https://images.unsplash.com/photo-1561069934-eee225952461?q=80&w=400&auto=format&fit=crop"
            }
        ],
        sunday: [
            {
                id: 20,
                title: "The Rising of the Shield Hero Season 3",
                episode: "Episode 22 (Final)",
                time: "20:00",
                rating: 4.5,
                status: "completed",
                genres: ["Action", "Adventure", "Fantasy"],
                description: "Naofumi and his companions face their final battle against the waves and the mysterious enemy behind them.",
                thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 21,
                title: "Overlord IV: The Holy Kingdom Arc",
                episode: "Special Episode",
                time: "21:30",
                rating: 4.7,
                status: "upcoming",
                genres: ["Action", "Fantasy", "Isekai"],
                description: "Ainz Ooal Gown and the Great Tomb of Nazarick set their sights on the Holy Kingdom in this special episode.",
                thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 22,
                title: "Re:Zero - Starting Life in Another World Season 3",
                episode: "Episode 1",
                time: "23:00",
                rating: 4.8,
                status: "upcoming",
                genres: ["Drama", "Fantasy", "Isekai"],
                description: "Subaru returns for a new season of suffering and determination in the fantasy world.",
                thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop"
            }
        ]
    };
    
    /* ==================================================
       3. INITIALIZE SCHEDULE PAGE
    ================================================== */
    let currentDay = 'monday';
    let currentView = 'grid';
    let activeFilters = {
        status: ['ongoing', 'upcoming'],
        genres: []
    };
    
    // DOM Elements
    const daysContainer = document.getElementById('daysContainer');
    const scheduleGrid = document.getElementById('scheduleGrid');
    const scheduleList = document.getElementById('scheduleList');
    const emptySchedule = document.getElementById('emptySchedule');
    const filterToggle = document.getElementById('filterToggle');
    const filtersPanel = document.getElementById('filtersPanel');
    const viewBtns = document.querySelectorAll('.view-btn');
    const dayTabs = document.querySelectorAll('.day-tab');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersEmptyBtn = document.getElementById('resetFiltersEmpty');
    
    // Initialize the page
    function initSchedulePage() {
        setupDaysNavigation();
        renderSchedule(currentDay);
        setupEventListeners();
        updateTodayDate();
        setupWeekNavigation();
    }
    
    /* ==================================================
       4. DAYS NAVIGATION
    ================================================== */
    function setupDaysNavigation() {
        const days = [
            { id: 'monday', name: 'Monday', date: 'Mar 10' },
            { id: 'tuesday', name: 'Tuesday', date: 'Mar 11' },
            { id: 'wednesday', name: 'Wednesday', date: 'Mar 12' },
            { id: 'thursday', name: 'Thursday', date: 'Mar 13' },
            { id: 'friday', name: 'Friday', date: 'Mar 14' },
            { id: 'saturday', name: 'Saturday', date: 'Mar 15' },
            { id: 'sunday', name: 'Sunday', date: 'Mar 16' }
        ];
        
        daysContainer.innerHTML = '';
        
        days.forEach(day => {
            const dayTab = document.createElement('div');
            dayTab.className = `day-tab ${day.id === currentDay ? 'active' : ''}`;
            dayTab.dataset.day = day.id;
            
            const animeCount = scheduleData[day.id] ? scheduleData[day.id].length : 0;
            
            dayTab.innerHTML = `
                <div class="day-name">${day.name}</div>
                <div class="day-date">${day.date}</div>
                <div class="day-count">${animeCount} Anime</div>
            `;
            
            dayTab.addEventListener('click', () => {
                setActiveDay(day.id);
            });
            
            daysContainer.appendChild(dayTab);
        });
    }
    
    function setActiveDay(dayId) {
        currentDay = dayId;
        
        // Update active tab
        document.querySelectorAll('.day-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.day === dayId) {
                tab.classList.add('active');
            }
        });
        
        // Render schedule for selected day
        renderSchedule(dayId);
        
        // Scroll to schedule content on mobile
        if (window.innerWidth < 768) {
            document.querySelector('.schedule-content').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    /* ==================================================
       5. RENDER SCHEDULE
    ================================================== */
    function renderSchedule(dayId) {
        const animeList = scheduleData[dayId] || [];
        
        // Apply filters
        let filteredAnime = filterAnime(animeList);
        
        // Clear containers
        scheduleGrid.innerHTML = '';
        scheduleList.innerHTML = '';
        
        // Show empty state if no anime
        if (filteredAnime.length === 0) {
            emptySchedule.style.display = 'block';
            scheduleGrid.style.display = 'none';
            scheduleList.style.display = 'none';
            return;
        }
        
        emptySchedule.style.display = 'none';
        
        // Render based on current view
        if (currentView === 'grid') {
            scheduleGrid.style.display = 'grid';
            scheduleList.style.display = 'none';
            renderGridView(filteredAnime);
        } else {
            scheduleGrid.style.display = 'none';
            scheduleList.style.display = 'flex';
            renderListView(filteredAnime);
        }
        
        // Update day count in navigation
        updateDayCount(dayId, filteredAnime.length);
    }
    
    function filterAnime(animeList) {
        return animeList.filter(anime => {
            // Filter by status
            if (activeFilters.status.length > 0 && !activeFilters.status.includes(anime.status)) {
                return false;
            }
            
            // Filter by genre
            if (activeFilters.genres.length > 0) {
                const hasMatchingGenre = anime.genres.some(genre => 
                    activeFilters.genres.includes(genre.toLowerCase())
                );
                if (!hasMatchingGenre) return false;
            }
            
            return true;
        });
    }
    
    function renderGridView(animeList) {
        animeList.forEach(anime => {
            const scheduleItem = createScheduleItem(anime, 'grid');
            scheduleGrid.appendChild(scheduleItem);
        });
    }
    
    function renderListView(animeList) {
        animeList.forEach(anime => {
            const scheduleItem = createScheduleItem(anime, 'list');
            scheduleList.appendChild(scheduleItem);
        });
    }
    
    function createScheduleItem(anime, viewType) {
        const item = document.createElement('div');
        item.className = `schedule-item ${viewType}-view`;
        
        const statusClass = anime.status === 'ongoing' ? 'ongoing' : 
                           anime.status === 'upcoming' ? 'upcoming' : 'completed';
        
        item.innerHTML = `
            <div class="anime-poster">
                <img src="${anime.thumbnail}" alt="${anime.title}">
                <div class="airing-badge">
                    <i class="fas fa-clock"></i>
                    <span>${anime.time} JST</span>
                </div>
                <div class="status-badge ${statusClass}">
                    ${anime.status === 'ongoing' ? 'Airing' : 
                      anime.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </div>
            </div>
            <div class="anime-info">
                <div class="anime-header">
                    <div class="anime-title">
                        <h3>${anime.title}</h3>
                    </div>
                    <div class="anime-rating">
                        <i class="fas fa-star"></i>
                        <span>${anime.rating}</span>
                    </div>
                </div>
                <div class="anime-meta">
                    <div class="anime-episode">
                        <i class="fas fa-play-circle"></i>
                        <span>${anime.episode}</span>
                    </div>
                    <div class="anime-time">
                        <i class="fas fa-clock"></i>
                        <span>${anime.time} JST</span>
                    </div>
                </div>
                ${viewType === 'list' ? `<p class="anime-description">${anime.description}</p>` : ''}
                <div class="anime-genres">
                    ${anime.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
                <div class="anime-actions">
                    <button class="action-btn-small primary" data-anime-id="${anime.id}">
                        <i class="fas fa-bell"></i>
                        <span>Remind Me</span>
                    </button>
                    <button class="action-btn-small secondary" data-anime-id="${anime.id}">
                        <i class="fas fa-plus"></i>
                        <span>Add to List</span>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners to buttons
        const remindBtn = item.querySelector('.action-btn-small.primary');
        const addBtn = item.querySelector('.action-btn-small.secondary');
        
        remindBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setReminder(anime);
        });
        
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToList(anime);
        });
        
        // Make entire item clickable (for future expansion)
        item.addEventListener('click', () => {
            // In a real app, this would navigate to the anime detail page
            showNotification(`Opening ${anime.title}...`, 'info');
        });
        
        return item;
    }
    
    function updateDayCount(dayId, count) {
        const dayTab = document.querySelector(`.day-tab[data-day="${dayId}"]`);
        if (dayTab) {
            const countElement = dayTab.querySelector('.day-count');
            countElement.textContent = `${count} Anime`;
        }
    }
    
    /* ==================================================
       6. FILTER FUNCTIONALITY
    ================================================== */
    function setupEventListeners() {
        // Filter toggle
        filterToggle.addEventListener('click', () => {
            filtersPanel.classList.toggle('active');
        });
        
        // View toggle
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                setActiveView(view);
            });
        });
        
        // Status filter checkboxes
        const statusCheckboxes = document.querySelectorAll('input[name="status"]');
        statusCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateStatusFilters);
        });
        
        // Genre filter checkboxes
        const genreCheckboxes = document.querySelectorAll('input[name="genre"]');
        genreCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateGenreFilters);
        });
        
        // Reset filters button
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetAllFilters);
        }
        
        // Apply filters button
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }
        
        // Reset filters from empty state
        if (resetFiltersEmptyBtn) {
            resetFiltersEmptyBtn.addEventListener('click', resetAllFilters);
        }
    }
    
    function setActiveView(view) {
        currentView = view;
        
        // Update active view button
        viewBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
        
        // Re-render schedule with new view
        renderSchedule(currentDay);
    }
    
    function updateStatusFilters() {
        const statusCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="filter-"]');
        activeFilters.status = [];
        
        statusCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const status = checkbox.id.replace('filter-', '');
                activeFilters.status.push(status);
            }
        });
    }
    
    function updateGenreFilters() {
        const genreCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="genre-"]');
        activeFilters.genres = [];
        
        genreCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const genre = checkbox.id.replace('genre-', '');
                activeFilters.genres.push(genre);
            }
        });
    }
    
    function resetAllFilters() {
        // Uncheck all filter checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Check default status filters
        document.getElementById('filter-ongoing').checked = true;
        document.getElementById('filter-upcoming').checked = true;
        
        // Reset active filters
        activeFilters = {
            status: ['ongoing', 'upcoming'],
            genres: []
        };
        
        // Close filters panel
        filtersPanel.classList.remove('active');
        
        // Re-render schedule
        renderSchedule(currentDay);
        
        showNotification('All filters have been reset', 'info');
    }
    
    function applyFilters() {
        updateStatusFilters();
        updateGenreFilters();
        
        // Close filters panel
        filtersPanel.classList.remove('active');
        
        // Re-render schedule
        renderSchedule(currentDay);
        
        showNotification('Filters applied successfully', 'success');
    }
    
    /* ==================================================
       7. WEEK NAVIGATION
    ================================================== */
    function setupWeekNavigation() {
        const prevWeekBtn = document.getElementById('prevWeek');
        const currentWeekBtn = document.getElementById('currentWeekBtn');
        const nextWeekBtn = document.getElementById('nextWeek');
        
        if (prevWeekBtn) {
            prevWeekBtn.addEventListener('click', () => {
                navigateWeek('prev');
            });
        }
        
        if (currentWeekBtn) {
            currentWeekBtn.addEventListener('click', () => {
                navigateWeek('current');
            });
        }
        
        if (nextWeekBtn) {
            nextWeekBtn.addEventListener('click', () => {
                navigateWeek('next');
            });
        }
    }
    
    function navigateWeek(direction) {
        const weekButtons = document.querySelectorAll('.week-nav-btn');
        weekButtons.forEach(btn => btn.classList.remove('active'));
        
        let message = '';
        switch(direction) {
            case 'prev':
                document.getElementById('prevWeek').classList.add('active');
                message = 'Loading previous week...';
                break;
            case 'next':
                document.getElementById('nextWeek').classList.add('active');
                message = 'Loading next week...';
                break;
            case 'current':
                document.getElementById('currentWeekBtn').classList.add('active');
                message = 'Returning to current week...';
                break;
        }
        
        // Show loading notification
        showNotification(message, 'info');
        
        // In a real app, this would fetch new schedule data from API
        // For now, we'll just simulate a delay
        setTimeout(() => {
            showNotification('Schedule updated', 'success');
        }, 1000);
    }
    
    /* ==================================================
       8. TIMEZONE FUNCTIONALITY
    ================================================== */
    const timezoneSelect = document.getElementById('timezoneSelect');
    
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', (e) => {
            const timezone = e.target.value;
            showNotification(`Timezone changed to ${timezone}`, 'info');
            
            // In a real app, this would convert all times to the selected timezone
            // For now, we'll just update the UI
            updateScheduleTimes(timezone);
        });
    }
    
    function updateScheduleTimes(timezone) {
        // This would convert times in the schedule data
        // For this demo, we'll just update the labels
        document.querySelectorAll('.airing-badge span, .anime-time span').forEach(element => {
            const currentText = element.textContent;
            if (currentText.includes('JST')) {
                element.textContent = currentText.replace('JST', timezone);
            }
        });
        
        // Update highlights section times
        document.querySelectorAll('.airing-time span, .highlight-meta .time').forEach(element => {
            const currentText = element.textContent;
            if (currentText.includes('JST')) {
                element.textContent = currentText.replace('JST', timezone);
            }
        });
    }
    
    /* ==================================================
       9. INTERACTIVE FEATURES
    ================================================== */
    function setReminder(anime) {
        showNotification(`Reminder set for ${anime.title} at ${anime.time}`, 'success');
        
        // In a real app, this would use browser notifications or backend reminders
    }
    
    function addToList(anime) {
        showNotification(`${anime.title} added to your watch list`, 'success');
        
        // In a real app, this would update user's list in backend
    }
    
    /* ==================================================
       10. UTILITY FUNCTIONS
    ================================================== */
    function updateTodayDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString('en-US', options);
        
        const todayDateElement = document.getElementById('todayDate');
        if (todayDateElement) {
            todayDateElement.textContent = dateString;
        }
    }
    
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
       11. STATISTICS UPDATE
    ================================================== */
    function updateStatistics() {
        // Calculate total anime for the week
        let totalAnime = 0;
        let totalEpisodes = 0;
        let dayCounts = {};
        let maxDay = '';
        let maxCount = 0;
        let totalRating = 0;
        let ratingCount = 0;
        
        // Calculate statistics from schedule data
        Object.keys(scheduleData).forEach(day => {
            const dayAnime = scheduleData[day];
            const count = dayAnime ? dayAnime.length : 0;
            
            totalAnime += count;
            dayCounts[day] = count;
            
            if (count > maxCount) {
                maxCount = count;
                maxDay = day;
            }
            
            // Add ratings
            if (dayAnime) {
                dayAnime.forEach(anime => {
                    totalRating += anime.rating;
                    ratingCount++;
                });
            }
        });
        
        totalEpisodes = totalAnime; // In real app, this would count episodes
        
        // Update DOM elements
        const totalAnimeElement = document.getElementById('totalAnime');
        const totalEpisodesElement = document.getElementById('totalEpisodes');
        const mostActiveDayElement = document.getElementById('mostActiveDay');
        const avgRatingElement = document.getElementById('avgRating');
        
        if (totalAnimeElement) totalAnimeElement.textContent = totalAnime;
        if (totalEpisodesElement) totalEpisodesElement.textContent = totalEpisodes;
        
        // Format day name
        const dayNames = {
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday',
            sunday: 'Sunday'
        };
        
        if (mostActiveDayElement) mostActiveDayElement.textContent = dayNames[maxDay] || 'Saturday';
        
        // Calculate average rating
        const avgRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : '0.0';
        if (avgRatingElement) avgRatingElement.textContent = avgRating;
        
        // Update chart bars
        updateChartBars(dayCounts);
    }
    
    function updateChartBars(dayCounts) {
        const maxValue = Math.max(...Object.values(dayCounts));
        
        document.querySelectorAll('.chart-bar').forEach(bar => {
            const day = bar.dataset.day.toLowerCase();
            const value = dayCounts[day] || 0;
            const percentage = (value / maxValue) * 100;
            
            bar.style.height = `${percentage}%`;
            bar.querySelector('.bar-value').textContent = value;
        });
    }
    
    /* ==================================================
       12. KEYBOARD SHORTCUTS
    ================================================== */
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        switch(e.key) {
            case 'Escape':
                // Close any open dropdowns or panels
                if (userDropdown.classList.contains('active')) {
                    userDropdown.classList.remove('active');
                }
                if (filtersPanel.classList.contains('active')) {
                    filtersPanel.classList.remove('active');
                }
                if (searchOverlay.classList.contains('active')) {
                    searchOverlay.classList.remove('active');
                }
                break;
            case 'ArrowLeft':
                // Navigate to previous day
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                const currentIndex = days.indexOf(currentDay);
                if (currentIndex > 0) {
                    setActiveDay(days[currentIndex - 1]);
                }
                break;
            case 'ArrowRight':
                // Navigate to next day
                const daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                const currentIdx = daysArray.indexOf(currentDay);
                if (currentIdx < daysArray.length - 1) {
                    setActiveDay(daysArray[currentIdx + 1]);
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
                // Navigate to specific day by number (1=Monday, 7=Sunday)
                const dayNumber = parseInt(e.key);
                if (dayNumber >= 1 && dayNumber <= 7) {
                    const dayMap = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                    setActiveDay(dayMap[dayNumber - 1]);
                }
                break;
            case 'g':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    setActiveView('grid');
                }
                break;
            case 'l':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    setActiveView('list');
                }
                break;
            case 'f':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    filtersPanel.classList.toggle('active');
                }
                break;
        }
    });
    
    /* ==================================================
       13. INITIALIZE
    ================================================== */
    function init() {
        initSchedulePage();
        updateStatistics();
        
        console.log('Schedule page initialized successfully!');
    }
    
    // Initialize the application
    init();
});