// script2.js - ANIMATIONS ONLY
document.addEventListener("DOMContentLoaded", function () {
    // 1. Animate Footer Sections
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("animate-footer");
        });
    }, { threshold: 0.2 });
    document.querySelectorAll(".footer-section").forEach(el => footerObserver.observe(el));

    // 2. Animate Conference Section
    const conferenceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("animate-section");
        });
    }, { threshold: 0.3 });
    document.querySelector(".conference-section") && conferenceObserver.observe(document.querySelector(".conference-section"));

    // 3. Animate Committee Members
    const committeeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.3 });
    document.querySelectorAll(".member-details, .scientific-committee-box ul li").forEach(el => committeeObserver.observe(el));

    // 4. Show Contact Bar
    document.querySelector(".contact-bar")?.classList.add("show");
    
    // 5. Show Navbar
    document.querySelector(".navbar")?.classList.add("show");
    
    // 6. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
});