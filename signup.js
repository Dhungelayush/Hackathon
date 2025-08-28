//ODYSSEY
const typeCards = document.querySelectorAll('.type-card');
const jobseekerForm = document.getElementById('jobseeker-form');
const clientForm = document.getElementById('client-form');
const jobseekerSignupForm = document.getElementById('jobseeker-signup');
const clientSignupForm = document.getElementById('client-signup');
const successPopup = document.getElementById('success-popup');
const popupOkBtn = document.getElementById('popup-ok-btn');


typeCards.forEach(card => {
    card.addEventListener('click', () => {
        
        typeCards.forEach(c => c.classList.remove('selected'));
        
        
        card.classList.add('selected');
        
        
        const accountType = card.getAttribute('data-type');
        if (accountType === 'jobseeker') {
            jobseekerForm.classList.add('active');
            clientForm.classList.remove('active');
        } else {
            clientForm.classList.add('active');
            jobseekerForm.classList.remove('active');
        }
    });
});


jobseekerSignupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
   
    const name = document.getElementById('js-name').value;
    const email = document.getElementById('js-email').value;
    const password = document.getElementById('js-password').value;
    const confirmPassword = document.getElementById('js-confirm-password').value;
    const location = document.getElementById('js-location').value;
    const hourlyRate = document.getElementById('js-hourly-rate').value;
    const skills = document.getElementById('js-skills').value;
    const availability = document.getElementById('js-availability').value;
    const experience = document.getElementById('js-experience').value;
    const bio = document.getElementById('js-bio').value;
    const terms = document.getElementById('js-terms').checked;
    
    if (!name || !email || !password || !confirmPassword || !location || !hourlyRate || !skills || !availability || !experience || !bio) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!terms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    
    const formData = {
        name,
        email,
        password,
        location,
        hourlyRate,
        skills: skills.split(',').map(skill => skill.trim()),
        availability,
        experience,
        bio,
        accountType: 'jobseeker'
    };
    
    console.log('Job Seeker Form Data:', formData);
    
    
    showSuccessPopup();
});

clientSignupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const name = document.getElementById('c-name').value;
    const email = document.getElementById('c-email').value;
    const password = document.getElementById('c-password').value;
    const confirmPassword = document.getElementById('c-confirm-password').value;
    const location = document.getElementById('c-location').value;
    const needs = document.getElementById('c-needs').value;
    const terms = document.getElementById('c-terms').checked;
    
    if (!name || !email || !password || !confirmPassword || !location || !needs) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!terms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    
    const formData = {
        name,
        email,
        password,
        company: document.getElementById('c-company').value,
        location,
        industry: document.getElementById('c-industry').value,
        needs,
        accountType: 'client'
    };
    
    console.log('Client Form Data:', formData);
    
    
    showSuccessPopup();
});


function showSuccessPopup() {
    successPopup.style.display = 'flex';
}
popupOkBtn.addEventListener('click', function() {
    
    successPopup.style.display = 'none';
    
    
    window.location.href = 'index.html';
});


popupOkBtn.addEventListener('click', function() {
  
    alert('Redirecting to Find Jobs page...');
   
});


document.addEventListener('DOMContentLoaded', function() {
    typeCards[0].classList.add('selected');
    jobseekerForm.classList.add('active');
});