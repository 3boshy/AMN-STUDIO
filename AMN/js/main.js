// Mobile menu
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        if (navMenu.classList.contains("is-open")) {
            navMenu.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Glow tracking on tabs
const tabs = document.querySelectorAll(".tab");
for (const tab of tabs) {
    tab.addEventListener("pointermove", (e) => {
        const r = tab.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        tab.style.setProperty("--x", `${x}%`);
    });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                io.unobserve(entry.target);
            }
        }
    }, { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Fake contact submit (placeholder)
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (note) note.textContent = "✅ Received (demo). We can connect this to email/API next.";
        form.reset();
    });
}