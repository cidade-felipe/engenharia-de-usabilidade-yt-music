const body = document.body;
const menuButton = document.querySelector('.menu-button');
const navLinks = Array.from(document.querySelectorAll('.toc a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const progressBar = document.querySelector('.reading-progress span');
const radioToggle = document.querySelector('#radio-toggle');
const revealItems = Array.from(document.querySelectorAll('.doc-section, .note-block, .persona-card, .problem-card, .decision-panel'));
const interactiveCards = Array.from(document.querySelectorAll('.problem-card'));

function setNavigationState(isOpen) {
  body.classList.toggle('nav-open', isOpen);
  menuButton?.setAttribute('aria-expanded', String(isOpen));
  menuButton?.setAttribute('aria-label', isOpen ? 'Fechar navegação' : 'Abrir navegação');
}

function updateActiveLink() {
  const currentSection = sections.reduce((current, section) => {
    const sectionTop = section.getBoundingClientRect().top;
    return sectionTop <= 140 ? section : current;
  }, sections[0]);

  if (!currentSection) {
    return;
  }

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentSection.id}`);
  });
}

function updateReadingProgress() {
  if (!progressBar) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function prepareRevealEffects() {
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  revealItems.forEach((item) => item.classList.add('reveal-item'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}

function prepareCardGlow() {
  interactiveCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = `${event.clientX - rect.left}px`;
      const y = `${event.clientY - rect.top}px`;

      card.style.setProperty('--pointer-x', x);
      card.style.setProperty('--pointer-y', y);
    });
  });
}

menuButton?.addEventListener('click', () => {
  setNavigationState(!body.classList.contains('nav-open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setNavigationState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setNavigationState(false);
  }
});

radioToggle?.addEventListener('change', () => {
  radioToggle.closest('.toggle-row')?.classList.toggle('is-enabled', radioToggle.checked);
});

window.addEventListener('scroll', () => {
  updateActiveLink();
  updateReadingProgress();
}, { passive: true });

prepareRevealEffects();
prepareCardGlow();
updateActiveLink();
updateReadingProgress();
