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

/* =========================
   SCROLL ANIMATION (AUTO)
========================= */

// target your EXISTING sections (no class changes)
const elementsToAnimate = document.querySelectorAll(
  ".hero-section, #about, #skills, #projects, #certifications, #career-interests, .footer-contact"
);

// add animation class automatically
elementsToAnimate.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

// observe all elements
elementsToAnimate.forEach(el => observer.observe(el));

/* STAGGER CARD ANIMATION */
const cards = document.querySelectorAll(".project-card");

cards.forEach((card, index) => {
  card.classList.add("reveal");
  card.style.transitionDelay = `${index * 0.15}s`;
  observer.observe(card);
});

document.querySelectorAll(".skills li").forEach((item, i) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(item);
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".custom-navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const topBtn = document.getElementById("topBtn");

  if (!topBtn) return; // safety check

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      topBtn.style.display = "flex";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});
/* =========================
   AI CHATBOT
========================= */

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

/* OPEN/CLOSE CHAT */
chatToggle.addEventListener("click", () => {
  chatWindow.style.display = "flex";
});

closeChat.addEventListener("click", () => {
  chatWindow.style.display = "none";
});

/* SEND MESSAGE */
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {

  const message = userInput.value.trim();

  if (message === "") return;

  addMessage(message, "user");

  userInput.value = "";

  setTimeout(() => {
    botReply(message);
  }, 500);
}

/* ADD MESSAGE TO CHAT */
function addMessage(text, sender) {

  const msg = document.createElement("div");

  msg.classList.add(
    sender === "user"
      ? "user-message"
      : "bot-message"
  );

  msg.innerHTML = text;

  chatBody.appendChild(msg);

  chatBody.scrollTop = chatBody.scrollHeight;
}

/* SIMPLE AI RESPONSES */
function botReply(message) {

  const msg = message.toLowerCase();

  let response = `
    I'm not sure about that yet.<br><br>
    Try asking about:
    <ul>
      <li>skills</li>
      <li>projects</li>
      <li>experience</li>
      <li>contact</li>
      <li>certifications</li>
    </ul>
  `;

  if (msg.includes("skills")) {
    response = `
      Achuma specializes in:
      <ul>
        <li>ASP.NET Core & C#</li>
        <li>SQL Server & Dapper</li>
        <li>Python Data Analysis</li>
        <li>HTML, CSS & JavaScript</li>
      </ul>
    `;
  }

  else if (msg.includes("project"||"projects")) {
    response = `
      Featured projects include:
      <ul>
        <li>Employee Management System</li>
        <li>Portfolio Website</li>
        <li>Sales Data Analysis</li>
      </ul>
    `;
  }
  

  else if (
    msg.includes("contact") ||
    msg.includes("email")
  ) {
    response = `
      📧 Email: nangotilimeni@gmail.com
      <br><br>
      💼 LinkedIn available in the footer section.
    `;
  }

  else if (
    msg.includes("experience") ||
    msg.includes("about")
  ) {
    response = `
      Achuma is a Software Developer focused on backend systems,
      data-driven applications, and scalable web development.
    `;
  }

  else if (
    msg.includes("certificate") ||
    msg.includes("certification")
  ) {
    response = `
      Certifications:
      <ul>
        <li>FNB App Academy</li>
        <li>Cisco Introduction to Cybersecurity</li>
      </ul>
    `;
  }

  addMessage(response, "bot");
}

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

/* OPEN SIDEBAR */
menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
});

/* CLOSE SIDEBAR BUTTON */
closeSidebar.addEventListener("click", () => {
    closeMenu();
});

/* CLICK OUTSIDE SIDEBAR */
sidebarOverlay.addEventListener("click", () => {
    closeMenu();
});

/* CLOSE WHEN LINK CLICKED */
document.querySelectorAll(".sidebar-links a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

/* FUNCTION */
function closeMenu() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
}