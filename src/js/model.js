import { _ } from "core-js";
import { API_URL, TIMEOUT_SEC } from "./config.js";

export const state = {
  page: 1,
  resultsPerPage: 25,
  query: " ",
  results: [],
  searchResults: [],
  bookmarks: [],
};
// Timeout for API delay
const timeout = function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(
        new Error(`Request took too long. Timeout after ${seconds} seconds`)
      );
    }, seconds * 1000);
  });
};
// Load city bank list
export const loadBankList = async function (city) {
  try {
    const res = await Promise.race([
      fetch(`${API_URL}${city}`),
      timeout(TIMEOUT_SEC),
    ]);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const data = await res.json();

    state.results = data.map((el) => {
      return {
        ifsc: el.ifsc + "",
        bankID: el.bank_id + "",
        branch: el.branch + "",
        address: el.address + "",
        city: el.city + "",
        district: el.district + "",
        state: el.state + "",
        bankName: el.bank_name + "",
        bookmarked: "false",
      };
    });
  } catch (error) {
    throw error;
  }
};
export const getListResultsPage = function (page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.searchResults.slice(start, end);
};

export const loadSearchResults = function (query) {
  state.query = query.toUpperCase();

  if (!state.results.length) return;

  state.searchResults = state.results.filter((bank) =>
    Object.values(bank).some((_) => _.includes(state.query))
  );
  // if (!state.query.length) {
  //    state.searchResults = [];
  //    return new Error(`Start typing to search!`);
  // }
};

const localBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (id) {
  state.results.forEach((el) => {
    if (id === el.ifsc) {
      el.bookmarked = "true"; //Mark bookmark true
      state.bookmarks.push(el); //Add Bookmark
    }
  });
  localBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => {
    el.ifsc === id;
  });
  state.bookmarks.splice(index, 1); //Delete bookmark

  state.results.forEach((el) => {
    if (id === el.ifsc) {
      el.bookmarked = "false"; //Mark bookmark false
    }
  });
  localBookmarks();
};

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();
