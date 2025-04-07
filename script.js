let typewriterPlayed = false;

const h2 = document.getElementById('typewriter');
const firstPair = document.querySelector('.first-pair');
const logo = document.querySelector('.logo-image');
const otherPairs = document.querySelectorAll('.fade-in');
const social = document.querySelector('.social-links');

function typeWriterEffect(element) {
  const text = element.textContent;
  element.textContent = '';
  let i = 0;
  const speed = 70;

  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      revealInitialElements();
    }
  }, speed);
}

function revealInitialElements() {
  firstPair.classList.add('visible');
  logo.classList.add('visible');
  otherPairs.forEach(pair => pair.classList.add('ready'));
  if (social) social.classList.add('visible');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === "typewriter" && !typewriterPlayed) {
        typeWriterEffect(entry.target);
        typewriterPlayed = true;
      }

      if (entry.target.classList.contains('ready')) {
        entry.target.classList.add('visible');
      }
    }
  });
}, { threshold: 0.1 });

otherPairs.forEach(pair => observer.observe(pair));
observer.observe(h2);