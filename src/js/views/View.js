export default class View {
  _errorMessage = "Whoops! Something went wrong. Please try again! :/";

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <p>${message}</p>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
