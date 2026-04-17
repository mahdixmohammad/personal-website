require("./index.scss");
require("./particles.js");
require("./Mahdi-Mohammad-Resume.pdf");

const nav: HTMLElement = document.querySelector("nav")!;
const hamburger: HTMLElement = document.querySelector("#hamburger")!;
const navlinks: NodeListOf<HTMLElement> =
  document.querySelectorAll("nav a, #contactbtn");
const reveals: NodeListOf<HTMLElement> = document.querySelectorAll(".popin");
const progressBars: NodeListOf<HTMLElement> =
  document.querySelectorAll(".progress");

// Enables dropdown menu with nav links when hamburger is clicked (small screen sizes only).
hamburger.onclick = (): void => {
  nav.classList.toggle("active");
};

// Remove active nav when user clicks nav link.
navlinks.forEach((navlink: HTMLElement): void => {
  navlink.onclick = (): void => {
    nav.classList.remove("active");
  };
});

// Loads the width of all the progress bars in skills section automatically.
progressBars.forEach((progressBar: HTMLElement): void => {
  progressBar.querySelector("div")!.style.width = `${progressBar.textContent}`;
});

// As user scrolls down, sections pop in.
function popInAnimation(): void {
  reveals.forEach((element: HTMLElement): void => {
    let elementVisible: number = element.clientHeight * 0.09;
    if (elementVisible < 30) elementVisible = 30;
    else if (elementVisible > 60) elementVisible = 60;

    if (element.classList.contains("project")) elementVisible = 20;
    let elementTop: number = element.getBoundingClientRect().top;
    let distanceFromView: number = Math.max(
      0,
      window.innerHeight - elementTop - elementVisible,
    );
    let opacity: number = (distanceFromView / elementVisible) * 0.4 - 1;
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
}

window.addEventListener("scroll", popInAnimation);

// Checks the scroll position on page load.
popInAnimation();
