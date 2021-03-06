"use strict";

import * as model from "./model";
import listView from "./views/listView";
import searchView from "./views/searchView";
import tabView from "./views/tabView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
//polyfill es6 syntax to es5
import "core-js/stable";
import "regenerator-runtime/runtime";

const getBankList = async function () {
  try {
    const city = listView.getCity();
    model.state.resultsPerPage = paginationView.getLength();

    await model.loadBankList(city); //Load search results from API City

    listView.render(model.getListResultsPage()); //Render initial list
    paginationView.render(model.state); //Render initial pagination buttons
  } catch (error) {
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

  renderResults(1);
};

const renderResults = function (number) {
  listView.render(model.getListResultsPage(number)); //Render initial results
  paginationView.render(model.state); //Render pagination buttons
};

const controlBookmark = function (id) {
  //STABLE
  model.state.results.forEach((el) => {
    if (el.ifsc === id && el.bookmarked === "false") model.addBookmark(id);
    else if (el.ifsc === id && el.bookmarked === "true")
      model.deleteBookmark(id);
  });
  bookmarkList();
};

const bookmarkList = function () {
  bookmarksView.render(model.state.bookmarks); //render bookmark list on tab change
  listView.render(model.getListResultsPage()); //render search list on tab change
};

const newFeature = function () {
  console.log(`Welcome to the web application!`);
};

(function () {
  listView.addHandlerSelect(getBankList); //Render on city select
  listView.addHandlerRender(getBankList); // Render on page load
  listView.addHandlerBookmark(controlBookmark); //Add Bookmark

  bookmarksView.addHandlerBookmark(controlBookmark); //Add Bookmark

  paginationView.addHandlerSelect(listLength); //Render on result size select
  paginationView.addHandlerClick(controlPagination); //Render buttons

  searchView.addHandlerInput(getSearchResults); //Search

  tabView.addHandlerTab(bookmarkList);

  newFeature();
})();
