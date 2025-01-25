/* eslint-disable func-names */
const dragArea = document.querySelector('.drag-area');
const button = dragArea.querySelector('button');
const input = dragArea.querySelector('input');
const fileDisplay = document.querySelector('.drag-area__files');
const dragAreaForm = document.querySelector('.drag-area__form');

function clickBtn() {
  button.addEventListener('click', () => input.click());
}

function handleDragOver() {
  dragArea.addEventListener('dragover', function (event) {
    event.preventDefault();
    this.classList.add('--active');
  });
}

function handleDragLeave() {
  dragArea.addEventListener('dragleave', function () {
    this.classList.remove('--active');
  });
}

function displayFile(file) {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const fileElement = document.createElement('div');
    fileElement.setAttribute('class', 'drag-area__file');

    const fileName = document.createElement('div');
    fileName.setAttribute('class', 'drag-area__filename');
    fileName.textContent = file.name;

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'drag-area__fileclose');
    deleteButton.innerHTML = `
      <svg>
        <use xlink:href="assets/img/sprite.svg#close-file"></use>
      </svg>
    `;

    deleteButton.addEventListener('click', () => {
      fileDisplay.removeChild(fileElement);
      dragArea.classList.remove('--error');
      dragArea.classList.remove('--files');
      input.value = '';
    });

    fileElement.appendChild(fileName);
    fileElement.appendChild(deleteButton);
    fileDisplay.appendChild(fileElement);
  };
  fileReader.readAsDataURL(file);
}

const isValid = (file) => file.type === 'application/pdf' && file.size <= 10485760;

function isValidation(file) {
  if (isValid(file)) {
    displayFile(file);
    dragArea.classList.add('--files');
  } else {
    dragAreaForm.classList.add('--error');
  }
}

function handleDrop() {
  dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dragAreaForm.classList.remove('--active');

    const file = event.dataTransfer.files[0];
    isValidation(file);
  });
}

function handleChangeInput() {
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    isValidation(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  clickBtn();
  handleDragOver();
  handleDragLeave();
  handleDrop();
  handleChangeInput();
});
