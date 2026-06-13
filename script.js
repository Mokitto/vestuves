const topbar = document.querySelector(".topbar");
const revealItems = document.querySelectorAll(".reveal");
const petalField = document.querySelector(".petal-field");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const setTopbarState = () => {
  topbar.classList.toggle("is-scrolled", window.scrollY > 16);
};

window.addEventListener("scroll", setTopbarState, { passive: true });
setTopbarState();

const createPetals = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !petalField) {
    return;
  }

  const fragment = document.createDocumentFragment();
  const petalCount = window.innerWidth < 720 ? 16 : 28;

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    const size = 7 + Math.random() * 11;
    const start = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 24;
    const duration = 12 + Math.random() * 14;
    const delay = Math.random() * -24;
    const rotate = 160 + Math.random() * 360;

    petal.className = "petal";
    petal.style.setProperty("--size", `${size}px`);
    petal.style.setProperty("--x-start", `${start}vw`);
    petal.style.setProperty("--x-end", `${start + drift}vw`);
    petal.style.setProperty("--duration", `${duration}s`);
    petal.style.setProperty("--delay", `${delay}s`);
    petal.style.setProperty("--rotate", `${rotate}deg`);

    fragment.appendChild(petal);
  }

  petalField.appendChild(fragment);
};

createPetals();
