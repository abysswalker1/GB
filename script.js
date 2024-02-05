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

(function() {
  const settingsArticleInformation = document.getElementById('settings-article-information');
  new RadioPagination(settingsArticleInformation).init();

  const surveyForm = document.getElementById('opinion-form');
  surveyForm.addEventListener('submit', function(e) {
    e.preventDefault();
  });
}()); 
