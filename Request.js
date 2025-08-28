
const requestForm = document.getElementById('request-form');
const successPopup = document.getElementById('success-popup');
const popupOkBtn = document.getElementById('popup-ok-btn');
const successTalentName = document.getElementById('success-talent-name');


function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name') || 'Chunnu Maya Ghimire',
        skills: params.get('skills') || 'Caretaker, Maid ',
        location: params.get('location') || 'Kathmandu',
        availability: params.get('availability') || 'Part-time',
        rating: params.get('rating') || '4.8 rating (42 projects)',
        rate: params.get('rate') || '250'
        
    };
    const parAms = new URLSearchParams(window.location.search);
    return {
        name: params.get('name') || 'Rani Sharma',
        skills: params.get('skills') || 'Data Entry ',
        location: params.get('location') || 'Itahari',
        availability: params.get('availability') || 'Part-time',
        rating: params.get('rating') || '4.8 rating (42 projects)',
        rate: params.get('rate') || '340'
    };
   
    
}
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name') || 'Rani Sharma',
        skills: params.get('skills') || 'data entry',
        location: params.get('location') || 'Itahari',
        availability: params.get('availability') || 'Part-time',
        rating: params.get('rating') || '4.8 rating (42 projects)',
        rate: params.get('rate') || '340'
    };
 
}


function fillTalentInfo() {
    const talent = getUrlParams();
    
    document.getElementById('talent-name').textContent = talent.name;
    document.getElementById('talent-skills').textContent = talent.skills;
    document.getElementById('talent-location').textContent = talent.location;
    document.getElementById('talent-availability').textContent = talent.availability;
    document.getElementById('talent-rating').textContent = talent.rating;
    document.getElementById('talent-hourly-rate').textContent = `रु${talent.rate}/hr`;
    document.getElementById('hourly-rate').textContent = `रु${talent.rate}`;
    document.getElementById('success-talent-name').textContent = talent.name;
    
    
    document.getElementById('project-location').value = talent.location;
}


requestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const projectTitle = document.getElementById('project-title').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectLocation = document.getElementById('project-location').value;
    const projectDuration = document.getElementById('project-duration').value;
    const estimatedHours = document.getElementById('estimated-hours').value;
    const startDate = document.getElementById('start-date').value;
    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;
    const clientPhone = document.getElementById('client-phone').value;
    const additionalNotes = document.getElementById('additional-notes').value;
    

    const talent = getUrlParams();
    

    const requestData = {
        talent: {
            name: talent.name,
            rate: talent.rate,
            location: talent.location
        },
        project: {
            title: projectTitle,
            description: projectDescription,
            location: projectLocation,
            duration: projectDuration,
            estimatedHours: estimatedHours,
            startDate: startDate,
            totalCost: estimatedHours ? `$${estimatedHours * talent.rate}` : 'Not specified'
        },
        client: {
            name: clientName,
            email: clientEmail,
            phone: clientPhone,
            notes: additionalNotes
        }
    };
    
    console.log('Request Data:', requestData);
    
    
    successPopup.style.display = 'flex';
});


popupOkBtn.addEventListener('click', function() {
    
    successPopup.style.display = 'none';
    
    
    window.location.href = 'index.html';
});


successPopup.addEventListener('click', function(e) {
    if (e.target === successPopup) {
        successPopup.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    fillTalentInfo();
    
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').min = today;
});