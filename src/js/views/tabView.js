class TabView {
  tabsContainer = document.querySelector(".operations__tab-container");

  addHandlerTab(handler) {
    this.tabsContainer.addEventListener("click", function (e) {
      const clicked = e.target.closest(".operations__tab");
      if (!clicked) return;

      document
        .querySelectorAll(".operations__tab")
        .forEach((t) => t.classList.remove("operations__tab--active"));

      document
        .querySelectorAll(".operations__content")
        .forEach((c) => c.classList.remove("operations__content--active"));

      clicked.classList.add("operations__tab--active");

      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");

      handler();
    });
  }
}
export default new TabView();
