// Conference Webpage - Main JavaScript
// Interactive features and functionality

// Countdown Timer
function initCountdown() {
    const targetDate = new Date('2024-12-31T09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.querySelectorAll('.countdown').forEach(el => {
                el.innerHTML = '<p>Event has started!</p>';
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.querySelectorAll('.countdown-number[data-unit="days"]').forEach(el => {
            el.textContent = days.toString().padStart(2, '0');
        });
        document.querySelectorAll('.countdown-number[data-unit="hours"]').forEach(el => {
            el.textContent = hours.toString().padStart(2, '0');
        });
        document.querySelectorAll('.countdown-number[data-unit="minutes"]').forEach(el => {
            el.textContent = minutes.toString().padStart(2, '0');
        });
        document.querySelectorAll('.countdown-number[data-unit="seconds"]').forEach(el => {
            el.textContent = seconds.toString().padStart(2, '0');
        });
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Schedule Tabs
function initScheduleTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const scheduleDays = document.querySelectorAll('.schedule-day');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.dataset.day;
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide schedule days
            scheduleDays.forEach(day => {
                if (day.dataset.day === targetDay) {
                    day.classList.remove('hidden');
                } else {
                    day.classList.add('hidden');
                }
            });
        });
    });
}

// Filter Buttons
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterableItems = document.querySelectorAll('.filterable-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active filter
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            filterableItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchableItems = document.querySelectorAll('.searchable-item');
        
        searchableItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
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
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScheduleTabs();
    initFilters();
    initSearch();
    initSmoothScroll();
    initMobileMenu();
    initFormValidation();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .schedule-item, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});




