/* ==========================================
   Drona AI SaaS — Interactions & Animations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(0, 0, 0, 0.85)';
      navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.5)';
      navbar.style.borderBottom = '1px solid transparent';
    }
  }, { passive: true });


  // --- 2. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal-up');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });


  // --- 3. Hero Visual Parallax (Mouse Move) ---
  const heroSection = document.getElementById('hero');
  const heroVisual = document.querySelector('.hero-visual-frame');
  const glow = document.querySelector('.hero-visual-glow');
  
  if (heroSection && heroVisual && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      
      heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      glow.style.transform = `translate(-50%, -50%) translate(${xAxis * -2}px, ${yAxis * -2}px)`;
    });

    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
      heroVisual.style.transform = `rotateY(0deg) rotateX(0deg)`;
      heroVisual.style.transition = 'transform 0.5s ease';
      glow.style.transform = `translate(-50%, -50%)`;
      glow.style.transition = 'transform 0.5s ease';
    });
    
    // Remove transition during movement for smoothness
    heroSection.addEventListener('mouseenter', () => {
      heroVisual.style.transition = 'none';
      glow.style.transition = 'none';
    });
  }


  // --- 4. Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
