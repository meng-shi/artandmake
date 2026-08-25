document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollEffects();
  loadPrograms();
  initContactForm();
});

function initHeader() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      nav.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
}

function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.program-card, .why-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

function loadPrograms() {
  const grid = document.querySelector('.programs-grid');
  if (!grid) return;

  const programs = [
    { name: 'Fine Art', description: 'Explore drawing, painting, color, and creative expression through fun, meaningful projects.', icon: '🎨', image: 'images/program-fine-art.png', link: 'programs.html#fine-art', price: '$35/session' },
    { name: 'Art and Tech', description: 'Digital art, animation, and 3D design classes combining creativity with technology.', icon: '💻', image: 'images/program-art-tech.png', link: 'programs.html#art-tech', price: '$35/session' },
    { name: 'One-time Workshop', description: 'Themed art workshops — perfect for trying something new or a fun weekend activity.', icon: '🔧', image: 'images/program-workshop.png', link: 'programs.html#workshop', price: 'Contact for Price' },
    { name: 'Portfolio', description: 'Advanced portfolio development for students preparing for art school or college applications.', icon: '🖌️', image: 'images/program-portfolio.png', link: 'programs.html#portfolio', price: 'Contact for Price' }
  ];

  grid.innerHTML = programs.map((program) => `
    <a href="${program.link}" class="program-card">
      <div class="program-card-image">
        <img src="${program.image}" alt="${program.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'image-placeholder\\'>📷 Add ${program.name} photo<br><small>${program.image}</small></div>';">
      </div>
      <div class="program-card-content">
        <h3>${program.name}</h3>
        <p>${program.description}</p>
        <div class="program-card-meta">
          <span class="program-price">${program.price}</span>
          <span class="program-link">Learn More →</span>
        </div>
      </div>
    </a>
  `).join('');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;
    const message = form.querySelector('#message').value;

    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`);

    window.location.href = `mailto:artandmakestudio@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
  });
}
