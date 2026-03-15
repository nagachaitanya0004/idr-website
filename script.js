const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#site-menu");
const navLinks = document.querySelectorAll('#site-menu a[href^="#"]');
const sections = document.querySelectorAll("section[id]");
const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

const setMenuState = (open) => {
  menu?.classList.toggle("is-open", open);
  menuButton?.classList.toggle("is-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
};

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

menuButton?.addEventListener("click", () => {
  setMenuState(!menu?.classList.contains("is-open"));
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    setMenuState(false);
  })
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  formNote.textContent = "Thanks for reaching out. This demo form is ready for your email or backend integration.";
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
