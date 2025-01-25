function addInfoInModalDoc() {
  const modal = document.querySelector('.modal-doc');
  const modalName = modal.querySelector('.js-modal-doc-name');
  const modalOrig = modal.querySelector('.js-modal-doc-orig');
  const modalFilename = modal.querySelector('.js-modal-doc-file');

  const modalBtns = document.querySelectorAll('[data-graph-path="modal-doc"]');
  const btnSuccessResult = document.querySelector('.js-result-success');
  const btnNoSuccessResult = document.querySelector('.js-result-no-success');
  let currentItem = null;

  btnSuccessResult.addEventListener('click', () => {
    if (currentItem) {
      currentItem.classList.remove('--no-success');
      currentItem.classList.add('--success');
    }
  });

  btnNoSuccessResult.addEventListener('click', () => {
    if (currentItem) {
      currentItem.classList.remove('--success');
      currentItem.classList.add('--no-success');
    }
  });

  modalBtns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', () => {
      currentItem = modalBtn.parentElement.parentElement.parentElement;

      const itemName = currentItem.querySelector('.js-modal-doc-name').textContent;
      const itemOrig = currentItem.querySelector('.js-modal-doc-orig').textContent;
      const itemFile = currentItem.querySelector('.js-modal-doc-file').textContent;

      modalName.textContent = itemName || '—';
      modalOrig.textContent = itemOrig || '—';
      modalFilename.textContent = itemFile || '—';
    });
  });
}

function addInfoInModalDocLoad() {
  const modal = document.querySelector('.modal-protection');
  const modalOrig = modal.querySelector('.js-modal-doc-orig');
  const modalFilename = modal.querySelector('.js-modal-doc-file');

  const modalBtns = document.querySelectorAll('[data-graph-path="modal-protection"]');
  // const btnSuccessResult = document.querySelector('.js-result-success');
  let currentItem = null;

  // btnSuccessResult.addEventListener('click', () => {
  //   if (currentItem) {
  //     currentItem.classList.remove('--no-success');
  //     currentItem.classList.add('--success');
  //   }
  // });

  modalBtns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', () => {
      currentItem = modalBtn.parentElement.parentElement.parentElement;

      const itemOrig = currentItem.querySelector('.js-modal-doc-orig').textContent;
      const itemFile = currentItem.querySelector('.js-modal-doc-file').textContent;

      modalOrig.textContent = itemOrig || '—';
      modalFilename.textContent = itemFile || '—';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addInfoInModalDoc();
  addInfoInModalDocLoad();
});
