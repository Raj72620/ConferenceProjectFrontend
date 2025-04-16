// ✅ Centralized API Utility
const API_BASE_URL = "https://conferenceproject-backend.onrender.com";

async function apiPost(endpoint, data, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Request failed");
        return result;

    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// ✅ Helper Functions
function showFeedback(success, message) {
    const feedbackElement = document.getElementById("feedback-message");
    feedbackElement.textContent = message;
    feedbackElement.style.color = success ? "green" : "red";
    feedbackElement.style.display = "block";
}

function clearValidationErrors() {
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        input.style.borderColor = "";
        const error = document.getElementById(`${input.id}-error`);
        if (error) error.remove();
    });
}

function showFieldError(input, message) {
    input.style.borderColor = "red";
    let errorElement = document.getElementById(`${input.id}-error`);
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.id = `${input.id}-error`;
        errorElement.style.color = "red";
        errorElement.style.fontSize = "12px";
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// ✅ Registration Form Submission Handler
async function handleRegistrationSubmission(event) {
    event.preventDefault();
    const form = event.target;

    try {
        clearValidationErrors();
        let isValid = true;

        const requiredFields = [
            'name', 'paperId', 'institution', 'phone', 'email',
            'amountPaid', 'feeType', 'transactionId', 'date'
        ];

        requiredFields.forEach(field => {
            const input = form.elements[field];
            if (!input.value.trim()) {
                showFieldError(input, `${input.placeholder} is required`);
                isValid = false;
            }
        });

        const amount = parseFloat(form.elements.amountPaid.value);
        if (isNaN(amount) || amount < 0) {
            showFieldError(form.elements.amountPaid, "Invalid amount value");
            isValid = false;
        }

        const email = form.elements.email.value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showFieldError(form.elements.email, "Invalid email format");
            isValid = false;
        }

        if (!isValid) {
            showFeedback(false, "Please fix the highlighted errors");
            return;
        }

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

        await apiPost("/api/registrations/register", formData);
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

// ✅ Contact Form Submission Handler
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

        if (!formData.name || !formData.email || !formData.message) {
            showFeedback(false, "Name, Email and Message are required");
            return;
        }

        await apiPost("/api/contact", formData);
        showFeedback(true, "Message sent successfully! We'll contact you soon");
        form.reset();

    } catch (error) {
        console.error("Contact Error:", error);
        showFeedback(false, error.message);
    }
}

// ✅ Animations
document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.querySelector(".hero-text");
    const conferenceDetails = document.querySelector(".conference-details");
    const registrationForm = document.querySelector(".registration-form");

    setTimeout(() => heroText.classList.add("show"), 500);
    setTimeout(() => conferenceDetails.classList.add("show"), 1000);
    setTimeout(() => registrationForm.classList.add("show"), 1500);
});

// ✅ Event Listeners
document.getElementById("registration-form").addEventListener("submit", handleRegistrationSubmission);
document.getElementById("contact-form").addEventListener("submit", handleContactSubmission);
