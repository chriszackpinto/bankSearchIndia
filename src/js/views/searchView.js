import View from "./View";

class SearchView extends View {
  _city = document.getElementById("city");
  _parentElement = document.querySelector(".table");
  _searchInput = document.getElementById("search-input");

  getQuery() {
    return this._searchInput.value;
  }

  addHandlerInput(handler) {
    this._searchInput.addEventListener("keyup", function (e) {
      handler();
    });
  }
}
export default new SearchView();
