// ===== Login Form =====
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        // Load saved credentials if "Remember me" was checked
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (rememberMe && savedEmail) {
            const emailInput = loginForm.querySelector('#email');
            const passwordInput = loginForm.querySelector('#password');
            const rememberCheckbox = loginForm.querySelector('#rememberMe');
            
            if (emailInput) emailInput.value = savedEmail;
            if (savedPassword && passwordInput) passwordInput.value = savedPassword;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const rememberMeCheckbox = this.querySelector('#rememberMe');
            const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            // Save to localStorage if "Remember me" is checked
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                // Clear saved credentials
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
                localStorage.removeItem('rememberMe');
            }
            
            // Dummy login success
            alert(`Login successful! Welcome back, ${email}`);
            
            // Redirect to homepage
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
});

// ===== Signup Form =====
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;
            
            // Basic validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Dummy signup success
            alert(`Account created successfully! Welcome, ${name}!`);
            
            // Redirect to login page
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1000);
        });
    }
});

// ===== Forgot Password Form =====
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#email').value;
            
            // Basic validation
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Dummy success message
            alert(`Password reset link has been sent to ${email}. Please check your inbox.`);
            
            // Redirect to login page
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
});

// ===== Show/Hide Password Toggle (Optional Enhancement) =====
document.addEventListener('DOMContentLoaded', function() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        // Add eye icon for password toggle
        const wrapper = input.parentElement;
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            font-size: 1.2rem;
        `;
        
        // Make wrapper position relative
        if (wrapper.style.position !== 'relative') {
            wrapper.style.position = 'relative';
        }
        
        // Toggle password visibility
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
        
        // Append toggle button only if not already added
        if (!wrapper.querySelector('.password-toggle')) {
            wrapper.appendChild(toggleBtn);
        }
    });
});

// ===== Remember Me Checkbox Styling =====
document.addEventListener('DOMContentLoaded', function() {
    const rememberCheckbox = document.getElementById('rememberMe');
    
    if (rememberCheckbox) {
        // Add visual feedback on change
        rememberCheckbox.addEventListener('change', function() {
            const label = this.parentElement;
            if (this.checked) {
                label.style.color = 'var(--primary-color)';
            } else {
                label.style.color = 'var(--text-color)';
            }
        });
    }
});