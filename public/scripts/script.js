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
    // Registration Form
    document.getElementById("registrationForm")?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        
        const formData = {
            name: form.elements.name.value.trim(),
            paperId: form.elements.paperId.value.trim(),
            paperTitle: form.elements.paperTitle.value.trim(),
            institution: form.elements.institution.value.trim(),
            phone: form.elements.phone.value.trim(),
            email: form.elements.email.value.trim(),
            amountPaid: parseFloat(form.elements.amountPaid.value),
            journalName: form.elements.journalName.value.trim(),
            feeType: form.elements.feeType.value.trim(),
            transactionId: form.elements.transactionId.value.trim(),
            date: form.elements.date.value
        };

        if (!formData.name || !formData.paperId || !formData.amountPaid) {
            showFeedback(false, "Please fill all required fields");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/registrations/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Registration failed");

            showFeedback(true, result.message || "Registration successful!");
            form.reset();
        } catch (error) {
            console.error("Registration Error:", error);
            showFeedback(false, error.message || "Registration failed. Please try again.");
        }
    });

    // Contact Form
    document.getElementById("contactForm")?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = {
            name: form.elements.name.value.trim(),
            email: form.elements.email.value.trim(),
            phone: form.elements.phone.value.trim(),
            message: form.elements.message.value.trim()
        };

        if (!formData.name || !formData.email || !formData.message) {
            showFeedback(false, "Please fill required fields");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Message failed");
            
            showFeedback(true, "Message sent successfully!");
            form.reset();
        } catch (error) {
            console.error("Contact Error:", error);
            showFeedback(false, error.message || "Message failed");
        }
    });
}

// Animation Functions
function createObserver(selector, animationClass, threshold = 0.2) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.target.classList.toggle(animationClass, entry.isIntersecting));
    }, { threshold });
    elements.forEach(el => observer.observe(el));
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
    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
}

// UI Functions
function showFeedback(isSuccess, message) {
    const alertBox = document.createElement("div");
    alertBox.className = `feedback ${isSuccess ? "success" : "error"}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
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