const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    navToggle.setAttribute("aria-expanded", "true");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

const navLink = document.querySelectorAll(".nav__link");
navLink.forEach(n => n.addEventListener("click", () => {
  navMenu.classList.remove("show-menu");
  navToggle.setAttribute("aria-expanded", "false");
}));

const skillsContent = document.getElementsByClassName("skills__content"),
      skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  const item = this.parentNode;
  const isClosed = item.className.includes("skills__close");
  for (const content of skillsContent) {
    content.className = "skills__content skills__close";
    content.querySelector(".skills__header")?.setAttribute("aria-expanded", "false");
  }
  if (isClosed) {
    item.className = "skills__content skills__open";
    this.setAttribute("aria-expanded", "true");
  }
}

skillsHeader.forEach(el => el.addEventListener("click", toggleSkills));

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute("id");
    const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

if (themeButton) {
  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](iconTheme);
  }

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    themeButton.classList.toggle("fa-moon");
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

const contactForm = document.querySelector(".contact__form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        alert("¡Mensaje enviado exitosamente!");
        contactForm.reset();
      } else {
        alert("Error al enviar el mensaje.");
      }
    } catch (error) {
      alert("Error de conexión.");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const texts = ["Desarrollador Web Frontend", "Estudiante de APSTI", "Diseñador UI/UX"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  const heroSubtitle = document.querySelector(".hero__subtitle");
  if (heroSubtitle) heroSubtitle.textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000);
  } else {
    setTimeout(type, 100);
  }
}

const heroSubtitle = document.querySelector(".hero__subtitle");
if (heroSubtitle) {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        setTimeout(type, 1000);
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(heroSubtitle);
}

if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
    reset: true,
  });
  sr.reveal(".hero__data, .about__img, .skills__subtitle, .skills__text", {});
  sr.reveal(".hero__img, .about__data, .skills__content, .projects__content, .contact__content", { delay: 400 });
  sr.reveal(".hero__social, .about__info, .contact__info", { delay: 600, interval: 200 });
}