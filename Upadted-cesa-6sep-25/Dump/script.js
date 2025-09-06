// =============================
// PAGE INIT
// =============================
window.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect
  document.body.classList.add("fade-in");
  // Footer Year
  document.getElementById("year").textContent = new Date().getFullYear();
});

// =============================
// THEME TOGGLE
// =============================
const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("cesa-theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeBtn.textContent = savedTheme === "light" ? "🌙" : "☀️";
}
themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("cesa-theme", next);
  themeBtn.textContent = next === "light" ? "🌙" : "☀️";
});

// =============================
// MOBILE NAV
// =============================
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");
hamburger.addEventListener("click", () => {
  navlinks.classList.toggle("open");
});

// =============================
// SHRINK HEADER ON SCROLL
// =============================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header.classList.add("shrink");
  else header.classList.remove("shrink");
});

// =============================
// TOAST
// =============================
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add("hidden"), 2200);
}
window.toast = toast;

// =============================
// NEWSLETTER
// =============================
document.getElementById("subscribe").addEventListener("click", () => {
  const email = document.getElementById("newsletter").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Enter a valid email");
  toast("Subscribed!");
});

// =============================
// CONTACT FORM
// =============================
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message)
    return (document.getElementById("formStatus").textContent =
      "Please fill all required fields.");
  document.getElementById("formStatus").textContent =
    "Thanks! Your message has been received.";
  e.target.reset();
});
