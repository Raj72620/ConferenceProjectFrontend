// Global Configuration
const API_BASE_URL = "https://conferenceproject-backend.onrender.com";

// DOM Ready Handler
document.addEventListener("DOMContentLoaded", () => {
    initializeAnimations();
    setupFormHandlers();
    initializeCarousel();
});

// Animation Initialization
function initializeAnimations() {
    // Navigation and Contact Bars
    document.querySelector(".contact-bar")?.classList.add("show");
    document.querySelector(".navbar")?.classList.add("show");

    // Intersection Observers
    createObserver(".footer-section", "animate-footer");
    createObserver(".conference-section", "animate-section");
    createObserver(".contact-info", "animate-contact", 0.3);
    createObserver(".contact-container", "animate-contact");
    createObserver(".scientific-committee-box", "show", 0.5);
    createObserver(".member-details, .scientific-committee-box ul li", "show", 0.3);
    
    // Scroll-based Reveal
    setupScrollReveal();
}

// Form Handlers
function setupFormHandlers() {
    // Registration Form
    document.querySelector(".registration-form")?.addEventListener("submit", async (event) => {
        await handleFormSubmission(event, `${API_BASE_URL}/api/registrations/register`, "Registration");
    });

    // Contact Form (Updated)
    document.getElementById("contactForm")?.addEventListener("submit", async (event) => {
        await handleContactSubmission(event);
    });

    // Paper Submission Form
    document.getElementById("paperSubmissionForm")?.addEventListener("submit", async (event) => {
        await handleFormSubmission(event, `${API_BASE_URL}/submit/papersubmit`, "Paper Submission", true);
    });
}

// Contact Form Handler (New)
async function handleContactSubmission(event) {
    event.preventDefault();
    const form = event.target;
    
    const formData = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone?.value.trim() || "", // Optional field
        message: form.elements.message.value.trim()
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
        showFeedback(false, "Please fill in Name, Email, and Message fields!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/contact/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || "Message submission failed");
        }

        showFeedback(true, result.message || "Message sent successfully!");
        form.reset();
    } catch (error) {
        console.error("Contact Error:", error);
        showFeedback(false, error.message || "Failed to send message");
    }
}

// Reusable Animation Functions
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
    const revealElements = [
        { selector: "h1, p", threshold: 0.85 },
        { selector: ".registration-page, .second, h2, .registration-form", threshold: 0.85 },
        { selector: ".update", threshold: 0.85 }
    ];

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(({ selector }) => {
        document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
    });
}

// General Form Handler
async function handleFormSubmission(event, endpoint, actionName, isFileUpload = false) {
    event.preventDefault();
    const form = event.target;
    const formData = isFileUpload ? new FormData(form) : Object.fromEntries(new FormData(form));

    try {
        form.querySelector('button').disabled = true;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: isFileUpload ? undefined : { "Content-Type": "application/json" },
            body: isFileUpload ? formData : JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || `${actionName} failed`);
        }

        showFeedback(true, result.message || `${actionName} Successful!`);
        form.reset();
    } catch (error) {
        console.error(`${actionName} Error:`, error);
        showFeedback(false, error.message || `${actionName} Failed. Please try again.`);
    } finally {
        form.querySelector('button').disabled = false;
    }
}

// UI Feedback
function showFeedback(isSuccess, message) {
    alert(message); // Replace with toast/notification UI if available
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

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => updateSlide(index + 1), 3000);
    };

    window.nextSlide = () => { updateSlide(index + 1); resetAutoSlide() };
    window.prevSlide = () => { updateSlide(index - 1); resetAutoSlide() };
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();
}

// Utility Functions
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Image Zoom Effect
window.onload = () => {
    document.querySelector(".container img")?.classList.add("zoom");
};