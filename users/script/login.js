document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================
       1. TAB SWITCHING FUNCTIONALITY
    ================================================== */
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });
    
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });


    /* ==================================================
       2. PASSWORD VISIBILITY TOGGLE
    ================================================== */
    const loginPasswordToggle = document.getElementById('loginPasswordToggle');
    const loginPasswordInput = document.getElementById('loginPassword');
    
    loginPasswordToggle.addEventListener('click', () => {
        const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPasswordInput.setAttribute('type', type);
        loginPasswordToggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });


    /* ==================================================
       3. PASSWORD STRENGTH INDICATOR
    ================================================== */
    const registerPassword = document.getElementById('registerPassword');
    const passwordStrengthFill = document.getElementById('passwordStrengthFill');
    const passwordStrengthText = document.getElementById('passwordStrengthText');
    
    registerPassword.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let text = 'Weak';
        let color = '#ff4757';
        let widthPercentage = 0;
        
        // Check password strength criteria
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 10;
        if (password.match(/[a-z]/)) strength += 15;
        if (password.match(/[A-Z]/)) strength += 15;
        if (password.match(/\d/)) strength += 15;
        if (password.match(/[^a-zA-Z\d]/)) strength += 15;
        if (password.length >= 16) strength += 10;
        
        // Set strength text, color, and width based on score
        if (strength >= 90) {
            text = 'Very Strong';
            color = '#00d2ff'; // Cyan Blue
            widthPercentage = 100; // Full bar for Very Strong
        } else if (strength >= 75) {
            text = 'Strong';
            color = '#2ed573'; // Green
            widthPercentage = 80;
        } else if (strength >= 50) {
            text = 'Medium';
            color = '#ffa502'; // Orange
            widthPercentage = 60;
        } else if (strength >= 25) {
            text = 'Weak';
            color = '#ff4757'; // Red
            widthPercentage = 40;
        } else {
            text = 'Very Weak';
            color = '#ff1744'; // Dark Red
            widthPercentage = 20;
        }
        
        // Update UI
        passwordStrengthFill.style.width = `${widthPercentage}%`;
        passwordStrengthFill.style.backgroundColor = color;
        passwordStrengthText.textContent = text;
        passwordStrengthText.style.color = color;
    });


    /* ==================================================
       4. FORM VALIDATION AND SUBMISSION
    ================================================== */
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');
    
    // Login form submission
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Simple validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate login process
        simulateLogin(email, password, rememberMe);
    });
    
    // Register form submission
    registerFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validation
        if (!username || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showNotification('Please agree to the terms and conditions', 'error');
            return;
        }
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return;
        }
        
        // Simulate registration process
        simulateRegistration(username, email, password);
    });


    /* ==================================================
       5. SIMULATED AUTHENTICATION PROCESSES
    ================================================== */
    function simulateLogin(email, password, rememberMe) {
        // Show loading state
        const submitBtn = loginFormElement.querySelector('.auth-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In a real app, you would check credentials with a server
            // For demo purposes, we'll simulate a successful login
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }, 2000);
    }
    
    function simulateRegistration(username, email, password) {
        // Show loading state
        const submitBtn = registerFormElement.querySelector('.auth-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In a real app, you would send data to a server
            // For demo purposes, we'll simulate a successful registration
            showNotification('Account created successfully!', 'success');
            
            // Switch to login form after a short delay
            setTimeout(() => {
                loginTab.click();
                // Clear form
                registerFormElement.reset();
                passwordStrengthFill.style.width = '0%';
                passwordStrengthText.textContent = 'Weak';
            }, 1500);
        }, 2000);
    }


    /* ==================================================
       6. NOTIFICATION SYSTEM
    ================================================== */
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    border-left: 4px solid;
                    border-radius: 8px;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    transform: translateX(120%);
                    transition: transform 0.3s ease;
                    border-color: #2ed573;
                }
                .notification.error {
                    border-color: #ff4757;
                }
                .notification.success {
                    border-color: #2ed573;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .notification-content i {
                    font-size: 18px;
                }
                .notification.success .notification-content i {
                    color: #2ed573;
                }
                .notification.error .notification-content i {
                    color: #ff4757;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-gray);
                    cursor: pointer;
                    margin-left: 15px;
                }
                @media (max-width: 768px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }


    /* ==================================================
       7. DYNAMIC BACKGROUND - REMOVED
    ================================================== */
    // Background functionality has been removed


    /* ==================================================
       8. FORM INPUT ANIMATIONS
    ================================================== */
    const formInputs = document.querySelectorAll('.input-group input');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });


    /* ==================================================
       9. ACCESSIBILITY IMPROVEMENTS
    ================================================== */
    // Add keyboard navigation for forms
    document.addEventListener('keydown', (e) => {
        // Tab key navigation for forms
        if (e.key === 'Enter') {
            const activeForm = document.querySelector('.auth-form.active');
            const submitBtn = activeForm.querySelector('.auth-submit');
            if (document.activeElement !== submitBtn) {
                e.preventDefault();
                submitBtn.click();
            }
        }
    });


    /* ==================================================
       10. FORGOT PASSWORD FUNCTIONALITY
    ================================================== */
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Password reset functionality is not implemented in this demo', 'error');
    });
});