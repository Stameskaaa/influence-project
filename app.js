const burgerButton = document.getElementById('burgerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const modalOverlay = document.getElementById('modal-overlay');
const cookie = document.getElementById('cookie');
const buttons = document.querySelectorAll('button');
const modalForm = document.getElementById('modal__form');
const header = document.querySelector('.header');

burgerButton.addEventListener('click', () => {
  menuOverlay.classList.toggle('menu-overlay_active');
  burgerButton.classList.toggle('burger-menu__button--active');
});

header.addEventListener('click', (e) => {
  const itemsArray = Array.from(header.querySelectorAll('a'));
  itemsArray.forEach((item) => {
    if (item === e.target) {
      item.classList.add('header__navbar-item--active');
    } else {
      item.classList.remove('header__navbar-item--active');
    }
  });
});

const contactButton = Array.from(buttons).filter(
  (button) => button.textContent === 'Contact sales',
);

if (contactButton && modalOverlay) {
  contactButton.forEach((butt) => {
    butt.addEventListener('click', () => {
      modalOverlay.classList.add('modal-overlay--active');

      if (document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

modalOverlay.addEventListener('click', (e) => {
  if (e.target.id === 'modal_xmark' || e.target.id === 'modal-overlay') {
    modalOverlay.classList.remove('modal-overlay--active');
    document.body.style.overflow = 'auto';
  }

  if (e.target.id === 'modalButtSuccess') {
    modalOverlay.classList.remove('modal-overlay--active');
    document.body.style.overflow = 'auto';
    toggleModal('hide');
  }
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputsCollection = modalForm.querySelectorAll('input');
  const inputArray = Array.from(inputsCollection);

  const validateArray = inputArray
    .filter(
      (elem) =>
        elem.value === '' && (elem.name === 'Name' || elem.name === 'email' || elem.name === 'tel'),
    )
    .map((elem) => elem.id);

  if (!validateArray.length) {
    const butt = modalForm.querySelector('.modal__button');
    butt.classList.add('button--loading');

    setTimeout(() => {
      butt.classList.remove('button--loading');
      toggleModal('show');
      clearFormInputs(modalForm);
    }, 2000);
  } else {
    showModalError(validateArray);
  }
});

modalForm.addEventListener('input', (e) => {
  if (e.target.tagName === 'INPUT') {
    const name = e.target.name;

    hideModalError();
    // if (name === 'Name' || name === 'email' || name === 'tel') {
    //   // e.target.value === "" ?
    //   // showModalError('textInput');
    // }
  }
});

function showModalError(inputArrayId) {
  if (inputArrayId.length) {
    const pseudoArray = document.querySelectorAll('.modal_warning');
    const arrayElements = Array.from(pseudoArray);

    const spans = arrayElements.filter((element) => element.tagName === 'SPAN');
    const paragraphs = arrayElements.filter((element) => element.tagName === 'P');

    spans.forEach((element) => {
      if (inputArrayId.includes(element.id)) {
        element.classList.add('modal_warning--visible');
        paragraphs.forEach((p) => p.classList.add('modal_warning--visible'));
      }
    });
  }
}

function hideModalError() {
  const arrayElements = Array.from(document.querySelectorAll('.modal_warning--visible'));
  arrayElements.forEach((elem) => elem.classList.remove('modal_warning--visible'));
}

function toggleModal(action) {
  const modalSuccess = document.getElementById('modalSuccess');
  const modalContent = document.getElementById('modalContent');
  if (action === 'show') {
    modalSuccess.classList.add('modal__success--active');
    modalContent.classList.add('modal__content--hide');
  } else if (action === 'hide') {
    modalSuccess.classList.remove('modal__success--active');
    modalContent.classList.remove('modal__content--hide');
  }
}

clearFormInputs = (form) => {
  const inputArray = Array.from(form.querySelectorAll('input'));
  inputArray.forEach((input) => {
    input.value = '';
  });
};

function handleCloseCookie(e) {
  if (
    e.target.id === 'cookie__xmark' ||
    e.target.id === 'cookie__decline' ||
    e.target.id === 'cookie__accept'
  ) {
    cookie.classList.remove('cookie--active');
    cookie.removeEventListener('click', handleCloseCookie);
  }
}

setTimeout(() => {
  if (cookie) {
    cookie.classList.toggle('cookie--active');
    cookie.addEventListener('click', handleCloseCookie);
  }
}, 1000);
