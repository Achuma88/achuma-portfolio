/* =========================
   NAVBAR SHADOW
========================= */
window.addEventListener("scroll", () => {
    document.querySelector("nav")
        .classList.toggle("shadow", window.scrollY > 50);
});

/* =========================
   IMAGE SLIDER LOGIC
========================= */
document.querySelectorAll(".image-slider").forEach((slider) => {
    const images = slider.querySelectorAll("img");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    let currentIndex = 0;
    let autoSlide;

    /* ---------- CREATE DOTS ---------- */
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("slider-dots");

    images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    slider.appendChild(dotsContainer);
    const dots = dotsContainer.querySelectorAll("span");

    /* ---------- SHOW SLIDE ---------- */
    function showSlide(index) {
        images.forEach(img => img.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        currentIndex = (index + images.length) % images.length;
        images[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    /* ---------- BUTTON EVENTS ---------- */
    prevBtn.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    });

    /* ---------- AUTO SLIDE ---------- */
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    /* ---------- SWIPE SUPPORT ---------- */
    let startX = 0;

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (diff > 50) showSlide(currentIndex + 1);
        if (diff < -50) showSlide(currentIndex - 1);

        resetAutoSlide();
    });

    /* ---------- FULLSCREEN PREVIEW ---------- */
    images.forEach(img => {
        img.addEventListener("click", () => openFullscreen(img.src));
    });

    /* ---------- INIT ---------- */
    showSlide(0);
    startAutoSlide();
});

/* =========================
   FULLSCREEN OVERLAY
========================= */
const overlay = document.createElement("div");
overlay.className = "fullscreen-overlay";
overlay.innerHTML = `<img />`;
document.body.appendChild(overlay);

function openFullscreen(src) {
    overlay.style.display = "flex";
    overlay.querySelector("img").src = src;
}

overlay.addEventListener("click", () => {
    overlay.style.display = "none";
});

console.log("Portfolio sliders loaded ✔");

/* =========================
   HEADER TEXT ROTATION
========================= */
const roles = [
    "Software Developer",
    "Data Analyst"
];

const dynamicText = document.querySelector(".dynamic-text");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        dynamicText.textContent = currentRole.slice(0, charIndex++);
        if (charIndex > currentRole.length) {
            setTimeout(() => isDeleting = true, 1200);
        }
    } else {
        dynamicText.textContent = currentRole.slice(0, charIndex--);
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
}

setInterval(typeEffect, 120);
/* =========================
   HEADER ROLE ANIMATION
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const roles = [
        "Software Developer",
        "Data Analyst"
    ];

    const roleElement = document.querySelector(".dynamic-role");
    let index = 0;

    setInterval(() => {
        index = (index + 1) % roles.length;
        roleElement.textContent = roles[index];
    }, 3000);
});
