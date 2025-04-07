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

const h2 = document.getElementById('typewriter');
observer.observe(h2);

// Si petit écran, appliquer le fade-in image par image
if (window.innerWidth <= 768) {
  const pairs = document.querySelectorAll('.image-pair');

  pairs.forEach(pair => {
    pair.classList.remove('fade-in'); // Retirer le fade-in du conteneur

    const images = pair.querySelectorAll('img');
    images.forEach(img => {
      img.classList.add('fade-in');    // Ajouter le fade-in à chaque image
      observer.observe(img);           // Observer chaque image individuellement
    });
  });
} else {
  const otherPairs = document.querySelectorAll('.fade-in');
  otherPairs.forEach(pair => observer.observe(pair)); // comportement normal
}

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

      const otherElements = document.querySelectorAll('.fade-in');
      otherElements.forEach(el => el.classList.add('ready'));
    }
  }, speed);
}