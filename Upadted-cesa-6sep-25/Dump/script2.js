// =============================

// Loader -  Hide loader with fade-out after page load
 // Hide loader with fade-out after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.getElementById("loader");
      if (loader) {
        loader.classList.add("fade-out");
        // fully remove after animation
        loader.addEventListener("animationend", () => loader.remove());
      }
    }, 0); // 3 sec loader
  });




// PAGE INIT
// =============================
window.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect
  document.body.classList.add("fade-in");
  // Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// =============================
// THEME TOGGLE
// =============================
const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("cesa-theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeBtn) themeBtn.textContent = savedTheme === "light" ? "🌙" : "☀️";
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("cesa-theme", next);
    themeBtn.textContent = next === "light" ? "🌙" : "☀️";
  });
}

// =============================
// MOBILE NAV (events page only)
// =============================
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");
if (hamburger && navlinks) {
  hamburger.addEventListener("click", () => {
    navlinks.classList.toggle("open");
  });
}

// =============================
// SHRINK HEADER ON SCROLL
// =============================
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("shrink");
    else header.classList.remove("shrink");
  });
}

// =============================
// TOAST
// =============================
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return alert(msg);
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add("hidden"), 2200);
}
window.toast = toast;

// =============================
// NEWSLETTER (bind safely on both pages)
// =============================
(function bindNewsletters() {
  const pairs = [
    ["newsletter-index", "subscribe-index"],   // index.html
    ["newsletter-events", "subscribe-events"], // events.html
  ];
  pairs.forEach(([inputId, btnId]) => {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (input && btn) {
      btn.addEventListener("click", () => {
        const email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Enter a valid email");
        toast("Subscribed!");
        input.value = "";
      });
    }
  });
})();

// =============================
// CONTACT FORM (index only)
// =============================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !message) {
      if (status) status.textContent = "Please fill all required fields.";
      return;
    }
    if (status) status.textContent = "Thanks! Your message has been received.";
    contactForm.reset();
  });
}

// =============================
// COUNTDOWN (events page)
// =============================
// Set target to CODE~ZIA Day 1 start (example): 27 Sep 2025 09:00 IST
(function initCountdown() {
  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");
  if (!(d && h && m && s)) return; // only run on events page

  const target = new Date("2025-09-27T09:00:00+05:30").getTime();

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 60 * 60 * 1000;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 60 * 1000;
    const seconds = Math.floor(diff / 1000);

    d.textContent = String(days).padStart(2, "0");
    h.textContent = String(hours).padStart(2, "0");
    m.textContent = String(minutes).padStart(2, "0");
    s.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
})();
