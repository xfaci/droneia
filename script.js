/* ==========================================
   AI Voice Drone — Landing Page Scripts
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // Navbar scroll effect
  // =====================
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // =====================
  // Mobile nav toggle
  // =====================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // =====================
  // Smooth scroll for anchor links
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // Intersection Observer — reveal animations
  // =====================
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =====================
  // Number counter animation
  // =====================
  const counterElements = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // =====================
  // Hero particle effect
  // =====================
  const particlesContainer = document.getElementById('hero-particles');

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const x = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 8;
    const duration = Math.random() * 6 + 6;
    const colors = ['#FF6B35', '#00D4FF', '#8B5CF6', '#fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.left = `${x}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }

  // Create particles
  for (let i = 0; i < 30; i++) {
    createParticle();
  }

  // =====================
  // Parallax effect on hero image
  // =====================
  const heroImage = document.querySelector('.hero-image-wrapper');

  if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;

      if (scrollY < heroHeight) {
        const parallaxOffset = scrollY * 0.15;
        heroImage.style.transform = `translateY(${parallaxOffset}px)`;
      }
    }, { passive: true });
  }

  // =====================
  // Mouse move parallax on hero
  // =====================
  const heroSection = document.querySelector('.hero');

  if (window.innerWidth > 1024) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      const bubbles = document.querySelectorAll('.voice-bubble');
      bubbles.forEach((bubble, i) => {
        const factor = (i + 1) * 8;
        bubble.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  // =====================
  // Active nav link highlighting
  // =====================
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

});

// =====================
// Modal functions (global scope)
// =====================
function openModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset to form state
  document.getElementById('modal-content').style.display = 'block';
  document.getElementById('modal-success').style.display = 'none';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

function submitReservation(e) {
  e.preventDefault();

  const name = document.getElementById('modal-name').value;
  const email = document.getElementById('modal-email').value;

  if (!name || !email) return;

  // Simulate submission
  const btn = document.getElementById('modal-submit-btn');
  btn.innerHTML = '<span class="btn-loading">Processing...</span>';
  btn.disabled = true;

  setTimeout(() => {
    // Show success state
    document.getElementById('modal-content').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';

    // Random queue position
    const position = Math.floor(Math.random() * 30) + 70;
    document.getElementById('queue-position').textContent = `#${position}`;

    // Reset form
    document.getElementById('modal-name').value = '';
    document.getElementById('modal-email').value = '';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      Reserve My Drone — $599
    `;
    btn.disabled = false;
  }, 1200);
}

function handleFooterEmail(e) {
  e.preventDefault();
  const input = document.getElementById('footer-email-input');
  const email = input.value;

  if (!email) return;

  // Show quick feedback
  const form = e.target;
  const originalHtml = form.innerHTML;

  form.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;color:#00D4FF;font-size:0.875rem;font-weight:600;padding:10px 0;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      You're on the list!
    </div>
  `;

  setTimeout(() => {
    form.innerHTML = originalHtml;
    // Re-attach event listener
    form.addEventListener('submit', handleFooterEmail);
  }, 3000);
}
