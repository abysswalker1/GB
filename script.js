class RadioPagination {
  constructor(block) {
    this.block = block;
    this.radios = [
      ...this.block.querySelectorAll(".js-radio-pagination INPUT"),
    ];
    this.values = this.radios.map((radio) => radio.value);
  }
  changeMode(radioValue) {
    this.values.forEach((value) => {
      const neededPage = document.getElementById(value);
      if (value === radioValue) {
        neededPage.style.display = "";
      } else {
        neededPage.style.display = "none";
      }
    });
  }
  init() {
    this.radios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.changeMode(radio.value);
      });
    });
    const currentChecked = this.radios.find((radio) => radio.checked);
    this.changeMode(currentChecked.value);
  };
};

class Modal {
  constructor(id) {
    this.window = document.getElementById(id);
    this.modal = this.window.querySelector('.modal');
    this.closeBtn = this.modal.querySelector('.modal-close');
  };

  open() {
    this.window.classList.add('opened');
    this.window.addEventListener('click', (e) => this._handleClick(e));
    this.closeBtn?.addEventListener('click', () => this.close());
  };

  close() {
    this.window.removeEventListener('click', (e) => this._handleClick(e));
    this.closeBtn?.removeEventListener('click', () => this.close());
    this.window.classList.remove('opened');
  };

  _handleClick(e) {
    if (e.target === this.window) {
      this.close();
    }
  }
}


(function() {
  const settingsArticleInformation = document.getElementById('settings-article-information');
  new RadioPagination(settingsArticleInformation).init();

  const modalButtons = document.querySelectorAll('[data-modal-id]');

  modalButtons.forEach(btn => {
    const id = btn.dataset.modalId;
    const modal = new Modal(id);

    btn.addEventListener('click', () => modal.open());
  })

  const opinionForm = document.getElementById('opinion-form');
  opinionForm.addEventListener('submit', function(e) {
    e.preventDefault();
  });
}());

// const breakpoints = {
//   max: () => document.body.clientWidth > 1440,
//   medium: () => document.body.clientWidth <= 1440,
//   small: () => document.body.clientWidth <= 768,
// };

// class NodeReplace {
//   constructor(nodes) {
//     this.element = nodes.element;
//     this.firstPlace = nodes.firstPlace;
//     this.secondPlace = nodes.secondPlace;
//   }
//   replace() {

//   }
// }

// window.addEventListener('resize', function() {

// });