document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact Bar Loaded!");

    // Toggling Navigation Menu
    function toggleMenu() {
        document.querySelector('.nav-links').classList.toggle('active');
    }

    // Footer Section Animation
    const footerSections = document.querySelectorAll(".footer-section");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2 // Trigger animation when 20% of the element is visible
    };

    const animateFooter = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-footer");
            }
        });
    };

    const footerObserver = new IntersectionObserver(animateFooter, observerOptions);
    footerSections.forEach(section => footerObserver.observe(section));

    // Conference Section Animation
    const conferenceSection = document.querySelector(".conference-section");
    const animateSection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-section");
            }
        });
    };

    const conferenceObserver = new IntersectionObserver(animateSection, observerOptions);
    conferenceObserver.observe(conferenceSection);

    // Contact Bar Visibility
    document.querySelector(".contact-bar").classList.add("show");

    // Navbar Visibility
    document.querySelector(".navbar").classList.add("show");

    // Contact Info Animation on Scroll
    const contactInfo = document.querySelector(".contact-info");
    const contactObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    };

    const animateContact = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactInfo.classList.add("animate-contact");
            } else {
                contactInfo.classList.remove("animate-contact");
            }
        });
    };

    const contactObserver = new IntersectionObserver(animateContact, contactObserverOptions);
    contactObserver.observe(contactInfo);

    // Contact Section Animation
    const contactSection = document.querySelector(".contact-container");
    const animateContactSection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactSection.classList.add("animate-contact");
            } else {
                contactSection.classList.remove("animate-contact");
            }
        });
    };

    const contactSectionObserver = new IntersectionObserver(animateContactSection, observerOptions);
    contactSectionObserver.observe(contactSection);

    // Reveal Elements on Scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll("h1, p, .registration-page, table, .second, h2, .registration-form, .update");
        elements.forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Form Submission for Registration
    const registrationForm = document.querySelector(".registration-form");
    registrationForm.addEventListener("submit", async function (event) {
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
            const response = await fetch("https://conferenceproject-backend.onrender.com/api/registrations/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message || "Registration Successful!");

        } catch (error) {
            console.error("❌ Fetch Error:", error);
            alert("Error registering. Please try again.");
        }
    });

    // Form Submission for Contact Form
    const contactForm = document.querySelector(".contact-form");
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            name: document.querySelector("input[placeholder='Your Name']").value,
            email: document.querySelector("input[placeholder='Your Email']").value,
            phoneNumber: document.querySelector("input[placeholder='Your Phone Number']").value,
            message: document.querySelector("input[placeholder='Your Message']").value,
        };

        console.log("🚀 Form Data to be Sent to contact API:", formData);

        try {
            const response = await fetch("https://conferenceproject-backend.onrender.com/api/contact/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message || "Message Sent Successfully!");

        } catch (error) {
            console.error("❌ Fetch Error:", error);
            alert("Error sending message. Please try again.");
        }
    });

    // Paper Submission Form
    const paperSubmissionForm = document.getElementById("paperSubmissionForm");
    paperSubmissionForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        let formData = new FormData(this); 

        try {
            let response = await fetch("https://conferenceproject-backend.onrender.com/submit/papersubmit", {
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

    // Committee Details Animation
    const committeeItems = document.querySelectorAll(".scientific-committee-box ul li, .member-details");
    const committeeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    committeeItems.forEach(item => committeeObserver.observe(item));

    // Start Auto-slide for Carousel
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-item');
    let index = 0;
    let autoSlideInterval;

    function showSlide(newIndex) {
        if (newIndex >= slides.length) {
            index = 0; 
        } else if (newIndex < 0) {
            index = slides.length - 1; 
        } else {
            index = newIndex;
        }

        wrapper.style.transform = `translateX(-${index * 100}%)`;

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

    // Image Zoom
    const image = document.querySelector(".container img");
    if (image) {
        image.classList.add("zoom");
    }
});
