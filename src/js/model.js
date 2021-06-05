import { API_URL, TIMEOUT_SEC } from "./config.js";

export const state = {
  page: 1,
  resultsPerPage: 25,
  results: [],
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

  return state.results.slice(start, end);
};
