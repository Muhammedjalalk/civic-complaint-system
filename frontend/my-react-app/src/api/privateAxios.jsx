// import axios from "axios";

// const privateAPI = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// privateAPI.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default privateAPI;
// import axios from "axios";

// const privateAPI = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Attach JWT automatically
// privateAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default privateAPI;

// import axios from "axios";

// const privateAPI = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// privateAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠ No access token found in localStorage!");
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default privateAPI;
// import axios from "axios";

// const privateAPI = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// privateAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");  // use accessToken
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠ No access token found in localStorage!");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default privateAPI;

import axios from "axios";

const privateAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

privateAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default privateAPI;

