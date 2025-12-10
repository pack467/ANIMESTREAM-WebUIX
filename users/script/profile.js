document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. HEADER & NAVIGATION
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
    
    // Back to top
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    /* ==================================================
       2. PROFILE BANNER & AVATAR
    ================================================== */
    const changeBannerBtn = document.getElementById('changeBannerBtn');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const editProfileBtn = document.getElementById('editProfileBtn');
    
    changeBannerBtn.addEventListener('click', () => {
        alert('Change banner functionality would be implemented here. In a real app, this would open a file picker.');
    });
    
    changeAvatarBtn.addEventListener('click', () => {
        alert('Change avatar functionality would be implemented here. In a real app, this would open a file picker.');
    });
    
    editProfileBtn.addEventListener('click', () => {
        // Scroll to settings tab and switch to it
        const settingsTab = document.querySelector('[data-tab="settings"]');
        settingsTab.click();
        setTimeout(() => {
            document.getElementById('settings').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    
    
    /* ==================================================
       3. PROFILE TABS
    ================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    /* ==================================================
       4. PASSWORD CHANGE MODAL
    ================================================== */
    const passwordModal = document.getElementById('passwordModal');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const closePasswordModal = document.getElementById('closePasswordModal');
    const changePasswordForm = document.getElementById('changePasswordForm');
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            passwordModal.classList.add('active');
        });
    }
    
    if (closePasswordModal) {
        closePasswordModal.addEventListener('click', () => {
            passwordModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    passwordModal.addEventListener('click', (e) => {
        if (e.target === passwordModal) {
            passwordModal.classList.remove('active');
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && passwordModal.classList.contains('active')) {
            passwordModal.classList.remove('active');
        }
    });
    
    // Password change form submission
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (newPassword !== confirmPassword) {
                alert('New password and confirmation do not match!');
                return;
            }
            
            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long!');
                return;
            }
            
            // In a real app, you would send this data to the server
            console.log('Password change requested:', {
                oldPassword,
                newPassword
            });
            
            // Show success message
            alert('Password changed successfully!');
            
            // Reset form and close modal
            changePasswordForm.reset();
            passwordModal.classList.remove('active');
        });
    }
    
    /* ==================================================
       5. SETTINGS FUNCTIONALITY
    ================================================== */
    const settingsSaveBtn = document.querySelector('.settings-form .btn-primary');
    
    if (settingsSaveBtn) {
        settingsSaveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show success message
            alert('Settings saved successfully!');
            
            // In a real app, you would send this data to a server
            const username = document.querySelector('.settings-form input[type="text"]').value;
            const email = document.querySelector('.settings-form input[type="email"]').value;
            const bio = document.querySelector('.settings-form textarea').value;
            
            console.log('Saving settings:', { username, email, bio });
        });
    }
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.closest('.option-item').querySelector('h4').textContent;
            console.log(`${setting} is now ${this.checked ? 'enabled' : 'disabled'}`);
        });
    });
    
    /* ==================================================
       6. ANIME CARD INTERACTIONS
    ================================================== */
    function setupAnimeCards() {
        const animeCards = document.querySelectorAll('.anime-card');
        animeCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.anime-title').textContent;
                alert(`Opening ${title}...\n\nIn a real app, this would navigate to the anime details page.`);
            });
        });
        
        const favoriteItems = document.querySelectorAll('.favorite-item');
        favoriteItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.querySelector('.favorite-title').textContent;
                alert(`Opening ${title}...\n\nIn a real app, this would navigate to the anime details page.`);
            });
        });
        
        const mainFavorite = document.querySelector('.main-favorite');
        if (mainFavorite) {
            mainFavorite.addEventListener('click', () => {
                alert(`Opening Attack on Titan...\n\nIn a real app, this would navigate to the anime details page.`);
            });
        }
    }
    
    /* ==================================================
       7. ACHIEVEMENT BADGES
    ================================================== */
    function setupAchievementBadges() {
        const achievementBadges = document.querySelectorAll('.achievement-badge');
        achievementBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                const name = badge.querySelector('.achievement-name').textContent;
                alert(`Achievement: ${name}\n\nThis is a placeholder. In a real app, this would show achievement details.`);
            });
        });
    }
    
    /* ==================================================
       8. INITIALIZE
    ================================================== */
    function init() {
        // Setup interactive elements
        setupAnimeCards();
        setupAchievementBadges();
        
        console.log('Profile page initialized successfully');
    }
    
    // Initialize everything
    init();
    
    /* ==================================================
       9. ADDITIONAL FEATURES
    ================================================== */
    
    // Add smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe anime cards for animation
    setTimeout(() => {
        document.querySelectorAll('.anime-card, .favorite-item, .main-favorite').forEach(card => {
            observer.observe(card);
        });
    }, 100);
    
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('All profile features loaded successfully!');
});