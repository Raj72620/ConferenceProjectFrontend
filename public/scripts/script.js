document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact Bar Loaded!");
});
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", function () {
    const footerSections = document.querySelectorAll(".footer-section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2 // Trigger animation when 20% of the element is visible
    };

    const animateFooter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-footer");
            }
        });
    };

    const observer = new IntersectionObserver(animateFooter, observerOptions);

    footerSections.forEach(section => observer.observe(section));
});
document.addEventListener("DOMContentLoaded", function () {
    const conferenceSection = document.querySelector(".conference-section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2 // Trigger when 30% of the section is visible
    };

    const animateSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-section");
            }
        });
    };

    const observer = new IntersectionObserver(animateSection, observerOptions);
    observer.observe(conferenceSection);
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".contact-bar").classList.add("show");
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".navbar").classList.add("show");
});
document.addEventListener("DOMContentLoaded", function () {
    const contactInfo = document.querySelector(".contact-info");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3 // Trigger when 30% is visible
    };

    const animateContact = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactInfo.classList.add("animate-contact");
            } else {
                contactInfo.classList.remove("animate-contact"); // Remove for replay on scroll
            }
        });
    };

    const observer = new IntersectionObserver(animateContact, observerOptions);
    observer.observe(contactInfo);
});

// contact
document.addEventListener("DOMContentLoaded", function () {
    const contactSection = document.querySelector(".contact-container");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2 // Triggers when 30% is visible
    };

    const animateContact = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactSection.classList.add("animate-contact");
            } else {
                contactSection.classList.remove("animate-contact"); // Remove for replay on scroll
            }
        });
    };

    const observer = new IntersectionObserver(animateContact, observerOptions);
    observer.observe(contactSection);
});
// gadbad
function revealOnScroll() {
    const elements = document.querySelectorAll("h1, p");
    elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add("show");
        }
    });
}

// Event listener for scroll
window.addEventListener("scroll", revealOnScroll);

// Run once when the page loads
revealOnScroll();
// registration
document.addEventListener("DOMContentLoaded", function () {
    function revealOnScroll() {
        const elements = document.querySelectorAll(".registration-page, p, table, .second, h2, .registration-form");
        elements.forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                el.style.transition = "opacity 1s ease, transform 1s ease";
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run on page load
});
// publicTION
document.addEventListener("DOMContentLoaded", function () {
    function revealOnScroll() {
        const updateElement = document.querySelector(".update");
        if (updateElement.getBoundingClientRect().top < window.innerHeight * 0.85) {
            updateElement.classList.add("show");
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run on page load
});

//     event.preventDefault();

//     const formData = {
//         name: document.querySelector("input[placeholder='Name']").value,
//         paperID: document.querySelector("input[placeholder='Paper ID']").value,
//         paperTitle: document.querySelector("input[placeholder='Paper Title']").value,
//         institution: document.querySelector("input[placeholder='Institution/Organization Name']").value,
//         phone: document.querySelector("input[placeholder='Phone No']").value,
//         email: document.querySelector("input[placeholder='Email']").value,
//         amountPaid: document.querySelector("input[placeholder='Amount Paid']").value,
//         journalName: document.querySelector("input[placeholder='Publication Journal Name']").value,
//         transactionID: document.querySelector("input[placeholder='Transaction ID']").value
//     };

//     try {
//         const response = await fetch("http://localhost:5000/api/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         alert(data.message);  // Show success message
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Registration failed.");
//     }
// });
// app.use(express.json()); // Ensure JSON body parsing is enabled

// app.post("/register", async (req, res) => {
//     try {
//         const { name, paperID, email } = req.body;

//         if (!name || !paperID || !email) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Store in database (MongoDB example)
//         const newRegistration = new RegistrationModel(req.body);
//         await newRegistration.save();

//         res.status(200).json({ message: "Registration successful" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
// document.querySelector(".registration-form").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const formData = {
//         name: document.querySelector("input[placeholder='Name']").value,
//         paperID: document.querySelector("input[placeholder='Paper ID']").value,
//         paperTitle: document.querySelector("input[placeholder='Paper Title']").value,
//         institution: document.querySelector("input[placeholder='Institution/Organization Name']").value,
//         phone: document.querySelector("input[placeholder='Phone No']").value,
//         email: document.querySelector("input[placeholder='Email']").value,
//         amountPaid: document.querySelector("input[placeholder='Amount Paid']").value,
//         journalName: document.querySelector("input[placeholder='Publication Journal Name']").value,
//         transactionID: document.querySelector("input[placeholder='Transaction ID']").value
//     };

//     console.log("Sending Data:", formData); // ✅ Debugging Step

//     try {
//         const response = await fetch("http://localhost:5000/api/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         alert(data.message);
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Registration failed.");
//     }
// });
// document.querySelector(".registration-form").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const formData = {
//         name: document.querySelector("input[placeholder='Name']").value,
//         paperId: document.querySelector("input[placeholder='Paper ID']").value,
//         paperTitle: document.querySelector("input[placeholder='Paper Title']").value,
//         institution: document.querySelector("input[placeholder='Institution/Organization Name']").value,
//         phone: document.querySelector("input[placeholder='Phone No']").value,
//         email: document.querySelector("input[placeholder='Email']").value,
//         amountPaid: document.querySelector("input[placeholder='Amount Paid']").value,
//         journalName: document.querySelector("input[placeholder='Publication Journal Name']").value,
//         feePaid: document.querySelector("input[placeholder='Registration Fee Paid']").value,
//         transactionId: document.querySelector("input[placeholder='Transaction ID']").value,
//         date: document.querySelector("input[type='date']").value
//     };

//     try {
//         const response = await fetch("/api/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });

//         const result = await response.json();
//         alert(result.message || "Registration Successful!");

//     } catch (error) {
//         alert("Error registering. Please try again.");
//     }
// });

// document.querySelector(".registration-form").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const formData = {
//         name: document.querySelector("input[placeholder='Name']").value,
//         paperId: document.querySelector("input[placeholder='Paper ID']").value,
//         paperTitle: document.querySelector("input[placeholder='Paper Title']").value,
//         institution: document.querySelector("input[placeholder='Institution/Organization Name']").value,
//         phone: document.querySelector("input[placeholder='Phone No']").value,
//         email: document.querySelector("input[placeholder='Email']").value,
//         amountPaid: document.querySelector("input[placeholder='Amount Paid']").value,
//         journalName: document.querySelector("input[placeholder='Publication Journal Name']").value,
//         feePaid: document.querySelector("input[placeholder='Registration Fee Paid']").value,
//         transactionId: document.querySelector("input[placeholder='Transaction ID']").value,
//         date: document.querySelector("input[type='date']").value
//     };
//     console.log(formData);
//     try {
//         const response = await fetch("http://localhost:5000/api/registrations/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });

//         const result = await response.json();
//         alert(result.message || "Registration Successful!");

//     } catch (error) {
//         alert("Error registering. Please try again.");
//     }
// });
// document.querySelector(".registration-form").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const formData = {
//         name: document.querySelector("input[placeholder='Name']").value,
//         paperId: document.querySelector("input[placeholder='Paper ID']").value,
//         paperTitle: document.querySelector("input[placeholder='Paper Title']").value,
//         institution: document.querySelector("input[placeholder='Institution/Organization Name']").value,
//         phone: document.querySelector("input[placeholder='Phone No']").value,
//         email: document.querySelector("input[placeholder='Email']").value,
//         amountPaid: document.querySelector("input[placeholder='Amount Paid']").value,
//         journalName: document.querySelector("input[placeholder='Publication Journal Name']").value,
//         feePaid: document.querySelector("input[placeholder='Registration Fee Paid']").value,
//         transactionId: document.querySelector("input[placeholder='Transaction ID']").value,
//         date: document.querySelector("input[type='date']").value
//     };

//     console.log("🚀 Form Data to be Sent:", formData);

//     try {
//         const response = await fetch("http://localhost:5000/api/registrations/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });

//         console.log("🚀 Fetch Response:", response);

//         const result = await response.json();
//         alert(result.message || "Registration Successful!");

//     } catch (error) {
//         console.error("❌ Fetch Error:", error);
//         alert("Error registering. Please try again.");
//     }
// });
// document.querySelector(".contact-form").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const formData = {
//         name: document.querySelector("input[placeholder='Your Name']").value,
//         email: document.querySelector("input[placeholder='Your Email']").value,
//         phoneNumber: document.querySelector("input[placeholder='Your Phone Number']").value,
//         message: document.querySelector("input[placeholder='our Message']").value,
//     };

//     console.log("🚀 Form Data to be Sent to contactacter:", formData);

//     try {
//         const response = await fetch("http://localhost:5000/api/contact/contact", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });

//         console.log("🚀 Fetch Response:", response);

//         const result = await response.json();
//         alert(result.message || "Registration Successful!");

//     } catch (error) {
//         console.error("❌ Fetch Error:", error);
//         alert("Error registering. Please try again.");
//     }
// });
// document.getElementById("paperSubmissionForm").addEventListener("submit", async function(event) {
//     event.preventDefault(); // Prevent page refresh

//     let formData = new FormData(this); // Collect form data

//     try {
//         let response = await fetch("http://localhost:5000/submit/papersubmit", { // Change URL if needed
//             method: "POST",
//             body: formData
//         });

//         let result = await response.json();

//         if (response.ok) {
//             alert("Form submitted successfully!");
//             console.log("Response:", result);
//         } else {
//             alert("Error submitting form: " + result.error);
//         }
//     } catch (error) {
//         console.error("Submission failed:", error);
//         alert("Submission failed! Please try again.");
//     }
// });



const API_BASE_URL = window.location.hostname.includes("localhost")
    ? "http://localhost:5000"  // Development Mode
    : "https://conference-project-ejcd.onrender.com"; // Production Mode

document.querySelector(".registration-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector("input[placeholder='Name']").value,
        paperId: document.querySelector("input[placeholder='Paper ID']").value,
        paperTitle: document.querySelector("input[placeholder='Paper Title']").value,
        institution: document.querySelector("input[placeholder='Institution/Organization Name']").value,
        phone: document.querySelector("input[placeholder='Phone No']").value,
        email: document.querySelector("input[placeholder='Email']").value,
        amountPaid: document.querySelector("input[placeholder='Amount Paid']").value,
        journalName: document.querySelector("input[placeholder='Publication Journal Name']").value,
        feePaid: document.querySelector("input[placeholder='Registration Fee Paid']").value,
        transactionId: document.querySelector("input[placeholder='Transaction ID']").value,
        date: document.querySelector("input[type='date']").value
    };

    console.log("🚀 Form Data to be Sent:", formData);

    try {
        const response = await fetch(`${API_BASE_URL}/api/registrations/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        console.log("🚀 Fetch Response:", response);

        const result = await response.json();
        alert(result.message || "Registration Successful!");

    } catch (error) {
        console.error("❌ Fetch Error:", error);
        alert("Error registering. Please try again.");
    }
});

document.querySelector(".contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector("input[placeholder='Your Name']").value,
        email: document.querySelector("input[placeholder='Your Email']").value,
        phoneNumber: document.querySelector("input[placeholder='Your Phone Number']").value,
        message: document.querySelector("input[placeholder='Your Message']").value,
    };

    console.log("🚀 Form Data to be Sent to contact API:", formData);

    try {
        const response = await fetch(`${API_BASE_URL}/api/contact/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        console.log("🚀 Fetch Response:", response);

        const result = await response.json();
        alert(result.message || "Message Sent Successfully!");

    } catch (error) {
        console.error("❌ Fetch Error:", error);
        alert("Error sending message. Please try again.");
    }
});
document.getElementById("paperSubmissionForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page refresh

    let formData = new FormData(this); // Collect form data

    try {
        let response = await fetch(`${API_BASE_URL}/submit/papersubmit`, { // Change URL if needed
            method: "POST",
            body: formData
        });

        let result = await response.json();

        if (response.ok) {
            alert("Form submitted successfully!");
            console.log("Response:", result);
        } else {
            alert("Error submitting form: " + result.error);
        }
    } catch (error) {
        console.error("Submission failed:", error);
        alert("Submission failed! Please try again.");
    }
});

// comitee
document.addEventListener("DOMContentLoaded", function () {
    const details = document.querySelectorAll(".scientific-members h3, .scientific-members p");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.5 });

    details.forEach(detail => observer.observe(detail));
});
document.addEventListener("DOMContentLoaded", function () {
    const details = document.querySelectorAll(".scientific-members h3, .scientific-members p");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });  // Reduced threshold for better triggering

    details.forEach(detail => observer.observe(detail));
});
document.addEventListener("DOMContentLoaded", function () {
    const details = document.querySelectorAll(".member-details");

    if (details.length === 0) {
        console.error("No member-details found! Check HTML class names.");
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });  // Adjusted threshold for better triggering

    details.forEach(detail => observer.observe(detail));
});
document.addEventListener("DOMContentLoaded", function () {
    const committeeBox = document.querySelector(".scientific-committee-box");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                committeeBox.classList.add("show");
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% is visible

    observer.observe(committeeBox);
});
document.addEventListener("DOMContentLoaded", function () {
    const details = document.querySelectorAll(".member-details");

    // ✅ REMOVE INTERSECTION OBSERVER SO DETAILS SHOW IMMEDIATELY
    details.forEach(detail => detail.classList.add("show"));
});
document.addEventListener("DOMContentLoaded", function () {
    const details = document.querySelectorAll(".member-details");

    if (details.length === 0) {
        console.error("No member-details found! Check HTML class names.");
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    details.forEach(detail => observer.observe(detail));
});
document.addEventListener("DOMContentLoaded", function () {
    const details = document.querySelectorAll(".member-details");
    const committeeItems = document.querySelectorAll(".scientific-committee-box ul li");

    if (details.length === 0) {
        console.error("No member-details found! Check HTML class names.");
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    details.forEach(detail => observer.observe(detail));
    committeeItems.forEach(item => observer.observe(item));

    // ✅ Force Apply Animation Speed on Load
    setTimeout(() => {
        committeeItems.forEach(item => item.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out");
    }, 100);
});
window.onload = function() {
    const image = document.querySelector(".container img");
    if (image) {
        image.classList.add("zoom");
    }
};
const wrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-item');
let index = 0;
let autoSlideInterval;

function showSlide(newIndex) {
    if (newIndex >= slides.length) {
        index = 0; // Loop back to first slide
    } else if (newIndex < 0) {
        index = slides.length - 1; // Loop to last slide
    } else {
        index = newIndex;
    }

    wrapper.style.transform = `translateX(-${index * 100}%)`;

    // Remove active class from all, add to current
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

// Manual Controls
function nextSlide() { 
    showSlide(index + 1); 
    resetAutoSlide();
}

function prevSlide() { 
    showSlide(index - 1); 
    resetAutoSlide();
}

// Auto-slide every 3s
function startAutoSlide() {
    autoSlideInterval = setInterval(() => showSlide(index + 1), 3000);
}

// Restart auto-slide on manual action
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto-slide on page load
startAutoSlide();