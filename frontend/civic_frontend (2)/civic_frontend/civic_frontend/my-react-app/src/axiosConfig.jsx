// // publicAxios.js
// import axios from "axios";

// const publicAPI = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default publicAPI;

import axios from "axios";

const privateAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default privateAPI;

