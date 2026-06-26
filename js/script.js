const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Toggle Mobile Menu
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth Scrolling & Auto-close Mobile Menu
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    
    // Prevent errors if href is just "#" or empty
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Automatically close menu after navigation on mobile
      if (mainNav?.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});