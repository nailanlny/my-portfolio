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

// Tabs Interaction
const tabs = document.querySelectorAll('.exp-tab');
const panels = document.querySelectorAll('.exp-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs
    tabs.forEach(t => {
      t.classList.remove('active');
    });

    // Remove active from all panels
    panels.forEach(p => p.classList.remove('active'));

    // Add active to clicked tab
    tab.classList.add('active');

    // Show corresponding panel
    const targetPanel = document.getElementById("exp-" + tab.dataset.exp);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// Scroll Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, {
  root: null,
  threshold: 0.1, // Trigger when 10% of element is visible
  rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Profile Photo - Permanent color on first hover
const profilePhoto = document.getElementById('profile-photo');
if (profilePhoto) {
  profilePhoto.addEventListener('mouseenter', () => {
    profilePhoto.style.filter = 'grayscale(0%)';
  }, { once: true }); // 'once: true' makes this only trigger one time
}
