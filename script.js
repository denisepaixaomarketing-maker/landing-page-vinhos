const header = document.querySelector("[data-header]");
const floatingCta = document.querySelector("[data-floating]");
const progress = document.querySelector(".scroll-progress");
const revealItems = document.querySelectorAll("[data-reveal]");
const splitItems = document.querySelectorAll("[data-split]");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const form = document.querySelector(".lead-form");
const formNote = document.querySelector("[data-form-note]");

document.documentElement.classList.add("motion-ready");

splitItems.forEach((item) => {
  const words = item.textContent.trim().split(/\s+/);
  item.textContent = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.style.setProperty("--delay", `${index * 42}ms`);
    item.append(span, document.createTextNode(" "));
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.dataset.delay;

      if (delay) {
        entry.target.style.setProperty("--delay", `${delay}ms`);
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

[...revealItems, ...splitItems].forEach((item) => revealObserver.observe(item));

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressWidth = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  progress.style.width = `${progressWidth}%`;
  header.classList.toggle("is-scrolled", scrollY > 36);
  floatingCta.classList.toggle("is-visible", scrollY > window.innerHeight * 0.55);

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0);
    const rect = item.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const itemCenter = rect.top + rect.height / 2;
    const offset = (itemCenter - viewportCenter) * speed;

    item.style.transform = `translate3d(0, ${offset}px, 0) scale(1.03)`;
  });
}

let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      updateScrollEffects();
      ticking = false;
    });

    ticking = true;
  },
  { passive: true }
);

window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const phone = data.get("phone");
  const spots = data.get("spots");
  const message = `Olá, meu nome é ${name}. Tenho interesse em reservar ${spots} vaga(s) para a Vinha Noite. Meu WhatsApp: ${phone}.`;
  const encodedMessage = encodeURIComponent(message);

  formNote.textContent = "Abrindo mensagem para confirmar sua reserva...";
  window.open(`https://wa.me/?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
});
