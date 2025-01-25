const changeVisiblePassword = () => {
  const passInputs = document.querySelectorAll('.input--pass');

  if (passInputs) {
    passInputs.forEach((passInput) => {
      const input = passInput.querySelector('input');
      const btnPass = passInput.querySelector('.input__btn');

      btnPass.addEventListener('mousedown', (event) => {
        event.preventDefault();
        btnPass.classList.toggle('--open');
        if (input.getAttribute('type') === 'text') {
          input.setAttribute('type', 'password');
        } else {
          input.setAttribute('type', 'text');
        }
        input.focus();
      });
    });
  }
};

const changeInputWithError = () => {
  const inputErrors = document.querySelectorAll('.input.--error');

  if (inputErrors) {
    inputErrors.forEach((inputError) => {
      inputError.addEventListener('input', function handle() {
        this.classList.remove('--error');
      });
    });
  }
};

const changeVisibleResetSearch = () => {
  const search = document.querySelector('.search');

  if (search) {
    const btnRes = search.querySelector('.search__btn-reset');
    const input = search.querySelector('input');

    input.addEventListener('input', () => {
      if (input.value) {
        btnRes.classList.add('--active');
      } else {
        btnRes.classList.remove('--active');
      }
    });

    btnRes.addEventListener('click', () => {
      btnRes.classList.remove('--active');
      input.focus();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  changeVisiblePassword();
  changeInputWithError();
  changeVisibleResetSearch();
});
