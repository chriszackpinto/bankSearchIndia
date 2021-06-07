import * as model from "./model";
import listView from "./views/listView";
import searchView from "./views/searchView";
import paginationView from "./views/paginationView";
//polyfill es6 syntax to es5
import "core-js/stable";
import "regenerator-runtime/runtime";
import View from "./views/View";

const getBankList = async function () {
  try {
    const city = listView.getCity();
    model.state.resultsPerPage = paginationView.getLength();

    await model.loadBankList(city); //Load search results from API City

    // renderResults();
  } catch (error) {
    // console.error(`${error.message}`);
    listView.renderError(`${error.message}`);
  }
};

const controlPagination = function (goToPage) {
  listView.render(model.getListResultsPage(goToPage)); //Render NEW results

  paginationView.render(model.state); //Render NEW pagination buttons
};

const listLength = function () {
  model.state.page = 1;
  model.state.resultsPerPage = paginationView.getLength();
  listView.render(model.getListResultsPage(1)); //Render initial results
  paginationView.render(model.state);
};

const getSearchResults = function () {
  const query = searchView.getQuery();
  model.loadSearchResults(query);

  renderResults();
};

const renderResults = function () {
  listView.render(model.getListResultsPage()); //Render initial results
  paginationView.render(model.state); //Render pagination buttons
};

(function () {
  listView.addHandlerSelect(getBankList); //Render on city select
  listView.addHandlerRender(getBankList); // Render on page load
  paginationView.addHandlerSelect(listLength); //Render on result size select
  paginationView.addHandlerClick(controlPagination); //Render buttons

  listView.addHandlerInput(getSearchResults); //Search WIP
})();
