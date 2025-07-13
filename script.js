/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu")
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/*=============== ACCORDION SKILLS ===============*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header")

function toggleSkills() {
  const itemClass = this.parentNode.className
  let i // Declare the variable i

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close"
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open"
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills)
})

/*=============== QUALIFICATION TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]")

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active")
    })
    target.classList.add("qualification__active")

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active")
    })
    tab.classList.add("qualification__active")
  })
})

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".projects__modal"),
  modalBtns = document.querySelectorAll(".projects__button"),
  modalCloses = document.querySelectorAll(".projects__modal-close")

const modal = (modalClick) => {
  modalViews[modalClick].classList.add("active-modal")
}

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i)
  })
})

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal")
    })
  })
})

/* Import Swiper from 'swiper/bundle'; */
/* Import ScrollReveal from 'scrollreveal'; */

/*=============== PORTFOLIO SWIPER  ===============*/
const swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
})

/*=============== TESTIMONIAL SWIPER  ===============*/
const swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id") // Declare the variable sectionId

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const nav = document.getElementById("header")
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header")
  else nav.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
  else scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "uil-sun"

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light")
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun")

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme)
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
  themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme())
    localStorage.setItem("selected-icon", getCurrentIcon())
  })
}

/*=============== CONTACT FORM ===============*/
const contactForm = document.querySelector(".contact__form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ejemplo, usando fetch() para enviar a un servidor

    // Simulación de envío exitoso
    alert("¡Mensaje enviado exitosamente! Te contactaré pronto.")
    contactForm.reset()
  })
}

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

/*=============== TYPING ANIMATION ===============*/
const texts = ["Desarrolladora Web Frontend", "Estudiante de APSTI", "Diseñadora UI/UX"]
let count = 0
let index = 0
let currentText = ""
let letter = ""

function type() {
  if (count === texts.length) {
    count = 0
  }
  currentText = texts[count]
  letter = currentText.slice(0, ++index)

  const heroSubtitle = document.querySelector(".hero__subtitle")
  if (heroSubtitle) {
    heroSubtitle.textContent = letter
  }

  if (letter.length === currentText.length) {
    count++
    index = 0
    setTimeout(type, 2000)
  } else {
    setTimeout(type, 100)
  }
}

// Iniciar la animación de escritura cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000)
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const ScrollReveal = window.ScrollReveal // Declare the variable ScrollReveal
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  reset: true,
})

// Solo ejecutar si ScrollReveal está disponible
if (typeof ScrollReveal !== "undefined") {
  sr.reveal(".hero__data, .about__img, .skills__subtitle, .skills__text", {})
  sr.reveal(".hero__img, .about__data, .skills__content, .projects__content, .contact__content", { delay: 400 })
  sr.reveal(".hero__social, .about__info, .contact__info", { delay: 600, interval: 200 })
}
