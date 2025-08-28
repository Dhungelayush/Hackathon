// DOM Elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleLoginBtn = document.getElementById('google-login');

// Initialize Google Sign-In
function initializeGoogleSignIn() {
    // Google Identity Services configuration
    window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: false
    });
    
    // Render Google Sign-In button
    window.google.accounts.id.renderButton(
        googleLoginBtn,
        { 
            theme: "outline", 
            size: "large",
            width: googleLoginBtn.offsetWidth,
            text: "signin_with",
            shape: "rectangular"
        }
    );
    
    // Also offer One Tap sign-in
    window.google.accounts.id.prompt();
}

// Handle Google Sign-In
function handleGoogleSignIn(response) {
    // This is where you would verify the credential on your server
    console.log("Google Sign-In successful", response);
    
    // Show loading state
    googleLoginBtn.innerHTML = '<div class="loading"></div> Signing in...';
    googleLoginBtn.disabled = true;
    
    // In a real application, you would send the credential to your server
    // for verification and then handle the response
    
    // Simulate API call
    setTimeout(() => {
        // Successful login
        alert('Login successful with Google! Redirecting to dashboard...');
        // In a real app, you would redirect to the dashboard
        // window.location.href = 'dashboard.html';
        
        // Reset button
        resetGoogleButton();
    }, 1500);
}

// Reset Google button after login attempt
function resetGoogleButton() {
    googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Sign in with Google';
    googleLoginBtn.disabled = false;
}

// Form Validation
function validateForm() {
    let isValid = true;
    
    // Reset error states
    emailInput.closest('.form-group').classList.remove('error');
    passwordInput.closest('.form-group').classList.remove('error');
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
        emailInput.closest('.form-group').classList.add('error');
        isValid = false;
    }
    
    // Validate password
    if (!passwordInput.value.trim() || passwordInput.value.length < 6) {
        passwordInput.closest('.form-group').classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Form Submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Signing in...';
        submitBtn.disabled = true;
        
        // In a real application, you would send this data to your server
        const formData = {
            email: emailInput.value,
            password: passwordInput.value
        };
        
        console.log('Login Form Data:', formData);
        
        // Simulate API call
        setTimeout(() => {
            // Successful login
            alert('Login successful! Redirecting to dashboard...');
            // In a real app, you would redirect to the dashboard
            // window.location.href = 'dashboard.html';
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Sign-In when the Google library is loaded
    if (typeof google !== 'undefined') {
        initializeGoogleSignIn();
    } else {
        // Fallback if Google library doesn't load
        googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Sign in with Google (Not Available)';
        googleLoginBtn.disabled = true;
    }
    
    // Add input event listeners to remove error states when typing
    emailInput.addEventListener('input', function() {
        this.closest('.form-group').classList.remove('error');
    });
    
    passwordInput.addEventListener('input', function() {
        this.closest('.form-group').classList.remove('error');
    });
});

// Handle Google API loading
window.onGoogleLibraryLoad = function() {
    initializeGoogleSignIn();
};