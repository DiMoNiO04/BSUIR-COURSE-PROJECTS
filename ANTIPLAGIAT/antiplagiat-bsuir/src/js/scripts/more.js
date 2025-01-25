const mores = document.querySelectorAll('.more-btns');

function handleMore() {
  if (mores) {
    mores.forEach((more) => {
      const moreBtn = more.querySelector('.more-btns__btn');
      const moreContent = more.querySelector('.more-btns__content');

      moreBtn.addEventListener('click', () => {
        moreContent.classList.toggle('--active');
      });
    });
  }
}

document.addEventListener('click', (event) => {
  if (mores) {
    mores.forEach((more) => {
      const moreContent = more.querySelector('.more-btns__content');
      const isClickInsideMore = more.contains(event.target);

      if (!isClickInsideMore) {
        moreContent.classList.remove('--active');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  handleMore();
});
