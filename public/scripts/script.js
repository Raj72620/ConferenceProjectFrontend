// Global Configuration
const API_BASE_URL = "https://conferenceproject-backend.onrender.com";

// DOM Ready Handler
document.addEventListener("DOMContentLoaded", () => {
    initializeAnimations();
    setupFormHandlers();
    initializeCarousel();
});
// Helper Functions (MUST COME FIRST!)
function showFieldError(input, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "0.8rem";
    input.parentNode.appendChild(errorDiv);
}

function clearValidationErrors() {
    document.querySelectorAll(".field-error").forEach(el => el.remove());
}

function showFeedback(isSuccess, message) {
    const alertBox = document.createElement("div");
    alertBox.className = `feedback ${isSuccess ? "success" : "error"}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// Animation Initialization
function initializeAnimations() {
    document.querySelector(".contact-bar")?.classList.add("show");
    document.querySelector(".navbar")?.classList.add("show");
    createObserver(".footer-section", "animate-footer");
    createObserver(".conference-section", "animate-section");
    createObserver(".contact-info", "animate-contact", 0.3);
    createObserver(".contact-container", "animate-contact");
    setupScrollReveal();
}

// Form Handlers
function setupFormHandlers() {
    document.getElementById("registrationForm")?.addEventListener("submit", handleRegistrationSubmission);
    document.getElementById("contactForm")?.addEventListener("submit", handleContactSubmission);
}

async function handleRegistrationSubmission(event) {
    event.preventDefault();
    const form = event.target;
    
    try {
        clearValidationErrors();
        let isValid = true;

        // Enhanced Validation
        const requiredFields = [
            'name', 'paperId', 'institution', 'phone', 'email',
            'amountPaid', 'feeType', 'transactionId', 'date'
        ];

        // Validate required fields
        requiredFields.forEach(field => {
            const input = form.elements[field];
            if (!input.value.trim()) {
                showFieldError(input, `${input.placeholder} is required`);
                isValid = false;
            }
        });

        // Validate amount
        const amount = parseFloat(form.elements.amountPaid.value);
        if (isNaN(amount) || amount < 0) {
            showFieldError(form.elements.amountPaid, "Invalid amount value");
            isValid = false;
        }

        // Validate email format
        const email = form.elements.email.value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showFieldError(form.elements.email, "Invalid email format");
            isValid = false;
        }

        if (!isValid) {
            showFeedback(false, "Please fix the highlighted errors");
            return;
        }

        // Prepare form data
        const formData = {
            name: form.elements.name.value.trim(),
            paperId: form.elements.paperId.value.trim(),
            institution: form.elements.institution.value.trim(),
            phone: form.elements.phone.value.trim(),
            email: email,
            amountPaid: amount,
            feeType: form.elements.feeType.value.trim(),
            transactionId: form.elements.transactionId.value.trim(),
            date: new Date(form.elements.date.value).toISOString(),
            paperTitle: form.elements.paperTitle?.value?.trim() || "",
            journalName: form.elements.journalName?.value?.trim() || ""
        };

        // API call with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${API_BASE_URL}/api/registrations/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        const responseData = await response.json();

        if (!response.ok) {
            console.error("Backend Error:", responseData);
            throw new Error(responseData.error || "Registration failed: Please check your data");
        }

        showFeedback(true, "Registration successful! Confirmation email sent");
        form.reset();

    } catch (error) {
        console.error("Registration Error:", error);
        const errorMessage = error.name === 'AbortError' 
            ? "Request timed out. Please try again" 
            : error.message;
        showFeedback(false, errorMessage);
    }
}

// Contact Form Handler (Fixed Endpoint)
async function handleContactSubmission(event) {
    event.preventDefault();
    const form = event.target;
    
    try {
        const formData = {
            name: form.elements.name.value.trim(),
            email: form.elements.email.value.trim(),
            phone: form.elements.phone.value.trim(),
            message: form.elements.message.value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showFeedback(false, "Name, Email and Message are required");
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/contact`, { // Fixed endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (!response.ok) throw new Error(result.error || "Message submission failed");
        
        showFeedback(true, "Message sent successfully! We'll contact you soon");
        form.reset();
    } catch (error) {
        console.error("Contact Error:", error);
        showFeedback(false, error.message);
    }
}
// Animation Functions
function createObserver(selector, animationClass, threshold = 0.2) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle(animationClass, entry.isIntersecting);
        });
    }, { threshold });

    elements.forEach(element => observer.observe(element));
}

function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    // Add registration page elements
    document.querySelectorAll(".registration-page, .fee-table, .second, .registration-form")
           .forEach(el => observer.observe(el));
}

// Carousel Functionality
function initializeCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-item');
    if (!wrapper || !slides.length) return;

    let index = 0;
    let autoSlideInterval;

    const updateSlide = (newIndex) => {
        index = (newIndex + slides.length) % slides.length;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    };

    const startAutoSlide = () => autoSlideInterval = setInterval(() => updateSlide(index + 1), 3000);
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    window.nextSlide = () => { updateSlide(index + 1); resetAutoSlide() };
    window.prevSlide = () => { updateSlide(index - 1); resetAutoSlide() };
    startAutoSlide();
}

// Utility Functions
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

window.onload = () => {
    document.querySelector(".container img")?.classList.add("zoom");
};