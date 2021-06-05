export const API_URL = `https://vast-shore-74260.herokuapp.com/banks?city=`;
export const TIMEOUT_SEC = 10;

const example = {
  ifsc: "ABHY0065001",
  bank_id: 60,
  branch: "RTGS-HO",
  address:
    "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
  city: "MUMBAI",
  district: "GREATER MUMBAI",
  state: "MAHARASHTRA",
  bank_name: "ABHYUDAYA COOPERATIVE BANK LIMITED",
};

// const res = await fetch(
//   `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
// );
// const data = await res.json();
// if (!res.ok) return;

// const markup = `
//   <div class="spinner">
//     <svg>
//       <use href="../icons.svg"></use>
//     </svg>
//   </div>
//   `;
// body.innerHTML = "";
// body.insertAdjacentHTML("afterbegin", markup);
