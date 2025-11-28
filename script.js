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
            setTimeout(() => {
                menuToggle.style.transition = '';
            }, 10);
        }
    });
}

// Hide/show header on scroll
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const scrollThreshold = 100;

if (header) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Universal smooth scroll function
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// AJAX FORM HANDLING (Web3Forms with Custom Formatting)
document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form[data-web3form]");

    forms.forEach(form => {
        const resultDiv = form.querySelector(".form-result");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const submitBtn = form.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;

            const firstName = formData.get('firstName') || '';
            const lastName = formData.get('lastName') || '';
            const email = formData.get('email') || '';
            const fullName = `${firstName} ${lastName}`.trim();

            formData.set('subject', `New inquiry from ${fullName} - Meridian Holdings Group`);
            
            formData.set('from_name', fullName);
            
            formData.set('replyto', email);

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            submitBtn.disabled = true;
            submitBtn.innerHTML = "<span>Sending...</span>";

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const data = await response.json();

                if (response.status === 200) {
                    resultDiv.innerHTML = "<p class='success-message'>Thank you! Your message has been sent successfully.</p>";
                    form.reset();
                    
                    setTimeout(() => {
                        resultDiv.innerHTML = "";
                    }, 5000);
                } else {
                    resultDiv.innerHTML = "<p class='error-message'>Something went wrong. Please try again.</p>";
                }

            } catch (err) {
                resultDiv.innerHTML = "<p class='error-message'>Unable to send message. Please try again later.</p>";
            }

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
});