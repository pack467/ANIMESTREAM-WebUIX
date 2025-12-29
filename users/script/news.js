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
       2. NEWS DATA
    ================================================== */
    // Sample news data
    const newsData = {
        all: [
            {
                id: 1,
                title: "Studio MAPPA Announces New Original Anime Project for 2026",
                excerpt: "The studio behind Jujutsu Kaisen and Chainsaw Man reveals plans for an ambitious new original anime series.",
                category: "announcements",
                date: "March 9, 2025",
                readTime: "4 min",
                views: "15.2K",
                thumbnail: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 2,
                title: "One Piece Manga Enters Final Saga's Climax, Editor Hints at Surprising Conclusion",
                excerpt: "The final saga of Eiichiro Oda's epic manga series approaches its climax with unexpected plot developments.",
                category: "industry",
                date: "March 8, 2025",
                readTime: "6 min",
                views: "22.8K",
                thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 3,
                title: "Anime Expo 2025 Announces Full Schedule and Special Guests",
                excerpt: "North America's largest anime convention reveals its complete schedule with appearances from top creators and voice actors.",
                category: "events",
                date: "March 7, 2025",
                readTime: "5 min",
                views: "18.5K",
                thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 4,
                title: "Review: 'Cyberpunk: Edgerunners' Season 2 Delivers Even More Style and Substance",
                excerpt: "The highly anticipated second season of the hit Netflix anime expands on the world of Night City with stunning visuals and emotional depth.",
                category: "reviews",
                date: "March 6, 2025",
                readTime: "7 min",
                views: "12.3K",
                thumbnail: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 5,
                title: "Voice Actor Yuki Kaji Announces Temporary Hiatus for Health Reasons",
                excerpt: "The voice of Eren Yeager and other iconic characters takes a break from recording to focus on recovery.",
                category: "industry",
                date: "March 5, 2025",
                readTime: "3 min",
                views: "9.7K",
                thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 6,
                title: "Exclusive Interview: Attack on Titan Composer Hiroyuki Sawano Discusses Final Season's Score",
                excerpt: "The legendary composer shares insights into creating the emotional soundtrack for the series' conclusion.",
                category: "interviews",
                date: "March 4, 2025",
                readTime: "8 min",
                views: "14.6K",
                thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 7,
                title: "New Study Shows Anime Industry Revenue Increased by 28% in 2024",
                excerpt: "Global anime market continues to grow with streaming services and international licensing driving expansion.",
                category: "industry",
                date: "March 3, 2025",
                readTime: "5 min",
                views: "11.9K",
                thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 8,
                title: "Makoto Shinkai's Next Film Revealed with Stunning First Trailer",
                excerpt: "The director of Your Name and Suzume unveils his next project with breathtaking animation and emotional storytelling.",
                category: "announcements",
                date: "March 2, 2025",
                readTime: "4 min",
                views: "25.3K",
                thumbnail: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 9,
                title: "Classic Anime Series 'Cowboy Bebop' Gets 4K Remaster for 30th Anniversary",
                excerpt: "The beloved space western receives a complete visual overhaul for its milestone anniversary celebration.",
                category: "announcements",
                date: "March 1, 2025",
                readTime: "3 min",
                views: "8.4K",
                thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop"
            },
            {
                id: 10,
                title: "Anime-Inspired Video Game 'Genshin Impact' Announces Crossover Event",
                excerpt: "The popular game partners with a major anime studio for exclusive character collaborations and story content.",
                category: "industry",
                date: "February 28, 2025",
                readTime: "6 min",
                views: "16.7K",
                thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop"
            }
        ],
        announcements: [1, 8, 9],
        reviews: [4],
        interviews: [6],
        industry: [2, 5, 7, 10],
        events: [3]
    };
    
    // Popular news data (sorted by views)
    const popularNewsData = [1, 8, 2, 3, 6, 10, 4, 7, 9, 5];
    
    /* ==================================================
       3. INITIALIZE NEWS PAGE
    ================================================== */
    let currentCategory = 'all';
    let currentSort = 'newest';
    let displayedArticles = 5;
    const articlesPerLoad = 5;
    
    // DOM Elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const latestNewsGrid = document.getElementById('latestNewsGrid');
    const popularNewsList = document.getElementById('popularNewsList');
    const loadMoreBtn = document.getElementById('loadMoreNews');
    const sortNewsSelect = document.getElementById('sortNews');
    const newsletterForm = document.getElementById('newsletterForm');
    const prevInterviewBtn = document.getElementById('prevInterview');
    const nextInterviewBtn = document.getElementById('nextInterview');
    const interviewsContainer = document.getElementById('interviewsContainer');
    
    // Initialize the page
    function initNewsPage() {
        renderLatestNews();
        renderPopularNews();
        setupEventListeners();
        setupInterviewsSlider();
    }
    
    /* ==================================================
       4. CATEGORY FILTERING
    ================================================== */
    function setupEventListeners() {
        // Category buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                setActiveCategory(category);
            });
        });
        
        // Sort options
        if (sortNewsSelect) {
            sortNewsSelect.addEventListener('change', () => {
                currentSort = sortNewsSelect.value;
                renderLatestNews();
            });
        }
        
        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreArticles);
        }
        
        // Newsletter form
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterSubscription);
        }
        
        // Topic tags
        const topicTags = document.querySelectorAll('.topic-tag');
        topicTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const topic = tag.textContent.replace('#', '');
                filterByTopic(topic);
            });
        });
    }
    
    function setActiveCategory(category) {
        currentCategory = category;
        displayedArticles = 5;
        
        // Update active category button
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // Render news for selected category
        renderLatestNews();
        
        // Scroll to news section on mobile
        if (window.innerWidth < 768) {
            document.querySelector('.latest-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    function filterByTopic(topic) {
        // Show notification about filtering
        showNotification(`Filtering news by topic: ${topic}`, 'info');
        
        // In a real app, this would filter news by topic
        // For now, we'll just show a message
        setTimeout(() => {
            showNotification(`Showing ${Math.floor(Math.random() * 15) + 5} articles about ${topic}`, 'success');
        }, 500);
    }
    
    /* ==================================================
       5. RENDER LATEST NEWS
    ================================================== */
    function renderLatestNews() {
        let articles = getFilteredArticles();
        
        // Sort articles
        articles = sortArticles(articles);
        
        // Limit to currently displayed articles
        const articlesToShow = articles.slice(0, displayedArticles);
        
        // Clear grid
        latestNewsGrid.innerHTML = '';
        
        if (articlesToShow.length === 0) {
            showEmptyState();
            return;
        }
        
        // Render articles
        articlesToShow.forEach(article => {
            const newsArticle = createNewsArticle(article);
            latestNewsGrid.appendChild(newsArticle);
        });
        
        // Show/hide load more button
        updateLoadMoreButton(articles.length);
    }
    
    function getFilteredArticles() {
        if (currentCategory === 'all') {
            return newsData.all;
        }
        
        // Get article IDs for current category
        const articleIds = newsData[currentCategory] || [];
        
        // Get full article data for each ID
        return articleIds.map(id => 
            newsData.all.find(article => article.id === id)
        ).filter(article => article !== undefined);
    }
    
    function sortArticles(articles) {
        switch(currentSort) {
            case 'popular':
                return [...articles].sort((a, b) => {
                    const viewsA = parseInt(a.views.replace('K', '')) * 1000;
                    const viewsB = parseInt(b.views.replace('K', '')) * 1000;
                    return viewsB - viewsA;
                });
            case 'trending':
                // Simulate trending algorithm (views per day)
                return [...articles].sort((a, b) => {
                    const trendScoreA = calculateTrendScore(a);
                    const trendScoreB = calculateTrendScore(b);
                    return trendScoreB - trendScoreA;
                });
            case 'newest':
            default:
                // Sort by date (newest first)
                return [...articles].sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
        }
    }
    
    function calculateTrendScore(article) {
        // Simple trending score calculation
        const views = parseInt(article.views.replace('K', '')) * 1000;
        const daysOld = getDaysSinceDate(article.date);
        
        // More weight to recent articles with high views
        return daysOld > 0 ? views / daysOld : views;
    }
    
    function getDaysSinceDate(dateString) {
        const articleDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - articleDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    function createNewsArticle(article) {
        const articleEl = document.createElement('article');
        articleEl.className = 'news-article';
        
        const categoryClass = article.category || 'announcements';
        const categoryName = article.category ? article.category.charAt(0).toUpperCase() + article.category.slice(1) : 'Announcements';
        
        articleEl.innerHTML = `
            <div class="article-thumbnail">
                <img src="${article.thumbnail}" alt="${article.title}">
            </div>
            <div class="article-content">
                <div class="article-header">
                    <h3 class="article-title-small">${article.title}</h3>
                    <span class="category-tag ${categoryClass}">${categoryName}</span>
                </div>
                <p class="article-excerpt-small">${article.excerpt}</p>
                <div class="article-footer">
                    <div class="article-meta-small">
                        <span class="article-date">${article.date}</span>
                        <span class="read-time">
                            <i class="fas fa-clock"></i>
                            ${article.readTime}
                        </span>
                    </div>
                    <div class="article-stats-small">
                        <span><i class="fas fa-eye"></i> ${article.views}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add click event to read article
        articleEl.addEventListener('click', () => {
            readArticle(article);
        });
        
        return articleEl;
    }
    
    function showEmptyState() {
        latestNewsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-newspaper"></i>
                </div>
                <h3>No News Found</h3>
                <p>Try selecting a different category or check back later for new updates.</p>
            </div>
        `;
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    function updateLoadMoreButton(totalArticles) {
        if (!loadMoreBtn) return;
        
        if (displayedArticles >= totalArticles) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
            loadMoreBtn.innerHTML = `
                <i class="fas fa-sync-alt"></i>
                <span>Load More News (${totalArticles - displayedArticles} remaining)</span>
            `;
        }
    }
    
    function loadMoreArticles() {
        displayedArticles += articlesPerLoad;
        renderLatestNews();
        
        // Scroll to newly loaded articles
        const newArticles = latestNewsGrid.querySelectorAll('.news-article');
        if (newArticles.length > 0) {
            newArticles[newArticles.length - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }
    
    /* ==================================================
       6. RENDER POPULAR NEWS
    ================================================== */
    function renderPopularNews() {
        if (!popularNewsList) return;
        
        popularNewsList.innerHTML = '';
        
        popularNewsData.slice(0, 5).forEach((articleId, index) => {
            const article = newsData.all.find(a => a.id === articleId);
            if (!article) return;
            
            const popularItem = document.createElement('div');
            popularItem.className = 'popular-item';
            
            popularItem.innerHTML = `
                <div class="popular-rank">${index + 1}</div>
                <div class="popular-content">
                    <h4 class="popular-title">${article.title}</h4>
                    <div class="popular-meta">
                        <span>${article.category}</span>
                        <span><i class="fas fa-eye"></i> ${article.views}</span>
                    </div>
                </div>
            `;
            
            popularItem.addEventListener('click', () => {
                readArticle(article);
            });
            
            popularNewsList.appendChild(popularItem);
        });
    }
    
    /* ==================================================
       7. INTERVIEWS SLIDER
    ================================================== */
    function setupInterviewsSlider() {
        if (!interviewsContainer || !prevInterviewBtn || !nextInterviewBtn) return;
        
        let currentSlide = 0;
        const slides = interviewsContainer.querySelectorAll('.interview-card');
        const totalSlides = slides.length;
        
        function updateSliderButtons() {
            prevInterviewBtn.disabled = currentSlide === 0;
            nextInterviewBtn.disabled = currentSlide >= totalSlides - 3;
        }
        
        function slideTo(index) {
            if (index < 0 || index > totalSlides - 3) return;
            
            currentSlide = index;
            const translateX = -currentSlide * (33.333 + 1.5); // 33.333% + gap
            interviewsContainer.style.transform = `translateX(${translateX}%)`;
            updateSliderButtons();
        }
        
        prevInterviewBtn.addEventListener('click', () => {
            slideTo(currentSlide - 1);
        });
        
        nextInterviewBtn.addEventListener('click', () => {
            slideTo(currentSlide + 1);
        });
        
        // Initialize buttons state
        updateSliderButtons();
        
        // Update on window resize
        window.addEventListener('resize', updateSliderButtons);
    }
    
    /* ==================================================
       8. NEWSLETTER SUBSCRIPTION
    ================================================== */
    function handleNewsletterSubscription(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'warning');
            return;
        }
        
        // Simulate API call
        showNotification('Subscribing to newsletter...', 'info');
        
        setTimeout(() => {
            showNotification('Successfully subscribed to the newsletter!', 'success');
            emailInput.value = '';
            
            // In a real app, this would send data to a server
            console.log('Newsletter subscription:', email);
        }, 1000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /* ==================================================
       9. ARTICLE READING
    ================================================== */
    function readArticle(article) {
        // Show article preview
        const modal = createArticleModal(article);
        document.body.appendChild(modal);
        
        // Add animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal on ESC key
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 300);
        };
        
        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on ESC key
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && modal.parentNode) {
                closeModal();
                document.removeEventListener('keydown', handleEscKey);
            }
        };
        
        document.addEventListener('keydown', handleEscKey);
        
        // Clean up event listener when modal is removed
        modal.addEventListener('animationend', function handler() {
            if (!modal.classList.contains('active')) {
                document.removeEventListener('keydown', handleEscKey);
                modal.removeEventListener('animationend', handler);
            }
        });
    }
    
    function createArticleModal(article) {
        const modal = document.createElement('div');
        modal.className = 'article-modal';
        
        const categoryName = article.category ? article.category.charAt(0).toUpperCase() + article.category.slice(1) : 'Announcements';
        const categoryClass = article.category || 'announcements';
        
        // Sample article content
        const articleContent = `
            <p>The anime industry continues to experience unprecedented growth, with streaming platforms playing a major role in its global expansion. According to the latest industry report, total revenue increased by 28% compared to the previous year.</p>
            
            <p>This growth can be attributed to several factors, including increased international licensing deals, the success of anime-themed video games, and the continued popularity of streaming services dedicated to anime content.</p>
            
            <h3>Key Findings from the Report:</h3>
            <ul>
                <li>Streaming revenue increased by 42% year-over-year</li>
                <li>Merchandise sales grew by 18%</li>
                <li>International licensing revenue surpassed domestic for the first time</li>
                <li>Mobile games based on anime IP generated over $3.2 billion</li>
            </ul>
            
            <p>Industry experts predict that this growth trend will continue through 2025, with several major productions scheduled for release in the coming months.</p>
        `;
        
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <div class="article-category-modal">
                        <span class="category-tag ${categoryClass}">${categoryName}</span>
                        <span class="article-date">${article.date}</span>
                    </div>
                    <h2 class="modal-title">${article.title}</h2>
                    <div class="article-meta-modal">
                        <div class="author-info">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Author">
                            <div>
                                <div class="author-name">AnimeNews Staff</div>
                                <div class="article-stats">
                                    <span><i class="fas fa-eye"></i> ${article.views}</span>
                                    <span><i class="fas fa-clock"></i> ${article.readTime} read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="article-image">
                        <img src="${article.thumbnail}" alt="${article.title}">
                    </div>
                    <div class="article-content-modal">
                        <p class="article-lead">${article.excerpt}</p>
                        ${articleContent}
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="article-tags">
                        <span class="tag">#AnimeIndustry</span>
                        <span class="tag">#Business</span>
                        <span class="tag">#2024Report</span>
                    </div>
                    <div class="article-actions">
                        <button class="btn-secondary">
                            <i class="fas fa-bookmark"></i>
                            Save for Later
                        </button>
                        <button class="btn-primary">
                            <i class="fas fa-share-alt"></i>
                            Share Article
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .article-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s;
            }
            
            .article-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 15, 26, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                background: var(--bg-card);
                border-radius: 20px;
                border: 1px solid var(--glass-border);
                overflow-y: auto;
                transition: transform 0.3s ease;
            }
            
            .article-modal.active .modal-content {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid var(--glass-border);
                color: var(--text-white);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: var(--transition-fast);
                z-index: 2;
            }
            
            .modal-close:hover {
                background: var(--primary);
                border-color: var(--primary);
                transform: rotate(90deg);
            }
            
            .modal-header {
                padding: 40px 40px 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .article-category-modal {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .modal-title {
                font-family: var(--font-heading);
                font-size: 32px;
                color: var(--text-white);
                margin-bottom: 20px;
                line-height: 1.2;
            }
            
            .article-meta-modal {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .author-info {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .author-info img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .author-name {
                font-weight: 600;
                color: var(--text-white);
                margin-bottom: 5px;
            }
            
            .article-stats {
                display: flex;
                gap: 15px;
                font-size: 14px;
                color: var(--text-gray);
            }
            
            .modal-body {
                padding: 30px 40px;
            }
            
            .article-image {
                width: 100%;
                height: 400px;
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 30px;
            }
            
            .article-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .article-content-modal {
                color: var(--text-white);
                line-height: 1.8;
            }
            
            .article-lead {
                font-size: 18px;
                color: var(--text-gray);
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .article-content-modal h3 {
                font-family: var(--font-heading);
                font-size: 24px;
                margin: 30px 0 15px;
                color: var(--text-white);
            }
            
            .article-content-modal ul {
                margin: 20px 0;
                padding-left: 20px;
            }
            
            .article-content-modal li {
                margin-bottom: 10px;
                color: var(--text-gray);
            }
            
            .modal-footer {
                padding: 20px 40px 40px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .article-tags {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 20px;
            }
            
            .article-tags .tag {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-white);
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
            }
            
            .article-actions {
                display: flex;
                gap: 15px;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .modal-header,
                .modal-body,
                .modal-footer {
                    padding: 20px;
                }
                
                .modal-title {
                    font-size: 24px;
                }
                
                .article-image {
                    height: 200px;
                }
                
                .article-actions {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
        return modal;
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
                // Close any open dropdowns or modals
                if (userDropdown.classList.contains('active')) {
                    userDropdown.classList.remove('active');
                }
                break;
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
                    setActiveCategory(categories[categoryNumber - 1]);
                }
                break;
            case 'n':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    const searchInput = document.querySelector('.search-box input');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
                break;
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    const newsletterInput = document.querySelector('.newsletter-form input');
                    if (newsletterInput) {
                        newsletterInput.focus();
                    }
                }
                break;
        }
    });
    
    /* ==================================================
       12. INITIALIZE
    ================================================== */
    function init() {
        initNewsPage();
        
        console.log('News page initialized successfully!');
    }
    
    // Initialize the application
    init();
});