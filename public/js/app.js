const API_BASE = '';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollEffects();

  if (document.querySelector('.programs-grid')) {
    loadPrograms();
  }

  if (document.querySelector('.classes-grid')) {
    loadClasses();
  }

  if (document.querySelector('.teachers-grid')) {
    loadTeachers();
  }

  if (document.querySelector('.gallery-grid')) {
    loadGallery();
  }

  initContactForm();
  initRegisterForm();
  initFilters();
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
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; font-size: 32px; color: white; cursor: pointer;';

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.add('active');
      overlay.classList.add('active');
      menu.appendChild(closeBtn);
    });

    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      menu.classList.remove('active');
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

  document.querySelectorAll('.program-card, .class-card, .teacher-card, .testimonial-card, .why-card').forEach(el => {
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
      { icon: '🎨', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400' },
      { icon: '🖌️', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400' },
      { icon: '💻', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400' },
      { icon: '🔧', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400' }
    ];

    grid.innerHTML = programs.map((program, i) => `
      <div class="program-card" onclick="window.location.href='programs.html'">
        <div class="program-card-image">
          <img src="${programData[i]?.image || ''}" alt="${program.name}">
          <div class="program-card-icon">${programData[i]?.icon || '📚'}</div>
        </div>
        <div class="program-card-content">
          <h3>${program.name}</h3>
          <p>${program.description || 'Explore our creative programs'}</p>
          <div class="program-card-meta">
            <span>📅 Flexible Schedule</span>
            <span>👥 All Levels</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading programs:', error);
    grid.innerHTML = '<p class="loading">Failed to load programs. Please try again.</p>';
  }
}

async function loadClasses() {
  const grid = document.querySelector('.classes-grid');
  if (!grid) return;

  grid.innerHTML = '<p class="loading">Loading classes...</p>';

  try {
    const params = new URLSearchParams(window.location.search);
    const response = await fetch(`${API_BASE}/api/classes?${params}`);
    const classes = await response.json();

    if (classes.length === 0) {
      grid.innerHTML = '<p class="loading">No classes found matching your criteria.</p>';
      return;
    }

    grid.innerHTML = classes.map(cls => `
      <div class="class-card">
        <div class="class-card-image">
          <img src="${cls.image || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400'}" alt="${cls.name}">
          <span class="class-card-badge">${cls.level || 'All Levels'}</span>
        </div>
        <div class="class-card-content">
          <span class="program-name">${cls.program_name || 'Program'}</span>
          <h3>${cls.name}</h3>
          <div class="class-card-meta">
            <span>👤 ${cls.age_range || 'All Ages'}</span>
            <span>⏱️ ${cls.duration || '2 hours'}</span>
            <span>📅 ${cls.schedule || 'Flexible'}</span>
          </div>
          <div class="class-card-price">
            <div class="price">$${cls.price}<span>/session</span></div>
            <button class="btn btn-primary" onclick="selectClass(${cls.id})">Enroll</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading classes:', error);
    grid.innerHTML = '<p class="loading">Failed to load classes. Please try again.</p>';
  }
}

function selectClass(classId) {
  window.location.href = `register.html?class=${classId}`;
}

async function loadTeachers() {
  const grid = document.querySelector('.teachers-grid');
  if (!grid) return;

  try {
    const response = await fetch(`${API_BASE}/api/teachers`);
    const teachers = await response.json();

    grid.innerHTML = teachers.map(teacher => `
      <div class="teacher-card">
        <div class="teacher-image">
          <img src="${teacher.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'}" alt="${teacher.name}">
        </div>
        <div class="teacher-content">
          <h3>${teacher.name}</h3>
          <p class="title">${teacher.title || 'Instructor'}</p>
          <p class="specialization">${teacher.specialization || 'Art Education'}</p>
          <p>${teacher.bio || 'Passionate educator dedicated to nurturing creative talents.'}</p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading teachers:', error);
    grid.innerHTML = '<p class="loading">Failed to load teachers.</p>';
  }
}

function loadGallery() {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  const images = [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400',
    'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400'
  ];

  grid.innerHTML = images.map((src, i) => `
    <div class="gallery-item" onclick="openLightbox('${src}')">
      <img src="${src}" alt="Student Artwork ${i + 1}">
      <div class="gallery-overlay"><span>🔍</span></div>
    </div>
  `).join('');
}

function openLightbox(src) {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center; cursor: pointer;';
  lightbox.innerHTML = `<img src="${src}" style="max-width: 90%; max-height: 90%; border-radius: 8px;">`;
  lightbox.onclick = () => lightbox.remove();
  document.body.appendChild(lightbox);
}

function initFilters() {
  const programFilter = document.getElementById('program-filter');
  const levelFilter = document.getElementById('level-filter');
  const ageFilter = document.getElementById('age-filter');

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (programFilter?.value) params.set('program', programFilter.value);
    if (levelFilter?.value) params.set('level', levelFilter.value);
    if (ageFilter?.value) params.set('age', ageFilter.value);
    window.location.href = `programs.html?${params}`;
  };

  programFilter?.addEventListener('change', applyFilters);
  levelFilter?.addEventListener('change', applyFilters);
  ageFilter?.addEventListener('change', applyFilters);
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
        setTimeout(() => successEl?.style.remove(), 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'Failed to send message. Please try again.';
      }
    }
  });
}

function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  const classSelect = document.getElementById('class-select');
  const params = new URLSearchParams(window.location.search);
  const classId = params.get('class');

  if (classSelect && classId) {
    fetch(`${API_BASE}/api/classes/${classId}`)
      .then(res => res.json())
      .then(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = `${cls.name} - $${cls.price}/session`;
        classSelect.appendChild(option);
        classSelect.value = cls.id;
      });
  } else if (classSelect) {
    fetch(`${API_BASE}/api/classes`)
      .then(res => res.json())
      .then(classes => {
        classSelect.innerHTML = '<option value="">Select a class</option>' +
          classes.map(cls => `<option value="${cls.id}">${cls.name} - $${cls.price}/session</option>`).join('');
      });
  }

  let currentStep = 1;
  const totalSteps = 3;

  const updateSteps = () => {
    document.querySelectorAll('.step').forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i + 1 < currentStep) step.classList.add('completed');
      if (i + 1 === currentStep) step.classList.add('active');
    });

    document.querySelectorAll('.form-step').forEach((step, i) => {
      step.classList.remove('active');
      if (i + 1 === currentStep) step.classList.add('active');
    });
  };

  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStepEl = document.querySelector(`.form-step:nth-child(${currentStep})`);
      const requiredFields = currentStepEl.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value) {
          field.style.borderColor = '#dc2626';
          valid = false;
        } else {
          field.style.borderColor = '#e5e7eb';
        }
      });

      if (valid && currentStep < totalSteps) {
        currentStep++;
        updateSteps();
      }
    });
  });

  document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateSteps();
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      classId: form.querySelector('#class-select')?.value,
      studentName: form.querySelector('#student-name')?.value,
      studentAge: form.querySelector('#student-age')?.value,
      parentName: form.querySelector('#parent-name')?.value,
      parentEmail: form.querySelector('#parent-email')?.value,
      parentPhone: form.querySelector('#parent-phone')?.value
    };

    const formSteps = document.querySelectorAll('.form-step');
    const successMsg = document.querySelector('.success-message');

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        formSteps.forEach(s => s.style.display = 'none');
        document.querySelector('.register-steps').style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  });

  updateSteps();
}