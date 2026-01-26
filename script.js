// Mobile Menu Toggle
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (btn && menu) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
if (menu) {
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('active') && window.innerWidth < 768) {
        menu.classList.remove('active');
      }
    });
  });
}

// Sticky Header - Changes style when scrolling past hero section
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('home');

function updateNavbar() {
  if (!navbar || !heroSection) return;

  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

  if (window.scrollY >= heroBottom - 80) {
    navbar.classList.remove('navbar-hero');
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.classList.add('navbar-hero');
  }
}

window.addEventListener('scroll', updateNavbar);
window.addEventListener('load', updateNavbar);

// Experience Tabs Interaction with smooth transition
const tabs = document.querySelectorAll('.exp-tab');
const panels = document.querySelectorAll('.exp-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs
    tabs.forEach(t => {
      t.classList.remove('active');
    });

    // Fade out current panel
    panels.forEach(p => {
      if (p.classList.contains('active')) {
        p.style.opacity = '0';
        p.style.transform = 'translateY(10px)';
        setTimeout(() => {
          p.classList.remove('active');
          p.style.opacity = '';
          p.style.transform = '';
        }, 200);
      }
    });

    // Add active to clicked tab
    tab.classList.add('active');

    // Show corresponding panel with animation
    const targetPanel = document.getElementById("exp-" + tab.dataset.exp);
    if (targetPanel) {
      setTimeout(() => {
        targetPanel.classList.add('active');
        targetPanel.style.opacity = '0';
        targetPanel.style.transform = 'translateY(10px)';

        // Trigger reflow
        targetPanel.offsetHeight;

        targetPanel.style.transition = 'all 0.3s ease';
        targetPanel.style.opacity = '1';
        targetPanel.style.transform = 'translateY(0)';
      }, 200);
    }
  });
});

// Enhanced Scroll Reveal Animation with staggered children
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // Stagger animation for project cards within the section
      const projectCards = entry.target.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100 * index);
      });

      // Stagger animation for about text paragraphs
      const aboutParagraphs = entry.target.querySelectorAll('.about-text p');
      aboutParagraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        setTimeout(() => {
          p.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        }, 150 * index);
      });

      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  threshold: 0.1,
  rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Profile Photo - Smooth grayscale to color transition
const profilePhoto = document.getElementById('profile-photo');
if (profilePhoto) {
  profilePhoto.style.transition = 'filter 0.5s ease';
  profilePhoto.addEventListener('mouseenter', () => {
    profilePhoto.style.filter = 'grayscale(0%)';
  }, { once: true });
}

// Add subtle parallax effect to hero section on mouse move
const heroContent = document.querySelector('.hero-section');
if (heroContent && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      heroImage.style.transform = `translate(${mouseX * 0.3}px, ${mouseY * 0.3}px)`;
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add loading animation class removal
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
