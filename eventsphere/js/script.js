const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
    }
  });
}

const filterCat = document.getElementById('filterCat');
const filterPrice = document.getElementById('filterPrice');
const searchInput = document.getElementById('searchInput');
const eventsGrid = document.getElementById('eventsGrid');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

function filterEvents() {
  if (!eventsGrid) return;

  const cat = filterCat ? filterCat.value : '';
  const price = filterPrice ? filterPrice.value : '';
  const search = searchInput ? searchInput.value.toLowerCase() : '';

  const cards = eventsGrid.querySelectorAll('.card');
  let visible = 0;

  cards.forEach(card => {
    const cardCat = card.dataset.cat || '';
    const cardPrice = card.dataset.price || '';
    const cardText = card.textContent.toLowerCase();

    const matchCat = !cat || cardCat === cat;
    const matchPrice = !price || cardPrice === price;
    const matchSearch = !search || cardText.includes(search);

    if (matchCat && matchPrice && matchSearch) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  if (resultsCount) {
    resultsCount.textContent = `${visible} événement${visible !== 1 ? 's' : ''} trouvé${visible !== 1 ? 's' : ''}`;
  }

  if (noResults) {
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }
}

if (filterCat) filterCat.addEventListener('change', filterEvents);
if (filterPrice) filterPrice.addEventListener('change', filterEvents);
if (searchInput) searchInput.addEventListener('input', filterEvents);

const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'firstName', errorId: 'firstNameError', msg: 'Le prénom est requis.' },
      { id: 'lastName', errorId: 'lastNameError', msg: 'Le nom est requis.' },
      { id: 'email', errorId: 'emailError', msg: 'Un email valide est requis.' },
      { id: 'subject', errorId: 'subjectError', msg: 'Veuillez choisir un sujet.' },
      { id: 'message', errorId: 'messageError', msg: 'Le message est requis.' },
    ];

    fields.forEach(({ id, errorId, msg }) => {
      const el = document.getElementById(id);
      const err = document.getElementById(errorId);
      if (!el || !err) return;

      el.classList.remove('error');
      err.textContent = '';

      if (!el.value.trim()) {
        el.classList.add('error');
        err.textContent = msg;
        valid = false;
      }

      if (id === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        el.classList.add('error');
        err.textContent = 'Format email invalide.';
        valid = false;
      }
    });

    const terms = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    if (terms && !terms.checked) {
      if (termsError) termsError.textContent = 'Vous devez accepter les CGU.';
      valid = false;
    } else if (termsError) {
      termsError.textContent = '';
    }

    if (valid) {
      contactForm.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    }
  });
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = btn.classList.contains('open');

  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

document.querySelectorAll('.card[onclick]').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') card.click();
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .cat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, box-shadow 0.25s';
  observer.observe(el);
});
