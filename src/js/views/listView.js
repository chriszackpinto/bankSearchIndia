import View from "./View";

class ListView extends View {
  _city = document.getElementById("city");
  _parentElement = document.querySelector(".table");
  _searchInput = document.getElementById("search-input");
  _errorMessage = "No match found, please try with a different search!";
  getCity() {
    return this._city.value;
  }
  addHandlerRender(handler) {
    window.addEventListener("load", function (e) {
      handler();
    });
  }
  addHandlerSelect(handler) {
    this._city.addEventListener("change", function (e) {
      handler();
    });
  }

  addHandlerInput(handler) {
    this._searchInput.addEventListener("keyup", function (e) {
      handler();
    });
  }

  _generateMarkup() {
    const tableHead = `
    <table>
      <thead>
        <tr>
          <th>IFSC</th>
          <th>BANK ID</th>
          <th>BRANCH</th>
          <th>ADDRESS</th>
          <th>CITY</th>
          <th>DISTRICT</th>
          <th>STATE</th>
          <th>BANK NAME</th>
          <th>BOOKMARK</th>
        </tr>
      </thead>
      <tbody>`;

    return `${tableHead}${this._data
      .map(this._generateMarkupPreview)
      .join(" ")}</tbody></table>`;
  }

  _generateMarkupPreview(result) {
    return `
      <tr>
        <td>${result.ifsc}</td>
        <td>${result.bankID}</td>
        <td>${result.branch}</td>
        <td>${result.address}</td>
        <td>${result.city}</td>
        <td>${result.district}</td>
        <td>${result.state}</td>
        <td>${result.bankName}</td>
      </tr>
  `;
  }
}
export default new ListView();
