// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Hero entrance animation
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-content");
  hero.style.opacity = "0";
  hero.style.transform = "translateY(40px)";
  hero.style.transition = "all 1.2s ease-out";

  setTimeout(() => {
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }, 300);
});

// Optional: Profile photo pops in slightly after
setTimeout(() => {
  const img = document.querySelector(".profile-img");
  if (img) {
    img.style.transition = "all 1s ease-out 0.6s";
    img.style.opacity = "0";
    img.style.transform = "scale(0.8)";
    requestAnimationFrame(() => {
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    });
  }
}, 500);

// 3 Question Animated Journal
const questions = [
  "What fear is quietly holding you back right now?",
  "What made you feel most alive when you were younger?",
  "One sentence your future self needs to hear today:",
];

const saved = JSON.parse(localStorage.getItem("knowThyself3") || "[]");
const app = document.getElementById("journal-app");

if (saved.length === 3) {
  // Completed → Thank you screen
  app.innerHTML = `
    <div style="animation:fadeIn 1s; background:white; padding:3rem; border-radius:16px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
      <h3 style="color:#667eea; font-size:2rem; margin-bottom:1rem;">Thanks for taking time to explore your inner self ✨</h3>
      <p>Your answers are saved forever in this browser.</p>
      <button onclick="localStorage.removeItem('knowThyself3'); location.reload();" 
        style="margin-top:2rem; padding:12px 30px; background:#667eea; color:white; border:none; border-radius:50px; cursor:pointer;">
What's Next     
 </button>
    </div>`;
} else {
  let current = saved.length;
  let answers = saved.length === 3 ? saved : [...saved];

  const showQuestion = () => {
    if (current >= 3) {
      localStorage.setItem("knowThyself3", JSON.stringify(answers));
      location.reload();
      return;
    }

    app.innerHTML = `
      <div style="animation:slideUp 0.8s ease-out; background:white; padding:2.5rem; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
        <div style="text-align:center; margin-bottom:1.5rem;">
          <p style="color:#667eea; font-weight:600;">Question ${
            current + 1
          } of 3</p>
          <div style="width:100%; background:#f0f0f0; height:10px; border-radius:5px; margin:10px 0;">
            <div style="width:${
              ((current + 1) / 3) * 100
            }%; background:#667eea; height:100%; border-radius:5px; transition:0.6s;"></div>
          </div>
        </div>

        <p style="font-size:1.5rem; font-weight:600; margin:2rem 0; line-height:1.5;">
          ${questions[current]}
        </p>

        <textarea id="answer" placeholder="Your honest answer…" 
          style="width:100%; min-height:160px; padding:1rem; border:2px solid #ddd; border-radius:12px; font-size:1rem; font-family:inherit;">${
            answers[current] || ""
          }</textarea>

        <div style="text-align:center; margin-top:2rem;">
          <button id="nextBtn" style="padding:14px 40px; background:#667eea; color:white; border:none; border-radius:50px; font-weight:600; font-size:1.1rem; cursor:pointer;">
            ${current === 2 ? "Finish & Reveal" : "Next →"}
          </button>
        </div>
      </div>`;

    document.getElementById("nextBtn").onclick = () => {
      const answer = document.getElementById("answer").value.trim();
      if (answer || current > 0) {
        answers[current] = answer;
        current++;
        showQuestion();
      } else {
        alert("Please write something before continuing.");
      }
    };
  };

  showQuestion();
}

// Simple animations
const style = document.createElement("style");
style.textContent = `
@keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
`;
document.head.appendChild(style);

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

// Animations for sections
// Fade-in on scroll
document.addEventListener("scroll", () => {
  document.querySelectorAll(".section").forEach((sec) => {
    if (sec.getBoundingClientRect().top < window.innerHeight * 0.8) {
      sec.classList.add("visible");
    }
  });
});
