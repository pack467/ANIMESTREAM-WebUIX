document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. VIDEO PLAYER FUNCTIONALITY
    ================================================== */
    const video = document.getElementById('animeVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseSmallBtn = document.getElementById('playPauseSmallBtn');
    const progressBar = document.getElementById('progress');
    const bufferBar = document.getElementById('buffer');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeLevel = document.getElementById('volumeLevel');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoPlayer = document.getElementById('videoPlayer');
    const progressContainer = document.querySelector('.progress-bar');
    
    // Initialize video player
    function initVideoPlayer() {
        // Set initial volume
        video.volume = 0.8;
        updateVolumeUI();
        
        // Add event listeners
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('progress', updateBuffer);
        video.addEventListener('volumechange', updateVolumeUI);
        
        playPauseBtn.addEventListener('click', togglePlayPause);
        playPauseSmallBtn.addEventListener('click', togglePlayPause);
        
        rewindBtn.addEventListener('click', rewind);
        forwardBtn.addEventListener('click', forward);
        
        volumeBtn.addEventListener('click', toggleMute);
        volumeSlider.addEventListener('click', setVolume);
        
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        progressContainer.addEventListener('click', setProgress);
        
        // Keyboard controls
        document.addEventListener('keydown', handleKeyPress);
    }
    
    function togglePlayPause() {
        if (video.paused || video.ended) {
            video.play();
            updatePlayPauseButtons(true);
        } else {
            video.pause();
            updatePlayPauseButtons(false);
        }
    }
    
    function updatePlayPauseButtons(isPlaying) {
        const icon = isPlaying ? 'fa-pause' : 'fa-play';
        playPauseBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        playPauseSmallBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    function updateDuration() {
        const duration = video.duration;
        durationEl.textContent = formatTime(duration);
    }
    
    function updateProgress() {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const progress = (currentTime / duration) * 100;
        
        progressBar.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    function updateBuffer() {
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const duration = video.duration;
            const bufferPercent = (bufferedEnd / duration) * 100;
            
            bufferBar.style.width = `${bufferPercent}%`;
        }
    }
    
    function updateVolumeUI() {
        const volume = video.volume;
        const isMuted = video.muted || volume === 0;
        
        // Update volume button icon
        let volumeIcon = 'fa-volume-up';
        if (isMuted || volume === 0) {
            volumeIcon = 'fa-volume-mute';
        } else if (volume < 0.5) {
            volumeIcon = 'fa-volume-down';
        }
        
        volumeBtn.innerHTML = `<i class="fas ${volumeIcon}"></i>`;
        
        // Update volume slider
        volumeLevel.style.width = `${isMuted ? 0 : volume * 100}%`;
    }
    
    function toggleMute() {
        video.muted = !video.muted;
        updateVolumeUI();
    }
    
    function setVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const volume = Math.max(0, Math.min(1, percent));
        
        video.volume = volume;
        video.muted = volume === 0;
        updateVolumeUI();
    }
    
    function rewind() {
        video.currentTime = Math.max(0, video.currentTime - 10);
    }
    
    function forward() {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
    
    function setProgress(e) {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (videoPlayer.requestFullscreen) {
                videoPlayer.requestFullscreen();
            } else if (videoPlayer.webkitRequestFullscreen) {
                videoPlayer.webkitRequestFullscreen();
            } else if (videoPlayer.msRequestFullscreen) {
                videoPlayer.msRequestFullscreen();
            }
            
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }
    
    function handleKeyPress(e) {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'f':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'm':
                e.preventDefault();
                toggleMute();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                rewind();
                break;
            case 'ArrowRight':
                e.preventDefault();
                forward();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                e.preventDefault();
                const percent = parseInt(e.key) / 10;
                video.currentTime = percent * video.duration;
                break;
        }
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Initialize video player
    initVideoPlayer();
    
    /* ==================================================
       2. EPISODE LIST MANAGEMENT
    ================================================== */
    const episodeList = document.getElementById('episodeList');
    const seasonSelect = document.getElementById('seasonSelect');
    
    // Sample episode data
    const episodes = {
        season1: [
            { number: 1, title: "Winter Days, A Fateful Night", duration: "24:10", thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop" },
            { number: 2, title: "The Curse of the Holy Grail", duration: "23:45", thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=300&auto=format&fit=crop" },
            { number: 3, title: "The First Battle", duration: "24:20", thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=300&auto=format&fit=crop" },
            { number: 4, title: "The Mage's Decision", duration: "23:55", thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=300&auto=format&fit=crop" },
            { number: 5, title: "Dancing After School", duration: "24:15", thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop" },
            { number: 6, title: "The Wandering Knight", duration: "23:50", thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=300&auto=format&fit=crop" },
            { number: 7, title: "Deadly Duel", duration: "24:05", thumbnail: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=300&auto=format&fit=crop" },
            { number: 8, title: "The Winter Forest", duration: "23:40", thumbnail: "https://images.unsplash.com/photo-1590955559144-a82332cf2c08?q=80&w=300&auto=format&fit=crop" },
            { number: 9, title: "The Distant Past", duration: "24:25", thumbnail: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=300&auto=format&fit=crop" },
            { number: 10, title: "The Fifth Magician", duration: "23:50", thumbnail: "https://images.unsplash.com/photo-1542256844-d3d05538a5b8?q=80&w=300&auto=format&fit=crop" },
            { number: 11, title: "A Visitor Approaches", duration: "24:15", thumbnail: "https://images.unsplash.com/photo-1578632748624-fbd20d345187?q=80&w=300&auto=format&fit=crop" },
            { number: 12, title: "The Final Decision", duration: "24:30", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" },
            { number: 13, title: "The Last Battle", duration: "25:10", thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop" }
        ],
        season2: [
            { number: 1, title: "A New Threat", duration: "24:15", thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop" },
            { number: 2, title: "The Return", duration: "23:50", thumbnail: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=300&auto=format&fit=crop" },
            { number: 3, title: "Unlimited Blade Works", duration: "24:25", thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71578fca37?q=80&w=300&auto=format&fit=crop" }
        ]
    };
    
    function renderEpisodes(season) {
        episodeList.innerHTML = '';
        
        episodes[season].forEach((episode, index) => {
            const episodeItem = document.createElement('div');
            episodeItem.className = `episode-item ${index === 0 ? 'active' : ''}`;
            episodeItem.innerHTML = `
                <div class="episode-thumb">
                    <img src="${episode.thumbnail}" alt="Episode ${episode.number}">
                    <div class="episode-number">EP ${episode.number}</div>
                    <div class="episode-duration">${episode.duration}</div>
                </div>
                <div class="episode-info">
                    <h4>${episode.title}</h4>
                    <span>Episode ${episode.number}</span>
                </div>
            `;
            
            episodeItem.addEventListener('click', () => {
                // Remove active class from all episodes
                document.querySelectorAll('.episode-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked episode
                episodeItem.classList.add('active');
                
                // Update episode info
                updateEpisodeInfo(episode);
                
                // In a real app, you would load the actual video here
                // For demo purposes, we'll just reset the current video
                video.currentTime = 0;
                video.play();
                updatePlayPauseButtons(true);
            });
            
            episodeList.appendChild(episodeItem);
        });
    }
    
    function updateEpisodeInfo(episode) {
        const episodeHeader = document.querySelector('.episode-header h2');
        const episodeMeta = document.querySelector('.episode-meta');
        
        episodeHeader.textContent = `Episode ${episode.number}: ${episode.title}`;
        
        // Update video title in player
        document.querySelector('.player-title h3').textContent = 'Fate/Stay Night: Unlimited Blade Works';
        document.querySelector('.player-title span').textContent = `Episode ${episode.number}: ${episode.title}`;
    }
    
    // Initialize episode list
    renderEpisodes('season1');
    
    // Handle season change
    seasonSelect.addEventListener('change', (e) => {
        renderEpisodes(e.target.value);
    });
    
    /* ==================================================
       3. COMMENTS SYSTEM
    ================================================== */
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const commentsList = document.getElementById('commentsList');
    
    // Sample comments data
    const sampleComments = [
        {
            id: 1,
            author: "AnimeFan123",
            avatar: "A",
            time: "2 hours ago",
            text: "This episode was absolutely amazing! The animation quality is top-notch.",
            likes: 24,
            liked: false
        },
        {
            id: 2,
            author: "FateLover",
            avatar: "F",
            time: "5 hours ago",
            text: "Rin Tohsaka is best girl, change my mind. Her character development in this episode was incredible.",
            likes: 18,
            liked: true
        },
        {
            id: 3,
            author: "SaberFan42",
            avatar: "S",
            time: "1 day ago",
            text: "The fight scene at the end gave me chills. Ufotable never disappoints with their animation.",
            likes: 32,
            liked: false
        }
    ];
    
    function renderComments() {
        commentsList.innerHTML = '';
        
        sampleComments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `
                <div class="comment-avatar" style="background: ${getRandomColor()}">
                    ${comment.avatar}
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-time">${comment.time}</span>
                    </div>
                    <div class="comment-text">
                        ${comment.text}
                    </div>
                    <div class="comment-actions">
                        <div class="comment-action like-btn ${comment.liked ? 'liked' : ''}" data-id="${comment.id}">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="like-count">${comment.likes}</span>
                        </div>
                        <div class="comment-action">
                            <i class="fas fa-reply"></i>
                            <span>Reply</span>
                        </div>
                    </div>
                </div>
            `;
            
            commentsList.appendChild(commentItem);
        });
        
        // Add event listeners to like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentId = this.getAttribute('data-id');
                toggleLike(commentId, this);
            });
        });
    }
    
    function toggleLike(commentId, element) {
        const comment = sampleComments.find(c => c.id == commentId);
        if (comment) {
            if (comment.liked) {
                comment.likes--;
                comment.liked = false;
                element.classList.remove('liked');
            } else {
                comment.likes++;
                comment.liked = true;
                element.classList.add('liked');
            }
            
            element.querySelector('.like-count').textContent = comment.likes;
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff6b6b', '#6c5ce7', '#00b894', '#fdcb6e', '#e17055', '#0984e3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Handle comment submission
    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            // In a real app, you would send this to a server
            // For demo purposes, we'll just add it to the top of the list
            const newComment = {
                id: sampleComments.length + 1,
                author: "AnimeLover", // Current user
                avatar: "A",
                time: "Just now",
                text: commentText,
                likes: 0,
                liked: false
            };
            
            sampleComments.unshift(newComment);
            renderComments();
            commentInput.value = '';
            
            // Update comment count
            document.querySelector('.comments-count').textContent = `${sampleComments.length} Comments`;
        }
    });
    
    // Initialize comments
    renderComments();
    
    /* ==================================================
       4. HEADER & NAVIGATION FUNCTIONALITY
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
       5. RECOMMENDATION INTERACTIONS
    ================================================== */
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    
    recommendationItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real app, this would navigate to the selected anime's page
            alert(`You clicked on ${this.querySelector('h4').textContent}. In a real app, this would navigate to that anime's page.`);
        });
    });
    
    /* ==================================================
       6. CHARACTER INTERACTIONS
    ================================================== */
    const characterItems = document.querySelectorAll('.character-item');
    
    characterItems.forEach(item => {
        item.addEventListener('click', function() {
            const characterName = this.querySelector('h4').textContent;
            alert(`You clicked on ${characterName}. In a real app, this would show more details about the character.`);
        });
    });
    
    /* ==================================================
       7. ADDITIONAL UI ENHANCEMENTS
    ================================================== */
    
    // Auto-hide controls after inactivity
    let controlsTimeout;
    function resetControlsTimeout() {
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            const controls = document.getElementById('playerControls');
            if (!video.paused) {
                controls.style.opacity = '0';
                controls.style.pointerEvents = 'none';
            }
        }, 3000);
    }
    
    videoPlayer.addEventListener('mousemove', () => {
        const controls = document.getElementById('playerControls');
        controls.style.opacity = '1';
        controls.style.pointerEvents = 'all';
        resetControlsTimeout();
    });
    
    // Initialize controls timeout
    resetControlsTimeout();
    
    // Simulate video buffering for demo purposes
    setTimeout(() => {
        bufferBar.style.width = '100%';
    }, 2000);
});