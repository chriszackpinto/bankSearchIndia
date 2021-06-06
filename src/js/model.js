import { API_URL, TIMEOUT_SEC } from "./config.js";

export const state = {
  page: 1,
  resultsPerPage: 25,
  query: "",
  results: [],
  searchResults: [],
};

const timeout = function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(
        new Error(`Request took too long. Timeout after ${seconds} seconds`)
      );
    }, seconds * 1000);
  });
};

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
        ifsc: el.ifsc,
        bankID: el.bank_id,
        branch: el.branch,
        address: el.address,
        city: el.city,
        district: el.district,
        state: el.state,
        bankName: el.bank_name,
      };
    });

    console.log(state.results);
  } catch (error) {
    throw error;
  }
};
export const getListResultsPage = function (page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.results.slice(start, end); // might have to chane to filtered list
};

//Test Search
// export const getSearchResultsPage = function (page = state.page) {
//   state.page = page;
//   const start = (page - 1) * state.resultsPerPage;
//   const end = page * state.resultsPerPage;

//   return state.results.slice(start, end);
// };
export const loadSearchResults = function (query) {
  state.query = query.toUpperCase();
  console.log(state.query);

  return (state.searchResults = state.results.map((el) => console.log(el)));
  // el.filter((v) => Object.values(v).includes(state.query))
  console.log(state.searchResults);
};
// const values = Object.values(res);
// values.forEach((val) => {
//   console.log(val);
// });
// console.log(state.searchResults.slice(1, 10));
// console.log(state.query);
// console.log(Object.values(res));
// let filteredList5 = this.state.freights.filter((freight) => {
//   let search = this.state.search.toLowerCase();
//   var values = Object.values(freight);
//   var flag = false;
//   values.forEach((val) => {
//     if (val.toLoweCase().indexOf(search) > -1) {
//       flag = true;
//       return;
//     }
//   });
// });

// map((res) => {
//   return {
//     id: rec.id,
//     title: rec.title,
//     publisher: rec.publisher,
//     image: rec.image_url,
//   };
// });
