import * as model from "./model";
import listView from "./views/listView";
import paginationView from "./views/paginationView";

import "core-js/stable";
import "regenerator-runtime/runtime";

const getBankList = async function () {
  try {
    const city = listView.getCity();

    model.state.resultsPerPage = paginationView.getLength();
    await model.loadBankList(city); //Load search results

    listView.render(model.getListResultsPage()); //Render initial results

    paginationView.render(model.state); //Render pagination buttons
  } catch (error) {
    console.error(`${error.message}`);
  }
};
// getBankList();

const controlPagination = function (goToPage) {
  listView.render(model.getListResultsPage(goToPage)); //Render NEW results

  paginationView.render(model.state); //Render NEW pagination buttons
};

const listLength = function () {
  model.state.page = 1;
  model.state.resultsPerPage = paginationView.getLength();
  listView.render(model.getListResultsPage()); //Render initial results
};

const init = function () {
  listView.addHandlerSelect(getBankList);
  listView.addHandlerRender(getBankList);
  // paginationView.addHandlerSelect(getBankList);
  paginationView.addHandlerSelect(listLength);
  paginationView.addHandlerClick(controlPagination);
};
init();
