import View from "./View";

class SearchView extends View {
  _city = document.getElementById("city");
  _parentElement = document.querySelector(".table");
  _searchInput = document.getElementById("search-input");

  getQuery() {
    return this._searchInput.value;
  }
}
export default new SearchView();
