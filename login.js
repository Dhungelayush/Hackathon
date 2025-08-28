
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleLoginBtn = document.getElementById('google-login');


function initializeGoogleSignIn() {
   
    window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", 
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: false
    });
    
    
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
    
    
    window.google.accounts.id.prompt();
}


function handleGoogleSignIn(response) {
    
    console.log("Google Sign-In successful", response);
    
    
    googleLoginBtn.innerHTML = '<div class="loading"></div> Signing in...';
    googleLoginBtn.disabled = true;
    
  
    
    
    setTimeout(() => {
        
        alert('Login successful with Google! Redirecting to dashboard...');
       
        
        
        resetGoogleButton();
    }, 1500);
}


function resetGoogleButton() {
    googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Sign in with Google';
    googleLoginBtn.disabled = false;
}


function validateForm() {
    let isValid = true;
    
    
    emailInput.closest('.form-group').classList.remove('error');
    passwordInput.closest('.form-group').classList.remove('error');
    
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
        emailInput.closest('.form-group').classList.add('error');
        isValid = false;
    }
    
    
    if (!passwordInput.value.trim() || passwordInput.value.length < 6) {
        passwordInput.closest('.form-group').classList.add('error');
        isValid = false;
    }
    
    return isValid;
}


loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Signing in...';
        submitBtn.disabled = true;
        
        
        const formData = {
            email: emailInput.value,
            password: passwordInput.value
        };
        
        console.log('Login Form Data:', formData);
        
      
        setTimeout(() => {
           
            alert('Login successful! Redirecting to dashboard...');
          
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof google !== 'undefined') {
        initializeGoogleSignIn();
    } else {
       
        googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Sign in with Google (Not Available)';
        googleLoginBtn.disabled = true;
    }
    
    
    emailInput.addEventListener('input', function() {
        this.closest('.form-group').classList.remove('error');
    });
    
    passwordInput.addEventListener('input', function() {
        this.closest('.form-group').classList.remove('error');
    });
});


window.onGoogleLibraryLoad = function() {
    initializeGoogleSignIn();
};