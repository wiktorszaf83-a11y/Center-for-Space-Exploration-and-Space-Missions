document.addEventListener('DOMContentLoaded', function() {
  const calculatorForm = document.querySelector('form[action="/calculator"]');
  if (calculatorForm) {
    calculatorForm.addEventListener('submit', function(e) {
      const weightInput = document.getElementById('earthWeight');
      const planetSelect = document.getElementById('planet');
      
      if (!weightInput || !planetSelect) return;
      
      const weight = parseFloat(weightInput.value);
      const planet = planetSelect.value;
      
      if (isNaN(weight) || weight <= 0) {
        e.preventDefault();
        alert('Wpisz poprawną masę ciała (powinna być większa od 0).');
        return;
      }
      
      if (!planet) {
        e.preventDefault();
        alert('Wybierz planetę do obliczenia wagi.');
        return;
      }
      
      if (weight > 1000) {
        e.preventDefault();
        alert('Masa nie może przekraczać 1000 kg.');
        return;
      }
    });
  }

  const searchForm = document.querySelector('form[action="/missions"]');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      const queryInput = document.getElementById('q');
      if (!queryInput) return;
      
      const query = queryInput.value.trim();
      const yearSelect = document.getElementById('year');
      const statusSelect = document.getElementById('status');
      const year = yearSelect ? yearSelect.value : '';
      const status = statusSelect ? statusSelect.value : '';
      
      if (!query && !year && !status) {
        e.preventDefault();
        alert('Wpisz wyszukiwane słowo lub wybierz filtry.');
      }
    });
  }
  
  const recruitForm = document.querySelector('form[action="/recruit"]');
  if (recruitForm) {
    recruitForm.addEventListener('submit', function(e) {
      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('email');
      const motivationInput = document.getElementById('motivation');
      
      if (!nameInput || !emailInput || !motivationInput) return;
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const motivation = motivationInput.value.trim();
      
      if (!name || !email || !motivation) {
        e.preventDefault();
        alert('Wypełnij wszystkie wymagane pola (imię, e-mail, list motywacyjny).');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Wpisz poprawny adres e-mail.');
        return;
      }
      
      const birthDateInput = document.getElementById('birthDate');
      if (birthDateInput && birthDateInput.value) {
        const birthDate = new Date(birthDateInput.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 60) {
          e.preventDefault();
          alert('Wiek kandydata musi wynosić od 18 do 60 lat.');
          return;
        }
      }
    });
  }
  
  const fileInput = document.getElementById('file');
  if (fileInput) {
    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];
      if (!file) return;
      
      const maxSize = 5 * 1024 * 1024; // 5 MB
      const allowedExtensions = /\.(jpg|jpeg|png|gif|pdf|txt|csv)$/i;
      
      if (!allowedExtensions.test(file.name)) {
        alert('Niedozwolony format pliku. Dozwolone: JPEG, PNG, GIF, PDF, TXT, CSV.');
        fileInput.value = '';
        return;
      }
      
      if (file.size > maxSize) {
        alert('Plik jest za duży. Maksymalny rozmiar to 5 MB.');
        fileInput.value = '';
        return;
      }
      
      const fileInfo = document.getElementById('file-info');
      if (fileInfo) {
        fileInfo.textContent = `Wybrano: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        fileInfo.style.display = 'block';
      }
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  const autoDismissAlerts = document.querySelectorAll('.js-auto-dismiss');
  autoDismissAlerts.forEach(alert => {
    setTimeout(() => {
      alert.style.opacity = '0';
      alert.style.transition = 'opacity 0.5s';
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });
  
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
