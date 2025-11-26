// Scroll-triggered fade-in for individual elements
const fadeElements = document.querySelectorAll('.fade-in-element');
const featureCards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

fadeElements.forEach(el => observer.observe(el));
featureCards.forEach(el => observer.observe(el));

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
let isMenuOpen = false;

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('open');
        
        // Fade animation when opening menu
        if (isMenuOpen) {
            menuToggle.style.transition = 'all 0.3s ease';
        } else {
            // No fade when closing
            menuToggle.style.transition = 'none';
            // Small delay to allow the transition to be removed
            setTimeout(() => {
                menuToggle.style.transition = '';
            }, 10);
        }
    });
}

// Form submission handling - only if contact form exists on page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Hide/show header on scroll
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const scrollThreshold = 100; // Minimum scroll before hiding header

if (header) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}