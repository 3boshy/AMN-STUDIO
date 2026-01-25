// ===== Mobile menu =====
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

// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ===== Glow tracking on tabs =====
document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("pointermove", (e) => {
        const r = tab.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        tab.style.setProperty("--x", `${x}%`);
    });
});

// ===== i18n (EN/AR) =====
const dict = {
    en: {
        nav_home: "Home",
        pill: "Software • Cybersecurity • Education",
        hero_title: 'Building <span class="grad">secure digital</span><br>solutions — the right way',
        hero_subtitle: "AMN Studios builds modern software with a cybersecurity-first mindset, and teaches code with real-world best practices.",

        mini_fast_t: "Fast",
        mini_fast_d: "Lightweight and smooth UX",
        mini_secure_t: "Secure",
        mini_secure_d: "Secure-by-design delivery",
        mini_clean_t: "Clean",
        mini_clean_d: "Polished visuals, structured code",

        pixel_welcome: "WELCOME TO AMN…",
        box1: "SECURE UI",
        box2: "CLEAN CODE",
        box3: "FAST BUILD",

        chip_software: "Software",
        chip_cyber: "Cybersecurity",
        chip_edu: "Education",
        chip_secure: "Secure",

        footer: '© <span id="year"></span> AMN Studios. All rights reserved.'
    },
    ar: {
        nav_home: "الرئيسية",
        pill: "برمجة • أمن سيبراني • تعليم",
        hero_title: 'نبني <span class="grad">حلول رقمية آمنة</span><br>بطريقة صحيحة',
        hero_subtitle: "AMN Studios تطوّر برمجيات حديثة بعقلية أمن سيبراني أولاً، وتعلّم البرمجة بأسلوب عملي وبأفضل الممارسات.",

        mini_fast_t: "سريع",
        mini_fast_d: "خفيف وسلاسة بالتجربة",
        mini_secure_t: "آمن",
        mini_secure_d: "أمان مدمج بالتطوير",
        mini_clean_t: "مرتب",
        mini_clean_d: "تصميم نظيف وكود منظم",

        pixel_welcome: "اهلاً بك بـ AMN…",
        box1: "واجهة آمنة",
        box2: "كود نظيف",
        box3: "إنجاز سريع",

        chip_software: "برمجة",
        chip_cyber: "أمن سيبراني",
        chip_edu: "تعليم",
        chip_secure: "آمن",

        footer: '© <span id="year"></span> AMN Studios. جميع الحقوق محفوظة.'
    }
};

let activeLang = "en";

// ===== Pixel typing (welcome + 3 boxes) =====
let pixelTimers = [];

function clearPixelTimers() {
    pixelTimers.forEach((t) => clearTimeout(t));
    pixelTimers = [];
}

function typeInto(el, text, speed = 35) {
    if (!el) return;
    el.textContent = "";
    let i = 0;

    const tick = () => {
        el.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) {
            pixelTimers.push(setTimeout(tick, speed));
        }
    };

    tick();
}

function startPixelTyping() {
    clearPixelTimers();

    // welcome inside big rectangle
    const welcome = document.getElementById("pixelWelcome");
    typeInto(welcome, dict[activeLang].pixel_welcome, activeLang === "ar" ? 45 : 35);

    // 3 boxes
    const boxes = Array.from(document.querySelectorAll("[data-pixel]"));
    const texts = {
        box1: dict[activeLang].box1,
        box2: dict[activeLang].box2,
        box3: dict[activeLang].box3
    };

    boxes.forEach((b) => (b.textContent = ""));

    const delays = [650, 1200, 1750];
    boxes.forEach((b, idx) => {
        const key = b.getAttribute("data-pixel");
        pixelTimers.push(
            setTimeout(() => typeInto(b, texts[key], activeLang === "ar" ? 40 : 28), delays[idx])
        );
    });
}

function applyLang(lang) {
    activeLang = lang;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const langLabel = document.getElementById("langLabel");
    if (langLabel) langLabel.textContent = lang === "ar" ? "EN" : "AR";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const val = dict[lang][key];
        if (val == null) return;

        const allowHtml = ["hero_title", "footer"].includes(key);
        if (allowHtml) el.innerHTML = val;
        else el.textContent = val;
    });

    startPixelTyping();
}

// ===== Language toggle button =====
const langToggle = document.getElementById("langToggle");
if (langToggle) {
    langToggle.addEventListener("click", () => {
        applyLang(activeLang === "en" ? "ar" : "en");
    });
}

// ===== Init =====
applyLang("en");