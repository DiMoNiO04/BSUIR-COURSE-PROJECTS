document.addEventListener('DOMContentLoaded', () => {
  const btnUp = document.querySelector('.js-btn-up');

  btnUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
