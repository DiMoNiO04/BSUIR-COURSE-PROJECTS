/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const files = document.querySelectorAll('.js-notify-tippy');

  if (files && window.innerWidth > 1100) {
    files.forEach((file) => {
      file.addEventListener('mouseover', (event) => {
        const text = event.currentTarget;
        const txt = text.textContent;
        const txtHeight = text.scrollHeight;
        const height = 24;

        if (txt.split('\n').length >= 2 && txtHeight > height) {
          tippy(file, {
            content: txt,
            placement: 'bottom',
            arrow: true,
            theme: 'light',
            maxWidth: '400px',
            followCursor: true,
          });
        }
      });
    });
  }
});

if (document.querySelector('.js-notify')) {
  tippy('.js-notify', {
    content(reference) {
      return reference.getAttribute('data-notify');
    },
    placement: 'bottom',
    animation: 'fade',
    maxWidth: '200px',
  });
}
