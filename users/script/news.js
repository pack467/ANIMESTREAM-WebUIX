document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. TOAST NOTIFICATION SYSTEM
    ================================================== */
    const toastContainer = document.getElementById('toastContainer');
    
    function showToast(message, detail = '', type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
                ${detail ? `<div class="toast-detail">${detail}</div>` : ''}
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
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
    if (searchTrigger && searchOverlay && searchClose) {
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
    }
    
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
    
    // User dropdown
    if (userBtn && userDropdown) {
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
    
    /* ==================================================
       3. CATEGORY FILTERING (FROM HTML DATA)
    ================================================== */
    const categoryBtns = document.querySelectorAll('.category-btn');
    const newsArticles = document.querySelectorAll('.news-article');
    const featuredCards = document.querySelectorAll('.featured-card');
    
    let currentCategory = 'all';
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            setActiveCategory(category);
        });
    });
    
    function setActiveCategory(category) {
        currentCategory = category;
        
        // Update active button
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // Filter articles
        filterArticles();
        
        // Show notification
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        showToast('Category Updated', `Now showing ${categoryName === 'All' ? 'all news' : categoryName + ' news'}`, 'success');
        
        // Scroll to results on mobile
        if (window.innerWidth < 768) {
            document.querySelector('.latest-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    function filterArticles() {
        let visibleCount = 0;
        
        newsArticles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            
            if (currentCategory === 'all' || articleCategory === currentCategory) {
                article.classList.remove('hidden');
                article.style.display = '';
                visibleCount++;
            } else {
                article.classList.add('hidden');
                article.style.display = 'none';
            }
        });
        
        // Also filter featured cards
        featuredCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (currentCategory === 'all' || cardCategory === currentCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update count or show message if needed
        console.log(`Showing ${visibleCount} articles for category: ${currentCategory}`);
    }
    
    /* ==================================================
       4. TOPIC TAG FILTERING
    ================================================== */
    const topicTags = document.querySelectorAll('.topic-tag');
    
    topicTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const topic = this.getAttribute('data-topic') || this.textContent.replace('#', '');
            
            showToast('Filtering by Topic', `Showing articles about ${topic}`, 'info');
            
            // In a real application, this would filter articles by topic
            // For now, we'll just show all articles
            setTimeout(() => {
                const randomCount = Math.floor(Math.random() * 10) + 5;
                showToast('Filter Applied', `Found ${randomCount} articles about ${topic}`, 'success');
            }, 500);
        });
    });
    
    /* ==================================================
       5. SORTING FUNCTIONALITY
    ================================================== */
    const sortNewsSelect = document.getElementById('sortNews');
    
    if (sortNewsSelect) {
        sortNewsSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortArticles(sortBy);
            showToast('Sorting Updated', `Articles sorted by ${sortBy}`, 'success');
        });
    }
    
    function sortArticles(sortBy) {
        const articlesArray = Array.from(newsArticles);
        const container = document.getElementById('latestNewsGrid');
        
        articlesArray.sort((a, b) => {
            switch(sortBy) {
                case 'popular':
                    const viewsA = parseInt(a.getAttribute('data-views'));
                    const viewsB = parseInt(b.getAttribute('data-views'));
                    return viewsB - viewsA;
                    
                case 'newest':
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                    
                case 'trending':
                    // Simple trending algorithm: views / days old
                    const trendScoreA = calculateTrendScore(a);
                    const trendScoreB = calculateTrendScore(b);
                    return trendScoreB - trendScoreA;
                    
                default:
                    return 0;
            }
        });
        
        // Reorder DOM
        articlesArray.forEach(article => {
            container.appendChild(article);
        });
    }
    
    function calculateTrendScore(article) {
        const views = parseInt(article.getAttribute('data-views'));
        const articleDate = new Date(article.getAttribute('data-date'));
        const today = new Date();
        const daysOld = Math.ceil((today - articleDate) / (1000 * 60 * 60 * 24));
        
        return daysOld > 0 ? views / daysOld : views;
    }
    
    /* ==================================================
       6. ARTICLE CLICK HANDLERS
    ================================================== */
    // Latest News Articles
    newsArticles.forEach(article => {
        article.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');
            const articleTitle = this.querySelector('.article-title-small').textContent;
            
            console.log(`Opening article ${articleId}: ${articleTitle}`);
            showToast('Opening Article', articleTitle, 'info');
            
            // In a real app, this would open the full article
            // For demo, we'll just show a notification
        });
    });
    
    // Featured Articles
    featuredCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardId = this.getAttribute('data-id');
            const cardTitle = this.querySelector('.article-title').textContent;
            
            console.log(`Opening featured article ${cardId}: ${cardTitle}`);
            showToast('Opening Article', cardTitle, 'info');
        });
    });
    
    // Popular News Items
    const popularItems = document.querySelectorAll('.popular-item');
    popularItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const itemTitle = this.querySelector('.popular-title').textContent;
            
            console.log(`Opening popular article ${itemId}: ${itemTitle}`);
            showToast('Opening Article', itemTitle, 'info');
        });
    });
    
    /* ==================================================
       7. READ NOW BUTTON (BREAKING NEWS)
    ================================================== */
    const readBreakingNews = document.getElementById('readBreakingNews');
    
    if (readBreakingNews) {
        readBreakingNews.addEventListener('click', function() {
            const heroTitle = document.querySelector('.page-title').textContent;
            
            console.log(`Reading breaking news: ${heroTitle}`);
            showToast('Opening Article', heroTitle, 'info');
            
            // In a real app, this would open the full article
            // For demo, scroll to the article or show modal
        });
    }
    
    /* ==================================================
       8. NEWSLETTER SUBSCRIPTION (SIDEBAR & FOOTER)
    ================================================== */
    const newsletterForm = document.getElementById('newsletterForm');
    const footerNewsletterForm = document.getElementById('footerNewsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showToast('Invalid Email', 'Please enter a valid email address', 'warning');
            return;
        }
        
        // Show subscribing message
        showToast('Subscribing...', 'Please wait', 'info');
        
        // Simulate API call
        setTimeout(() => {
            showToast('Successfully Subscribed!', 'You will receive the latest anime news', 'success');
            emailInput.value = '';
            
            console.log('Newsletter subscription:', email);
        }, 1000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /* ==================================================
       9. LOAD MORE FUNCTIONALITY
    ================================================== */
    const loadMoreBtn = document.getElementById('loadMoreNews');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more articles
            showToast('Loading More News...', 'Please wait', 'info');
            
            setTimeout(() => {
                const randomCount = Math.floor(Math.random() * 5) + 3;
                showToast('Loaded Successfully', `${randomCount} more articles loaded`, 'success');
                
                // In a real app, this would fetch and append more articles
            }, 1000);
        });
    }
    
    /* ==================================================
       10. VIEW ALL LINKS
    ================================================== */
    const viewAllLinks = document.querySelectorAll('.view-all, .view-all-events');
    
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('section, .sidebar-widget');
            const sectionTitle = section.querySelector('.section-title, .widget-title').textContent.trim();
            
            showToast('View All', `Opening all ${sectionTitle}`, 'info');
            
            // In a real app, this would navigate to a dedicated page
        });
    });
    
    /* ==================================================
       11. SOURCE LINKS
    ================================================== */
    const sourceItems = document.querySelectorAll('.source-item');
    
    sourceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sourceName = this.querySelector('span').textContent;
            
            showToast('Opening Source', sourceName, 'info');
            
            // In a real app, this would navigate to the source website
        });
    });
    
    /* ==================================================
       12. KEYBOARD SHORTCUTS
    ================================================== */
    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        switch(e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
                // Navigate to specific category by number
                const categoryNumber = parseInt(e.key);
                if (categoryNumber >= 1 && categoryNumber <= 6) {
                    const categories = ['all', 'announcements', 'reviews', 'interviews', 'industry', 'events'];
                    const selectedCategory = categories[categoryNumber - 1];
                    setActiveCategory(selectedCategory);
                }
                break;
                
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    const newsletterInput = document.querySelector('.newsletter-form input');
                    if (newsletterInput) {
                        newsletterInput.focus();
                        showToast('Quick Action', 'Newsletter input focused', 'info');
                    }
                }
                break;
        }
    });
    
    /* ==================================================
       13. SMOOTH SCROLL FOR ANCHOR LINKS
    ================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    /* ==================================================
       14. INITIALIZE
    ================================================== */
    function init() {
        console.log('News page initialized successfully!');
        console.log('Current category:', currentCategory);
        console.log('Total articles:', newsArticles.length);
        
        // Show welcome message
        setTimeout(() => {
            showToast('Welcome to News Page', 'Stay updated with the latest anime news!', 'success');
        }, 500);
    }
    
    // Initialize the application
    init();
});