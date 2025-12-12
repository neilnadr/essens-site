document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const menuToggle = document.getElementById('menuToggle');
  const closeSidebar = document.getElementById('closeSidebar');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Добавляем оверлей в DOM
  document.body.appendChild(overlay);

  // Открытие меню
  menuToggle.addEventListener('click', () => {
    sidebarMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // блокируем скролл
  });

  // Закрытие меню по клику на крестик
  closeSidebar.addEventListener('click', () => {
    sidebarMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // возвращаем скролл
  });

  // Закрытие меню по клику на оверлей
  overlay.addEventListener('click', () => {
    sidebarMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Закрытие меню по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
      sidebarMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Форма регистрации (оставляем как было)
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const city = document.getElementById('city').value.trim();

      if (!name || !phone || !city) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }

      alert(`✅ Анкета отправлена, ${name}!\nВ ближайшее время с вами свяжется представитель ESSENS.`);
      form.reset();
      
    });
  }
  
// Scroll to top button
const scrollToTopButton = document.getElementById('scrollToTop');

if (scrollToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // показывать после прокрутки 300px
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  });

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


  // Внутри DOMContentLoaded — после объявления переменных:

menuToggle.addEventListener('click', () => {
  sidebarMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.classList.add('menu-open'); // ← добавляем класс
  document.body.style.overflow = 'hidden';
});

closeSidebar.addEventListener('click', () => {
  sidebarMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('menu-open'); // ← убираем класс
  document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
  sidebarMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('menu-open'); // ← убираем класс
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
    sidebarMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open'); // ← убираем класс
    document.body.style.overflow = '';
  }
});
});

// Parallax effect for banner
const parallaxLayer = document.getElementById('parallaxLayer');

if (parallaxLayer) {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const banner = parallaxLayer.closest('.collab-banner');
    const bannerTop = banner.offsetTop;
    const bannerHeight = banner.offsetHeight;

    // Работает только когда баннер в зоне видимости
    if (scrollY > bannerTop - window.innerHeight && scrollY < bannerTop + bannerHeight) {
      const offset = (scrollY - bannerTop) * 0.6; // ← коэффициент параллакса (0.3–0.7)
      parallaxLayer.style.transform = `translateY(${offset}px)`;
    }
  });
}
// Modal for product images
const productCards = document.querySelectorAll('.product-card');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal .close');

if (productCards.length > 0) {
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const imageUrl = card.getAttribute('data-image');
      if (imageUrl) {
        modalImage.src = imageUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // блокируем скролл
      }
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // разблокируем скролл
  });

  // Закрытие по клику вне модалки
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Закрытие по клавише Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Timer for registration form
const timerDisplay = document.querySelector('.timer-display');
let timeLeft = 60 * 60; // 1 час

function updateTimer() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  } else {
    timerDisplay.textContent = "Время вышло!";
    timerDisplay.style.color = "#e74c3c";
  }
}

if (timerDisplay) {
  updateTimer();
}

// Form submission with captcha
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !phone || !email) {
    alert('Пожалуйста, заполните обязательные поля.');
    return;
  }

  // Показываем капчу
  showCaptcha();

  // Ждём, пока пользователь пройдёт капчу
  const checkCaptcha = setInterval(() => {
    if (captchaPassed) {
      clearInterval(checkCaptcha);
      alert(`✅ Анкета отправлена, ${name}!\nВ ближайшее время с вами свяжется представитель ESSENS.`);
      this.reset();
    }
  }, 500);
});


// Simple Drag-and-Drop CAPTCHA
let captchaPassed = false;

function showCaptcha() {
  const captchaModal = document.createElement('div');
  captchaModal.className = 'captcha-modal';
  captchaModal.innerHTML = `
    <div class="captcha-content">
      <span class="close-captcha">&times;</span>
      <h3>Робот или человек?</h3>
      <p>Перетащите 🍇 в корзину</p>
      <div class="captcha-progress">
        <span class="dot active"></span>
        <span class="dot active"></span>
        <span class="dot active"></span>
        <span class="dot"></span>
      </div>
      <div class="captcha-items">
        <div class="item" draggable="true">🍌</div>
        <div class="item" draggable="true">🍐</div>
        <div class="item" draggable="true">🍑</div>
        <div class="item" draggable="true">🍏</div>
        <div class="item" draggable="true">🍇</div>
        <div class="item" draggable="true">🍒</div>
      </div>
      <div class="basket" id="basket">
        <span>🛒 Корзина</span>
        <div class="basket-items" id="basketItems"></div>
      </div>
    </div>
  `;
  document.body.appendChild(captchaModal);

  // Закрытие по клику на крестик
  const closeBtn = captchaModal.querySelector('.close-captcha');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(captchaModal);
  });

  // Перетаскивание
  const items = captchaModal.querySelectorAll('.item');
  const basket = captchaModal.querySelector('#basket');
  const basketItems = captchaModal.querySelector('#basketItems');

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.textContent);
    });
  });

  basket.addEventListener('dragover', e => {
    e.preventDefault();
  });

  basket.addEventListener('drop', e => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData('text/plain');
    if (emoji === '🍇') {
      const newItem = document.createElement('div');
      newItem.textContent = emoji;
      basketItems.appendChild(newItem);
      // Проверяем, что в корзине есть 🍇
      if (basketItems.innerHTML.includes('🍇')) {
        captchaPassed = true;
        alert('✅ Вы прошли проверку!');
        document.body.removeChild(captchaModal);
      }
    }
  });
}