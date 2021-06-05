import * as model from "./model";
import listView from "./views/listView";
import paginationView from "./views/paginationView";

import "core-js/stable";
import "regenerator-runtime/runtime";

const getBankList = async function () {
  try {
    const city = listView.getCity();

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

  paginationView.render(model.state.search); //Render NEW pagination buttons
};

const init = function () {
  listView.addHandlerSelect(getBankList);
  paginationView.addHandlerClick(controlPagination);
};
init();
