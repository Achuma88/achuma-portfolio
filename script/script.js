/* =========================
   NAVBAR SHADOW
========================= */
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (nav) {
        nav.classList.toggle("shadow", window.scrollY > 50);
    }
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
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            showSlide(currentIndex - 1);
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            showSlide(currentIndex + 1);
            resetAutoSlide();
        });
    }

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


/* =========================
   SMOOTH HEADER ROLE FADE
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const roles = [
        "Software Developer",
        "Data Analyst"
    ];

    const roleTexts = document.querySelectorAll(".role-text");

    let index = 0;
    let active = 0;

    setInterval(() => {
        const next = active === 0 ? 1 : 0;

        index = (index + 1) % roles.length;

        roleTexts[next].textContent = roles[index];
        roleTexts[next].classList.add("active");
        roleTexts[active].classList.remove("active");

        active = next;

    }, 2700);
});

console.log("Portfolio loaded successfully ✔");