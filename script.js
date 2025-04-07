let typewriterPlayed = false;

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

const otherPairs = document.querySelectorAll('.fade-in');
otherPairs.forEach(pair => observer.observe(pair));

const h2 = document.getElementById('typewriter');
observer.observe(h2);

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

      const firstPair = document.querySelector('.first-pair');
      firstPair.classList.add('visible');

      const logo = document.querySelector('.logo-image');
      logo.classList.add('visible');

      const otherPairs = document.querySelectorAll('.fade-in');
      otherPairs.forEach(pair => pair.classList.add('ready'));
    }
  }, speed);
}