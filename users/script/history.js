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
       3. HISTORY DATA
    ================================================== */
    const historyData = [
        {
            id: 1,
            title: "Fate/Stay Night: Unlimited Blade Works",
            episode: "Episode 12",
            thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
            progress: 85,
            status: "watching",
            genres: ["Action", "Fantasy"],
            lastWatched: "2 hours ago",
            duration: "24m",
            rating: 4.8,
            totalEpisodes: 26,
            watchedEpisodes: 12
        },
        {
            id: 2,
            title: "Demon Slayer: Kimetsu no Yaiba",
            episode: "Episode 24",
            thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format&fit=crop",
            progress: 100,
            status: "completed",
            genres: ["Action", "Supernatural"],
            lastWatched: "1 day ago",
            duration: "23m",
            rating: 4.9,
            totalEpisodes: 26,
            watchedEpisodes: 26
        },
        {
            id: 3,
            title: "Sword Art Online: Alicization",
            episode: "Episode 8",
            thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=600&auto=format&fit=crop",
            progress: 45,
            status: "watching",
            genres: ["Action", "Sci-Fi"],
            lastWatched: "3 days ago",
            duration: "24m",
            rating: 4.5,
            totalEpisodes: 24,
            watchedEpisodes: 8
        },
        {
            id: 4,
            title: "Attack on Titan: The Final Season",
            episode: "Episode 16",
            thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=600&auto=format&fit=crop",
            progress: 65,
            status: "watching",
            genres: ["Action", "Drama"],
            lastWatched: "1 week ago",
            duration: "23m",
            rating: 4.9,
            totalEpisodes: 28,
            watchedEpisodes: 16
        },
        {
            id: 5,
            title: "Jujutsu Kaisen",
            episode: "Movie: Jujutsu Kaisen 0",
            thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
            progress: 100,
            status: "completed",
            genres: ["Action", "Supernatural"],
            lastWatched: "1 week ago",
            duration: "1h 45m",
            rating: 4.8,
            totalEpisodes: 1,
            watchedEpisodes: 1
        },
        {
            id: 6,
            title: "My Hero Academia",
            episode: "Episode 42",
            thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=600&auto=format&fit=crop",
            progress: 30,
            status: "paused",
            genres: ["Action", "Superhero"],
            lastWatched: "2 weeks ago",
            duration: "23m",
            rating: 4.7,
            totalEpisodes: 138,
            watchedEpisodes: 42
        },
        {
            id: 7,
            title: "Made in Abyss",
            episode: "Episode 13",
            thumbnail: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=600&auto=format&fit=crop",
            progress: 100,
            status: "completed",
            genres: ["Adventure", "Fantasy"],
            lastWatched: "3 weeks ago",
            duration: "24m",
            rating: 4.8,
            totalEpisodes: 13,
            watchedEpisodes: 13
        },
        {
            id: 8,
            title: "Tokyo Ghoul: Re",
            episode: "Episode 5",
            thumbnail: "https://images.unsplash.com/photo-1578632748624-fbd20d345187?q=80&w=600&auto=format&fit=crop",
            progress: 25,
            status: "watching",
            genres: ["Action", "Horror"],
            lastWatched: "1 month ago",
            duration: "24m",
            rating: 4.6,
            totalEpisodes: 12,
            watchedEpisodes: 5
        }
    ];
    
    let recentlyDeleted = [];
    let currentFilter = 'all';
    let currentSort = 'recent';
    let currentPage = 1;
    const itemsPerPage = 6;
    
    /* ==================================================
       4. RENDER HISTORY GRID
    ================================================== */
    const historyGrid = document.getElementById('historyGrid');
    const emptyHistory = document.getElementById('emptyHistory');
    const pagination = document.getElementById('pagination');
    
    function renderHistoryGrid() {
        // Filter data
        let filteredData = filterHistoryData(historyData);
        
        // Sort data
        filteredData = sortHistoryData(filteredData);
        
        // Paginate data
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        // Clear grid
        historyGrid.innerHTML = '';
        
        if (paginatedData.length === 0) {
            emptyHistory.style.display = 'block';
            pagination.style.display = 'none';
        } else {
            emptyHistory.style.display = 'none';
            pagination.style.display = 'flex';
            
            // Render cards
            paginatedData.forEach(item => {
                const card = createHistoryCard(item);
                historyGrid.appendChild(card);
            });
            
            // Render pagination
            renderPagination(totalPages);
        }
    }
    
    function filterHistoryData(data) {
        switch(currentFilter) {
            case 'today':
                return data.filter(item => item.lastWatched.includes('hour') || item.lastWatched.includes('day') && parseInt(item.lastWatched) <= 1);
            case 'week':
                return data.filter(item => item.lastWatched.includes('week') || (item.lastWatched.includes('day') && parseInt(item.lastWatched) <= 7));
            case 'month':
                return data.filter(item => item.lastWatched.includes('month') || item.lastWatched.includes('week'));
            case 'series':
                return data.filter(item => item.totalEpisodes > 1);
            case 'movies':
                return data.filter(item => item.totalEpisodes === 1);
            default:
                return data;
        }
    }
    
    function sortHistoryData(data) {
        switch(currentSort) {
            case 'recent':
                return [...data].sort((a, b) => {
                    // Simple sorting based on time string
                    return getTimeValue(a.lastWatched) - getTimeValue(b.lastWatched);
                });
            case 'oldest':
                return [...data].sort((a, b) => {
                    return getTimeValue(b.lastWatched) - getTimeValue(a.lastWatched);
                });
            case 'progress':
                return [...data].sort((a, b) => b.progress - a.progress);
            case 'title':
                return [...data].sort((a, b) => a.title.localeCompare(b.title));
            default:
                return data;
        }
    }
    
    function getTimeValue(timeString) {
        if (timeString.includes('hour')) return parseInt(timeString);
        if (timeString.includes('day')) return parseInt(timeString) * 24;
        if (timeString.includes('week')) return parseInt(timeString) * 168;
        if (timeString.includes('month')) return parseInt(timeString) * 720;
        return 0;
    }
    
    function createHistoryCard(item) {
        const card = document.createElement('div');
        card.className = `history-card ${item.status}`;
        card.setAttribute('data-id', item.id);
        
        // Determine badge class
        let badgeClass = '';
        switch(item.status) {
            case 'watching': badgeClass = 'badge-watching'; break;
            case 'completed': badgeClass = 'badge-completed'; break;
            case 'paused': badgeClass = 'badge-paused'; break;
        }
        
        card.innerHTML = `
            <div class="history-card-thumb">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="history-overlay">
                    <div class="history-progress">
                        <div class="progress-info">
                            <span class="progress-label">Watch Progress</span>
                            <span class="progress-percent">${item.progress}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-fill" style="width: ${item.progress}%"></div>
                        </div>
                    </div>
                </div>
                <div class="history-badge ${badgeClass}">${item.status}</div>
            </div>
            <div class="history-card-content">
                <div class="history-card-header">
                    <div class="history-card-title">
                        <h3>${item.title}</h3>
                        <div class="history-card-episode">${item.episode}</div>
                    </div>
                    <div class="history-card-actions">
                        <button class="history-action-btn delete-btn" title="Remove from history">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="history-action-btn" title="Add to list">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="history-card-meta">
                    <div class="history-meta-item">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                    <div class="history-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${item.duration}</span>
                    </div>
                    <div class="history-meta-item">
                        <i class="fas fa-play-circle"></i>
                        <span>${item.watchedEpisodes}/${item.totalEpisodes}</span>
                    </div>
                </div>
                <div class="history-card-time">
                    <i class="fas fa-history"></i>
                    <span>Watched ${item.lastWatched}</span>
                </div>
                <div class="history-card-footer">
                    <div class="history-genres">
                        ${item.genres.map(genre => `<span class="history-genre">${genre}</span>`).join('')}
                    </div>
                    <button class="history-continue-btn">
                        <i class="fas fa-play"></i>
                        Continue
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHistoryItem(item.id, card);
        });
        
        const continueBtn = card.querySelector('.history-continue-btn');
        continueBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            continueWatching(item);
        });
        
        card.addEventListener('click', () => {
            viewAnimeDetails(item);
        });
        
        return card;
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
                renderHistoryGrid();
                scrollToTop();
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
                renderHistoryGrid();
                scrollToTop();
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
                renderHistoryGrid();
                scrollToTop();
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
                renderHistoryGrid();
                scrollToTop();
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
                renderHistoryGrid();
                scrollToTop();
            }
        });
        pagination.appendChild(nextBtn);
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: document.querySelector('.history-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    /* ==================================================
       5. FILTERS AND SORTING
    ================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortBy');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update current filter
            currentFilter = btn.getAttribute('data-filter');
            currentPage = 1;
            
            // Re-render grid
            renderHistoryGrid();
        });
    });
    
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        currentPage = 1;
        renderHistoryGrid();
    });
    
    /* ==================================================
       6. DELETE HISTORY FUNCTIONALITY
    ================================================== */
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const modal = document.getElementById('confirmationModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalMessage = document.getElementById('modalMessage');
    
    let deleteAction = null;
    let itemToDelete = null;
    
    function deleteHistoryItem(id, element) {
        itemToDelete = id;
        deleteAction = 'single';
        modalMessage.textContent = 'Are you sure you want to remove this item from your watch history?';
        modal.classList.add('active');
    }
    
    clearHistoryBtn.addEventListener('click', () => {
        deleteAction = 'all';
        modalMessage.textContent = 'Are you sure you want to clear all watch history? This action cannot be undone.';
        modal.classList.add('active');
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modalCancel.addEventListener('click', () => {
        modal.classList.remove('active');
        deleteAction = null;
        itemToDelete = null;
    });
    
    modalConfirm.addEventListener('click', () => {
        if (deleteAction === 'single') {
            // Find and remove item
            const itemIndex = historyData.findIndex(item => item.id === itemToDelete);
            if (itemIndex !== -1) {
                const deletedItem = historyData.splice(itemIndex, 1)[0];
                recentlyDeleted.push({...deletedItem, deletedAt: new Date()});
                
                // Show recently deleted section
                showRecentlyDeleted();
                
                // Re-render grid
                renderHistoryGrid();
                
                // Show notification
                showNotification(`${deletedItem.title} removed from history`, 'info');
            }
        } else if (deleteAction === 'all') {
            // Move all items to recently deleted
            historyData.forEach(item => {
                recentlyDeleted.push({...item, deletedAt: new Date()});
            });
            
            // Clear history data
            historyData.length = 0;
            
            // Show recently deleted section
            showRecentlyDeleted();
            
            // Re-render grid
            renderHistoryGrid();
            
            // Show notification
            showNotification('All watch history cleared', 'warning');
        }
        
        modal.classList.remove('active');
        deleteAction = null;
        itemToDelete = null;
    });
    
    /* ==================================================
       7. RECENTLY DELETED FUNCTIONALITY
    ================================================== */
    const recentlyDeletedSection = document.getElementById('recentlyDeleted');
    const deletedList = document.getElementById('deletedList');
    const restoreAllBtn = document.getElementById('restoreAllBtn');
    
    function showRecentlyDeleted() {
        if (recentlyDeleted.length > 0) {
            recentlyDeletedSection.classList.add('show');
            renderDeletedList();
        } else {
            recentlyDeletedSection.classList.remove('show');
        }
    }
    
    function renderDeletedList() {
        deletedList.innerHTML = '';
        
        recentlyDeleted.forEach((item, index) => {
            const deletedItem = document.createElement('div');
            deletedItem.className = 'deleted-item';
            deletedItem.innerHTML = `
                <div class="deleted-info">
                    <div class="deleted-thumb">
                        <img src="${item.thumbnail}" alt="${item.title}">
                    </div>
                    <div class="deleted-details">
                        <h4>${item.title}</h4>
                        <span>${item.episode} • Deleted ${formatTimeSince(item.deletedAt)}</span>
                    </div>
                </div>
                <div class="deleted-actions">
                    <button class="deleted-restore-btn" data-index="${index}">Restore</button>
                    <button class="deleted-permanent-btn" data-index="${index}">Delete Permanently</button>
                </div>
            `;
            
            deletedList.appendChild(deletedItem);
        });
        
        // Add event listeners
        document.querySelectorAll('.deleted-restore-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                restoreDeletedItem(index);
            });
        });
        
        document.querySelectorAll('.deleted-permanent-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                deletePermanently(index);
            });
        });
    }
    
    restoreAllBtn.addEventListener('click', () => {
        // Restore all items
        recentlyDeleted.forEach(item => {
            historyData.push(item);
        });
        
        // Clear recently deleted
        recentlyDeleted.length = 0;
        
        // Hide section
        recentlyDeletedSection.classList.remove('show');
        
        // Re-render grid
        renderHistoryGrid();
        
        // Show notification
        showNotification('All items restored from trash', 'success');
    });
    
    function restoreDeletedItem(index) {
        const item = recentlyDeleted[index];
        historyData.push(item);
        recentlyDeleted.splice(index, 1);
        
        if (recentlyDeleted.length === 0) {
            recentlyDeletedSection.classList.remove('show');
        } else {
            renderDeletedList();
        }
        
        renderHistoryGrid();
        showNotification(`${item.title} restored to history`, 'success');
    }
    
    function deletePermanently(index) {
        const item = recentlyDeleted[index];
        recentlyDeleted.splice(index, 1);
        
        if (recentlyDeleted.length === 0) {
            recentlyDeletedSection.classList.remove('show');
        } else {
            renderDeletedList();
        }
        
        showNotification(`${item.title} permanently deleted`, 'warning');
    }
    
    function formatTimeSince(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 60) {
            return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        }
    }
    
    /* ==================================================
       8. UTILITY FUNCTIONS
    ================================================== */
    function continueWatching(item) {
        showNotification(`Continuing ${item.title} - ${item.episode}`, 'info');
        // In a real app, this would redirect to the watch page
        // window.location.href = `watch.html?anime=${item.id}&episode=${item.watchedEpisodes + 1}`;
    }
    
    function viewAnimeDetails(item) {
        showNotification(`Viewing details for ${item.title}`, 'info');
        // In a real app, this would redirect to the anime details page
        // window.location.href = `anime.html?id=${item.id}`;
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
       9. INITIALIZE PAGE
    ================================================== */
    function initializePage() {
        renderHistoryGrid();
        showRecentlyDeleted();
        
        // Add some sample recently deleted items
        if (recentlyDeleted.length === 0) {
            recentlyDeleted.push({
                id: 9,
                title: "One Piece",
                episode: "Episode 1054",
                thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
                progress: 10,
                status: "watching",
                genres: ["Adventure", "Action"],
                lastWatched: "2 months ago",
                duration: "23m",
                rating: 4.9,
                totalEpisodes: 1074,
                watchedEpisodes: 1054,
                deletedAt: new Date(Date.now() - 3600000) // 1 hour ago
            });
            
            showRecentlyDeleted();
        }
    }
    
    // Initialize when DOM is loaded
    initializePage();
    
    /* ==================================================
       10. KEYBOARD SHORTCUTS
    ================================================== */
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        switch(e.key) {
            case 'Escape':
                // Close any open modals or dropdowns
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }
                if (searchOverlay.classList.contains('active')) {
                    searchOverlay.classList.remove('active');
                }
                if (userDropdown.classList.contains('active')) {
                    userDropdown.classList.remove('active');
                }
                break;
            case 'r':
                if (e.ctrlKey) {
                    e.preventDefault();
                    // Quick refresh (simulate)
                    showNotification('Refreshing history...', 'info');
                    setTimeout(() => {
                        renderHistoryGrid();
                        showNotification('History refreshed', 'success');
                    }, 500);
                }
                break;
            case 'Delete':
                if (e.ctrlKey && e.shiftKey) {
                    e.preventDefault();
                    clearHistoryBtn.click();
                }
                break;
        }
    });
});