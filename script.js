document.addEventListener('DOMContentLoaded', () => {
  // 1. Тёмная/светлая тема
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // 2. Свет за курсором (отключается, если prefers-reduced-motion)
  const cursorLight = document.getElementById('cursorLight');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion && cursorLight) {
    document.addEventListener('mousemove', (e) => {
      cursorLight.style.left = e.clientX + 'px';
      cursorLight.style.top = e.clientY + 'px';
    });
  }

  // 3. Калькулятор с сохранением в localStorage
  const calcBtn = document.getElementById('calcBtn');
  const calcResult = document.getElementById('calcResult');
  
  // Загрузка последнего расчёта
  const savedCalc = localStorage.getItem('lastCalc');
  if (savedCalc) calcResult.textContent = `Последний расчёт: ${savedCalc} ₽`;

  calcBtn.addEventListener('click', () => {
    const basePrice = parseFloat(document.getElementById('serviceType').value);
    const multiplier = parseFloat(document.getElementById('carBrand').value);
    const total = Math.round(basePrice * multiplier);
    
    calcResult.textContent = `Итого: ${total} ₽`;
    localStorage.setItem('lastCalc', total);
  });

  // 4. Форма записи (сохранение в localStorage)
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const application = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      timestamp: new Date().toISOString()
    };
    
    // Получаем старые заявки или создаём пустой массив
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    alert('Заявка успешно сохранена! (Проверь консоль или localStorage)');
    bookingForm.reset();
  });

  // 5. Анимация появления при скролле (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => observer.observe(el));
});