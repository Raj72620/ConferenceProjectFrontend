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




async function handleRegistrationSubmission(event) {
    event.preventDefault();
    const form = event.target;
    
    try {
        // Clear previous errors
        document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

        // Validate required fields
        const requiredFields = ['name', 'paperId', 'institution', 'phone', 'email', 'amountPaid', 'feeType', 'transactionId', 'date'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = form.elements[field];
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            }
        });

        // Additional validations
        const amount = parseFloat(form.elements.amountPaid.value);
        if (isNaN(amount) || amount < 1) {
            form.elements.amountPaid.classList.add('invalid');
            isValid = false;
        }

        if (!/^\d{10}$/.test(form.elements.phone.value.trim())) {
            form.elements.phone.classList.add('invalid');
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value.trim())) {
            form.elements.email.classList.add('invalid');
            isValid = false;
        }

        if (!isValid) {
            showFeedback(false, "Please fix the highlighted errors");
            return;
        }

        // Prepare EXACT data format backend expects
        const formData = {
            full_name: form.elements.name.value.trim(),  // Changed to match backend
            paper_id: form.elements.paperId.value.trim(), // Changed to snake_case
            institution: form.elements.institution.value.trim(),
            contact_number: form.elements.phone.value.trim(), // Changed field name
            email: form.elements.email.value.trim(),
            amount: parseFloat(form.elements.amountPaid.value), // Changed key name
            fee_category: form.elements.feeType.value.trim(), // Changed key name
            transaction_id: form.elements.transactionId.value.trim(), // Snake case
            registration_date: new Date(form.elements.date.value).toISOString() // Changed key
        };

        // Add optional fields if they exist
        if (form.elements.paperTitle?.value?.trim()) {
            formData.paper_title = form.elements.paperTitle.value.trim();
        }
        if (form.elements.journalName?.value?.trim()) {
            formData.journal = form.elements.journalName.value.trim();
        }

        // Debug: Log final payload
        console.log("Final Submission Data:", formData);

        // API call with timeout
        const response = await fetch(`${API_BASE_URL}/api/registrations/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            signal: AbortSignal.timeout(10000)
        });

        const result = await response.json();
        
        if (!response.ok) {
            console.error("Backend Response:", result);
            throw new Error(result.error || result.message || "Registration failed. Please check your data.");
        }

        showFeedback(true, "✅ Registration successful! Confirmation email sent");
        form.reset();

    } catch (error) {
        console.error("Registration Error:", error);
        showFeedback(false, error.name === 'AbortError' 
            ? "⏳ Request timed out. Please try again." 
            : error.message || "❌ Server error. Please try again later."
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