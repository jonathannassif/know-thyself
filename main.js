// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s";
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Optional: Log visit
console.log("Welcome to Know Thyself — Jonathan Nassif");
