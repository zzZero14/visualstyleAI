document.addEventListener('DOMContentLoaded', () => {
  initNavHighlight();
  initSlider();
  initScrollAnimations();
});

function initNavHighlight() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
}

function initSlider() {
  const bar = document.querySelector('.cta-slider-bar');
  const thumb = document.querySelector('.cta-slider-thumb');
  if (!bar || !thumb) return;

  let dragging = false;

  thumb.addEventListener('mousedown', () => { dragging = true; });
  document.addEventListener('mouseup', () => { dragging = false; });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = bar.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    thumb.style.left = `${x}px`;
  });
}

function initScrollAnimations() {
  const cards = document.querySelectorAll('.feature-card, .community-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}
