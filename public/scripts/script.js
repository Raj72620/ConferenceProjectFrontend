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

    // Contact Form
    document.querySelector(".contact-form")?.addEventListener("submit", async (event) => {
        await handleFormSubmission(event, `${API_BASE_URL}/api/contact/contact`, "Message");
    });

    // Paper Submission Form
    document.getElementById("paperSubmissionForm")?.addEventListener("submit", async (event) => {
        await handleFormSubmission(event, `${API_BASE_URL}/submit/papersubmit`, "Paper Submission", true);
    });
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

// Updated script.js code (focus on the handleFormSubmission function)
async function handleFormSubmission(event, endpoint, actionName, isFileUpload = false) {
    event.preventDefault();
    const form = event.target;
    const formData = isFileUpload ? new FormData(form) : Object.fromEntries(new FormData(form));

    try {
        // Show loading state (optional)
        form.querySelector('button').disabled = true;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: isFileUpload ? undefined : { "Content-Type": "application/json" },
            body: isFileUpload ? formData : JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `${actionName} failed`);
        }

        const result = await response.json();
        showFeedback(true, result.message || `${actionName} Successful!`);
        form.reset();

    } catch (error) {
        console.error(`${actionName} Error:`, error);
        showFeedback(false, error.message || `${actionName} Failed. Please try again.`);
    } finally {
        // Re-enable button
        form.querySelector('button').disabled = false;
    }
}

function showFeedback(isSuccess, message) {
    alert(message); // Consider replacing with a proper UI notification system
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

    // Controls
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