document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       UTILITY FUNCTIONS
    ================================================== */
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function showNotification(message, type = 'success') {
        const toast = document.getElementById('notificationToast');
        const messageEl = document.getElementById('notificationMessage');
        
        messageEl.textContent = message;
        toast.className = 'notification-toast ' + type;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /* ==================================================
       VIDEO PLAYER FUNCTIONALITY
    ================================================== */
    const video = document.getElementById('animeVideo');
    const customControls = document.getElementById('customControls');
    const playBtn = document.getElementById('playBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressRangeSlider = document.getElementById('progressRangeSlider');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeRangeSlider = document.getElementById('volumeRangeSlider');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressArea = document.getElementById('progressArea');
    const videoWrapper = document.querySelector('.video-wrapper');
    const qualityBtn = document.getElementById('qualityBtn');
    const qualityMenu = document.getElementById('qualityMenu');
    const subtitleBtn = document.getElementById('subtitleBtn');
    const subtitleMenu = document.getElementById('subtitleMenu');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const playbackSpeed = document.getElementById('playbackSpeed');
    const autoplayToggle = document.getElementById('autoplayToggle');
    
    let controlsTimeout;
    let isDraggingProgress = false;

    // Initialize video player
    function initVideoPlayer() {
        // Remove default controls
        video.removeAttribute('controls');
        
        // Set initial volume
        video.volume = 0.8;
        updateVolumeUI();
        
        // Add event listeners
        video.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(video.duration);
            progressRangeSlider.max = Math.floor(video.duration);
        });
        
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('volumechange', updateVolumeUI);
        video.addEventListener('play', () => updatePlayButtons(true));
        video.addEventListener('pause', () => updatePlayButtons(false));
        video.addEventListener('ended', () => updatePlayButtons(false));
        
        // Play/Pause buttons
        playBtn.addEventListener('click', togglePlayPause);
        playPauseBtn.addEventListener('click', togglePlayPause);
        video.addEventListener('click', togglePlayPause);
        
        // Time controls
        rewindBtn.addEventListener('click', () => {
            video.currentTime = Math.max(0, video.currentTime - 10);
        });
        
        forwardBtn.addEventListener('click', () => {
            video.currentTime = Math.min(video.duration, video.currentTime + 10);
        });
        
        // Volume controls
        volumeBtn.addEventListener('click', toggleMute);
        volumeRangeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            video.volume = volume;
            video.muted = volume === 0;
            updateVolumeUI();
        });
        
        // Fullscreen
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        
        // Progress bar
        progressRangeSlider.addEventListener('input', (e) => {
            isDraggingProgress = true;
            const time = e.target.value;
            currentTimeEl.textContent = formatTime(time);
            updateProgressBackground();
        });
        
        progressRangeSlider.addEventListener('change', (e) => {
            video.currentTime = e.target.value;
            isDraggingProgress = false;
        });
        
        // Keyboard controls
        document.addEventListener('keydown', handleKeyPress);
        
        // Auto-hide controls
        videoWrapper.addEventListener('mousemove', showControls);
        videoWrapper.addEventListener('mouseleave', hideControlsDelayed);
        customControls.addEventListener('mouseenter', () => clearTimeout(controlsTimeout));
    }

    function togglePlayPause() {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updatePlayButtons(isPlaying) {
        const playIcon = isPlaying ? 'fa-pause' : 'fa-play';
        playBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
        playPauseBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
        
        // Add margin for play icon to center it visually
        if (!isPlaying) {
            playBtn.querySelector('i').style.marginLeft = '4px';
        } else {
            playBtn.querySelector('i').style.marginLeft = '0';
        }
    }

    function updateProgress() {
        if (!isDraggingProgress) {
            const currentTime = video.currentTime;
            const duration = video.duration;
            
            if (!isNaN(duration) && duration > 0) {
                progressRangeSlider.value = currentTime;
                currentTimeEl.textContent = formatTime(currentTime);
                updateProgressBackground();
            }
        }
    }
    
    function updateProgressBackground() {
        const value = progressRangeSlider.value;
        const max = progressRangeSlider.max;
        const percentage = (value / max) * 100;
        progressRangeSlider.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, rgba(255,255,255,0.2) ${percentage}%, rgba(255,255,255,0.2) 100%)`;
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
        
        let volumeIcon = 'fa-volume-up';
        if (isMuted || volume === 0) {
            volumeIcon = 'fa-volume-mute';
        } else if (volume < 0.5) {
            volumeIcon = 'fa-volume-down';
        }
        
        volumeBtn.innerHTML = `<i class="fas ${volumeIcon}"></i>`;
        volumeRangeSlider.value = isMuted ? 0 : volume * 100;
        
        // Update slider gradient
        const percentage = isMuted ? 0 : volume * 100;
        volumeRangeSlider.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, rgba(255,255,255,0.3) ${percentage}%, rgba(255,255,255,0.3) 100%)`;
    }

    function toggleMute() {
        video.muted = !video.muted;
    }
    
    // Subtitle Menu
    subtitleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        subtitleMenu.classList.toggle('show');
        qualityMenu.classList.remove('show');
        settingsMenu.classList.remove('show');
    });
    
    // Prevent subtitle menu from closing when clicking inside
    subtitleMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    document.querySelectorAll('.subtitle-menu .menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const subtitle = this.getAttribute('data-subtitle');
            
            // Update active state
            document.querySelectorAll('.subtitle-menu .menu-item i').forEach(icon => {
                icon.classList.remove('active');
            });
            this.querySelector('i').classList.add('active');
            
            // Close menu
            subtitleMenu.classList.remove('show');
            
            const subtitleText = subtitle === 'off' ? 'Subtitles turned off' : `Subtitles: ${this.querySelector('span').textContent}`;
            showNotification(subtitleText, 'success');
        });
    });
    
    // Quality Menu
    qualityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        qualityMenu.classList.toggle('show');
        settingsMenu.classList.remove('show');
        subtitleMenu.classList.remove('show');
    });
    
    // Prevent quality menu from closing when clicking inside
    qualityMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    document.querySelectorAll('.quality-menu .menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const quality = this.getAttribute('data-quality');
            
            // Update active state
            document.querySelectorAll('.quality-menu .menu-item i').forEach(icon => {
                icon.classList.remove('active');
            });
            this.querySelector('i').classList.add('active');
            
            // Update button text
            document.querySelector('.quality-text').textContent = quality;
            
            // Close menu
            qualityMenu.classList.remove('show');
            
            showNotification(`Quality changed to ${quality}`, 'success');
        });
    });
    
    // Settings Menu
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('show');
        qualityMenu.classList.remove('show');
        subtitleMenu.classList.remove('show');
    });
    
    // Prevent settings menu from closing when clicking inside
    settingsMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Playback Speed
    playbackSpeed.addEventListener('change', (e) => {
        video.playbackRate = parseFloat(e.target.value);
        const speedText = e.target.value === '1' ? 'Normal' : `${e.target.value}x`;
        showNotification(`Playback speed: ${speedText}`, 'success');
    });
    
    // Prevent closing when clicking on speed select
    playbackSpeed.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Autoplay Toggle
    autoplayToggle.addEventListener('change', (e) => {
        const status = e.target.checked ? 'enabled' : 'disabled';
        showNotification(`Autoplay ${status}`, 'success');
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', () => {
        qualityMenu.classList.remove('show');
        settingsMenu.classList.remove('show');
        subtitleMenu.classList.remove('show');
    });

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (videoWrapper.requestFullscreen) {
                videoWrapper.requestFullscreen();
            } else if (videoWrapper.webkitRequestFullscreen) {
                videoWrapper.webkitRequestFullscreen();
            } else if (videoWrapper.msRequestFullscreen) {
                videoWrapper.msRequestFullscreen();
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
                video.currentTime = Math.max(0, video.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
                break;
            case 'ArrowUp':
                e.preventDefault();
                video.volume = Math.min(1, video.volume + 0.1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                video.volume = Math.max(0, video.volume - 0.1);
                break;
        }
    }

    function showControls() {
        customControls.classList.add('show');
        clearTimeout(controlsTimeout);
        hideControlsDelayed();
    }

    function hideControlsDelayed() {
        clearTimeout(controlsTimeout);
        if (!video.paused) {
            controlsTimeout = setTimeout(() => {
                customControls.classList.remove('show');
            }, 3000);
        }
    }

    // Initialize video player
    initVideoPlayer();

    /* ==================================================
       EPISODE LIST MANAGEMENT
    ================================================== */
    const episodeList = document.getElementById('episodeList');
    const seasonSelect = document.getElementById('seasonSelect');
    
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
                document.querySelectorAll('.episode-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                episodeItem.classList.add('active');
                updateEpisodeInfo(episode);
                
                video.currentTime = 0;
                video.play();
            });
            
            episodeList.appendChild(episodeItem);
        });
    }

    function updateEpisodeInfo(episode) {
        const episodeHeader = document.querySelector('.episode-header h2');
        episodeHeader.textContent = `Episode ${episode.number}: ${episode.title}`;
        
        document.querySelector('.video-title-info h3').textContent = 'Fate/Stay Night: Unlimited Blade Works';
        document.querySelector('.video-title-info span').textContent = `Episode ${episode.number}: ${episode.title}`;
    }

    renderEpisodes('season1');
    
    seasonSelect.addEventListener('change', (e) => {
        renderEpisodes(e.target.value);
    });

    /* ==================================================
       SLIDER RATING SYSTEM (0.0-10.0 with decimals)
    ================================================== */
    const ratingSlider = document.getElementById('ratingSlider');
    const ratingNumber = document.getElementById('ratingNumber');
    const ratingText = document.getElementById('ratingText');
    const btnSubmitRating = document.getElementById('btnSubmitRating');
    let currentRating = 0;
    let tempRating = 0;
    let isRatingSubmitted = false;

    ratingSlider.addEventListener('input', (e) => {
        const sliderValue = parseInt(e.target.value);
        tempRating = (sliderValue / 10).toFixed(1);
        
        // Update BOTH the big number AND the text immediately
        ratingNumber.textContent = tempRating;
        ratingText.textContent = `Rate ${tempRating}/10`;
        
        if (tempRating > 0) {
            btnSubmitRating.disabled = false;
        } else {
            ratingText.textContent = 'Drag slider to rate (0.0 - 10.0)';
            btnSubmitRating.disabled = true;
        }
        
        updateSliderColor(sliderValue);
    });

    btnSubmitRating.addEventListener('click', () => {
        if (tempRating > 0) {
            currentRating = tempRating;
            isRatingSubmitted = true;
            
            // Keep the number as is
            ratingNumber.textContent = currentRating;
            ratingText.textContent = `You rated: ${currentRating}/10`;
            btnSubmitRating.disabled = true;
            btnSubmitRating.innerHTML = '<i class="fas fa-check-circle"></i><span>Rating Submitted</span>';
            
            showNotification(`You rated this anime ${currentRating}/10!`, 'success');
            
            // Optional: Reset button after 3 seconds
            setTimeout(() => {
                btnSubmitRating.innerHTML = '<i class="fas fa-check"></i><span>Submit Rating</span>';
            }, 3000);
        }
    });

    function updateSliderColor(value) {
        const percentage = value;
        ratingSlider.style.background = `linear-gradient(to right, 
            #ff4444 0%, 
            #ff6b6b ${percentage * 0.2}%, 
            #ffa500 ${percentage * 0.4}%, 
            #ffd700 ${percentage * 0.6}%, 
            #90EE90 ${percentage * 0.8}%, 
            #00d900 100%)`;
    }

    /* ==================================================
       FAVORITE & LIST BUTTONS
    ================================================== */
    const btnFavorite = document.getElementById('btnFavorite');
    const btnList = document.getElementById('btnList');
    let isFavorited = false;
    let isInList = false;

    btnFavorite.addEventListener('click', () => {
        isFavorited = !isFavorited;
        
        if (isFavorited) {
            btnFavorite.classList.add('active');
            btnFavorite.innerHTML = '<i class="fas fa-heart"></i><span>Added to Favorite</span>';
            showNotification('Anime added to favorites!', 'favorite');
        } else {
            btnFavorite.classList.remove('active');
            btnFavorite.innerHTML = '<i class="far fa-heart"></i><span>Add to Favorite</span>';
            showNotification('Anime removed from favorites!', 'success');
        }
    });

    btnList.addEventListener('click', () => {
        isInList = !isInList;
        
        if (isInList) {
            btnList.classList.add('active');
            btnList.innerHTML = '<i class="fas fa-plus"></i><span>Added to List</span>';
            showNotification('Anime added to your list!', 'success');
        } else {
            btnList.classList.remove('active');
            btnList.innerHTML = '<i class="fas fa-plus"></i><span>Add to List</span>';
            showNotification('Anime removed from your list!', 'success');
        }
    });

    /* ==================================================
       COMMENTS SYSTEM
    ================================================== */
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const cancelComment = document.getElementById('cancelComment');
    const commentsList = document.getElementById('commentsList');
    
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
        
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentId = this.getAttribute('data-id');
                toggleLike(commentId, this);
            });
        });
        
        // Add reply button functionality
        document.querySelectorAll('.comment-action:not(.like-btn)').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentItem = this.closest('.comment-item');
                const author = commentItem.querySelector('.comment-author').textContent;
                commentInput.value = `@${author} `;
                commentInput.focus();
                commentInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                showNotification(`Replying to ${author}`, 'success');
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

    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            const newComment = {
                id: sampleComments.length + 1,
                author: "AnimeLover",
                avatar: "A",
                time: "Just now",
                text: commentText,
                likes: 0,
                liked: false
            };
            
            sampleComments.unshift(newComment);
            renderComments();
            commentInput.value = '';
            
            document.querySelector('.comments-count').textContent = `${sampleComments.length} Comments`;
            showNotification('Comment posted successfully!', 'success');
        }
    });

    cancelComment.addEventListener('click', () => {
        commentInput.value = '';
    });

    renderComments();

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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });
    
    searchTrigger.addEventListener('click', () => {
        searchOverlay.classList.add('active');
    });
    
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });
    
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape" && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
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
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==================================================
       RECOMMENDATION & CHARACTER INTERACTIONS
    ================================================== */
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    
    recommendationItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Navigating to ${title}...`, 'success');
        });
    });

    const characterItems = document.querySelectorAll('.character-item');
    
    characterItems.forEach(item => {
        item.addEventListener('click', function() {
            const characterName = this.querySelector('h4').textContent;
            showNotification(`Viewing ${characterName} profile...`, 'success');
        });
    });
});