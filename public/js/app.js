const API_BASE = '';

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

async function loadPrograms() {
  const grid = document.querySelector('.programs-grid');
  if (!grid) return;

  try {
    const response = await fetch(`${API_BASE}/api/programs`);
    const programs = await response.json();

    const programData = [
      { icon: '🎨', image: 'images/program-fine-art.png', link: 'programs.html#fine-art', price: '$35/session' },
      { icon: '💻', image: 'images/program-art-tech.png', link: 'programs.html#art-tech', price: '$35/session' },
      { icon: '🔧', image: 'images/program-workshop.png', link: 'programs.html#workshop', price: 'Contact for Price' },
      { icon: '🖌️', image: 'images/program-portfolio.png', link: 'programs.html#portfolio', price: 'Contact for Price' }
    ];

    grid.innerHTML = programs.map((program, i) => `
      <a href="${programData[i]?.link || '#'}" class="program-card">
        <div class="program-card-image">
          <img src="${programData[i]?.image || ''}" alt="${program.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'image-placeholder\'>📷 Add ${program.name} photo<br><small>${programData[i]?.image}</small></div>';">
        </div>
        <div class="program-card-content">
          <h3>${program.name}</h3>
          <p>${program.description || 'Explore our creative programs'}</p>
          <div class="program-card-meta">
            <span class="program-price">${programData[i]?.price || ''}</span>
            <span class="program-link">Learn More →</span>
          </div>
        </div>
      </a>
    `).join('');
  } catch (error) {
    console.error('Error loading programs:', error);
    grid.innerHTML = '<p class="loading">Failed to load programs. Please try again.</p>';
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errorEl = form.querySelector('.error-message');
    const successEl = form.querySelector('.success-msg');

    const data = {
      name: form.querySelector('#name').value,
      email: form.querySelector('#email').value,
      phone: form.querySelector('#phone').value,
      message: form.querySelector('#message').value
    };

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        if (successEl) {
          successEl.style.display = 'block';
          successEl.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        }
        form.reset();
        setTimeout(() => { if (successEl) successEl.style.display = 'none'; }, 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'Failed to send message. Please try again.';
        setTimeout(() => { if (errorEl) errorEl.style.display = 'none'; }, 5000);
      }
    }
  });
}
