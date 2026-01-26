// Mobile Menu Toggle
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (btn && menu) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
  });
}

// Close mobile menu when a link is clicked
if (menu) {
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!menu.classList.contains('hidden') && window.innerWidth < 768) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
      }
    });
  });
}

// Tabs Interaction
const tabs = document.querySelectorAll('.exp-tab');
const panels = document.querySelectorAll('.exp-panel');

// Initialize the first tab style
tabs[0].classList.add('text-[#39FF14]', 'border-[#39FF14]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('text-[#39FF14]', 'border-[#39FF14]');
      t.classList.add('border-transparent');
    });

    panels.forEach(p => p.classList.remove('active'));

    const targetPanel = document.getElementById("exp-" + tab.dataset.exp);
    if (targetPanel) {
      targetPanel.classList.add('active');
      tab.classList.remove('border-transparent');
      tab.classList.add('text-[#39FF14]', 'border-[#39FF14]');
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
    profilePhoto.classList.remove('grayscale');
  }, { once: true }); // 'once: true' makes this only trigger one time
}
