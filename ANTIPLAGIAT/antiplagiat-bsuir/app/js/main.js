/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/scripts/btn-up.js":
/*!**********************************!*\
  !*** ./src/js/scripts/btn-up.js ***!
  \**********************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', () => {
  const btnUp = document.querySelector('.js-btn-up');
  btnUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

/***/ }),

/***/ "./src/js/scripts/drag-area.js":
/*!*************************************!*\
  !*** ./src/js/scripts/drag-area.js ***!
  \*************************************/
/***/ (() => {

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
const isValid = file => file.type === 'application/pdf' && file.size <= 10485760;
function isValidation(file) {
  if (isValid(file)) {
    displayFile(file);
    dragArea.classList.add('--files');
  } else {
    dragAreaForm.classList.add('--error');
  }
}
function handleDrop() {
  dragArea.addEventListener('drop', event => {
    event.preventDefault();
    dragAreaForm.classList.remove('--active');
    const file = event.dataTransfer.files[0];
    isValidation(file);
  });
}
function handleChangeInput() {
  input.addEventListener('change', event => {
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

/***/ }),

/***/ "./src/js/scripts/dropdown.js":
/*!************************************!*\
  !*** ./src/js/scripts/dropdown.js ***!
  \************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.js-dropdown');
  if (dropdowns) {
    dropdowns.forEach(dropdown => {
      const inner = dropdown.querySelector('.js-dropdown-inner');
      const title = dropdown.querySelector('.js-dropdown-value');
      const labels = dropdown.querySelectorAll('.js-dropdown-item label');
      inner.addEventListener('click', () => {
        if (dropdown.classList.contains('--active')) {
          dropdown.classList.remove('--active');
        } else {
          dropdown.classList.add('--active');
        }
      });
      for (let index = 0; index < labels.length; index += 1) {
        labels[index].addEventListener('click', e => {
          if (title) {
            title.textContent = e.target.textContent;
            dropdown.classList.add('--filled');
          }
        });
      }
      document.addEventListener('click', event => {
        if (!event.target.closest('.js-dropdown-inner')) {
          dropdown.classList.remove('--active');
        }
      });
    });
  }
});

/***/ }),

/***/ "./src/js/scripts/header.js":
/*!**********************************!*\
  !*** ./src/js/scripts/header.js ***!
  \**********************************/
/***/ (() => {

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
      document.addEventListener('click', event => {
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

/***/ }),

/***/ "./src/js/scripts/inputs.js":
/*!**********************************!*\
  !*** ./src/js/scripts/inputs.js ***!
  \**********************************/
/***/ (() => {

const changeVisiblePassword = () => {
  const passInputs = document.querySelectorAll('.input--pass');
  if (passInputs) {
    passInputs.forEach(passInput => {
      const input = passInput.querySelector('input');
      const btnPass = passInput.querySelector('.input__btn');
      btnPass.addEventListener('mousedown', event => {
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
    inputErrors.forEach(inputError => {
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

/***/ }),

/***/ "./src/js/scripts/modals.js":
/*!**********************************!*\
  !*** ./src/js/scripts/modals.js ***!
  \**********************************/
/***/ (() => {

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
  modalBtns.forEach(modalBtn => {
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

  modalBtns.forEach(modalBtn => {
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

/***/ }),

/***/ "./src/js/scripts/more.js":
/*!********************************!*\
  !*** ./src/js/scripts/more.js ***!
  \********************************/
/***/ (() => {

const mores = document.querySelectorAll('.more-btns');
function handleMore() {
  if (mores) {
    mores.forEach(more => {
      const moreBtn = more.querySelector('.more-btns__btn');
      const moreContent = more.querySelector('.more-btns__content');
      moreBtn.addEventListener('click', () => {
        moreContent.classList.toggle('--active');
      });
    });
  }
}
document.addEventListener('click', event => {
  if (mores) {
    mores.forEach(more => {
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

/***/ }),

/***/ "./src/js/scripts/tippys.js":
/*!**********************************!*\
  !*** ./src/js/scripts/tippys.js ***!
  \**********************************/
/***/ (() => {

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const files = document.querySelectorAll('.js-notify-tippy');
  if (files && window.innerWidth > 1100) {
    files.forEach(file => {
      file.addEventListener('mouseover', event => {
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
            followCursor: true
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
    maxWidth: '200px'
  });
}

/***/ }),

/***/ "./node_modules/graph-modal/src/graph-modal.js":
/*!*****************************************************!*\
  !*** ./node_modules/graph-modal/src/graph-modal.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GraphModal)
/* harmony export */ });
class GraphModal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    }
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.graph-modal');
    this.speed = 300;
    this.animation = 'fade';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest(`[data-graph-path]`);
        if (clickedElement) {
          let target = clickedElement.dataset.graphPath;
          let animation = clickedElement.dataset.graphAnimation;
          let speed = clickedElement.dataset.graphSpeed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 300;
          this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`);
          this.open();
          return;
        }

        if (e.target.closest('.js-modal-close')) {
          this.close();
          return;
        }
      }.bind(this));

      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }

        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));

      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('graph-modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }

  }

  open(selector) {
    this.previousActiveElement = document.activeElement;

    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }

    this.modalContainer = this._nextContainer;

    if (selector) {
      this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
    }
    
    this.modalContainer.scrollTo(0, 0)

    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');

    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';

    this.disableScroll();

    this.modalContainer.classList.add('graph-modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('graph-modal-open');

      this.enableScroll();

      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();

      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement)
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graph_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graph-modal */ "./node_modules/graph-modal/src/graph-modal.js");
/* harmony import */ var _scripts_tippys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/tippys */ "./src/js/scripts/tippys.js");
/* harmony import */ var _scripts_tippys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_tippys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_inputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/inputs */ "./src/js/scripts/inputs.js");
/* harmony import */ var _scripts_inputs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_inputs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/header */ "./src/js/scripts/header.js");
/* harmony import */ var _scripts_header__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scripts_header__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scripts_more__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/more */ "./src/js/scripts/more.js");
/* harmony import */ var _scripts_more__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scripts_more__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scripts_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/dropdown */ "./src/js/scripts/dropdown.js");
/* harmony import */ var _scripts_dropdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scripts_dropdown__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scripts_drag_area__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scripts/drag-area */ "./src/js/scripts/drag-area.js");
/* harmony import */ var _scripts_drag_area__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scripts_drag_area__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _scripts_modals__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scripts/modals */ "./src/js/scripts/modals.js");
/* harmony import */ var _scripts_modals__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_scripts_modals__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _scripts_btn_up__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scripts/btn-up */ "./src/js/scripts/btn-up.js");
/* harmony import */ var _scripts_btn_up__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_scripts_btn_up__WEBPACK_IMPORTED_MODULE_8__);
// eslint-disable-next-line import/no-extraneous-dependencies










// eslint-disable-next-line no-unused-vars
const modal = new graph_modal__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;