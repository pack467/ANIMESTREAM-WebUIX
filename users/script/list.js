document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       HEADER & NAVIGATION FUNCTIONALITY
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
    
    // Back to top button
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ==================================================
       DELETE MODAL FUNCTIONALITY
    ================================================== */
    const deleteModal = document.getElementById('deleteModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    let cardToDelete = null;
    
    // Function to open modal
    function openDeleteModal(card) {
        cardToDelete = card;
        deleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeDeleteModal() {
        deleteModal.classList.remove('active');
        cardToDelete = null;
        document.body.style.overflow = '';
    }
    
    // Cancel button
    cancelBtn.addEventListener('click', closeDeleteModal);
    
    // Confirm button
    confirmBtn.addEventListener('click', () => {
        if (cardToDelete) {
            const title = cardToDelete.getAttribute('data-title');
            
            // Remove from allCards array
            const index = allCards.indexOf(cardToDelete);
            if (index > -1) {
                allCards.splice(index, 1);
            }
            
            // Update stats
            updateStats();
            
            // Re-render view
            currentPage = 1;
            renderAnimeView();
            
            // Show notification
            showNotification(`${title} removed from your list`, 'warning');
            
            // Close modal
            closeDeleteModal();
        }
    });
    
    // Close modal when clicking outside
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && deleteModal.classList.contains('active')) {
            closeDeleteModal();
        }
    });
    
    /* ==================================================
       ANIME LIST FUNCTIONALITY
    ================================================== */
    const animeGrid = document.getElementById('animeGrid');
    const emptyList = document.getElementById('emptyList');
    const viewTitle = document.getElementById('viewTitle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sortSelect = document.getElementById('sortBy');
    const addAnimeBtn = document.getElementById('addAnimeBtn');
    
    let allCards = Array.from(animeGrid.querySelectorAll('.anime-card'));
    let currentTab = 'all';
    let currentSort = 'recent';
    
    // Pagination
    const itemsPerPage = 6;
    let currentPage = 1;
    let filteredCards = [];
    
    /* ==================================================
       UPDATE STATS
    ================================================== */
    function updateStats() {
        const totalAnime = allCards.length;
        const watchingCount = allCards.filter(card => card.getAttribute('data-status') === 'watching').length;
        const completedCount = allCards.filter(card => card.getAttribute('data-status') === 'completed').length;
        const plannedCount = allCards.filter(card => card.getAttribute('data-status') === 'planned').length;
        
        document.getElementById('totalAnime').textContent = totalAnime;
        document.getElementById('watchingCount').textContent = watchingCount;
        document.getElementById('completedCount').textContent = completedCount;
        document.getElementById('plannedCount').textContent = plannedCount;
    }
    
    /* ==================================================
       TAB NAVIGATION
    ================================================== */
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.getAttribute('data-tab');
            currentPage = 1;
            updateViewTitle();
            renderAnimeView();
        });
    });
    
    function updateViewTitle() {
        const titles = {
            'all': 'All Anime',
            'watching': 'Currently Watching',
            'completed': 'Completed',
            'planned': 'Plan to Watch',
            'on-hold': 'On Hold',
            'dropped': 'Dropped'
        };
        viewTitle.textContent = titles[currentTab] || 'My Anime List';
    }
    
    /* ==================================================
       SORTING
    ================================================== */
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        currentPage = 1;
        renderAnimeView();
    });
    
    /* ==================================================
       FILTER AND SORT
    ================================================== */
    function filterCards() {
        if (currentTab === 'all') {
            return allCards;
        }
        return allCards.filter(card => card.getAttribute('data-status') === currentTab);
    }
    
    function sortCards(cards) {
        const sortedCards = [...cards];
        
        switch(currentSort) {
            case 'title':
                sortedCards.sort((a, b) => {
                    const titleA = a.getAttribute('data-title').toLowerCase();
                    const titleB = b.getAttribute('data-title').toLowerCase();
                    return titleA.localeCompare(titleB);
                });
                break;
            case 'rating':
                sortedCards.sort((a, b) => {
                    const ratingA = parseFloat(a.getAttribute('data-rating'));
                    const ratingB = parseFloat(b.getAttribute('data-rating'));
                    return ratingB - ratingA;
                });
                break;
            case 'progress':
                sortedCards.sort((a, b) => {
                    const progressA = parseInt(a.getAttribute('data-progress'));
                    const progressB = parseInt(b.getAttribute('data-progress'));
                    return progressB - progressA;
                });
                break;
            case 'recent':
            default:
                sortedCards.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                });
                break;
        }
        
        return sortedCards;
    }
    
    /* ==================================================
       RENDER ANIME VIEW
    ================================================== */
    function renderAnimeView() {
        // Filter cards
        filteredCards = filterCards();
        
        // Sort cards
        filteredCards = sortCards(filteredCards);
        
        // Clear grid
        animeGrid.innerHTML = '';
        
        if (filteredCards.length === 0) {
            emptyList.style.display = 'block';
            document.getElementById('pagination').style.display = 'none';
            return;
        }
        
        emptyList.style.display = 'none';
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const cardsToShow = filteredCards.slice(startIndex, endIndex);
        
        // Append cards to grid
        cardsToShow.forEach(card => {
            animeGrid.appendChild(card);
        });
        
        // Render pagination
        renderPagination(totalPages);
        
        // Re-attach delete event listeners
        attachDeleteListeners();
    }
    
    /* ==================================================
       PAGINATION
    ================================================== */
    function renderPagination(totalPages) {
        const paginationNumbers = document.getElementById('paginationNumbers');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }
        
        pagination.style.display = 'flex';
        paginationNumbers.innerHTML = '';
        
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Create page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-number';
            pageBtn.textContent = i;
            
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderAnimeView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            paginationNumbers.appendChild(pageBtn);
        }
        
        // Prev button
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderAnimeView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
        
        // Next button
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderAnimeView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    }
    
    /* ==================================================
       DELETE ANIME
    ================================================== */
    function attachDeleteListeners() {
        const deleteButtons = animeGrid.querySelectorAll('.delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.anime-card');
                openDeleteModal(card);
            });
        });
        
        // Add click event to view details
        const cards = animeGrid.querySelectorAll('.anime-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.anime-action-btn')) {
                    const title = card.getAttribute('data-title');
                    showNotification(`Viewing details for ${title}`, 'info');
                }
            });
        });
    }
    
    /* ==================================================
       ADD ANIME BUTTON
    ================================================== */
    addAnimeBtn.addEventListener('click', () => {
        showNotification('Add anime feature coming soon!', 'info');
    });
    
    /* ==================================================
       NOTIFICATION SYSTEM
    ================================================== */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
        
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
       INITIALIZE PAGE
    ================================================== */
    function initializePage() {
        updateStats();
        updateViewTitle();
        renderAnimeView();
    }
    
    initializePage();
});