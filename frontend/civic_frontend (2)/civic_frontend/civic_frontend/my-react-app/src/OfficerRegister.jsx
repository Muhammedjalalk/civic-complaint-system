// import { useState } from "react";
// import API from "./axiosConfig"; // your axios instance
// import { useNavigate } from "react-router-dom";

// const OfficerRegister = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     designation: "",
//     place: "",
//     licence: "",
//     password: "",
//   });

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       await API.post("http://127.0.0.1:8000/api/officer/register/", formData); // API endpoint
//       setSuccess("✅ Officer registered successfully!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(JSON.stringify(err.response.data));
//       } else {
//         setError("❌ Registration failed");
//       }
//     }
//   };

//   return (
//     <div style={box}>
//       <h2>Officer Registration</h2>

//       {success && <p style={{ color: "green" }}>{success}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit} style={formStyle}>
//         <input name="name" placeholder="Name" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="department" placeholder="Department" onChange={handleChange} required />
//         <input name="designation" placeholder="Designation" onChange={handleChange} required />
//         <input name="place" placeholder="Place" onChange={handleChange} required />
//         <input name="license_number" placeholder="Licence Number" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// const box = {
//   maxWidth: "400px",
//   margin: "50px auto",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "10px",
//   textAlign: "center",
//   backgroundColor: "#f9f9f9",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
// };

// export default OfficerRegister;
// import { useState } from "react";
// import API from "./axiosConfig";
// import { useNavigate } from "react-router-dom";

// const OfficerRegister = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     designation: "",
//     place: "",
//     license_number: "",
//     password: "",
//   });

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       await API.post("/officer/register/", formData);
//       setSuccess("✅ Officer registered successfully!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(JSON.stringify(err.response.data));
//       } else {
//         setError("❌ Registration failed");
//       }
//     }
//   };

//   return (
//     <div style={box}>
//       <h2>Officer Registration</h2>

//       {success && <p style={{ color: "green" }}>{success}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit} style={formStyle}>
        
//         <input name="name" placeholder="Name" onChange={handleChange} required />

//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

//         {/* FIXED: Department dropdown */}
//         <select name="department" onChange={handleChange} required>
//           <option value="">Select Department</option>
//           <option value="Civic Infrastructure & Public Services">Civic Infrastructure & Public Services</option>
//           <option value="Water, Sanitation & Environment">Water, Sanitation & Environment</option>
//           <option value="Electricity & Energy">Electricity & Energy</option>
//           <option value="Healthcare & Education">Healthcare & Education</option>
//           <option value="Governance, Law & Public Safety">Governance, Law & Public Safety</option>
//           <option value="Other">Other</option>
//         </select>

//         <input name="designation" placeholder="Designation" onChange={handleChange} required />

//         <input name="place" placeholder="Place" onChange={handleChange} required />

//         <input name="license_number" placeholder="Licence Number" onChange={handleChange} required />

//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// const box = {
//   maxWidth: "400px",
//   margin: "50px auto",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "10px",
//   textAlign: "center",
//   backgroundColor: "#f9f9f9",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
// };

// export default OfficerRegister;


// import { useState } from "react";
// import API from "./axiosConfig";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./OfficerRegister.css"; // We'll create this CSS file

// const OfficerRegister = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     designation: "",
//     place: "",
//     licence: "",
//     password: "",
//   });
  
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Clear field-specific error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors({...formErrors, [name]: ""});
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!formData.department.trim()) errors.department = "Department is required";
//     if (!formData.designation.trim()) errors.designation = "Designation is required";
//     if (!formData.place.trim()) errors.place = "Place is required";
//     if (!formData.licence.trim()) errors.licence = "Licence number is required";
//     if (!formData.password) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       await API.post("http://127.0.0.1:8000/api/officer/register/", formData);
//       setSuccess("✅ Officer registered successfully! Redirecting to login...");
      
//       // Add success animation
//       document.querySelector(".register-card").classList.add("success-animation");
      
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       let errorMessage = "❌ Registration failed. Please try again.";
      
//       if (err.response && err.response.data) {
//         // Handle backend validation errors
//         const backendErrors = err.response.data;
//         if (typeof backendErrors === 'object') {
//           const errorMessages = [];
//           for (const key in backendErrors) {
//             errorMessages.push(`${key}: ${backendErrors[key]}`);
//           }
//           errorMessage = errorMessages.join(', ');
//         } else {
//           errorMessage = backendErrors;
//         }
//       }
      
//       setError(errorMessage);
      
//       // Add error animation
//       document.querySelector(".register-card").classList.add("error-animation");
//       setTimeout(() => {
//         document.querySelector(".register-card").classList.remove("error-animation");
//       }, 1000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="register-container d-flex align-items-center justify-content-center min-vh-100">
//       <div className="background-animation">
//         <div className="shape shape-1"></div>
//         <div className="shape shape-2"></div>
//         <div className="shape shape-3"></div>
//       </div>
      
//       <div className="register-card card border-0 shadow-lg animate-slide-up">
//         <div className="card-header bg-primary text-white py-4">
//           <div className="d-flex align-items-center justify-content-between">
//             <div>
//               <h2 className="mb-1">
//                 <i className="fas fa-user-shield me-2"></i>
//                 Officer Registration
//               </h2>
//               <p className="mb-0 opacity-75">Create your law enforcement account</p>
//             </div>
//             <div className="header-icon">
//               <i className="fas fa-badge-check"></i>
//             </div>
//           </div>
//         </div>
        
//         <div className="card-body p-4 p-md-5">
//           {success && (
//             <div className="alert alert-success d-flex align-items-center animate-fade-in" role="alert">
//               <i className="fas fa-check-circle me-2"></i>
//               <div>{success}</div>
//             </div>
//           )}
          
//           {error && (
//             <div className="alert alert-danger d-flex align-items-center animate-shake" role="alert">
//               <i className="fas fa-exclamation-triangle me-2"></i>
//               <div>{error}</div>
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="name" className="form-label">
//                   <i className="fas fa-user me-1 text-primary"></i> Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
//                   id="name"
//                   name="name"
//                   placeholder="Enter full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="email" className="form-label">
//                   <i className="fas fa-envelope me-1 text-primary"></i> Email Address
//                 </label>
//                 <input
//                   type="email"
//                   className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
//                   id="email"
//                   name="email"
//                   placeholder="Enter email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
//               </div>
//             </div>
            
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="department" className="form-label">
//                   <i className="fas fa-building me-1 text-primary"></i> Department
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${formErrors.department ? 'is-invalid' : ''}`}
//                   id="department"
//                   name="department"
//                   placeholder="e.g., Police Department"
//                   value={formData.department}
//                   onChange={handleChange}
//                   required
//                 />
//                 {formErrors.department && <div className="invalid-feedback">{formErrors.department}</div>}
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="designation" className="form-label">
//                   <i className="fas fa-id-badge me-1 text-primary"></i> Designation
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${formErrors.designation ? 'is-invalid' : ''}`}
//                   id="designation"
//                   name="designation"
//                   placeholder="e.g., Senior Officer"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   required
//                 />
//                 {formErrors.designation && <div className="invalid-feedback">{formErrors.designation}</div>}
//               </div>
//             </div>
            
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="place" className="form-label">
//                   <i className="fas fa-map-marker-alt me-1 text-primary"></i> Place
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${formErrors.place ? 'is-invalid' : ''}`}
//                   id="place"
//                   name="place"
//                   placeholder="City, State"
//                   value={formData.place}
//                   onChange={handleChange}
//                   required
//                 />
//                 {formErrors.place && <div className="invalid-feedback">{formErrors.place}</div>}
//               </div>
              
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="licence" className="form-label">
//                   <i className="fas fa-id-card me-1 text-primary"></i> Licence Number
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${formErrors.licence ? 'is-invalid' : ''}`}
//                   id="licence"
//                   name="licence"
//                   placeholder="Enter official licence number"
//                   value={formData.licence}
//                   onChange={handleChange}
//                   required
//                 />
//                 {formErrors.licence && <div className="invalid-feedback">{formErrors.licence}</div>}
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="password" className="form-label">
//                 <i className="fas fa-lock me-1 text-primary"></i> Password
//               </label>
//               <input
//                 type="password"
//                 className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
//                 id="password"
//                 name="password"
//                 placeholder="Create a strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
//               <div className="form-text">Must be at least 6 characters long</div>
//             </div>
            
//             <div className="d-grid gap-2">
//               <button 
//                 type="submit" 
//                 className="btn btn-primary btn-lg py-3"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-user-plus me-2"></i>
//                     Register Officer
//                   </>
//                 )}
//               </button>
              
//               <button 
//                 type="button" 
//                 className="btn btn-outline-secondary mt-2"
//                 onClick={() => navigate("/login")}
//               >
//                 <i className="fas fa-sign-in-alt me-2"></i>
//                 Already have an account? Login
//               </button>
//             </div>
//           </form>
          
//           <div className="mt-4 pt-3 border-top text-center">
//             <p className="text-muted small">
//               <i className="fas fa-shield-alt me-1"></i>
//               Your information is secured with encryption. By registering, you agree to our terms of service.
//             </p>
//           </div>
//         </div>
        
//         <div className="card-footer bg-light py-3 text-center">
//           <p className="mb-0 small">
//             <i className="fas fa-info-circle me-1"></i>
//             Need help? Contact administration at <strong>admin@lawenforcement.gov</strong>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfficerRegister;


// import { useState } from "react";
// import API from "./axiosConfig";
// import { useNavigate } from "react-router-dom";

// const OfficerRegister = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//     designation: "",
//     place: "",
//     license_number: "",
//     password: "",
//   });

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const departmentOptions = {
//     "Civic Infrastructure & Public Services": [
//       "Roads and Bridges Department",
//       "Public Works Department",
//       "Urban Development Authority",
//       "Transport Department",
//       "Municipal Corporation"
//     ],
//     "Water, Sanitation & Environment": [
//       "Water Supply Department",
//       "Sanitation Department",
//       "Environmental Protection Agency",
//       "Waste Management Board",
//       "Public Health Engineering"
//     ],
//     "Electricity & Energy": [
//       "Electricity Distribution Company",
//       "Power Department",
//       "Renewable Energy Board",
//       "Electrical Inspectorate",
//       "Energy Conservation Cell"
//     ],
//     "Healthcare & Education": [
//       "Health Department",
//       "Medical Services Directorate",
//       "Education Department",
//       "School Education Board",
//       "Higher Education Council"
//     ],
//     "Governance, Law & Public Safety": [
//       "Police Department",
//       "Fire and Rescue Services",
//       "District Administration",
//       "Legal Services Authority",
//       "Consumer Protection Cell"
//     ],
//     "other": [
//       "General Administration",
//       "Citizen Services Center",
//       "Grievance Redressal Cell",
//       "Information Technology Department"
//     ]
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === "category") {
//       setSelectedCategory(value);
//       setFormData({ ...formData, department: "" }); // Reset department when category changes
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       await API.post("/accounts/officer/register/", formData);
//       setSuccess("✅ Officer registered successfully!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(JSON.stringify(err.response.data));
//       } else {
//         setError("❌ Registration failed");
//       }
//     }
//   };

//   // Get departments based on selected category
//   const currentDepartments = departmentOptions[selectedCategory] || [];

//   return (
//     <div style={box}>
//       <h2>Officer Registration</h2>

//       {success && <p style={{ color: "green" }}>{success}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit} style={formStyle}>
        
//         <input name="name" placeholder="Name" onChange={handleChange} required />

//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

//         {/* Category Field */}
//         <select 
//           name="category" 
//           value={selectedCategory} 
//           onChange={handleChange} 
//           required
//           style={selectStyle}
//         >
//           <option value="">Select Category</option>
//           <option value="Civic Infrastructure & Public Services">Civic Infrastructure & Public Services</option>
//           <option value="Water, Sanitation & Environment">Water, Sanitation & Environment</option>
//           <option value="Electricity & Energy">Electricity & Energy</option>
//           <option value="Healthcare & Education">Healthcare & Education</option>
//           <option value="Governance, Law & Public Safety">Governance, Law & Public Safety</option>
//           <option value="other">Other</option>
//         </select>

//         {/* Department Field - Dependent on Category */}
//         <select 
//           name="department" 
//           value={formData.department} 
//           onChange={handleChange} 
//           required
//           disabled={!selectedCategory}
//           style={{
//             ...selectStyle,
//             opacity: selectedCategory ? 1 : 0.7
//           }}
//         >
//           <option value="">
//             {selectedCategory ? "Select Department" : "Please select category first"}
//           </option>
//           {currentDepartments.map((dept, index) => (
//             <option key={index} value={dept}>
//               {dept}
//             </option>
//           ))}
//         </select>

//         <input name="designation" placeholder="Designation" onChange={handleChange} required />

//         <input name="place" placeholder="Place" onChange={handleChange} required />

//         <input name="license_number" placeholder="Licence Number" onChange={handleChange} required />

//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// const box = {
//   maxWidth: "400px",
//   margin: "50px auto",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "10px",
//   textAlign: "center",
//   backgroundColor: "#f9f9f9",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
// };

// const selectStyle = {
//   padding: "10px",
//   borderRadius: "5px",
//   border: "1px solid #ccc",
// };

// export default OfficerRegister;

// import { useState, useEffect } from "react";
// import API from "./axiosConfig";
// import privateAPI from "./api/privateAxios";
// import { useNavigate } from "react-router-dom";

// const OfficerRegister = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     category: "",
//     department: "",
//     designation: "",
//     place: "",
//     license_number: "",
//     password: "",
//   });

//   const [categories, setCategories] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   /* ---------- FETCH CATEGORIES ---------- */
//   useEffect(() => {
//     privateAPI
//       .get("/accounts/CategoryList/")
//       .then((res) => setCategories(res.data))
//       .catch(() => setError("Failed to load categories"));
//   }, []);

//   /* ---------- FETCH DEPARTMENTS ---------- */
//   useEffect(() => {
//     if (!formData.category) return;

//     privateAPI
//       .get(`/accounts/departments/?category=${formData.category}`)
//       .then((res) => setDepartments(res.data))
//       .catch(() => setError("Failed to load departments"));
//   }, [formData.category]);

//   /* ---------- HANDLE INPUT ---------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "category" && { department: "" }),
//     }));
//   };

//   /* ---------- SUBMIT ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       await API.post("/accounts/register/officer/", formData);
//       setSuccess("Officer registered. Waiting for admin approval.");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div style={box}>
//       <h2>Officer Registration</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}

//       <form onSubmit={handleSubmit} style={formStyle}>
//         <input
//           name="full_name"
//           placeholder="Full Name"
//           value={formData.full_name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />

//         <select name="category" value={formData.category} onChange={handleChange} required>
//           <option value="">Select Category</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>{c.name}</option>
//           ))}
//         </select>

//         <select
//           name="department"
//           value={formData.department}
//           onChange={handleChange}
//           required
//           disabled={!formData.category}
//         >
//           <option value="">Select Department</option>
//           {departments.map((d) => (
//             <option key={d.id} value={d.id}>{d.name}</option>
//           ))}
//         </select>

//         <input name="designation" placeholder="Designation" onChange={handleChange} required />
//         <input name="place" placeholder="Place" onChange={handleChange} required />
//         <input name="license_number" placeholder="License Number" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// /* ---------- STYLES ---------- */
// const box = { maxWidth: 400, margin: "40px auto", padding: 20 };
// const formStyle = { display: "flex", flexDirection: "column", gap: 10 };

// export default OfficerRegister;


import { useState, useEffect } from "react";
import API from "./axiosConfig";
import privateAPI from "./api/privateAxios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const OfficerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    category: "",
    department: "",
    designation: "",
    place: "",
    license_number: "",
    password: "",
    confirm_password: "",
  });

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  /* ---------- FETCH CATEGORIES ---------- */
  useEffect(() => {
    privateAPI
      .get("/accounts/CategoryList/")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));
  }, []);

  /* ---------- FETCH DEPARTMENTS ---------- */
  useEffect(() => {
    if (!formData.category) {
      setDepartments([]);
      return;
    }

    privateAPI
      .get(`/accounts/departments/?category=${formData.category}`)
      .then((res) => setDepartments(res.data))
      .catch(() => setError("Failed to load departments"));
  }, [formData.category]);

  /* ---------- PASSWORD STRENGTH CHECK ---------- */
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  /* ---------- HANDLE INPUT ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { department: "" }),
    }));
    setError("");
  };

  /* ---------- VALIDATE FORM ---------- */
  const validateForm = () => {
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Remove confirm_password from data sent to backend
      const { confirm_password, ...submitData } = formData;
      
      await API.post("/accounts/register/officer/", submitData);
      setSuccess("Officer registered successfully! Waiting for admin approval.");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-secondary";
    if (passwordStrength <= 2) return "bg-danger";
    if (passwordStrength === 3) return "bg-warning";
    return "bg-success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Medium";
    return "Strong";
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0">
            <div className="row g-0">
              {/* Left Side - Registration Form */}
              <div className="col-md-7">
                <div className="card-body p-4 p-md-5">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-2">
                      <i className="bi bi-person-badge me-2"></i>
                      Officer Registration
                    </h2>
                    <p className="text-muted">Register to join the complaint management system</p>
                  </div>

                  {/* Error/Success Messages */}
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                      <button type="button" className="btn-close" onClick={() => setError("")}></button>
                    </div>
                  )}

                  {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      {success}
                    </div>
                  )}

                  {/* Registration Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      {/* Full Name */}
                      <div className="col-md-6">
                        <label htmlFor="full_name" className="form-label fw-medium">
                          <i className="bi bi-person me-1"></i> Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="full_name"
                          name="full_name"
                          placeholder="Enter full name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label fw-medium">
                          <i className="bi bi-envelope me-1"></i> Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label fw-medium">
                          <i className="bi bi-telephone me-1"></i> Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Enter 10-digit phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div className="col-md-6">
                        <label htmlFor="category" className="form-label fw-medium">
                          <i className="bi bi-tags me-1"></i> Category *
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Department */}
                      <div className="col-md-6">
                        <label htmlFor="department" className="form-label fw-medium">
                          <i className="bi bi-building me-1"></i> Department *
                        </label>
                        <select
                          className="form-select"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          required
                          disabled={!formData.category}
                        >
                          <option value="">Select Department</option>
                          {departments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        {!formData.category && (
                          <small className="text-muted">Please select a category first</small>
                        )}
                      </div>

                      {/* Designation */}
                      <div className="col-md-6">
                        <label htmlFor="designation" className="form-label fw-medium">
                          <i className="bi bi-briefcase me-1"></i> Designation *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="designation"
                          name="designation"
                          placeholder="Enter designation"
                          value={formData.designation}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Place */}
                      <div className="col-md-6">
                        <label htmlFor="place" className="form-label fw-medium">
                          <i className="bi bi-geo-alt me-1"></i> Place *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="place"
                          name="place"
                          placeholder="Enter place/city"
                          value={formData.place}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* License Number */}
                      <div className="col-md-6">
                        <label htmlFor="license_number" className="form-label fw-medium">
                          <i className="bi bi-card-checklist me-1"></i> License Number *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="license_number"
                          name="license_number"
                          placeholder="Enter license number"
                          value={formData.license_number}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label fw-medium">
                          <i className="bi bi-lock me-1"></i> Password *
                        </label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                          </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {formData.password && (
                          <div className="mt-2">
                            <div className="d-flex justify-content-between mb-1">
                              <small>Password Strength:</small>
                              <small className={`fw-bold text-${passwordStrength <= 2 ? "danger" : passwordStrength === 3 ? "warning" : "success"}`}>
                                {getPasswordStrengthText()}
                              </small>
                            </div>
                            <div className="progress" style={{ height: "5px" }}>
                              <div
                                className={`progress-bar ${getPasswordStrengthColor()}`}
                                style={{ width: `${passwordStrength * 25}%` }}
                              ></div>
                            </div>
                            <small className="text-muted">
                              Use at least 8 characters with uppercase, numbers & symbols
                            </small>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="col-md-6">
                        <label htmlFor="confirm_password" className="form-label fw-medium">
                          <i className="bi bi-lock-fill me-1"></i> Confirm Password *
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm_password"
                          name="confirm_password"
                          placeholder="Confirm password"
                          value={formData.confirm_password}
                          onChange={handleChange}
                          required
                        />
                        {formData.confirm_password && formData.password !== formData.confirm_password && (
                          <small className="text-danger">Passwords do not match</small>
                        )}
                        {formData.confirm_password && formData.password === formData.confirm_password && (
                          <small className="text-success">Passwords match</small>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Registering...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-plus me-2"></i>
                            Register Officer
                          </>
                        )}
                      </button>

                      <div className="text-center mt-3">
                        <p className="text-muted mb-0">
                          Already have an account?{" "}
                          <a
                            href="/login"
                            className="text-decoration-none fw-medium"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/login");
                            }}
                          >
                            Login here
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Side - Info Panel */}
              <div className="col-md-5 bg-primary text-white">
                <div className="card-body p-4 p-md-5 d-flex flex-column h-100">
                  <div className="text-center mb-4">
                    <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex p-4 mb-3">
                      <i className="bi bi-shield-check display-4"></i>
                    </div>
                    <h3 className="fw-bold">Join Our Team</h3>
                    <p className="opacity-75">
                      Register as an officer to help manage and resolve complaints efficiently
                    </p>
                  </div>

                  <div className="mt-auto">
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-info-circle me-2"></i>
                      Registration Requirements
                    </h5>
                    
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                        <i className="bi bi-check-lg"></i>
                      </div>
                      <div>
                        <h6 className="fw-medium">Valid License</h6>
                        <small className="opacity-75">Must have a valid professional license</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                        <i className="bi bi-check-lg"></i>
                      </div>
                      <div>
                        <h6 className="fw-medium">Admin Approval</h6>
                        <small className="opacity-75">Account requires admin verification</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-4">
                      <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                        <i className="bi bi-check-lg"></i>
                      </div>
                      <div>
                        <h6 className="fw-medium">Secure Login</h6>
                        <small className="opacity-75">All accounts are encrypted and secure</small>
                      </div>
                    </div>

                    <div className="alert alert-light alert-dismissible fade show mt-4" role="alert">
                      <i className="bi bi-shield-exclamation text-primary me-2"></i>
                      <small>
                        Your registration will be reviewed by admin. You'll receive an email once approved.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-4">
            <p className="text-muted">
              <small>
                <i className="bi bi-shield-lock me-1"></i>
                Your information is protected by 256-bit SSL encryption
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerRegister;