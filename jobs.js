
const jobSeekers = [
    {
        id: 1,
        name: "Chunnu Maya Ghimire",
        skills: ["Care Taker", "Maid", ],
        location: "Kathmandu",
        hourlyRate: 250,
        availability: "Part-time",
        experience: "Mid Level (2-5 years)",
        bio: "Care Taker with 5+ years of experience creating safe and beautiful environment.",
        rating: 4.8,
        projects: 42
    },
    {
        id: 2,
        name: "Rani Sharma",
        skills: ["Data Entry"],
        location: "Kathmandu",
        hourlyRate: 340,
        availability: "Full-time",
        experience: "Senior Level (5+ years)",
        bio: "Data specializing in modern Excel applications.",
        rating: 4.9,
        projects: 67
    },
    {
        id: 3,
        name: "Mina Gurung",
        skills: ["Content Writing", "SEO", "Blogging"],
        location: "Pokhara",
        hourlyRate: 20,
        availability: "Part-time",
        experience: "Mid Level (2-5 years)",
        bio: "SEO content writer with expertise in creating engaging blog content.",
        rating: 4.7,
        projects: 28
    },
    {
        id: 4,
        name: "Alex Chen",
        skills: ["Data Entry", "Excel", "Administration"],
        location: "Lalitpur",
        hourlyRate: 18,
        availability: "Weekends",
        experience: "Entry Level (0-2 years)",
        bio: "Detail-oriented administrative professional with strong data management skills.",
        rating: 4.5,
        projects: 15
    },
    {
        id: 5,
        name: "David Brown",
        skills: ["Python", "Data Analysis", "Machine Learning"],
        location: "Kathmandu",
        hourlyRate: 35,
        availability: "Part-time",
        experience: "Senior Level (5+ years)",
        bio: "Data scientist with expertise in Python and machine learning algorithms.",
        rating: 4.9,
        projects: 53
    },
    {
        id: 6,
        name: "Priya Patel",
        skills: ["Digital Marketing", "Social Media", "SEO"],
        location: "Bhaktapur",
        hourlyRate: 22,
        availability: "Part-time",
        experience: "Mid Level (2-5 years)",
        bio: "Digital marketing specialist with a track record of successful campaigns.",
        rating: 4.6,
        projects: 37
    }
];


const searchForm = document.getElementById('search-form');
const skillSearch = document.getElementById('skill-search');
const locationSearch = document.getElementById('location-search');
const useMyLocationBtn = document.getElementById('use-my-location');
const jobCardsContainer = document.getElementById('job-cards-container');
const resultsCount = document.getElementById('results-count');
const noResults = document.getElementById('no-results');
const broadenSearchBtn = document.getElementById('broaden-search');
const sortBy = document.getElementById('sort-by');
const availabilityFilter = document.getElementById('availability');


document.addEventListener('DOMContentLoaded', function() {
    generateJobCards(jobSeekers);
    updateResultsCount(jobSeekers.length);
});
function generateJobCards(jobSeekersData) {
    jobCardsContainer.innerHTML = '';
    
    if (jobSeekersData.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    jobSeekersData.forEach(jobSeeker => {
        const card = document.createElement('div');
        card.className = 'job-card';
        
        card.innerHTML = `
            <div class="job-card-header">
                <h3>${jobSeeker.name}</h3>
                <p>${jobSeeker.skills.join(', ')}</p>
            </div>
            <div class="job-card-body">
                <div class="job-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${jobSeeker.location}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-clock"></i>
                    <span>${jobSeeker.availability}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-briefcase"></i>
                    <span>${jobSeeker.experience}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-star"></i>
                    <span>${jobSeeker.rating} rating (${jobSeeker.projects} projects)</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-user"></i>
                    <span>${jobSeeker.bio}</span>
                </div>
            </div>
            <div class="job-card-footer">
                <div class="price">रु${jobSeeker.hourlyRate}/hr</div>
                <a href="Request.html"> <button class="btn request-btn" data-id="${jobSeeker.id}">Request</button></a>
            </div>
        `;
        
        jobCardsContainer.appendChild(card);
    });
    
   
    document.querySelectorAll('.request-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobSeekerId = this.getAttribute('data-id');
            const jobSeeker = jobSeekers.find(js => js.id == jobSeekerId);
            alert(`Request sent to ${jobSeeker.name}! They will contact you soon.`);
        });
    });
}


function updateResultsCount(count) {
    resultsCount.textContent = count;
}


function filterJobSeekers() {
    const skillText = skillSearch.value.toLowerCase();
    const locationText = locationSearch.value.toLowerCase();
    const availabilityValue = availabilityFilter.value;
    
    const filtered = jobSeekers.filter(seeker => {
   
        const matchesSkill = skillText === '' || 
            seeker.skills.some(skill => skill.toLowerCase().includes(skillText));
        
       
        const matchesLocation = locationText === '' || 
            seeker.location.toLowerCase().includes(locationText);
        
        
        const matchesAvailability = availabilityValue === 'all' || 
            seeker.availability.toLowerCase() === availabilityValue.toLowerCase();
        
        return matchesSkill && matchesLocation && matchesAvailability;
    });
    
  
    const sortValue = sortBy.value;
    let sorted = [...filtered];
    
    switch(sortValue) {
        case 'rate-low':
            sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
            break;
        case 'rate-high':
            sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
            break;
        case 'experience':
            const experienceOrder = {
                'Senior Level (5+ years)': 3,
                'Mid Level (2-5 years)': 2,
                'Entry Level (0-2 years)': 1
            };
            sorted.sort((a, b) => experienceOrder[b.experience] - experienceOrder[a.experience]);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        default:
            
            break;
    }
    
    generateJobCards(sorted);
    updateResultsCount(sorted.length);
}


function useMyLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    useMyLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
    useMyLocationBtn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            
            locationSearch.value = 'Kathmandu';
            useMyLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Location';
            useMyLocationBtn.disabled = false;
            filterJobSeekers();
        },
        function(error) {
            alert('Unable to retrieve your location. Please enter it manually.');
            useMyLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Location';
            useMyLocationBtn.disabled = false;
        }
    );
}


searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    filterJobSeekers();
});

useMyLocationBtn.addEventListener('click', useMyLocation);

skillSearch.addEventListener('input', filterJobSeekers);
locationSearch.addEventListener('input', filterJobSeekers);
sortBy.addEventListener('change', filterJobSeekers);
availabilityFilter.addEventListener('change', filterJobSeekers);

broadenSearchBtn.addEventListener('click', function() {
    skillSearch.value = '';
    locationSearch.value = '';
    availabilityFilter.value = 'all';
    sortBy.value = 'relevance';
    filterJobSeekers();
});