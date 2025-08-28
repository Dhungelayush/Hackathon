//  Document Object Model Elements
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

// Check if user is logged in 
let isLoggedIn = false;


formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        formTabs.forEach(t => t.classList.remove('active'));
        formContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tabId}-form`).classList.add('active');
    });
});


searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const skill = searchInput.value.trim();
    const location = locationInput.value.trim();
    
    if (!isLoggedIn) {
     
        loginModal.style.display = 'block';
        return;
    }
    
    
    if (skill || location) {
        alert(`Searching for "${skill}" in "${location}"...`);
        
    } else {
        alert('Please enter a skill or location to search');
    }
});


requestButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (!isLoggedIn) {
           
            loginModal.style.display = 'block';
            return;
        }
        
       
        const card = this.closest('.job-card');
        const name = card.querySelector('h3').textContent;
        alert(`Request sent to ${name}! They will contact you soon.`);
    });
});


closeModal.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});


jobseekerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    alert('Job seeker profile created successfully!');
    this.reset();
});

clientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    alert('Client account created successfully!');
    this.reset();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        
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
       
    });
});


document.addEventListener('DOMContentLoaded', function() {
    
});