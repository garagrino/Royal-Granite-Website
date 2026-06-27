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

// Contact form submission handled asynchronously so the page does not redirect.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent || 'Send Message';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://formsubmit.co/ajax/ronogodrick@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      alert('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('Sorry, something went wrong. Please try again later.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

// Gallery images are kept in one place so they can be updated easily.
const galleryImages = [
  './Images/WhatsApp Image 2026-06-26 at 12.35.47 PM (1).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.47 PM (2).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.47 PM.jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.50 PM (1).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.50 PM (2).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.50 PM.jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.51 PM (1).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.51 PM (2).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.52 PM (1).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.52 PM (2).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.52 PM (3).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.52 PM.jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.53 PM (1).jpeg',
  './Images/WhatsApp Image 2026-06-26 at 12.35.53 PM.jpeg'
];

const featuredCard = document.querySelector('.gallery-trigger');
const featuredCardImage = document.getElementById('featuredCardImage');
const galleryOverlay = document.getElementById('galleryOverlay');
const galleryImage = document.getElementById('galleryImage');
const closeButton = document.querySelector('.gallery-close');
const prevButton = document.querySelector('.gallery-prev');
const nextButton = document.querySelector('.gallery-next');

let currentGalleryIndex = 0;
let touchStartX = 0;

function setFeaturedCardImage(imagePath) {
  if (featuredCardImage) {
    featuredCardImage.style.backgroundImage = `url("${imagePath}")`;
  }
}

function showGalleryImage(index) {
  if (!galleryImage || !galleryImages.length) return;

  currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  galleryImage.classList.remove('is-visible');

  window.setTimeout(() => {
    galleryImage.src = galleryImages[currentGalleryIndex];
    galleryImage.alt = `Gallery image ${currentGalleryIndex + 1}`;
    galleryImage.classList.add('is-visible');
  }, 80);
}

function openGallery(index = 0) {
  if (!galleryOverlay || !galleryImages.length) return;

  showGalleryImage(index);
  galleryOverlay.classList.add('is-open');
  galleryOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeGallery() {
  if (!galleryOverlay) return;

  galleryOverlay.classList.remove('is-open');
  galleryOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

if (galleryImages.length) {
  setFeaturedCardImage(galleryImages[0]);
}

if (featuredCard) {
  featuredCard.addEventListener('click', () => openGallery(0));

  featuredCard.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGallery(0);
    }
  });
}

if (closeButton) {
  closeButton.addEventListener('click', closeGallery);
}

if (prevButton) {
  prevButton.addEventListener('click', () => showGalleryImage(currentGalleryIndex - 1));
}

if (nextButton) {
  nextButton.addEventListener('click', () => showGalleryImage(currentGalleryIndex + 1));
}

if (galleryOverlay) {
  galleryOverlay.addEventListener('click', (event) => {
    if (event.target === galleryOverlay) {
      closeGallery();
    }
  });
}

galleryImage?.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

galleryImage?.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance < 0) {
    showGalleryImage(currentGalleryIndex + 1);
  } else {
    showGalleryImage(currentGalleryIndex - 1);
  }
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (!galleryOverlay?.classList.contains('is-open')) return;

  if (event.key === 'Escape') {
    closeGallery();
  } else if (event.key === 'ArrowRight') {
    showGalleryImage(currentGalleryIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    showGalleryImage(currentGalleryIndex - 1);
  }
});