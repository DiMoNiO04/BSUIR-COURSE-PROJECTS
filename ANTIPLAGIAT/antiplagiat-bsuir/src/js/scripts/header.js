const toggleMenu = () => {
  const menu = document.querySelector('.js-menu');
  const btn = document.querySelector('.js-menu-btn');
  const menus = document.querySelector('.js-menus');

  if (menu && btn) {
    if (window.innerWidth >= 1100) {
      btn.addEventListener('mouseover', () => {
        menu.classList.add('--active');
        btn.classList.add('--active');
      });
      menus.addEventListener('mouseleave', () => {
        menu.classList.remove('--active');
        btn.classList.remove('--active');
      });
    } else {
      btn.addEventListener('click', () => {
        menu.classList.toggle('--active');
        btn.classList.toggle('--active');
      });

      document.addEventListener('click', (event) => {
        if (!event.target.closest('.js-menus')) {
          menu.classList.remove('--active');
          btn.classList.remove('--active');
        }
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  toggleMenu();
});
