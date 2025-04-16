// Global Configuration
const API_BASE_URL = "https://conferenceproject-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    initializeAnimations();
    setupFormHandlers();
    initializeCarousel();
});

function showFeedback(isSuccess, message) {
    const alertBox = document.createElement("div");
    alertBox.className = `feedback ${isSuccess ? "success" : "error"}`;
    alertBox.innerHTML = `<span>${isSuccess ? "✓" : "⚠"}</span><p>${message}</p>`;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 5000);
}

function initializeAnimations() {
    document.querySelector(".contact-bar")?.classList.add("show");
    document.querySelector(".navbar")?.classList.add("show");
    
    const observers = [
        { selector: ".footer-section", class: "animate-footer" },
        { selector: ".conference-section", class: "animate-section" },
        { selector: ".contact-info", class: "animate-contact", threshold: 0.3 },
        { selector: ".contact-container", class: "animate-contact" },
        { selector: ".scientific-committee-box", class: "show", threshold: 0.5 },
        { selector: ".member-details, .scientific-committee-box ul li", class: "show", threshold: 0.3 }
    ];

    observers.forEach(({ selector, class: className, threshold = 0.2 }) => {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => entry.target.classList.toggle(className, entry.isIntersecting));
        }, { threshold });
        elements.forEach(el => observer.observe(el));
    });

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll("h1, p, .registration-page, .second, h2, .registration-form, .update")
           .forEach(el => scrollRevealObserver.observe(el));
}

function setupFormHandlers() {
    document.getElementById("registrationForm")?.addEventListener("submit", handleRegistrationSubmission);
    document.getElementById("contactForm")?.addEventListener("submit", handleContactSubmission);
    document.getElementById("paperSubmissionForm")?.addEventListener("submit", handlePaperSubmission);
}




// Update ONLY the handleRegistrationSubmission function in your script.js
async function handleRegistrationSubmission(event) {
    event.preventDefault();
    const form = event.target;
    
    try {
        // Add 'paperTitle' to required fields (CRITICAL FIX)
        const requiredFields = [
            'name', 'paperId', 'paperTitle', 'institution', 
            'phone', 'email', 'amountPaid', 'feeType', 
            'transactionId', 'date'
        ];

        let isValid = true;

        // Validate all fields including paperTitle
        requiredFields.forEach(field => {
            const input = form.elements[field];
            input.classList.remove('invalid');
            
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            }
        });

        // Additional validation for amount
        const amount = parseFloat(form.elements.amountPaid.value);
        if (isNaN(amount) || amount < 0) {
            form.elements.amountPaid.classList.add('invalid');
            isValid = false;
        }

        // Validate email format
        const email = form.elements.email.value.trim();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            form.elements.email.classList.add('invalid');
            isValid = false;
        }

        if (!isValid) {
            showFeedback(false, "Please fill all required fields correctly");
            return;
        }

        // Prepare data with proper types
        const formData = {
            name: form.elements.name.value.trim(),
            paperId: form.elements.paperId.value.trim(),
            paperTitle: form.elements.paperTitle.value.trim(), // Now required
            institution: form.elements.institution.value.trim(),
            phone: form.elements.phone.value.trim(),
            email: email,
            amountPaid: amount,
            feeType: form.elements.feeType.value.trim(),
            transactionId: form.elements.transactionId.value.trim(),
            date: new Date(form.elements.date.value).toISOString(),
            journalName: form.elements.journalName?.value?.trim() || ""
        };

        // API call with error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${API_BASE_URL}/api/registrations/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }

        showFeedback(true, "Registration successful! Confirmation email sent");
        form.reset();

    } catch (error) {
        console.error("Registration Error:", error);
        showFeedback(false, error.name === "AbortError" 
            ? "Request timed out. Please try again." 
            : error.message
        );
    }
}

async function handleContactSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim() || "",
        message: form.elements.message.value.trim()
    };

    if (!formData.name || !formData.email || !formData.message) {
        showFeedback(false, "Name, Email and Message are required");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || "Message submission failed");
        }

        showFeedback(true, "Message sent successfully!");
        form.reset();
    } catch (error) {
        console.error("Contact Error:", error);
        showFeedback(false, error.message || "Failed to send message");
    }
}

async function handlePaperSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        form.querySelector('button').disabled = true;
        const response = await fetch(`${API_BASE_URL}/submit/papersubmit`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || "Paper submission failed");
        }

        showFeedback(true, "Paper submitted successfully!");
        form.reset();
    } catch (error) {
        console.error("Paper Submission Error:", error);
        showFeedback(false, error.message);
    } finally {
        form.querySelector('button').disabled = false;
    }
}

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

    const startAutoSlide = () => autoSlideInterval = setInterval(() => updateSlide(index + 1), 5000);
    
    window.nextSlide = () => {
        updateSlide(index + 1);
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    window.prevSlide = () => {
        updateSlide(index - 1);
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

window.onload = () => {
    document.querySelector(".container img")?.classList.add("zoom");
};