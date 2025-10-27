// Configuration
// Replace this URL with your Google Apps Script web app URL after deployment
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxn8CbbEPCumoup6woXNzwN9jwv5Thd9ttQyUYJyrzCxwEfBs3FIeMdubHPzAegbeQ/exec';

// Anti-spam: Track page load time
const pageLoadTime = Date.now();
const MIN_SUBMISSION_TIME = 3000; // 3 seconds minimum

// DOM Elements
const form = document.getElementById('email-form');
const emailInput = document.getElementById('email-input');
const honeypotInput = document.getElementById('website');
const submitBtn = form.querySelector('.submit-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Prevent double submissions
let isSubmitting = false;

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
        return;
    }

    // Anti-spam check 1: Honeypot field
    if (honeypotInput.value !== '') {
        console.warn('Bot detected: honeypot field filled');
        // Silently fail for bots (don't show error message)
        return;
    }

    // Anti-spam check 2: Time validation
    const timeSincePageLoad = Date.now() - pageLoadTime;
    if (timeSincePageLoad < MIN_SUBMISSION_TIME) {
        console.warn('Bot detected: form submitted too quickly');
        showError('Please take a moment to review before submitting.');
        return;
    }

    // Get email value
    const email = emailInput.value.trim();

    // Validate email
    if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }

    // Check if Google Script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL not configured. Please follow SETUP.md instructions.');
        // For demo purposes, show success message
        showSuccess();
        console.log('Email submitted (demo mode):', email);
        return;
    }

    // Disable form during submission
    setFormLoading(true);

    try {
        // Submit to Google Sheets via Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                timestamp: new Date().toISOString()
            })
        });

        // Note: With no-cors mode, we can't read the response
        // so we assume success if no error is thrown
        showSuccess();
        console.log('Email submitted successfully:', email);

    } catch (error) {
        console.error('Submission error:', error);
        showError('Something went wrong. Please try again later.');
    } finally {
        setFormLoading(false);
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccess() {
    // Hide form and error
    form.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Show success message
    successMessage.classList.remove('hidden');

    // Reset form after 3 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
        emailInput.value = '';
        honeypotInput.value = ''; // Clear honeypot
    }, 3000);
}

// Show error message
function showError(message) {
    // Update error message text
    errorMessage.querySelector('p').textContent = message;

    // Hide success
    successMessage.classList.add('hidden');

    // Show error
    errorMessage.classList.remove('hidden');

    // Hide error after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Set form loading state
function setFormLoading(isLoading) {
    isSubmitting = isLoading;
    submitBtn.disabled = isLoading;
    emailInput.disabled = isLoading;

    if (isLoading) {
        submitBtn.textContent = 'Submitting...';
    } else {
        submitBtn.textContent = 'Notify Me';
    }
}
