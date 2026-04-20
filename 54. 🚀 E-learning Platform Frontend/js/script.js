// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // User state management
    let currentUser = null;
    let enrolledCourses = [];

    // UI Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const myCoursesLink = document.getElementById('myCourses');
    const myCoursesSection = document.getElementById('my-courses');
    const enrolledCoursesGrid = document.getElementById('enrolledCourses');

    function updateUIForLoggedInUser() {
        loginBtn.classList.add('hidden');
        signupBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        myCoursesLink.classList.remove('hidden');
        displayEnrolledCourses();
    }

    function updateUIForLoggedOutUser() {
        loginBtn.classList.remove('hidden');
        signupBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        myCoursesLink.classList.add('hidden');
        myCoursesSection.classList.add('hidden');
        currentUser = null;
        enrolledCourses = [];
    }

    // Modal functionality
    function openModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
        document.getElementById(modalId).classList.add('flex');
    }

    function closeModal(modalId) {
        document.getElementById(modalId).classList.remove('flex');
        document.getElementById(modalId).classList.add('hidden');
    }

    // Login functionality
    window.openLoginModal = function() {
        openModal('loginModal');
    };

    window.closeLoginModal = function() {
        closeModal('loginModal');
    };

    window.handleLogin = function() {
        const identifier = document.getElementById('loginIdentifier').value;
        const otpSection = document.getElementById('otpSection');
        const loginButton = document.getElementById('loginButton');

        if (!identifier) {
            alert('Please enter your email or mobile number');
            return;
        }

        if (otpSection.classList.contains('hidden')) {
            // Send OTP
            alert('OTP sent to ' + identifier);
            otpSection.classList.remove('hidden');
            loginButton.textContent = 'Login';
        } else {
            const otp = document.getElementById('otpInput').value;
            if (!otp) {
                alert('Please enter the OTP');
                return;
            }
            // Verify OTP and login
            currentUser = {
                identifier: identifier,
                enrolledCourses: JSON.parse(localStorage.getItem('enrolledCourses_' + identifier) || '[]')
            };
            enrolledCourses = currentUser.enrolledCourses;
            
            alert('Login successful!');
            closeLoginModal();
            updateUIForLoggedInUser();
            
            // Reset form
            document.getElementById('loginIdentifier').value = '';
            document.getElementById('otpInput').value = '';
            otpSection.classList.add('hidden');
            loginButton.textContent = 'Get OTP';
        }
    };

    // Signup functionality
    window.openSignupModal = function() {
        openModal('signupModal');
    };

    window.closeSignupModal = function() {
        closeModal('signupModal');
    };

    window.handleSignup = function() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const mobile = document.getElementById('signupMobile').value;
        const otpSection = document.getElementById('signupOtpSection');
        const signupButton = document.getElementById('signupButton');

        if (!name || !email || !mobile) {
            alert('Please fill in all fields');
            return;
        }

        if (otpSection.classList.contains('hidden')) {
            // Send OTP
            alert('OTP sent to ' + mobile);
            otpSection.classList.remove('hidden');
            signupButton.textContent = 'Sign Up';
        } else {
            const otp = document.getElementById('signupOtpInput').value;
            if (!otp) {
                alert('Please enter the OTP');
                return;
            }
            // Create user account
            currentUser = {
                name: name,
                email: email,
                mobile: mobile,
                enrolledCourses: []
            };
            enrolledCourses = [];
            
            alert('Sign up successful!');
            closeSignupModal();
            updateUIForLoggedInUser();
            
            // Reset form
            document.getElementById('signupName').value = '';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupMobile').value = '';
            document.getElementById('signupOtpInput').value = '';
            otpSection.classList.add('hidden');
            signupButton.textContent = 'Get OTP';
        }
    };

    // Logout functionality
    window.handleLogout = function() {
        if (currentUser) {
            localStorage.setItem('enrolledCourses_' + currentUser.identifier, JSON.stringify(enrolledCourses));
        }
        updateUIForLoggedOutUser();
        alert('Logged out successfully!');
    };

    // Course enrollment functionality
    const enrollButtons = document.querySelectorAll('.course-card button');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const courseCard = this.closest('.course-card');
            const courseName = courseCard.querySelector('h3').textContent;
            const coursePrice = courseCard.querySelector('.text-blue-600').textContent;
            const courseImage = courseCard.querySelector('img').src;
            
            if (!currentUser) {
                alert('Please login to enroll in courses');
                openLoginModal();
                return;
            }
            
            // Check if already enrolled
            if (enrolledCourses.some(course => course.name === courseName)) {
                alert('You are already enrolled in this course!');
                return;
            }

            // Add course to enrolled courses
            enrolledCourses.push({
                name: courseName,
                price: coursePrice,
                image: courseImage
            });

            // Save to localStorage
            if (currentUser.identifier) {
                localStorage.setItem('enrolledCourses_' + currentUser.identifier, JSON.stringify(enrolledCourses));
            }

            alert(`Successfully enrolled in "${courseName}"!`);
            displayEnrolledCourses();
        });
    });

    // Display enrolled courses
    function displayEnrolledCourses() {
        if (!enrolledCoursesGrid) return;

        enrolledCoursesGrid.innerHTML = '';
        myCoursesSection.classList.remove('hidden');

        if (enrolledCourses.length === 0) {
            enrolledCoursesGrid.innerHTML = '<p class="text-center col-span-3 text-gray-500">No courses enrolled yet.</p>';
            return;
        }

        enrolledCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'bg-white rounded-lg shadow-md overflow-hidden course-card';
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${course.name}</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-blue-600 font-bold">${course.price}</span>
                        <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Start Learning</button>
                    </div>
                </div>
            `;
            enrolledCoursesGrid.appendChild(courseCard);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.course-card, .feature-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
            
            if (isVisible && !element.classList.contains('animate-fadeIn')) {
                element.classList.add('animate-fadeIn');
            }
        });
    };

    // Listen for scroll events to trigger animations
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
});
