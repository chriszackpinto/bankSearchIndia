import View from "./View";

class SearchView extends View {
  // _data; //?
  _city = document.getElementById("city");
  _parentElement = document.querySelector(".table");
  _searchInput = document.getElementById("search-input");

  //   getCity() {
  //     return this._city.value;
  //   }
  //   addHandlerRender(handler) {
  //     window.addEventListener("load", function (e) {
  //       handler();
  //     });
  //   }
  //   addHandlerSelect(handler) {
  //     this._city.addEventListener("change", function (e) {
  //       handler();
  //     });
  //   }

  getQuery() {
    return this._searchInput.value;
  }

  addHandlerInput() {
    this._searchInput.addEventListener("keyup", function (e) {
      //   console.log(e.target.value);
      handler();
    });
  }

  _generateMarkup() {
    const tableHead = `
    <table>
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
      </tr>`;

    return `${tableHead}${this._data
      .map(this._generateMarkupPreview)
      .join(" ")}</table>`;
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
export default new SearchView();
