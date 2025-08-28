// DOM Elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const locationInput = document.getElementById('location-input');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close');
const formTabs = document.querySelectorAll('.form-tab');
const formContents = document.querySelectorAll('.form-content');
const jobseekerForm = document.getElementById('jobseeker-signup');
const clientForm = document.getElementById('client-signup');
const requestButtons = document.querySelectorAll('.request-btn');

// Check if user is logged in (in a real app, this would check authentication state)
let isLoggedIn = false;

// Form tabs functionality
formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        formTabs.forEach(t => t.classList.remove('active'));
        formContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tabId}-form`).classList.add('active');
    });
});

// Search functionality
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const skill = searchInput.value.trim();
    const location = locationInput.value.trim();
    
    if (!isLoggedIn) {
        // Show login modal if user is not logged in
        loginModal.style.display = 'block';
        return;
    }
    
    // In a real application, this would filter and show results
    if (skill || location) {
        alert(`Searching for "${skill}" in "${location}"...`);
        // Actual search logic would go here
    } else {
        alert('Please enter a skill or location to search');
    }
});

// Request button functionality
requestButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (!isLoggedIn) {
            // Show login modal if user is not logged in
            loginModal.style.display = 'block';
            return;
        }
        
        // In a real application, this would send a request
        const card = this.closest('.job-card');
        const name = card.querySelector('h3').textContent;
        alert(`Request sent to ${name}! They will contact you soon.`);
    });
});

// Modal functionality
closeModal.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Form submission handlers
jobseekerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    alert('Job seeker profile created successfully!');
    this.reset();
});

clientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    alert('Client account created successfully!');
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only apply smooth scrolling for same-page anchor links
        if (this.getAttribute('href').startsWith('#') && 
            this.getAttribute('href').length > 1) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // External links will follow their normal behavior
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code would go here
});