// ===== Hamburger Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// ===== Tabs Filter Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const toolCards = document.querySelectorAll('.tool-card');

    if (tabs.length > 0 && toolCards.length > 0) {
        // Load last selected category from localStorage
        const lastCategory = localStorage.getItem('selectedCategory') || 'all';
        
        tabs.forEach(tab => {
            // Set active tab based on localStorage
            if (tab.dataset.category === lastCategory) {
                tab.classList.add('active');
                filterCards(lastCategory);
            } else {
                tab.classList.remove('active');
            }

            // Add click event
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Filter cards
                filterCards(category);
                
                // Save to localStorage
                localStorage.setItem('selectedCategory', category);
            });
        });

        function filterCards(category) {
            toolCards.forEach(card => {
                const categories = card.dataset.categories;
                
                if (category === 'all' || categories.includes(category)) {
                    card.classList.remove('hidden');
                    // Add animation
                    card.style.animation = 'fadeIn 0.5s';
                } else {
                    card.classList.add('hidden');
                }
            });
        }
    }
});

// ===== Newsletter Form Submission =====
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Dummy validation
            if (email && email.includes('@')) {
                alert('Thank you for subscribing! We will keep you updated.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
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

// ===== Add fade-in animation CSS dynamically =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);