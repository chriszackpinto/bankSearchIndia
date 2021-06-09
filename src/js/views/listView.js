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

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark");
      if (!btn) return;
      btn.classList.toggle("bookmark--active");
      const row = btn.closest(".table-row");
      handler(row.id);
    });
  }

  _generateMarkup() {
    const tableHead = `
    <table width="1366px">
    <col style="width:10%">
	<col style="width:5%">
	<col style="width:15%">
	<col style="width:25%">
	<col style="width:10%">
	<col style="width:10%">
	<col style="width:10%">
	<col style="width:10%">
	<col style="width:5%">
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
      <tr id="${result.ifsc}" class="table-row">
        <td>${result.ifsc}</td>
        <td>${result.bankID}</td>
        <td>${result.branch}</td>
        <td>${result.address}</td>
        <td>${result.city}</td>
        <td>${result.district}</td>
        <td>${result.state}</td>
        <td>${result.bankName}</td>
        <td><svg class="bookmark ${
          result.bookmarked === "true" ? "bookmark--active" : ""
        }" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
     <g> 
       <g>
         <path d="M416.667,0H95.333c-8.284,0-15,6.716-15,15v482c0,6.067,3.655,11.536,9.26,13.858c1.856,0.769,3.805,1.142,5.737,1.142
           c3.904,0,7.74-1.523,10.61-4.394l150.063-150.061L406.06,507.606c4.29,4.29,10.742,5.573,16.347,3.252
           c5.605-2.322,9.26-7.791,9.26-13.858V15C431.667,6.716,424.951,0,416.667,0z M256.002,321.332c-3.978,0-7.793,1.58-10.606,4.394
           L110.333,460.787V30h291.333v430.785L266.609,325.726C263.796,322.912,259.981,321.332,256.002,321.332z"/>
       </g>
     </g>
     </svg></td>
      </tr>
  `;
  }
}
export default new ListView();
