// =============================
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
// LOADER
// =============================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const video = loader.querySelector("video");

  const hideLoader = () => {
    loader.classList.add("fade-out");
    loader.addEventListener("animationend", () => loader.remove());
  };

  if (video) {
    // Hide loader after video ends
    video.addEventListener("ended", hideLoader);

    // Fallback: hide loader after 3 sec if video doesn't end
    setTimeout(hideLoader, 2000);
  } else {
    // If no video, just fade out after 1 sec
    setTimeout(hideLoader, 1000);
  }
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


// faqs 
// FAQ Toggle
// FAQ toggle
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});


// Contact form submit (demo only)
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert(' Thank you! Your message has been sent. ✅');
  e.target.reset();
});



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
if (document.getElementById("contact-form")) {
  (document.getElementById("contact-form")).addEventListener("submit", (e) => {
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
    (document.getElementById("contact-form")).reset();
  });
}

// =============================
// COUNTDOWN (events page)
// =============================
// Set target to CODE~ZIA Day 1 start (example): 27 Sep 2025 09:00 IST
function updateCountdown() {
  const now = new Date();
  const eventDate = new Date('2025-09-15T12:30:00'); // Example event date
  const diff = eventDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').innerText = days.toString().padStart(2,'0');
  document.getElementById('hours').innerText = hours.toString().padStart(2,'0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2,'0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2,'0');

  // Add bounce effect
  ['days','hours','minutes','seconds'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('bounce');
    void el.offsetWidth; // trigger reflow
    el.classList.add('bounce');
  });
}

setInterval(updateCountdown, 1000);

