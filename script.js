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
    this.id = id;
    this.window = document.getElementById(id);
    this.modal = this.window.querySelector('.modal');
    this.closeBtn = this.window.querySelector('.modal-close');
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

const checkViewportSize = () => {
  const viewportSize = window.innerWidth;

  if (viewportSize > 1200) {
    return 'max';
  } else if (viewportSize <= 1200) {
    return 'medium';
  } else if (viewportSize <= 767) {
    return 'small';
  }
}

(function() {
  // Переключение статей в секции Дополнительная информация 
  const settingsArticleInformation = document.getElementById('settings-article-information');
  new RadioPagination(settingsArticleInformation).init();

  // Инициализация всех модальных окон
  const modalButtons = document.querySelectorAll('[data-modal-id]');
  const modalList = [];

  modalButtons.forEach(btn => {
    const id = btn.dataset.modalId;
    const modal = new Modal(id);
    modalList.push(modal);

    btn.addEventListener('click', () => modal.open());
  });

  // Для всех будущих раскрывающихся списков (мобильная версия сайдбара статьи)
  const expandinglistButtons = document.querySelectorAll(".js-expanding-list-btn");

  expandinglistButtons.forEach((expand) => {
    expand.addEventListener("click", () => {
      const parent = expand.parentElement;
      const isExpanded = parent.classList.contains("expanded");
      if (isExpanded) {
        parent.classList.remove("expanded");
      } else {
        parent.classList.add("expanded");
      } 
    });
  });

  // Перемещение навигации в мобильное меню и обратно
  const moveNavigation = (isMobile) => {
    const navigation = document.getElementById('navigation');
    const sidebar = document.querySelector('.sidebar');
    const mobileMenu = modalList.find(modal => modal.id === "mobile-navigation-modal");
    const { modal } = mobileMenu;
    
    if (isMobile) {
      if (navigation.parentElement === sidebar) {
        sidebar.removeChild(navigation);
        modal.appendChild(navigation);
      }    
    } else {
      if (navigation.parentElement === modal) {
        modal.removeChild(navigation);
        sidebar.appendChild(navigation);
      }
      mobileMenu.close();
    }
  }

  const mobileNavigationObserve = () => {
    const viewportSize = checkViewportSize();
    const isMobile = viewportSize != 'max';
    moveNavigation(isMobile)  
  }

  window.addEventListener('resize', mobileNavigationObserve);
  mobileNavigationObserve();

  //Сброс загрузки для секции Понравилась статья
  const opinionForm = document.getElementById('opinion-form');
  opinionForm.addEventListener('submit', (e) => e.preventDefault());
}());