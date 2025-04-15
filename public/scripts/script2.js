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
        threshold: 0.3 // Trigger when 30% of the section is visible
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const scopeSection = document.getElementById("scope");
    const leftElements = document.querySelectorAll(".left-track");
    const rightElements = document.querySelectorAll(".right-track");

    function checkScroll() {
        const rect = scopeSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            scopeSection.classList.add("show");
            leftElements.forEach(el => el.classList.add("show"));
            rightElements.forEach(el => el.classList.add("show"));
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run once on page load
});
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