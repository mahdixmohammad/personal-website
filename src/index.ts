require("./index.scss");
require("./particles.js");
require("./Mahdi-Mohammad-Resume.pdf");

const header: HTMLElement = document.querySelector("header")!;
const hamburger: HTMLButtonElement =
  document.querySelector<HTMLButtonElement>("#hamburger")!;
const heroImage: HTMLImageElement | null =
  document.querySelector<HTMLImageElement>("#mahdi");
const navlinks: NodeListOf<HTMLElement> =
  document.querySelectorAll("nav a, #contactbtn");
const reveals: NodeListOf<HTMLElement> = document.querySelectorAll(".popin");
const progressBars: NodeListOf<HTMLElement> =
  document.querySelectorAll(".progress");

// Enables dropdown menu with nav links when hamburger is clicked (small screen sizes only).
hamburger.onclick = (): void => {
  const isActive: boolean = header.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", String(isActive));
};

// Remove active nav when user clicks nav link.
navlinks.forEach((navlink: HTMLElement): void => {
  navlink.onclick = (): void => {
    header.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  };
});

// Remove the hero image from the DOM if it fails to load.
if (heroImage) {
  heroImage.onerror = (): void => {
    heroImage.onerror = null;
    heroImage.remove();
  };
}

// Loads the width of all the progress bars in skills section automatically.
progressBars.forEach((progressBar: HTMLElement): void => {
  progressBar.querySelector("div")!.style.width = `${progressBar.textContent}`;
});

// Scroll-driven pop-in animation. Elements fade and scale up as they enter view.
const prefersReducedMotion: boolean = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (reveals.length > 0 && !prefersReducedMotion) {
  let rafId: number = 0;

  const updateReveals = (): void => {
    rafId = 0;
    const viewportHeight: number = window.innerHeight;

    reveals.forEach((element: HTMLElement): void => {
      let elementVisible: number = element.clientHeight * 0.09;
      if (elementVisible < 30) elementVisible = 30;
      else if (elementVisible > 60) elementVisible = 60;
      if (element.classList.contains("project")) elementVisible = 20;

      const elementTop: number = element.getBoundingClientRect().top;
      const distanceFromView: number = Math.max(
        0,
        viewportHeight - elementTop - elementVisible,
      );
      const opacity: number = (distanceFromView / elementVisible) * 0.4 - 1;
      let scale: number = (distanceFromView / elementVisible) * 0.1 + 0.25;

      if (scale >= 1) {
        scale = 1;
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
      element.style.opacity = `${opacity}`;
      element.style.transform = `scale(${scale})`;
    });
  };

  const scheduleUpdate = (): void => {
    if (rafId) return;
    rafId = requestAnimationFrame(updateReveals);
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });

  // Initial pass to handle page-load state (no scroll event has fired yet).
  updateReveals();
} else {
  // Reduced motion: render everything in its final state, no animation.
  reveals.forEach((element: HTMLElement): void => {
    element.classList.add("visible");
  });
}
