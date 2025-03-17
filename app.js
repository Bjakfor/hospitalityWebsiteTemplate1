document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Navigation Links
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

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Gallery Image Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const modal = createImageModal(imgSrc);
            document.body.appendChild(modal);
            
            // Remove modal on click outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Room Booking Form Validation
    const bookingForm = document.querySelector('#bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm();
        });
    }

    // Add animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => title.classList.add('fade-up'));

    sectionTitles.forEach(title => observer.observe(title));

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon and animate
        updateThemeIcon(newTheme);
        animateThemeTransition();
    });
    
    // Update theme icon
    function updateThemeIcon(theme) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Theme transition animation
    function animateThemeTransition() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Fade in
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            
            // Fade out
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }, 200);
        });
    }

    // Handle View More/Less button text and animation
    const moreRooms = document.getElementById('moreRooms');
    const roomsToggleButton = document.querySelector('[data-bs-toggle="collapse"]');
    const viewMoreText = roomsToggleButton.querySelector('.view-more-text');
    const viewLessText = roomsToggleButton.querySelector('.view-less-text');

    moreRooms.addEventListener('show.bs.collapse', function () {
        viewMoreText.classList.add('d-none');
        viewLessText.classList.remove('d-none');
    });

    moreRooms.addEventListener('hide.bs.collapse', function () {
        viewMoreText.classList.remove('d-none');
        viewLessText.classList.add('d-none');
    });

    // Animate room cards when they become visible
    moreRooms.addEventListener('shown.bs.collapse', function() {
        const roomCards = this.querySelectorAll('.room-card');
        roomCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // Handle testimonial form collapse
    const formSection = document.getElementById('testimonialFormSection');
    const testimonialToggleButton = document.querySelector('[data-bs-toggle="collapse"]');
    const shareText = testimonialToggleButton.querySelector('.share-experience-text');
    const hideText = testimonialToggleButton.querySelector('.hide-form-text');

    formSection.addEventListener('show.bs.collapse', function () {
        shareText.classList.add('d-none');
        hideText.classList.remove('d-none');
        
        // Reset form when showing
        const form = this.querySelector('form');
        if (form) form.reset();
    });

    formSection.addEventListener('hide.bs.collapse', function () {
        shareText.classList.remove('d-none');
        hideText.classList.add('d-none');
    });

    // Smooth scroll to form when opening
    formSection.addEventListener('shown.bs.collapse', function () {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Reset animations when collapsing
document.querySelector('#moreRooms').addEventListener('hide.bs.collapse', function() {
    const roomCards = this.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
});

// Helper Functions
function createImageModal(imgSrc) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    `;

    modal.appendChild(img);
    return modal;
}

function validateForm() {
    // Add your form validation logic here
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (isValid) {
        // Handle form submission
        console.log('Form submitted successfully');
    }
}

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Booking Form Handling
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add booking validation and submission logic
    const formData = new FormData(this);
    console.log('Booking submitted:', Object.fromEntries(formData));
    
    // Show success message
    showAlert('Booking request received! We will contact you shortly.', 'success');
});

// Custom Alert Function
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
    alertDiv.style.zIndex = '1050';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Room Price Calculator
function calculatePrice(roomType, nights) {
    const prices = {
        'double-deluxe': 250,
        'single-deluxe': 200,
        'honeymoon-suite': 750,
        'economy-double': 200
    };
    
    return prices[roomType] * nights;
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollable) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Reveal on Scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Initialize Testimonial Carousel
document.addEventListener('DOMContentLoaded', () => {
    new bootstrap.Carousel(document.querySelector('.testimonial-carousel'), {
        interval: 5000,
        touch: true
    });
});

// Gallery Modal
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const modal = createGalleryModal(imgSrc);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

function createGalleryModal(imgSrc) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    `;
    
    modal.appendChild(img);
    return modal;
}

// Parallax Effect
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const offset = window.pageYOffset;
        element.style.transform = `translateY(${offset * speed}px)`;
    });
});

// Booking Form Animation
document.querySelectorAll('.dark-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.closest('.form-group').classList.remove('focused');
        }
    });
});

// Date Input Validation
document.addEventListener('DOMContentLoaded', function() {
    const checkInInput = document.querySelector('input[type="date"]');
    if (checkInInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
    }
});

// Form Submission Animation
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Booking Confirmed!';
        button.classList.add('btn-success');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-calendar-check me-2"></i>Check Availability';
            button.classList.remove('btn-success');
        }, 2000);
    }, 1500);
});

// Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate booking form
    const bookingForm = document.querySelector('.booking-form');
    bookingForm.style.animation = 'fadeInLeft 1s ease';
    
    // Animate hero features
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
        feature.style.animation = `fadeInRight ${0.5 + (index * 0.2)}s ease`;
    });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Form Validation Enhancement
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkIn = this.querySelector('input[type="date"]:first-of-type');
    const checkOut = this.querySelector('input[type="date"]:last-of-type');
    
    if (checkIn.value && checkOut.value) {
        const startDate = new Date(checkIn.value);
        const endDate = new Date(checkOut.value);
        
        if (endDate <= startDate) {
            alert('Check-out date must be after check-in date');
            return;
        }
    }
    
    // Animated submit button
    const button = this.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check me-2"></i>Booking Confirmed!';
        button.classList.add('btn-success');
        
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-calendar-check me-2"></i>Check Availability';
            button.classList.remove('btn-success');
        }, 2000);
    }, 1500);
});

// Update existing form input styles for theme compatibility
document.querySelectorAll('.dark-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.backgroundColor = 'var(--hover-bg)';
    });
    
    input.addEventListener('blur', function() {
        this.style.backgroundColor = 'var(--input-bg)';
    });
});

// Update modal background for theme
function createGalleryModal(imgSrc) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    `;
    
    modal.appendChild(img);
    return modal;
} 