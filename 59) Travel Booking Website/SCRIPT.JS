// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth scrolling for navigation links ---
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            // Optional: Close mobile menu if open
            const navUl = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
             if (navUl.classList.contains('nav-active')) {
                navUl.classList.remove('nav-active');
                burger.classList.remove('toggle');
                 // Remove fade-in effect from menu items after closing
                 navUl.querySelectorAll('li').forEach(item => {
                     item.style.animation = '';
                 });
             }


            if (targetElement) {
                // Calculate position considering sticky header
                const headerHeight = document.querySelector('header').offsetHeight; // Get header height
                const targetPosition = targetElement.offsetTop - headerHeight - 20; // Adjust offset (20px for extra padding)

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Handle Search Form Submission ---
    const searchForm = document.getElementById('search-form');

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const destination = document.getElementById('destination').value.trim(); // Use trim()
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;

            // More robust validation
            if (destination === "" || checkin === "" || checkout === "" || guests === "" || parseInt(guests) < 1) {
                alert("Please fill in all search fields correctly.");
                return;
            }

            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const today = new Date();
            today.setHours(0,0,0,0); // Set time to 0 for date comparison

             if (checkinDate < today) {
                 alert("Check-in date cannot be in the past.");
                 return;
             }

            if (checkinDate > checkoutDate) {
                alert("Check-out date must be after check-in date.");
                return;
            }


            // --- Placeholder for actual search functionality ---
            console.log("Search initiated with:");
            console.log(`Destination: ${destination}`);
            console.log(`Check-in: ${checkin}`);
            console.log(`Check-out: ${checkout}`);
            console.log(`Guests: ${guests}`);


            // Simulate search results (replace with actual logic)
            alert(`Searching for trips to ${destination}...\n\n(This is a frontend demo. Real search requires a backend.)`);

            // Optional: Reset form or redirect
            // searchForm.reset();
        });
    }

     // --- Handle Newsletter Form Submission ---
     const newsletterForm = document.getElementById('newsletter-form');

     if (newsletterForm) {
         newsletterForm.addEventListener('submit', function(event) {
             event.preventDefault();

             const email = document.getElementById('newsletter-email').value.trim();

             if (email === "" || !email.includes('@') || !email.includes('.')) { // Basic email format check
                 alert("Please enter a valid email address.");
                 return;
             }

             // --- Placeholder for actual signup functionality ---
             console.log(`Newsletter signup email: ${email}`);

             // Simulate success (replace with actual logic sending email to backend)
             alert(`Thank you for subscribing with ${email}!\n\n(This is a frontend demo. Email will not be sent.)`);

             newsletterForm.reset(); // Clear the form
         });
     }


     // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- Simple Fade-in Animation on Scroll (using Intersection Observer) ---
    // This requires elements to have the class 'fade-in'

    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible
          entry.target.classList.add('appear');
          // Optional: Stop observing once it has appeared
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeInElements.forEach(el => {
      observer.observe(el);
    });


    // --- Mobile Menu Toggle (Basic JS) ---
    const burger = document.querySelector('.burger');
    const navUl = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li'); // Select list items for animation

    if (burger && navUl) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            navUl.classList.toggle('nav-active');

            // Animate Links (simple fade/slide)
            navLinksLi.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ''; // Reset animation
                } else {
                     // Add animation with a delay for each item
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Define the animation keyframes in CSS, or use JS if preferred (CSS is cleaner)
    // Add this to your CSS:
    /*
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    */


});