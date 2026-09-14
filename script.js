// ==========================================================
// MOBILE NAV TOGGLE & HEADER SCROLL EFFECT
// ==========================================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const siteHeader = document.querySelector(".site-header");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close mobile menu on click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Add subtle box-shadow to header when page scrolls down
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
});

// ==========================================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// ==========================================================
const revealTargets = document.querySelectorAll(
  "section, .project-card, .feature-card, .edu-item, .toolkit-group"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach((el) => revealObserver.observe(el));

// ==========================================================
// NUMBER COUNTER ANIMATION FOR HERO STATS
// ==========================================================
const statElements = document.querySelectorAll(".stat .value");

const countUp = (el) => {
  const rawText = el.innerText.trim();
  const hasPercent = rawText.includes("%");
  const target = parseFloat(rawText);
  if (isNaN(target)) return;

  let current = 0;
  const duration = 1200;
  const stepTime = 20;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.innerText = `${target}${hasPercent ? "%" : ""}`;
      clearInterval(timer);
    } else {
      el.innerText = `${Math.floor(current)}${hasPercent ? "%" : ""}`;
    }
  }, stepTime);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statElements.forEach((el) => countUp(el));
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);

// ==========================================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================================
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// ==========================================================
// DYNAMIC PRICING AGENT — INTERACTIVE DEMO
// ==========================================================
const marginRange = document.getElementById("marginRange");
const marginValue = document.getElementById("marginValue");
const runCheckBtn = document.getElementById("runCheck");
const demoResult = document.getElementById("demoResult");
const humanActions = document.getElementById("humanActions");
const approveBtn = document.getElementById("approveBtn");
const holdBtn = document.getElementById("holdBtn");

const flowSteps = document.querySelectorAll(".flow-step[data-step]");
const branchAuto = document.querySelector('[data-branch="auto"]');
const branchReview = document.querySelector('[data-branch="review"]');

marginRange.addEventListener("input", () => {
  marginValue.textContent = `${marginRange.value}%`;
});

function resetFlow() {
  flowSteps.forEach((s) => s.classList.remove("active"));
  branchAuto.classList.remove("active");
  branchReview.classList.remove("active", "resolved-approve", "resolved-hold");
  humanActions.classList.remove("show");
  demoResult.textContent = "";
}

function runCheck() {
  resetFlow();
  runCheckBtn.disabled = true;

  const margin = parseInt(marginRange.value, 10);
  const delays = [0, 450, 900];

  flowSteps.forEach((step, i) => {
    setTimeout(() => step.classList.add("active"), delays[i]);
  });

  setTimeout(() => {
    if (margin >= 20) {
      branchAuto.classList.add("active");
      demoResult.textContent =
        `Margin holds at ${margin}% — the new price is applied automatically.`;
    } else {
      branchReview.classList.add("active");
      humanActions.classList.add("show");
      demoResult.textContent =
        `Margin would drop to ${margin}%, below the 20% floor — waiting on human approval.`;
    }
    runCheckBtn.disabled = false;
  }, 1300);
}

runCheckBtn.addEventListener("click", runCheck);

approveBtn.addEventListener("click", () => {
  branchReview.classList.add("resolved-approve");
  humanActions.classList.remove("show");
  demoResult.textContent = "Approved — the new price has been applied.";
});

holdBtn.addEventListener("click", () => {
  branchReview.classList.add("resolved-hold");
  humanActions.classList.remove("show");
  demoResult.textContent = "Held — the price stays where it is.";
});

// ==========================================================
// CONTACT FORM
// ==========================================================
// The form is submitted directly to FormSubmit using the
// action and method attributes in index.html.
// No JavaScript submit handler is needed here, so no mail app opens.

