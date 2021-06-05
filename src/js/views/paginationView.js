import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-page");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log("hello there");
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevBtn = ` <button data-goto='${
      curPage - 1
    }' class="btn-page pagination__btn--prev">
      <span>Page ${curPage - 1}</span>
    </button>`;
    const nextBtn = `  <button data-goto='${
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
