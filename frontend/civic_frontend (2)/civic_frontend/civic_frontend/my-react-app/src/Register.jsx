
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     user_type: "citizen",
//     phone: "",
//     licence: "",
//     photo: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "photo") {
//       setForm({ ...form, photo: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const apiUrl =
//       form.user_type === "officer"
//         ? "http://127.0.0.1:8000/api/officer/register/"
//         : "http://127.0.0.1:8000/api/citizen/register/";

//     const formData = new FormData();
//     formData.append("username", form.username);
//     formData.append("email", form.email);
//     formData.append("password", form.password);
//     formData.append("user_type", form.user_type);
//     formData.append("phone", form.phone);
//     formData.append("licence", form.licence);
//     formData.append("photo", form.photo);

//     try {
//       const res = await axios.post(apiUrl, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Success:", res.data);
//       alert("Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.log("ERROR FULL:", err);

//       if (err.response && err.response.data) {
//         alert("Error: " + JSON.stringify(err.response.data));
//       } else {
//         alert("Server not responding or network error");
//       }
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{ backgroundColor: "#e9eef3" }}
//     >
//       <div
//         className="card p-4 shadow-lg"
//         style={{ width: "440px", borderRadius: "15px" }}
//       >
//         <h3 className="text-center mb-4 fw-bold">SIGN UP</h3>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           {/* Username */}
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               name="username"
//               onChange={handleChange}
//               placeholder="Enter Username"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               name="email"
//               type="email"
//               onChange={handleChange}
//               placeholder="Enter Email"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               name="password"
//               type="password"
//               onChange={handleChange}
//               placeholder="Enter Password"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div className="mb-3">
//             <label className="form-label">Phone</label>
//             <input
//               name="phone"
//               type="text"
//               onChange={handleChange}
//               placeholder="Enter Phone Number"
//               className="form-control"
//             />
//           </div>

//           {/* Licence */}
//           <div className="mb-3">
//             <label className="form-label">Licence</label>
//             <input
//               name="licence"
//               type="text"
//               onChange={handleChange}
//               placeholder="Enter Licence Number"
//               className="form-control"
//             />
//           </div>

//           {/* Photo */}
//           <div className="mb-3">
//             <label className="form-label">Profile Photo</label>
//             <input
//               name="photo"
//               type="file"
//               onChange={handleChange}
//               className="form-control"
//               accept="image/*"
//             />
//           </div>

//           {/* User Type */}
//           <div className="mb-3">
//             <label className="form-label">User Type</label>
//             <select
//               name="user_type"
//               value={form.user_type}
//               onChange={handleChange}
//               className="form-select"
//             >
//               <option value="citizen">Citizen</option>
//               <option value="officer">Officer</option>
//             </select>
//           </div>

//           <button
//             className="btn btn-primary w-100 mt-2"
//             style={{ borderRadius: "20px" }}
//           >
//             Create Account
//           </button>
//         </form>

//         <p className="text-center mt-3">
//           Already have an account?{" "}
//           <Link to="/login" className="fw-bold text-primary">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     user_type: "citizen",
//     phone: "",
//     licence: "",
//     photo: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "photo") {
//       setForm({ ...form, photo: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const apiUrl =
//       form.user_type === "officer"
//         ? "http://127.0.0.1:8000/api/officer/register/"
//         : "http://127.0.0.1:8000/api/citizen/register/";

//     const formData = new FormData();
//     formData.append("username", form.username);
//     formData.append("email", form.email);
//     formData.append("password", form.password);
//     formData.append("user_type", form.user_type);
//     formData.append("phone", form.phone);
//     formData.append("licence", form.licence);

//     // ✅ Only send photo if selected (prevents 500 crash)
//     if (form.photo) {
//       formData.append("photo", form.photo);
//     }

//     try {
//       const res = await axios.post(apiUrl, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ SUCCESS:", res.data);
//       alert("Registered successfully!");
//       navigate("/Login");
//     } catch (err) {
//       console.error("❌ FULL ERROR:", err);

//       if (err.response) {
//         console.error("❌ BACKEND RESPONSE:", err.response.data);
//         alert("Backend Error: " + JSON.stringify(err.response.data));
//       } else if (err.request) {
//         alert("❌ Server not responding. Is Django running?");
//       } else {
//         alert("❌ Error: " + err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{ backgroundColor: "#e9eef3" }}
//     >
//       <div
//         className="card p-4 shadow-lg"
//         style={{ width: "440px", borderRadius: "15px" }}
//       >
//         <h3 className="text-center mb-4 fw-bold">SIGN UP</h3>

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           {/* Username */}
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               placeholder="Enter Username"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Enter Email"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               name="password"
//               type="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="Enter Password"
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div className="mb-3">
//             <label className="form-label">Phone</label>
//             <input
//               name="phone"
//               type="text"
//               value={form.phone}
//               onChange={handleChange}
//               placeholder="Enter Phone Number"
//               className="form-control"
//             />
//           </div>

//           {/* Licence */}
//           <div className="mb-3">
//             <label className="form-label">Licence</label>
//             <input
//               name="licence"
//               type="text"
//               value={form.licence}
//               onChange={handleChange}
//               placeholder="Enter Licence Number"
//               className="form-control"
//             />
//           </div>

//           {/* Photo */}
//           <div className="mb-3">
//             <label className="form-label">Profile Photo</label>
//             <input
//               name="photo"
//               type="file"
//               onChange={handleChange}
//               className="form-control"
//               accept="image/*"
//             />
//           </div>

//           {/* User Type */}
//           <div className="mb-3">
//             <label className="form-label">User Type</label>
//             <select
//               name="user_type"
//               value={form.user_type}
//               onChange={handleChange}
//               className="form-select"
//             >
//               <option value="citizen">Citizen</option>
//               <option value="officer">Officer</option>
//             </select>
//           </div>

//           <button
//             className="btn btn-primary w-100 mt-2"
//             style={{ borderRadius: "20px" }}
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <p className="text-center mt-3">
//           Already have an account?{" "}
//           <Link to="/login" className="fw-bold text-primary">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;
