document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. ADVANCED PRELOADER & PROGRESS BAR
    ================================================== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger hero text animation after loader is gone
                    animateHeroText();
                }, 800);
            }, 500);
        }
    }, 150); // Speed of loading simulation


    /* ==================================================
       2. HERO CAROUSEL LOGIC (Object Oriented Style)
    ================================================== */
    const slider = {
        slides: document.querySelectorAll('.hero-slide'),
        dotsContainer: document.getElementById('sliderDots'),
        prevBtn: document.getElementById('sliderPrev'),
        nextBtn: document.getElementById('sliderNext'),
        bgContainer: document.getElementById('heroBgContainer'),
        currentIndex: 0,
        timer: null,

        init() {
            // Create Dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });

            // Event Listeners
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());

            // Start Auto Play
            this.startAutoPlay();
            
            // Initial BG
            this.updateBackground();
        },

        updateBackground() {
            const currentSlide = this.slides[this.currentIndex];
            const bgUrl = currentSlide.getAttribute('data-bg');
            if(bgUrl) {
                this.bgContainer.style.backgroundImage = `url(${bgUrl})`;
            }
        },

        updateClasses() {
            // Slides
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.slides[this.currentIndex].classList.add('active');
            
            // Dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[this.currentIndex].classList.add('active');

            // Trigger animations again
            const info = this.slides[this.currentIndex].querySelectorAll('.fade-up');
            info.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; /* trigger reflow */
                el.style.animation = null; 
            });
            
            this.updateBackground();
        },

        goToSlide(index) {
            this.currentIndex = index;
            if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
            if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
            this.updateClasses();
            this.resetTimer();
        },

        nextSlide() {
            this.goToSlide(this.currentIndex + 1);
        },

        prevSlide() {
            this.goToSlide(this.currentIndex - 1);
        },

        startAutoPlay() {
            this.timer = setInterval(() => this.nextSlide(), 6000);
        },

        resetTimer() {
            clearInterval(this.timer);
            this.startAutoPlay();
        }
    };

    slider.init();


    /* ==================================================
       3. SCROLL EFFECTS (Navbar & Reveal)
    ================================================== */
    const header = document.getElementById('mainHeader');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Navbar Background
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });

    // Intersection Observer for Fade In Elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==================================================
       4. UI INTERACTIONS (Search & Mobile Menu)
    ================================================== */
    // Search Overlay
    const searchTrigger = document.getElementById('searchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');

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

    // Mobile Menu
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');

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


    /* ==================================================
       5. USER PROFILE DROPDOWN
    ================================================== */
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

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


    /* ==================================================
       6. TODAY WIDGET NAVIGATION
    ================================================== */
    const widgetNavItems = document.querySelectorAll('.widget-nav span');
    
    widgetNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            widgetNavItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Here you would typically fetch and display data based on the selected timeframe
            // For demo purposes, we'll just log the selection
            console.log(`Selected timeframe: ${this.textContent}`);
        });
    });


    /* ==================================================
       7. ANIME CARD INTERACTIONS
    ================================================== */
    // Remove floating effect from anime cards (already handled in CSS)
    const animeCards = document.querySelectorAll('.anime-card');
    
    // Add click handlers for entire card
    animeCards.forEach(card => {
        const cardLink = card.querySelector('.card-link');
        
        // Add subtle scale effect on hover (instead of floating)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Handle card clicks - entire card is clickable
        card.addEventListener('click', function(e) {
            // If click is on the card link itself, let it handle the navigation
            if (!e.target.closest('.card-link')) {
                cardLink.click();
            }
        });
    });


    /* ==================================================
       8. BACK TO TOP BUTTON
    ================================================== */
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==================================================
       9. CAROUSEL ENHANCEMENTS
    ================================================== */
    // Add enhanced animations for all carousel slides
    function enhanceCarouselAnimations() {
        const slides = document.querySelectorAll('.hero-slide');
        
        slides.forEach((slide, index) => {
            // Ensure all slides have proper animation classes
            const elements = slide.querySelectorAll('.slide-meta, .slide-title, .slide-desc, .slide-buttons, .slide-cover');
            
            elements.forEach((el, elIndex) => {
                if (!el.classList.contains('fade-up')) {
                    el.classList.add('fade-up');
                }
                
                // Add staggered delays
                if (elIndex === 0) el.classList.add('delay-100');
                if (elIndex === 1) el.classList.add('delay-200');
                if (elIndex === 2) el.classList.add('delay-300');
            });
        });
    }

    // Initialize carousel enhancements
    enhanceCarouselAnimations();


    /* ==================================================
       10. UTILS
    ================================================== */
    function animateHeroText() {
        const activeSlide = document.querySelector('.hero-slide.active');
        if(activeSlide) {
            const elements = activeSlide.querySelectorAll('.fade-up');
            elements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    }
    
    // Add random rating to today's anime for demo purposes
    function addRandomRatings() {
        const todayItems = document.querySelectorAll('.sidebar-item');
        todayItems.forEach(item => {
            if (!item.querySelector('.anime-meta')) {
                const rating = (Math.random() * 1 + 4).toFixed(1);
                const meta = document.createElement('div');
                meta.className = 'anime-meta';
                meta.innerHTML = `<span><i class="fas fa-star"></i> ${rating}</span>`;
                item.querySelector('.item-info').appendChild(meta);
            }
        });
    }
    
    // Initialize random ratings for today's anime
    addRandomRatings();


    /* ==================================================
       11. PERFORMANCE OPTIMIZATIONS
    ================================================== */
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounce(() => {
        // Scroll effects logic here
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);


    /* ==================================================
       12. ACCESSIBILITY IMPROVEMENTS
    ================================================== */
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            slider.prevSlide();
        } else if (e.key === 'ArrowRight') {
            slider.nextSlide();
        }
    });

    // Focus management for modals
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    // Initialize focus trapping for search overlay
    if (searchOverlay) {
        trapFocus(searchOverlay);
    }
});