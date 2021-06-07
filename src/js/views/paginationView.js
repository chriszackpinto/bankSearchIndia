import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _resultLength = document.getElementById("total-results");

  getLength() {
    return this._resultLength.value;
  }

  addHandlerSelect(handler) {
    this._resultLength.addEventListener("change", function (e) {
      handler();
    });
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-page");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.searchResults.length / this._data.resultsPerPage
    );

    const prevBtn = `<button data-goto='${
      curPage - 1
    }' class="btn-page pagination__btn--prev">
      <span>Page ${curPage - 1}</span>
    </button>`;
    const nextBtn = `<button data-goto='${
      curPage + 1
    }' class="btn-page pagination__btn--next">
      <span>Page ${curPage + 1}</span>
    </button>`;

    if (curPage === 1 && numPages > 1) {
      return nextBtn;
    }

    if (curPage === numPages && numPages > 1) {
      return prevBtn;
    }

    if (curPage < numPages) {
      return [prevBtn, nextBtn];
    }

    return "";
  }
}
export default new PaginationView();
