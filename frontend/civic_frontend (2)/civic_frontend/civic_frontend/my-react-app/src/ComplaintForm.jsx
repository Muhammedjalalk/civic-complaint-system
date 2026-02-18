// import React, { useState } from "react";
// import privateAPI from "./api/privateAxios"; // Use your JWT axios instance

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "",
//     location: "",
//     description: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   // Submit complaint
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       await privateAPI.post("/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Complaint Submitted Successfully");

//       // Clear form
//       setFormData({
//         category: "",
//         priority: "",
//         location: "",
//         description: "",
//         attachment: null,
//       });

//       e.target.reset();
//     } catch (err) {
//       console.error("Complaint submission error:", err);
//       alert("Submission Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4" style={{ maxWidth: "500px" }}>
//       <h2 className="mb-3">Submit Complaint</h2>

//       <form onSubmit={handleSubmit}>
        
//         <input
//           className="form-control mb-3"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />

//         <select
//           className="form-control mb-3"
//           name="priority"
//           value={formData.priority}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Priority</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>

//         <input
//           className="form-control mb-3"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           className="form-control mb-3"
//           name="description"
//           placeholder="Describe your issue"
//           value={formData.description}
//           onChange={handleChange}
//           rows={4}
//           required
//         />

//         <input
//           type="file"
//           className="form-control mb-3"
//           name="attachment"
//           onChange={handleChange}
//         />

//         <button
//           className="btn btn-primary w-100"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Complaint"}
//         </button>
//       </form>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import privateAPI from "./api/privateAxios"; // JWT axios
// import "animate.css";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "",
//     location: "",
//     description: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       await privateAPI.post("/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Complaint Submitted Successfully");

//       setFormData({
//         category: "",
//         priority: "",
//         location: "",
//         description: "",
//         attachment: null,
//       });

//       e.target.reset();
//     } catch (err) {
//       console.error("Complaint submission error:", err);
//       alert("Submission Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-7 col-md-9 col-sm-12">
//           <div className="card shadow-lg border-0 animate__animated animate__fadeInUp">
//             <div className="card-body p-5">
//               <h2 className="card-title text-center mb-4 fw-bold text-primary">
//                 Submit Your Complaint
//               </h2>
//               <p className="text-center text-muted mb-4">
//                 Fill out the form below and our team will respond shortly.
//               </p>

//               <form onSubmit={handleSubmit}>
//                 {/* Category */}
//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="category"
//                     name="category"
//                     placeholder="Category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label htmlFor="category">Category</label>
//                 </div>

//                 {/* Priority */}
//                 <div className="form-floating mb-3">
//                   <select
//                     className="form-select"
//                     id="priority"
//                     name="priority"
//                     value={formData.priority}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Priority</option>
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </select>
//                   <label htmlFor="priority">Priority</label>
//                 </div>

//                 {/* Location */}
//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="location"
//                     name="location"
//                     placeholder="Location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label htmlFor="location">Location</label>
//                 </div>

//                 {/* Description */}
//                 <div className="form-floating mb-3">
//                   <textarea
//                     className="form-control"
//                     id="description"
//                     name="description"
//                     placeholder="Describe your issue"
//                     value={formData.description}
//                     onChange={handleChange}
//                     style={{ height: "140px" }}
//                     required
//                   />
//                   <label htmlFor="description">Description</label>
//                 </div>

//                 {/* Attachment */}
//                 <div className="mb-4">
//                   <label htmlFor="attachment" className="form-label fw-semibold">
//                     Attachment (optional)
//                   </label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     id="attachment"
//                     name="attachment"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="d-grid">
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg fw-bold text-white"
//                     disabled={loading}
//                     style={{
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = "#0056b3";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = "";
//                     }}
//                   >
//                     {loading ? "Submitting..." : "Submit Complaint"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import privateAPI from "./api/privateAxios"; // JWT axios
// import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "",
//     department: "",  
//     location: "",
//     description: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [animateSuccess, setAnimateSuccess] = useState(false);

//   // Department options based on categories
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
//     const { name, value, files } = e.target;
    
//     if (name === "category") {
//       // Reset department when category changes
//       setFormData({
//         ...formData,
//         [name]: value,
//         department: ""
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: files ? files[0] : value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       await privateAPI.post("/accounts/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Success animation
//       setAnimateSuccess(true);
//       setTimeout(() => {
//         setAnimateSuccess(false);
//         alert("Complaint Submitted Successfully");
        
//         // Reset form
//         setFormData({
//           category: "",
//           priority: "",
//           department: "", 
//           location: "",
//           description: "",
//           attachment: null,
//         });
        
//         e.target.reset();
//       }, 2000);
      
//     } catch (err) {
//       console.error("Complaint submission error:", err);
//       alert("Submission Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get current department options based on selected category
//   const currentDepartments = departmentOptions[formData.category] || [];

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8 col-md-10 col-sm-12">
//           {/* Success Animation Overlay */}
//           {animateSuccess && (
//             <div className="animate__animated animate__fadeIn animate__faster fixed-top d-flex justify-content-center align-items-center"
//                  style={{
//                    height: '100vh',
//                    backgroundColor: 'rgba(25, 135, 84, 0.95)',
//                    zIndex: 9999
//                  }}>
//               <div className="text-center text-white">
//                 <div className="display-1 mb-4 animate__animated animate__bounceIn">✓</div>
//                 <h2 className="animate__animated animate__fadeInUp">Complaint Submitted!</h2>
//                 <p className="animate__animated animate__fadeInUp animate__delay-1s">
//                   Your complaint has been successfully registered
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Form Card with Enhanced Design */}
//           <div className="card shadow-lg border-0 overflow-hidden animate__animated animate__fadeIn">
//             {/* Header with gradient */}
//             <div className="card-header bg-primary-gradient text-white py-4">
//               <div className="d-flex align-items-center">
//                 <span className="fs-3 me-3">⚠️</span>
//                 <div>
//                   <h2 className="h3 mb-1 fw-bold">Submit a Complaint</h2>
//                   <p className="mb-0 opacity-75">Help us make things better</p>
//                 </div>
//               </div>
//             </div>

//             <div className="card-body p-4 p-md-5">
//               <form onSubmit={handleSubmit}>
//                 {/* Category Field */}
//                 <div className="mb-4">
//                   <label htmlFor="category" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📋</span>
//                     Category <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-select form-select-lg shadow-sm"
//                     id="category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease'
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   >
//                     <option value="" disabled>Select a category</option>
//                     <option value="Civic Infrastructure & Public Services">Civic Infrastructure & Public Services</option>
//                     <option value="Water, Sanitation & Environment">Water, Sanitation & Environment</option>
//                     <option value="Electricity & Energy">Electricity & Energy</option>
//                     <option value="Healthcare & Education">Healthcare & Education</option>
//                     <option value="Governance, Law & Public Safety">Governance, Law & Public Safety</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Priority Field */}
//                 <div className="mb-4">
//                   <label htmlFor="priority" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">⏰</span>
//                     Priority Level <span className="text-danger">*</span>
//                   </label>
//                   <div className="row g-3">
//                     {[
//                       { value: 'low', label: 'Low', color: 'success', icon: '⬇️' },
//                       { value: 'medium', label: 'Medium', color: 'warning', icon: '⚠️' },
//                       { value: 'high', label: 'High', color: 'danger', icon: '🔥' }
//                     ].map((priority) => (
//                       <div className="col-md-4" key={priority.value}>
//                         <div 
//                           className={`form-check-card ${formData.priority === priority.value ? 'active' : ''}`}
//                           onClick={() => setFormData({...formData, priority: priority.value})}
//                           style={{
//                             cursor: 'pointer',
//                             border: `2px solid ${formData.priority === priority.value ? `var(--bs-${priority.color})` : '#dee2e6'}`,
//                             borderRadius: '10px',
//                             padding: '15px',
//                             transition: 'all 0.3s ease',
//                             backgroundColor: formData.priority === priority.value ? `var(--bs-${priority.color}-bg-subtle)` : 'white'
//                           }}
//                         >
//                           <input
//                             type="radio"
//                             className="form-check-input"
//                             id={`priority-${priority.value}`}
//                             name="priority"
//                             value={priority.value}
//                             checked={formData.priority === priority.value}
//                             onChange={handleChange}
//                             required
//                             style={{ display: 'none' }}
//                           />
//                           <label 
//                             htmlFor={`priority-${priority.value}`}
//                             className="form-check-label d-flex flex-column align-items-center"
//                             style={{ cursor: 'pointer' }}
//                           >
//                             <div className={`priority-indicator bg-${priority.color}`} 
//                                  style={{
//                                    width: '20px',
//                                    height: '20px',
//                                    borderRadius: '50%',
//                                    marginBottom: '8px'
//                                  }}>
//                             </div>
//                             <span className="fw-semibold">{priority.icon} {priority.label}</span>
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Department Field - ADDED AFTER PRIORITY */}
//                 <div className="mb-4">
//                   <label htmlFor="department" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">🏢</span>
//                     Department <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-select form-select-lg shadow-sm"
//                     id="department"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     required
//                     disabled={!formData.category}
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease',
//                       opacity: formData.category ? 1 : 0.7
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   >
//                     <option value="" disabled>
//                       {formData.category ? 'Select a department' : 'Please select a category first'}
//                     </option>
//                     {currentDepartments.map((dept, index) => (
//                       <option key={index} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </select>
//                   {!formData.category && (
//                     <div className="form-text text-warning mt-2">
//                       ⚠️ Please select a category first to see available departments
//                     </div>
//                   )}
//                 </div>

//                 {/* Location Field */}
//                 <div className="mb-4">
//                   <label htmlFor="location" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📍</span>
//                     Location <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control form-control-lg shadow-sm"
//                     id="location"
//                     name="location"
//                     placeholder="Enter location or address"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease'
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   />
//                 </div>

//                 {/* Description Field */}
//                 <div className="mb-4">
//                   <label htmlFor="description" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📝</span>
//                     Description <span className="text-danger">*</span>
//                   </label>
//                   <textarea
//                     className="form-control shadow-sm"
//                     id="description"
//                     name="description"
//                     placeholder="Please describe your complaint in detail..."
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows="5"
//                     required
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease',
//                       resize: 'vertical'
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   />
//                 </div>

//                 {/* Attachment Field */}
//                 <div className="mb-4">
//                   <label htmlFor="attachment" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📎</span>
//                     Attachment (Optional)
//                   </label>
//                   <div className="file-upload-area border-2 border-dashed rounded-3 p-4 text-center"
//                        style={{
//                          borderColor: formData.attachment ? '#198754' : '#dee2e6',
//                          backgroundColor: formData.attachment ? 'rgba(25, 135, 84, 0.05)' : '#f8f9fa',
//                          transition: 'all 0.3s ease',
//                          cursor: 'pointer'
//                        }}
//                        onClick={() => document.getElementById('attachment').click()}>
//                     <input
//                       type="file"
//                       className="form-control visually-hidden"
//                       id="attachment"
//                       name="attachment"
//                       onChange={handleChange}
//                     />
//                     {formData.attachment ? (
//                       <div className="animate__animated animate__fadeIn">
//                         <span className="text-success mb-2" style={{ fontSize: '24px' }}>📤</span>
//                         <p className="mb-1 fw-semibold">{formData.attachment.name}</p>
//                         <p className="text-muted small">Click to change file</p>
//                       </div>
//                     ) : (
//                       <div>
//                         <span className="text-muted mb-2" style={{ fontSize: '24px' }}>📤</span>
//                         <p className="mb-1">Click to upload or drag and drop</p>
//                         <p className="text-muted small">Max file size: 10MB</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="d-grid mt-5">
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg fw-bold py-3"
//                     disabled={loading}
//                     style={{
//                       background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)',
//                       border: 'none',
//                       fontSize: '1.1rem',
//                       transition: 'all 0.3s ease',
//                       position: 'relative',
//                       overflow: 'hidden'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.transform = 'translateY(-2px)';
//                       e.target.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.boxShadow = 'none';
//                     }}
//                   >
//                     {loading ? (
//                       <span className="d-flex align-items-center justify-content-center">
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Processing...
//                       </span>
//                     ) : (
//                       <span className="d-flex align-items-center justify-content-center">
//                         <span className="me-2">✓</span>
//                         Submit Complaint
//                       </span>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Footer */}
//             <div className="card-footer bg-light py-3">
//               <div className="text-center text-muted small">
//                 <p className="mb-0">
//                   Your complaint will be reviewed within 24-48 hours
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info Card */}
//           <div className="card shadow-sm border-0 mt-4 animate__animated animate__fadeInUp animate__delay-1s">
//             <div className="card-body p-4">
//               <h5 className="fw-semibold mb-3">
//                 <span className="text-warning me-2">⚠️</span>
//                 Important Information
//               </h5>
//               <ul className="list-unstyled mb-0">
//                 <li className="mb-2">
//                   <small className="text-muted">
//                     • Please provide as much detail as possible for faster resolution
//                   </small>
//                 </li>
//                 <li className="mb-2">
//                   <small className="text-muted">
//                     • Attach photos or documents if available
//                   </small>
//                 </li>
//                 <li>
//                   <small className="text-muted">
//                     • You will receive a confirmation email with your complaint ID
//                   </small>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add some custom styles */}
//       <style jsx>{`
//         .bg-primary-gradient {
//           background: linear-gradient(135deg, #0d6efd 0%, #198754 100%);
//         }
        
//         .form-check-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//         }
        
//         .form-check-card.active {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 20px rgba(0,0,0,0.15);
//         }
        
//         .border-2 {
//           border-width: 2px !important;
//         }
        
//         .border-dashed {
//           border-style: dashed !important;
//         }
        
//         .file-upload-area:hover {
//           border-color: #0d6efd !important;
//           background-color: rgba(13, 110, 253, 0.05) !important;
//         }
        
//         .priority-indicator {
//           transition: all 0.3s ease;
//         }
        
//         .form-check-card:hover .priority-indicator {
//           transform: scale(1.2);
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import privateAPI from "./api/privateAxios"; // JWT axios
// import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "",
//     department: "",  
//     location: "",
//     description: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [animateSuccess, setAnimateSuccess] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [loadingDepartments, setLoadingDepartments] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(false);

//   // Load categories on component mount
//   useEffect(() => {
//     setLoadingCategories(true);
//     privateAPI
//       .get("/accounts/CategoryList/")
//       .then((res) => {
//         setCategories(res.data);
//         setLoadingCategories(false);
//       })
//       .catch((err) => {
//         console.error("Category fetch error", err);
//         setLoadingCategories(false);
//       });
//   }, []);

//   // Fetch departments when category changes
//   useEffect(() => {
//     if (!formData.category) {
//       setDepartments([]);
//       return;
//     }

//     setLoadingDepartments(true);
//     privateAPI
//       .get(`/accounts/departments/?category=${formData.category}`)
//       .then((res) => {
//         setDepartments(res.data);
//       })
//       .catch((err) => {
//         console.error("Department fetch error", err);
//         setDepartments([]);
//       })
//       .finally(() => {
//         setLoadingDepartments(false);
//       });
//   }, [formData.category]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
    
//     if (name === "attachment") {
//       setFormData({
//         ...formData,
//         [name]: files ? files[0] : value,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation: Ensure department is selected if category is selected
//     if (formData.category && !formData.department) {
//       alert("Please select a department for the chosen category");
//       return;
//     }
    
//     setLoading(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       await privateAPI.post("/accounts/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Success animation
//       setAnimateSuccess(true);
//       setTimeout(() => {
//         setAnimateSuccess(false);
//         alert("Complaint Submitted Successfully");
        
//         // Reset form
//         setFormData({
//           category: "",
//           priority: "",
//           department: "", 
//           location: "",
//           description: "",
//           attachment: null,
//         });
//         setDepartments([]);
        
//         e.target.reset();
//       }, 2000);
      
//     } catch (err) {
//       console.error("Complaint submission error:", err);
//       alert("Submission Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8 col-md-10 col-sm-12">
//           {/* Success Animation Overlay */}
//           {animateSuccess && (
//             <div className="animate__animated animate__fadeIn animate__faster fixed-top d-flex justify-content-center align-items-center"
//                  style={{
//                    height: '100vh',
//                    backgroundColor: 'rgba(25, 135, 84, 0.95)',
//                    zIndex: 9999
//                  }}>
//               <div className="text-center text-white">
//                 <div className="display-1 mb-4 animate__animated animate__bounceIn">✓</div>
//                 <h2 className="animate__animated animate__fadeInUp">Complaint Submitted!</h2>
//                 <p className="animate__animated animate__fadeInUp animate__delay-1s">
//                   Your complaint has been successfully registered
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Form Card with Enhanced Design */}
//           <div className="card shadow-lg border-0 overflow-hidden animate__animated animate__fadeIn">
//             {/* Header with gradient */}
//             <div className="card-header bg-primary-gradient text-white py-4">
//               <div className="d-flex align-items-center">
//                 <span className="fs-3 me-3">⚠️</span>
//                 <div>
//                   <h2 className="h3 mb-1 fw-bold">Submit a Complaint</h2>
//                   <p className="mb-0 opacity-75">Help us make things better</p>
//                 </div>
//               </div>
//             </div>

//             <div className="card-body p-4 p-md-5">
//               <form onSubmit={handleSubmit}>
//                 {/* Category Field - Updated according to instructions */}
//                 <div className="mb-4">
//                   <label htmlFor="category" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📋</span>
//                     Category <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-select form-select-lg shadow-sm"
//                     name="category"
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         category: e.target.value,
//                         department: ""   // reset department
//                       })
//                     }
//                     required
//                     disabled={loadingCategories}
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease'
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                   {loadingCategories && (
//                     <div className="form-text text-info mt-2">
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Loading categories...
//                     </div>
//                   )}
//                 </div>

//                 {/* Priority Field */}
//                 <div className="mb-4">
//                   <label htmlFor="priority" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">⏰</span>
//                     Priority Level <span className="text-danger">*</span>
//                   </label>
//                   <div className="row g-3">
//                     {[
//                       { value: 'low', label: 'Low', color: 'success', icon: '⬇️' },
//                       { value: 'medium', label: 'Medium', color: 'warning', icon: '⚠️' },
//                       { value: 'high', label: 'High', color: 'danger', icon: '🔥' }
//                     ].map((priority) => (
//                       <div className="col-md-4" key={priority.value}>
//                         <div 
//                           className={`form-check-card ${formData.priority === priority.value ? 'active' : ''}`}
//                           onClick={() => setFormData({...formData, priority: priority.value})}
//                           style={{
//                             cursor: 'pointer',
//                             border: `2px solid ${formData.priority === priority.value ? `var(--bs-${priority.color})` : '#dee2e6'}`,
//                             borderRadius: '10px',
//                             padding: '15px',
//                             transition: 'all 0.3s ease',
//                             backgroundColor: formData.priority === priority.value ? `var(--bs-${priority.color}-bg-subtle)` : 'white'
//                           }}
//                         >
//                           <input
//                             type="radio"
//                             className="form-check-input"
//                             id={`priority-${priority.value}`}
//                             name="priority"
//                             value={priority.value}
//                             checked={formData.priority === priority.value}
//                             onChange={handleChange}
//                             required
//                             style={{ display: 'none' }}
//                           />
//                           <label 
//                             htmlFor={`priority-${priority.value}`}
//                             className="form-check-label d-flex flex-column align-items-center"
//                             style={{ cursor: 'pointer' }}
//                           >
//                             <div className={`priority-indicator bg-${priority.color}`} 
//                                  style={{
//                                    width: '20px',
//                                    height: '20px',
//                                    borderRadius: '50%',
//                                    marginBottom: '8px'
//                                  }}>
//                             </div>
//                             <span className="fw-semibold">{priority.icon} {priority.label}</span>
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Department Field - Updated according to instructions */}
//                 <div className="mb-4">
//                   <label htmlFor="department" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">🏢</span>
//                     Department <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-select form-select-lg shadow-sm"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     required
//                     disabled={!formData.category || loadingDepartments}
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease',
//                       opacity: formData.category ? 1 : 0.7
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   >
//                     <option value="">
//                       {formData.category ? "Select Department" : "Select category first"}
//                     </option>
//                     {departments.map((dept) => (
//                       <option key={dept.id} value={dept.id}>
//                         {dept.name}
//                       </option>
//                     ))}
//                   </select>
                  
//                   {/* Status messages */}
//                   {loadingDepartments && (
//                     <div className="form-text text-info mt-2">
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Loading available departments...
//                     </div>
//                   )}
//                   {!formData.category && !loadingDepartments && (
//                     <div className="form-text text-warning mt-2">
//                       ⚠️ Please select a category first to see available departments
//                     </div>
//                   )}
//                   {formData.category && departments.length === 0 && !loadingDepartments && (
//                     <div className="form-text text-warning mt-2">
//                       ⚠️ No departments found for this category. Please contact admin.
//                     </div>
//                   )}
//                 </div>

//                 {/* Location Field */}
//                 <div className="mb-4">
//                   <label htmlFor="location" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📍</span>
//                     Location <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control form-control-lg shadow-sm"
//                     id="location"
//                     name="location"
//                     placeholder="Enter location or address"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease'
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   />
//                 </div>

//                 {/* Description Field */}
//                 <div className="mb-4">
//                   <label htmlFor="description" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📝</span>
//                     Description <span className="text-danger">*</span>
//                   </label>
//                   <textarea
//                     className="form-control shadow-sm"
//                     id="description"
//                     name="description"
//                     placeholder="Please describe your complaint in detail..."
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows="5"
//                     required
//                     style={{
//                       borderLeft: '4px solid #0d6efd',
//                       transition: 'all 0.3s ease',
//                       resize: 'vertical'
//                     }}
//                     onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
//                     onBlur={(e) => e.target.style.borderLeft = '4px solid #0d6efd'}
//                   />
//                 </div>

//                 {/* Attachment Field */}
//                 <div className="mb-4">
//                   <label htmlFor="attachment" className="form-label fw-semibold mb-3">
//                     <span className="text-primary me-2">📎</span>
//                     Attachment (Optional)
//                   </label>
//                   <div className="file-upload-area border-2 border-dashed rounded-3 p-4 text-center"
//                        style={{
//                          borderColor: formData.attachment ? '#198754' : '#dee2e6',
//                          backgroundColor: formData.attachment ? 'rgba(25, 135, 84, 0.05)' : '#f8f9fa',
//                          transition: 'all 0.3s ease',
//                          cursor: 'pointer'
//                        }}
//                        onClick={() => document.getElementById('attachment').click()}>
//                     <input
//                       type="file"
//                       className="form-control visually-hidden"
//                       id="attachment"
//                       name="attachment"
//                       onChange={handleChange}
//                     />
//                     {formData.attachment ? (
//                       <div className="animate__animated animate__fadeIn">
//                         <span className="text-success mb-2" style={{ fontSize: '24px' }}>📤</span>
//                         <p className="mb-1 fw-semibold">{formData.attachment.name}</p>
//                         <p className="text-muted small">Click to change file</p>
//                       </div>
//                     ) : (
//                       <div>
//                         <span className="text-muted mb-2" style={{ fontSize: '24px' }}>📤</span>
//                         <p className="mb-1">Click to upload or drag and drop</p>
//                         <p className="text-muted small">Max file size: 10MB</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="d-grid mt-5">
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg fw-bold py-3"
//                     disabled={loading || loadingDepartments || loadingCategories}
//                     style={{
//                       background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)',
//                       border: 'none',
//                       fontSize: '1.1rem',
//                       transition: 'all 0.3s ease',
//                       position: 'relative',
//                       overflow: 'hidden'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.transform = 'translateY(-2px)';
//                       e.target.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.transform = 'translateY(0)';
//                       e.target.style.boxShadow = 'none';
//                     }}
//                   >
//                     {loading ? (
//                       <span className="d-flex align-items-center justify-content-center">
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Processing...
//                       </span>
//                     ) : (
//                       <span className="d-flex align-items-center justify-content-center">
//                         <span className="me-2">✓</span>
//                         Submit Complaint
//                       </span>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Footer */}
//             <div className="card-footer bg-light py-3">
//               <div className="text-center text-muted small">
//                 <p className="mb-0">
//                   Your complaint will be reviewed within 24-48 hours
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info Card */}
//           <div className="card shadow-sm border-0 mt-4 animate__animated animate__fadeInUp animate__delay-1s">
//             <div className="card-body p-4">
//               <h5 className="fw-semibold mb-3">
//                 <span className="text-warning me-2">⚠️</span>
//                 Important Information
//               </h5>
//               <ul className="list-unstyled mb-0">
//                 <li className="mb-2">
//                   <small className="text-muted">
//                     • Please provide as much detail as possible for faster resolution
//                   </small>
//                 </li>
//                 <li className="mb-2">
//                   <small className="text-muted">
//                     • Attach photos or documents if available
//                   </small>
//                 </li>
//                 <li>
//                   <small className="text-muted">
//                     • You will receive a confirmation email with your complaint ID
//                   </small>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add some custom styles */}
//       <style jsx>{`
//         .bg-primary-gradient {
//           background: linear-gradient(135deg, #0d6efd 0%, #198754 100%);
//         }
        
//         .form-check-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//         }
        
//         .form-check-card.active {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 20px rgba(0,0,0,0.15);
//         }
        
//         .border-2 {
//           border-width: 2px !important;
//         }
        
//         .border-dashed {
//           border-style: dashed !important;
//         }
        
//         .file-upload-area:hover {
//           border-color: #0d6efd !important;
//           background-color: rgba(13, 110, 253, 0.05) !important;
//         }
        
//         .priority-indicator {
//           transition: all 0.3s ease;
//         }
        
//         .form-check-card:hover .priority-indicator {
//           transform: scale(1.2);
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import privateAPI from "./api/privateAxios";
// import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "",
//     departments: "", // ✅ FIXED (plural)
//     location: "",
//     description: "",
//     attachment: null,
//     latitude: "",
//     longitude: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [animateSuccess, setAnimateSuccess] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [categories, setCategories] = useState([]);

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     privateAPI.get("/accounts/CategoryList/")
//       .then(res => setCategories(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   /* ================= FETCH DEPARTMENTS ================= */
//   useEffect(() => {
//     if (!formData.category) {
//       setDepartments([]);
//       return;
//     }

//     privateAPI
//       .get(`/accounts/departments/?category=${formData.category}`)
//       .then(res => setDepartments(res.data))
//       .catch(() => setDepartments([]));
//   }, [formData.category]);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "attachment") {
//       setFormData({ ...formData, attachment: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   /* ================= HANDLE SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.departments) {
//       alert("Please select a department");
//       return;
//     }

//     setLoading(true);

//     // ✅ EXPLICIT FormData (VERY IMPORTANT)
//     const data = new FormData();
//     data.append("priority", formData.priority);
//     data.append("location", formData.location);
//     data.append("description", formData.description);
//     data.append("departments", formData.departments); // 🔥 FIX
//     if (formData.attachment) {
//       data.append("attachment", formData.attachment);
//     }

//     try {
//       await privateAPI.post("/accounts/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setAnimateSuccess(true);
//       setTimeout(() => {
//         setAnimateSuccess(false);
//         alert("Complaint Submitted Successfully");

//         setFormData({
//           category: "",
//           priority: "",
//           departments: "",
//           location: "",
//           description: "",
//           attachment: null,
//           latitude: "",
//           longitude: "",
//         });

//         setDepartments([]);
//         e.target.reset();
//       }, 1500);

//     } catch (err) {
//       console.error(err);
//       alert("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container py-5">
//       {animateSuccess && (
//         <div className="fixed-top d-flex justify-content-center align-items-center"
//              style={{ height: "100vh", background: "rgba(25,135,84,0.9)", zIndex: 9999 }}>
//           <h1 className="text-white">✓ Complaint Submitted</h1>
//         </div>
//       )}

//       <div className="card shadow-lg p-4">
//         <h3 className="mb-4">Submit Complaint</h3>

//         <form onSubmit={handleSubmit}>
//           {/* CATEGORY */}
//           <select
//             className="form-select mb-3"
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 category: e.target.value,
//                 departments: "",
//               })
//             }
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map(cat => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>

//           {/* PRIORITY */}
//           <select
//             className="form-select mb-3"
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Priority</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>

//           {/* DEPARTMENT */}
//           <select
//             className="form-select mb-3"
//             name="departments"       // ✅ FIXED
//             value={formData.departments}
//             onChange={handleChange}
//             required
//             disabled={!formData.category}
//           >
//             <option value="">Select Department</option>
//             {departments.map(dept => (
//               <option key={dept.id} value={dept.id}>{dept.name}</option>
//             ))}
//           </select>

//           {/* LOCATION */}
//           <input
//             className="form-control mb-3"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />

//           {/* DESCRIPTION */}
//           <textarea
//             className="form-control mb-3"
//             name="description"
//             placeholder="Description"
//             rows="4"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />

//           {/* ATTACHMENT */}
//           <input
//             type="file"
//             name="attachment"
//             className="form-control mb-3"
//             onChange={handleChange}
//           />

//           <button className="btn btn-primary w-100" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Complaint"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import privateAPI from "./api/privateAxios";
// import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "",
//     departments: "",
//     location: "",
//     description: "",
//     suggestion: "",      // ✅ NEW (optional)
//     attachment: null,
//     latitude: "",
//     longitude: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [animateSuccess, setAnimateSuccess] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [categories, setCategories] = useState([]);

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     privateAPI
//       .get("/accounts/CategoryList/")
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   /* ================= FETCH DEPARTMENTS ================= */
//   useEffect(() => {
//     if (!formData.category) {
//       setDepartments([]);
//       return;
//     }

//     privateAPI
//       .get(`/accounts/departments/?category=${formData.category}`)
//       .then((res) => setDepartments(res.data))
//       .catch(() => setDepartments([]));
//   }, [formData.category]);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "attachment") {
//       setFormData({ ...formData, attachment: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   /* ================= HANDLE SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.departments) {
//       alert("Please select a department");
//       return;
//     }

//     setLoading(true);

//     const data = new FormData();
//     data.append("priority", formData.priority);
//     data.append("location", formData.location);
//     data.append("description", formData.description);
//     data.append("departments", formData.departments);

//     // ✅ OPTIONAL suggestion
//     if (formData.suggestion?.trim()) {
//       data.append("suggestion", formData.suggestion);
//     }

//     if (formData.attachment) {
//       data.append("attachment", formData.attachment);
//     }

//     try {
//       await privateAPI.post("/accounts/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setAnimateSuccess(true);
//       setTimeout(() => {
//         setAnimateSuccess(false);
//         alert("Complaint Submitted Successfully");

//         setFormData({
//           category: "",
//           priority: "",
//           departments: "",
//           location: "",
//           description: "",
//           suggestion: "",
//           attachment: null,
//           latitude: "",
//           longitude: "",
//         });

//         setDepartments([]);
//         e.target.reset();
//       }, 1500);
//     } catch (err) {
//       console.error(err);
//       alert("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container py-5">
//       {animateSuccess && (
//         <div
//           className="fixed-top d-flex justify-content-center align-items-center"
//           style={{
//             height: "100vh",
//             background: "rgba(25,135,84,0.9)",
//             zIndex: 9999,
//           }}
//         >
//           <h1 className="text-white">✓ Complaint Submitted</h1>
//         </div>
//       )}

//       <div className="card shadow-lg p-4">
//         <h3 className="mb-4">Submit Complaint</h3>

//         <form onSubmit={handleSubmit}>
//           {/* CATEGORY */}
//           <select
//             className="form-select mb-3"
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 category: e.target.value,
//                 departments: "",
//               })
//             }
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* PRIORITY */}
//           <select
//             className="form-select mb-3"
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Priority</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>

//           {/* DEPARTMENT */}
//           <select
//             className="form-select mb-3"
//             name="departments"
//             value={formData.departments}
//             onChange={handleChange}
//             required
//             disabled={!formData.category}
//           >
//             <option value="">Select Department</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.name}
//               </option>
//             ))}
//           </select>

//           {/* LOCATION */}
//           <input
//             className="form-control mb-3"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />

//           {/* DESCRIPTION */}
//           <textarea
//             className="form-control mb-3"
//             name="description"
//             placeholder="Complaint description"
//             rows="4"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />

//           {/* ✅ OPTIONAL SUGGESTION */}
//           <textarea
//             className="form-control mb-3"
//             name="suggestion"
//             placeholder="Any suggestion? (optional)"
//             rows="3"
//             value={formData.suggestion}
//             onChange={handleChange}
//           />

//           {/* ATTACHMENT */}
//           <input
//             type="file"
//             name="attachment"
//             className="form-control mb-3"
//             onChange={handleChange}
//           />

//           <button className="btn btn-primary w-100" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Complaint"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import privateAPI from "./api/privateAxios";
// import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   AlertCircle,
//   Upload,
//   MapPin,
//   FileText,
//   Clock,
//   Building,
//   CheckCircle,
//   Lightbulb,
//   Shield,
//   Camera,
//   Send
// } from "lucide-react";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "medium",
//     departments: "",
//     location: "",
//     description: "",
//     suggestion: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [animateSuccess, setAnimateSuccess] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [fileName, setFileName] = useState("");
//   const [errors, setErrors] = useState({});
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showLocationModal, setShowLocationModal] = useState(false);

//   const totalSteps = 3;

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     setLoading(true);
//     privateAPI
//       .get("/accounts/CategoryList/")
//       .then((res) => {
//         setCategories(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   /* ================= FETCH DEPARTMENTS ================= */
//   useEffect(() => {
//     if (!formData.category) {
//       setDepartments([]);
//       return;
//     }

//     privateAPI
//       .get(`/accounts/departments/?category=${formData.category}`)
//       .then((res) => setDepartments(res.data))
//       .catch(() => setDepartments([]));
//   }, [formData.category]);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "attachment") {
//       if (files && files[0]) {
//         if (files[0].size > 5 * 1024 * 1024) {
//           setErrors({ ...errors, attachment: "File size must be less than 5MB" });
//           return;
//         }
//         const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
//         if (!validTypes.includes(files[0].type)) {
//           setErrors({ ...errors, attachment: "Only JPG, PNG, and PDF files are allowed" });
//           return;
//         }
//         setFormData({ ...formData, attachment: files[0] });
//         setFileName(files[0].name);
//         setErrors({ ...errors, attachment: "" });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: "" });
//       }
//     }
//   };

//   /* ================= GET CURRENT LOCATION ================= */
//   const getCurrentLocation = () => {
//     setShowLocationModal(true);
//   };

//   const confirmLocation = () => {
//     setShowLocationModal(false);
    
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setLoading(true);
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
//           .then(response => response.json())
//           .then(data => {
//             const address = data.display_name || `${latitude}, ${longitude}`;
//             setFormData({ ...formData, location: address });
//             setLoading(false);
//           })
//           .catch(() => {
//             setFormData({ ...formData, location: `${latitude}, ${longitude}` });
//             setLoading(false);
//           });
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         setLoading(false);
//         alert("Unable to retrieve your location. Please enter manually.");
//       }
//     );
//   };

//   /* ================= VALIDATE FORM ================= */
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.category) newErrors.category = "Please select a category";
//     if (!formData.priority) newErrors.priority = "Please select priority level";
//     if (!formData.departments) newErrors.departments = "Please select a department";
//     if (!formData.location.trim()) newErrors.location = "Please provide location";
//     if (!formData.description.trim()) newErrors.description = "Please describe your complaint";
//     if (formData.description.trim().length < 20) newErrors.description = "Description should be at least 20 characters";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= HANDLE SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // If not on last step, move to next step
//     if (currentStep < totalSteps) {
//       // Validate current step
//       let stepValid = true;
//       const stepErrors = {};
      
//       if (currentStep === 1) {
//         if (!formData.category) {
//           stepErrors.category = "Please select a category";
//           stepValid = false;
//         }
//         if (!formData.departments) {
//           stepErrors.departments = "Please select a department";
//           stepValid = false;
//         }
//       } else if (currentStep === 2) {
//         if (!formData.location.trim()) {
//           stepErrors.location = "Please provide location";
//           stepValid = false;
//         }
//         if (!formData.description.trim()) {
//           stepErrors.description = "Please describe your complaint";
//           stepValid = false;
//         }
//         if (formData.description.trim().length < 20) {
//           stepErrors.description = "Description should be at least 20 characters";
//           stepValid = false;
//         }
//       }
      
//       if (!stepValid) {
//         setErrors(stepErrors);
//         return;
//       }
      
//       setCurrentStep(currentStep + 1);
//       return;
//     }
    
//     // If on last step, submit the form
//     if (!validateForm()) {
//       return;
//     }

//     if (!formData.departments) {
//       alert("Please select a department");
//       return;
//     }

//     setLoading(true);

//     const data = new FormData();
//     data.append("category", formData.category);
//     data.append("priority", formData.priority);
//     data.append("location", formData.location);
//     data.append("description", formData.description);
//     data.append("departments", formData.departments);

//     if (formData.suggestion?.trim()) {
//       data.append("suggestion", formData.suggestion);
//     }

//     if (formData.attachment) {
//       data.append("attachment", formData.attachment);
//     }

//     try {
//       await privateAPI.post("/accounts/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setAnimateSuccess(true);
//       setTimeout(() => {
//         setAnimateSuccess(false);
        
//         // Reset form
//         setFormData({
//           category: "",
//           priority: "medium",
//           departments: "",
//           location: "",
//           description: "",
//           suggestion: "",
//           attachment: null,
//         });
//         setFileName("");
//         setErrors({});
//         setCurrentStep(1);
        
//         // Show success message
//         const complaintId = "CMP" + Date.now().toString().slice(-8);
//         showNotification(
//           `✅ Complaint Submitted Successfully!<br>Your Complaint ID: <strong>${complaintId}</strong>`,
//           "success"
//         );
        
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       let errorMessage = "❌ Submission failed. Please try again.";
      
//       if (err.response) {
//         if (err.response.status === 400) {
//           errorMessage = "❌ Invalid data. Please check all fields.";
//         } else if (err.response.status === 401) {
//           errorMessage = "❌ Session expired. Please login again.";
//         } else if (err.response.status === 500) {
//           errorMessage = "❌ Server error. Please try again later.";
//         }
        
//         // Display specific field errors from API
//         if (err.response.data) {
//           const apiErrors = err.response.data;
//           const fieldErrors = {};
//           Object.keys(apiErrors).forEach(key => {
//             fieldErrors[key] = Array.isArray(apiErrors[key]) 
//               ? apiErrors[key][0] 
//               : apiErrors[key];
//           });
//           setErrors(fieldErrors);
//         }
//       }
      
//       showNotification(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (message, type = "success") => {
//     const notification = document.createElement("div");
//     notification.className = `alert alert-${type === "success" ? "success" : "danger"} animate__animated animate__fadeInUp position-fixed`;
//     notification.style.cssText = `
//       top: 20px;
//       right: 20px;
//       z-index: 9999;
//       min-width: 300px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//     `;
//     notification.innerHTML = `
//       <div class="d-flex align-items-center">
//         <span class="me-2">${type === "success" ? "✅" : "⚠️"}</span>
//         <div>${message}</div>
//         <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
//       </div>
//     `;
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//       if (notification.parentNode) {
//         notification.remove();
//       }
//     }, 5000);
//   };

//   const nextStep = () => {
//     // Validate current step before proceeding
//     let stepValid = true;
//     const stepErrors = {};
    
//     if (currentStep === 1) {
//       if (!formData.category) {
//         stepErrors.category = "Please select a category";
//         stepValid = false;
//       }
//       if (!formData.departments) {
//         stepErrors.departments = "Please select a department";
//         stepValid = false;
//       }
//     } else if (currentStep === 2) {
//       if (!formData.location.trim()) {
//         stepErrors.location = "Please provide location";
//         stepValid = false;
//       }
//       if (!formData.description.trim()) {
//         stepErrors.description = "Please describe your complaint";
//         stepValid = false;
//       }
//       if (formData.description.trim().length < 20) {
//         stepErrors.description = "Description should be at least 20 characters";
//         stepValid = false;
//       }
//     }
    
//     if (!stepValid) {
//       setErrors(stepErrors);
//       return;
//     }
    
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container-fluid py-4" style={{
//       background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//       minHeight: "100vh",
//       fontFamily: "'Segoe UI', 'Roboto', sans-serif"
//     }}>
//       {/* Success Overlay */}
//       {animateSuccess && (
//         <div
//           className="animate__animated animate__fadeIn fixed-top d-flex justify-content-center align-items-center"
//           style={{
//             height: "100vh",
//             background: "linear-gradient(135deg, rgba(25,135,84,0.95) 0%, rgba(21,101,71,0.95) 100%)",
//             zIndex: 9999,
//           }}
//         >
//           <div className="text-center text-white animate__animated animate__zoomIn">
//             <div className="display-1 mb-4 animate__animated animate__bounceIn">
//               <CheckCircle size={80} />
//             </div>
//             <h2 className="mb-3 fw-bold">Complaint Submitted Successfully!</h2>
//             <p className="fs-5 opacity-90">
//               Your complaint has been registered and forwarded to the concerned department.
//             </p>
//             <div className="mt-4">
//               <div className="spinner-border text-light" role="status">
//                 <span className="visually-hidden">Processing...</span>
//               </div>
//               <p className="mt-3 small">Redirecting to dashboard...</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Location Permission Modal */}
//       {showLocationModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">📍 Location Access</h5>
//                 <button 
//                   type="button" 
//                   className="btn-close" 
//                   onClick={() => setShowLocationModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <p>Allow access to your location for accurate complaint mapping?</p>
//                 <div className="alert alert-info">
//                   <small>Your location will only be used to pinpoint the issue location on the map.</small>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowLocationModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="btn btn-primary" 
//                   onClick={confirmLocation}
//                 >
//                   Allow Location Access
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="row justify-content-center">
//         <div className="col-12 col-lg-10 col-xl-8">
//           {/* Header Card */}
//           <div className="card border-0 shadow-lg mb-4 animate__animated animate__fadeInDown">
//             <div className="card-body p-4" style={{
//               background: "linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)",
//               borderRadius: "15px 15px 0 0"
//             }}>
//               <div className="row align-items-center">
//                 <div className="col-md-8">
//                   <h1 className="text-white fw-bold mb-2">
//                     <AlertCircle className="me-3" size={32} />
//                     File a New Complaint
//                   </h1>
//                   <p className="text-white-50 mb-0">
//                     Help us improve public services by reporting issues directly to concerned departments.
//                   </p>
//                 </div>
//                 <div className="col-md-4 text-end">
//                   <div className="bg-white bg-opacity-20 rounded-pill d-inline-flex align-items-center px-4 py-2">
//                     <Shield size={20} className="me-2 text-white" />
//                     <span className="text-white fw-medium">Government Portal</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Progress Steps */}
//           <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn">
//             <div className="card-body p-4">
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 {[1, 2, 3].map((step) => (
//                   <div key={step} className="text-center">
//                     <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 
//                       ${currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'}`}
//                       style={{ width: '40px', height: '40px' }}>
//                       {step}
//                     </div>
//                     <div className="small fw-medium">
//                       {step === 1 && "Basic Details"}
//                       {step === 2 && "Location & Issue"}
//                       {step === 3 && "Review & Submit"}
//                     </div>
//                   </div>
//                 ))}
//                 <div className="flex-grow-1 mx-3">
//                   <div className="progress" style={{ height: '4px' }}>
//                     <div className="progress-bar" 
//                       style={{ width: `${(currentStep - 1) * 50}%` }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Form Card */}
//           <div className="card border-0 shadow-lg animate__animated animate__fadeInUp">
//             <form onSubmit={handleSubmit}>
//               <div className="card-body p-4 p-md-5">
//                 {/* Step 1: Basic Information */}
//                 {currentStep === 1 && (
//                   <div className="animate__animated animate__fadeIn">
//                     <h4 className="fw-bold mb-4 border-bottom pb-3">
//                       <Building className="me-2" />
//                       Complaint Information
//                     </h4>
                    
//                     <div className="row g-4">
//                       {/* Category */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">
//                           Category <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className={`form-select form-select-lg ${errors.category ? 'is-invalid' : ''}`}
//                           value={formData.category}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               category: e.target.value,
//                               departments: "",
//                             });
//                             if (errors.category) setErrors({ ...errors, category: "" });
//                           }}
//                           required
//                         >
//                           <option value="">Select Complaint Category</option>
//                           {categories.map((cat) => (
//                             <option key={cat.id} value={cat.id}>
//                               {cat.name}
//                             </option>
//                           ))}
//                         </select>
//                         {errors.category && (
//                           <div className="invalid-feedback d-block animate__animated animate__fadeIn">
//                             {errors.category}
//                           </div>
//                         )}
//                       </div>

//                       {/* Priority */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">
//                           Priority Level <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className={`form-select form-select-lg ${errors.priority ? 'is-invalid' : ''}`}
//                           name="priority"
//                           value={formData.priority}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="low">🟢 Low Priority</option>
//                           <option value="medium">🟡 Medium Priority</option>
//                           <option value="high">🔴 High Priority</option>
//                         </select>
//                         {errors.priority && (
//                           <div className="invalid-feedback d-block">
//                             {errors.priority}
//                           </div>
//                         )}
//                         <small className="text-muted">
//                           High priority complaints get faster response from departments
//                         </small>
//                       </div>

//                       {/* Department */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           Concerned Department <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className={`form-select form-select-lg ${errors.departments ? 'is-invalid' : ''}`}
//                           name="departments"
//                           value={formData.departments}
//                           onChange={handleChange}
//                           required
//                           disabled={!formData.category}
//                         >
//                           <option value="">Select Department</option>
//                           {departments.map((dept) => (
//                             <option key={dept.id} value={dept.id}>
//                               {dept.name}
//                             </option>
//                           ))}
//                         </select>
//                         {errors.departments && (
//                           <div className="invalid-feedback d-block">
//                             {errors.departments}
//                           </div>
//                         )}
//                         {!formData.category && (
//                           <div className="form-text">
//                             Please select a category first to see available departments
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 2: Location & Description */}
//                 {currentStep === 2 && (
//                   <div className="animate__animated animate__fadeIn">
//                     <h4 className="fw-bold mb-4 border-bottom pb-3">
//                       <MapPin className="me-2" />
//                       Location & Description
//                     </h4>
                    
//                     <div className="row g-4">
//                       {/* Location */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           Issue Location <span className="text-danger">*</span>
//                         </label>
//                         <div className="input-group mb-3">
//                           <input
//                             className={`form-control form-control-lg ${errors.location ? 'is-invalid' : ''}`}
//                             name="location"
//                             placeholder="Enter exact location (street, landmark, area)"
//                             value={formData.location}
//                             onChange={handleChange}
//                             required
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-outline-primary"
//                             onClick={getCurrentLocation}
//                             disabled={loading}
//                           >
//                             {loading ? (
//                               <span className="spinner-border spinner-border-sm"></span>
//                             ) : (
//                               <>
//                                 <MapPin className="me-2" size={16} />
//                                 Use My Location
//                               </>
//                             )}
//                           </button>
//                         </div>
//                         {errors.location && (
//                           <div className="invalid-feedback d-block">
//                             {errors.location}
//                           </div>
//                         )}
//                         <small className="text-muted">
//                           Precise location helps departments respond faster
//                         </small>
//                       </div>

//                       {/* Description */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           Complaint Description <span className="text-danger">*</span>
//                         </label>
//                         <textarea
//                           className={`form-control form-control-lg ${errors.description ? 'is-invalid' : ''}`}
//                           name="description"
//                           placeholder="Describe the issue in detail. Be specific about what needs to be fixed."
//                           rows="5"
//                           value={formData.description}
//                           onChange={handleChange}
//                           required
//                         />
//                         {errors.description && (
//                           <div className="invalid-feedback d-block">
//                             {errors.description}
//                           </div>
//                         )}
//                         <div className="d-flex justify-content-between mt-2">
//                           <small className="text-muted">
//                             Minimum 20 characters
//                           </small>
//                           <small className={formData.description.length < 20 ? 'text-danger' : 'text-success'}>
//                             {formData.description.length} characters
//                           </small>
//                         </div>
//                       </div>

//                       {/* Suggestion */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           <Lightbulb className="me-2" size={18} />
//                           Your Suggestion (Optional)
//                         </label>
//                         <textarea
//                           className="form-control form-control-lg"
//                           name="suggestion"
//                           placeholder="Any suggestions for how this issue should be resolved?"
//                           rows="3"
//                           value={formData.suggestion}
//                           onChange={handleChange}
//                         />
//                         <small className="text-muted">
//                           Your suggestions help departments implement better solutions
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 3: Review & Submit */}
//                 {currentStep === 3 && (
//                   <div className="animate__animated animate__fadeIn">
//                     <h4 className="fw-bold mb-4 border-bottom pb-3">
//                       <FileText className="me-2" />
//                       Review & Submit
//                     </h4>
                    
//                     {/* Review Card */}
//                     <div className="card border mb-4">
//                       <div className="card-body">
//                         <h5 className="fw-bold mb-3">Review Your Complaint</h5>
//                         <div className="row g-3">
//                           <div className="col-md-6">
//                             <strong>Category:</strong>
//                             <p>{categories.find(c => c.id == formData.category)?.name || 'Not selected'}</p>
//                           </div>
//                           <div className="col-md-6">
//                             <strong>Priority:</strong>
//                             <p>
//                               <span className={`badge ${formData.priority === 'high' ? 'bg-danger' : formData.priority === 'medium' ? 'bg-warning' : 'bg-success'}`}>
//                                 {formData.priority?.toUpperCase()}
//                               </span>
//                             </p>
//                           </div>
//                           <div className="col-md-6">
//                             <strong>Department:</strong>
//                             <p>{departments.find(d => d.id == formData.departments)?.name || 'Not selected'}</p>
//                           </div>
//                           <div className="col-md-6">
//                             <strong>Location:</strong>
//                             <p className="text-truncate">
//                               <MapPin size={16} className="me-1" />
//                               {formData.location || 'Not provided'}
//                             </p>
//                           </div>
//                           <div className="col-12">
//                             <strong>Description:</strong>
//                             <p className="text-muted">{formData.description || 'Not provided'}</p>
//                           </div>
//                           {formData.suggestion && (
//                             <div className="col-12">
//                               <strong>Your Suggestion:</strong>
//                               <p className="text-muted">{formData.suggestion}</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Attachment Upload */}
//                     <div className="mb-4">
//                       <label className="form-label fw-semibold">
//                         <Camera className="me-2" />
//                         Attach Evidence (Optional)
//                       </label>
//                       <div className={`border rounded p-4 text-center ${errors.attachment ? 'border-danger' : ''}`}
//                         style={{ borderStyle: 'dashed' }}>
//                         <input
//                           type="file"
//                           name="attachment"
//                           className="d-none"
//                           id="attachment"
//                           onChange={handleChange}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                         />
//                         <label htmlFor="attachment" className="cursor-pointer">
//                           <Upload size={48} className="text-muted mb-3" />
//                           <h5 className="mb-2">Click to upload evidence</h5>
//                           <p className="text-muted small mb-2">
//                             Upload photos or documents related to your complaint
//                           </p>
//                           <small className="text-muted">Max file size: 5MB • JPG, PNG, PDF</small>
//                         </label>
//                         {fileName && (
//                           <div className="alert alert-success mt-3 animate__animated animate__fadeIn">
//                             ✅ File selected: <strong>{fileName}</strong>
//                           </div>
//                         )}
//                         {errors.attachment && (
//                           <div className="alert alert-danger mt-3">
//                             {errors.attachment}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Terms & Submit */}
//                     <div className="form-check mb-4">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="terms"
//                         required
//                       />
//                       <label className="form-check-label" htmlFor="terms">
//                         I confirm that all information provided is accurate to the best of my knowledge.
//                         I understand that false complaints may lead to legal action.
//                       </label>
//                     </div>
//                   </div>
//                 )}

//                 {/* Navigation Buttons - ALWAYS VISIBLE */}
//                 <div className="d-flex justify-content-between mt-5 pt-4 border-top">
//                   {currentStep > 1 ? (
//                     <button 
//                       type="button" 
//                       className="btn btn-outline-secondary px-5 py-3"
//                       onClick={prevStep}
//                       disabled={loading}
//                     >
//                       ← Back
//                     </button>
//                   ) : (
//                     <div></div> // Empty div to maintain spacing
//                   )}
                  
//                   {currentStep < totalSteps ? (
//                     <button 
//                       type="button" 
//                       className="btn btn-primary px-5 py-3"
//                       onClick={nextStep}
//                       disabled={loading}
//                     >
//                       Continue →
//                     </button>
//                   ) : (
//                     <button 
//                       type="submit" 
//                       className="btn btn-success px-5 py-3 fw-bold"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2"></span>
//                           Submitting...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="me-2" />
//                           Submit Complaint
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Help Card */}
//           <div className="card border-0 shadow-sm mt-4 animate__animated animate__fadeInUp animate__delay-1s">
//             <div className="card-body p-4">
//               <h5 className="fw-bold mb-3">
//                 <Clock className="me-2" />
//                 What happens after submission?
//               </h5>
//               <div className="row g-3">
//                 {[
//                   { icon: "📋", title: "Complaint Registered", desc: "You'll receive a complaint ID for tracking" },
//                   { icon: "🔍", title: "Department Review", desc: "Assigned department will review within 24 hours" },
//                   { icon: "👥", title: "Field Inspection", desc: "Officials may visit the location if needed" },
//                   { icon: "✅", title: "Resolution", desc: "You'll be notified when the issue is resolved" }
//                 ].map((step, index) => (
//                   <div className="col-md-6 col-lg-3" key={index}>
//                     <div className="text-center p-3 h-100">
//                       <div className="fs-2 mb-3">{step.icon}</div>
//                       <h6 className="fw-semibold mb-2">{step.title}</h6>
//                       <small className="text-muted">{step.desc}</small>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .cursor-pointer {
//           cursor: pointer;
//         }
        
//         .progress-bar {
//           transition: width 0.3s ease;
//         }
        
//         .form-control:focus, .form-select:focus {
//           border-color: #0d6efd;
//           box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
//         }
        
//         .btn {
//           border-radius: 10px;
//           transition: all 0.3s ease;
//         }
        
//         .btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         }
        
//         .card {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
        
//         .btn-success:hover:not(:disabled) {
//           animation: pulse 1s infinite;
//         }
        
//         .modal {
//           display: block !important;
//           background-color: rgba(0,0,0,0.5);
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import privateAPI from "./api/privateAxios";
// import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   AlertCircle,
//   Upload,
//   MapPin,
//   FileText,
//   Clock,
//   Building,
//   CheckCircle,
//   Lightbulb,
//   Shield,
//   Camera,
//   Send
// } from "lucide-react";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     category: "",
//     priority: "medium",
//     location: "",
//     description: "",
//     suggestion: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [animateSuccess, setAnimateSuccess] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [fileName, setFileName] = useState("");
//   const [errors, setErrors] = useState({});
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showLocationModal, setShowLocationModal] = useState(false);

//   const totalSteps = 3;

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     setLoading(true);
//     privateAPI
//       .get("/accounts/CategoryList/")
//       .then((res) => {
//         setCategories(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "attachment") {
//       if (files && files[0]) {
//         if (files[0].size > 5 * 1024 * 1024) {
//           setErrors({ ...errors, attachment: "File size must be less than 5MB" });
//           return;
//         }
//         const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
//         if (!validTypes.includes(files[0].type)) {
//           setErrors({ ...errors, attachment: "Only JPG, PNG, and PDF files are allowed" });
//           return;
//         }
//         setFormData({ ...formData, attachment: files[0] });
//         setFileName(files[0].name);
//         setErrors({ ...errors, attachment: "" });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: "" });
//       }
//     }
//   };

//   /* ================= GET CURRENT LOCATION ================= */
//   const getCurrentLocation = () => {
//     setShowLocationModal(true);
//   };

//   const confirmLocation = () => {
//     setShowLocationModal(false);
    
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setLoading(true);
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
//           .then(response => response.json())
//           .then(data => {
//             const address = data.display_name || `${latitude}, ${longitude}`;
//             setFormData({ ...formData, location: address });
//             setLoading(false);
//           })
//           .catch(() => {
//             setFormData({ ...formData, location: `${latitude}, ${longitude}` });
//             setLoading(false);
//           });
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         setLoading(false);
//         alert("Unable to retrieve your location. Please enter manually.");
//       }
//     );
//   };

//   /* ================= VALIDATE FORM ================= */
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.category) newErrors.category = "Please select a category";
//     if (!formData.location.trim()) newErrors.location = "Please provide location";
//     if (!formData.description.trim()) newErrors.description = "Please describe your complaint";
//     if (formData.description.trim().length < 20) newErrors.description = "Description should be at least 20 characters";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= HANDLE SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // If not on last step, move to next step
//     if (currentStep < totalSteps) {
//       // Validate current step
//       let stepValid = true;
//       const stepErrors = {};
      
//       if (currentStep === 1) {
//         if (!formData.category) {
//           stepErrors.category = "Please select a category";
//           stepValid = false;
//         }
//       } else if (currentStep === 2) {
//         if (!formData.location.trim()) {
//           stepErrors.location = "Please provide location";
//           stepValid = false;
//         }
//         if (!formData.description.trim()) {
//           stepErrors.description = "Please describe your complaint";
//           stepValid = false;
//         }
//         if (formData.description.trim().length < 20) {
//           stepErrors.description = "Description should be at least 20 characters";
//           stepValid = false;
//         }
//       }
      
//       if (!stepValid) {
//         setErrors(stepErrors);
//         return;
//       }
      
//       setCurrentStep(currentStep + 1);
//       return;
//     }
    
//     // If on last step, submit the form
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     const data = new FormData();
//     data.append("category", formData.category);
//     data.append("priority", formData.priority);
//     data.append("location", formData.location);
//     data.append("description", formData.description);

//     if (formData.suggestion?.trim()) {
//       data.append("suggestion", formData.suggestion);
//     }

//     if (formData.attachment) {
//       data.append("attachment", formData.attachment);
//     }

//     try {
//       await privateAPI.post("/accounts/citizen/complaints/", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setAnimateSuccess(true);
//       setTimeout(() => {
//         setAnimateSuccess(false);
        
//         // Reset form
//         setFormData({
//           category: "",
//           priority: "medium",
//           location: "",
//           description: "",
//           suggestion: "",
//           attachment: null,
//         });
//         setFileName("");
//         setErrors({});
//         setCurrentStep(1);
        
//         // Show success message
//         const complaintId = "CMP" + Date.now().toString().slice(-8);
//         showNotification(
//           `✅ Complaint Submitted Successfully!<br>Your Complaint ID: <strong>${complaintId}</strong><br><small>Department will be assigned automatically by AI</small>`,
//           "success"
//         );
        
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       let errorMessage = "❌ Submission failed. Please try again.";
      
//       if (err.response) {
//         if (err.response.status === 400) {
//           errorMessage = "❌ Invalid data. Please check all fields.";
//         } else if (err.response.status === 401) {
//           errorMessage = "❌ Session expired. Please login again.";
//         } else if (err.response.status === 500) {
//           errorMessage = "❌ Server error. Please try again later.";
//         }
        
//         // Display specific field errors from API
//         if (err.response.data) {
//           const apiErrors = err.response.data;
//           const fieldErrors = {};
//           Object.keys(apiErrors).forEach(key => {
//             fieldErrors[key] = Array.isArray(apiErrors[key]) 
//               ? apiErrors[key][0] 
//               : apiErrors[key];
//           });
//           setErrors(fieldErrors);
//         }
//       }
      
//       showNotification(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (message, type = "success") => {
//     const notification = document.createElement("div");
//     notification.className = `alert alert-${type === "success" ? "success" : "danger"} animate__animated animate__fadeInUp position-fixed`;
//     notification.style.cssText = `
//       top: 20px;
//       right: 20px;
//       z-index: 9999;
//       min-width: 300px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//     `;
//     notification.innerHTML = `
//       <div class="d-flex align-items-center">
//         <span class="me-2">${type === "success" ? "✅" : "⚠️"}</span>
//         <div>${message}</div>
//         <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
//       </div>
//     `;
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//       if (notification.parentNode) {
//         notification.remove();
//       }
//     }, 5000);
//   };

//   const nextStep = () => {
//     // Validate current step before proceeding
//     let stepValid = true;
//     const stepErrors = {};
    
//     if (currentStep === 1) {
//       if (!formData.category) {
//         stepErrors.category = "Please select a category";
//         stepValid = false;
//       }
//     } else if (currentStep === 2) {
//       if (!formData.location.trim()) {
//         stepErrors.location = "Please provide location";
//         stepValid = false;
//       }
//       if (!formData.description.trim()) {
//         stepErrors.description = "Please describe your complaint";
//         stepValid = false;
//       }
//       if (formData.description.trim().length < 20) {
//         stepErrors.description = "Description should be at least 20 characters";
//         stepValid = false;
//       }
//     }
    
//     if (!stepValid) {
//       setErrors(stepErrors);
//       return;
//     }
    
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container-fluid py-4" style={{
//       background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//       minHeight: "100vh",
//       fontFamily: "'Segoe UI', 'Roboto', sans-serif"
//     }}>
//       {/* Success Overlay */}
//       {animateSuccess && (
//         <div
//           className="animate__animated animate__fadeIn fixed-top d-flex justify-content-center align-items-center"
//           style={{
//             height: "100vh",
//             background: "linear-gradient(135deg, rgba(25,135,84,0.95) 0%, rgba(21,101,71,0.95) 100%)",
//             zIndex: 9999,
//           }}
//         >
//           <div className="text-center text-white animate__animated animate__zoomIn">
//             <div className="display-1 mb-4 animate__animated animate__bounceIn">
//               <CheckCircle size={80} />
//             </div>
//             <h2 className="mb-3 fw-bold">Complaint Submitted Successfully!</h2>
//             <p className="fs-5 opacity-90">
//               AI is analyzing your complaint and will automatically assign it to the right department.
//             </p>
//             <div className="mt-4">
//               <div className="spinner-border text-light" role="status">
//                 <span className="visually-hidden">Processing...</span>
//               </div>
//               <p className="mt-3 small">AI is routing your complaint...</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Location Permission Modal */}
//       {showLocationModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">📍 Location Access</h5>
//                 <button 
//                   type="button" 
//                   className="btn-close" 
//                   onClick={() => setShowLocationModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <p>Allow access to your location for accurate complaint mapping?</p>
//                 <div className="alert alert-info">
//                   <small>Your location will only be used to pinpoint the issue location on the map.</small>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowLocationModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="btn btn-primary" 
//                   onClick={confirmLocation}
//                 >
//                   Allow Location Access
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="row justify-content-center">
//         <div className="col-12 col-lg-10 col-xl-8">
//           {/* Header Card */}
//           <div className="card border-0 shadow-lg mb-4 animate__animated animate__fadeInDown">
//             <div className="card-body p-4" style={{
//               background: "linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)",
//               borderRadius: "15px 15px 0 0"
//             }}>
//               <div className="row align-items-center">
//                 <div className="col-md-8">
//                   <h1 className="text-white fw-bold mb-2">
//                     <AlertCircle className="me-3" size={32} />
//                     File a New Complaint
//                   </h1>
//                   <p className="text-white-50 mb-0">
//                     Just describe your problem. AI will automatically route it to the right department.
//                   </p>
//                 </div>
//                 <div className="col-md-4 text-end">
//                   <div className="bg-white bg-opacity-20 rounded-pill d-inline-flex align-items-center px-4 py-2">
//                     <Shield size={20} className="me-2 text-white" />
//                     <span className="text-white fw-medium">AI-Powered Portal</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Progress Steps */}
//           <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn">
//             <div className="card-body p-4">
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 {[1, 2, 3].map((step) => (
//                   <div key={step} className="text-center">
//                     <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 
//                       ${currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'}`}
//                       style={{ width: '40px', height: '40px' }}>
//                       {step}
//                     </div>
//                     <div className="small fw-medium">
//                       {step === 1 && "Basic Details"}
//                       {step === 2 && "Describe Problem"}
//                       {step === 3 && "Review & Submit"}
//                     </div>
//                   </div>
//                 ))}
//                 <div className="flex-grow-1 mx-3">
//                   <div className="progress" style={{ height: '4px' }}>
//                     <div className="progress-bar" 
//                       style={{ width: `${(currentStep - 1) * 50}%` }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Form Card */}
//           <div className="card border-0 shadow-lg animate__animated animate__fadeInUp">
//             <form onSubmit={handleSubmit}>
//               <div className="card-body p-4 p-md-5">
//                 {/* Step 1: Basic Information */}
//                 {currentStep === 1 && (
//                   <div className="animate__animated animate__fadeIn">
//                     <h4 className="fw-bold mb-4 border-bottom pb-3">
//                       <Building className="me-2" />
//                       Complaint Information
//                     </h4>
                    
//                     <div className="row g-4">
//                       {/* Category */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">
//                           Category <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className={`form-select form-select-lg ${errors.category ? 'is-invalid' : ''}`}
//                           value={formData.category}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               category: e.target.value,
//                             });
//                             if (errors.category) setErrors({ ...errors, category: "" });
//                           }}
//                           required
//                         >
//                           <option value="">Select Complaint Category</option>
//                           {categories.map((cat) => (
//                             <option key={cat.id} value={cat.id}>
//                               {cat.name}
//                             </option>
//                           ))}
//                         </select>
//                         {errors.category && (
//                           <div className="invalid-feedback d-block animate__animated animate__fadeIn">
//                             {errors.category}
//                           </div>
//                         )}
//                       </div>

//                       {/* Priority */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">
//                           Priority Level <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           className={`form-select form-select-lg ${errors.priority ? 'is-invalid' : ''}`}
//                           name="priority"
//                           value={formData.priority}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="low">🟢 Low Priority</option>
//                           <option value="medium">🟡 Medium Priority</option>
//                           <option value="high">🔴 High Priority</option>
//                         </select>
//                         {errors.priority && (
//                           <div className="invalid-feedback d-block">
//                             {errors.priority}
//                           </div>
//                         )}
//                         <small className="text-muted">
//                           Our AI may adjust priority based on issue severity
//                         </small>
//                       </div>

//                       {/* AI Department Assignment Info */}
//                       <div className="col-12">
//                         <div className="alert alert-info">
//                           <div className="d-flex align-items-center">
//                             <div className="me-3 fs-4">🤖</div>
//                             <div>
//                               <strong>Smart Department Assignment</strong>
//                               <p className="mb-0 mt-1">
//                                 No need to select department! Our AI analyzes your description and automatically 
//                                 routes your complaint to the most relevant department.
//                               </p>
//                               <small className="d-block mt-2">
//                                 <strong>How it works:</strong> The system uses NLP to identify keywords and context 
//                                 from your description to determine the appropriate department.
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 2: Location & Description */}
//                 {currentStep === 2 && (
//                   <div className="animate__animated animate__fadeIn">
//                     <h4 className="fw-bold mb-4 border-bottom pb-3">
//                       <MapPin className="me-2" />
//                       Describe Your Problem
//                     </h4>
                    
//                     <div className="row g-4">
//                       {/* Location */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           Issue Location <span className="text-danger">*</span>
//                         </label>
//                         <div className="input-group mb-3">
//                           <input
//                             className={`form-control form-control-lg ${errors.location ? 'is-invalid' : ''}`}
//                             name="location"
//                             placeholder="Enter exact location (street, landmark, area)"
//                             value={formData.location}
//                             onChange={handleChange}
//                             required
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-outline-primary"
//                             onClick={getCurrentLocation}
//                             disabled={loading}
//                           >
//                             {loading ? (
//                               <span className="spinner-border spinner-border-sm"></span>
//                             ) : (
//                               <>
//                                 <MapPin className="me-2" size={16} />
//                                 Use My Location
//                               </>
//                             )}
//                           </button>
//                         </div>
//                         {errors.location && (
//                           <div className="invalid-feedback d-block">
//                             {errors.location}
//                           </div>
//                         )}
//                         <small className="text-muted">
//                           Precise location helps departments respond faster
//                         </small>
//                       </div>

//                       {/* Description - SIMPLIFIED FOR CITIZEN */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           Describe Your Problem <span className="text-danger">*</span>
//                         </label>
//                         <textarea
//                           className={`form-control form-control-lg ${errors.description ? 'is-invalid' : ''}`}
//                           name="description"
//                           placeholder="Explain your problem in simple words. Example: 'There is a big pothole on Main Road near the market that needs urgent repair.'"
//                           rows="5"
//                           value={formData.description}
//                           onChange={handleChange}
//                           required
//                         />
//                         {errors.description && (
//                           <div className="invalid-feedback d-block">
//                             {errors.description}
//                           </div>
//                         )}
//                         <div className="d-flex justify-content-between mt-2">
//                           <small className="text-muted">
//                             Minimum 20 characters
//                           </small>
//                           <small className={formData.description.length < 20 ? 'text-danger' : 'text-success'}>
//                             {formData.description.length} characters
//                           </small>
//                         </div>
                        
//                         {/* VERY IMPORTANT HELP TEXT */}
//                         <div className="alert alert-light border mt-3">
//                           <small className="text-muted d-block mb-1">
//                             <strong>💡 Just describe your issue naturally.</strong> Our AI system will automatically:
//                           </small>
//                           <ul className="small text-muted mb-0">
//                             <li>Identify the concerned department</li>
//                             <li>Determine appropriate priority level</li>
//                             <li>Route your complaint efficiently</li>
//                           </ul>
//                         </div>
//                       </div>

//                       {/* Suggestion */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           <Lightbulb className="me-2" size={18} />
//                           Your Suggestion (Optional)
//                         </label>
//                         <textarea
//                           className="form-control form-control-lg"
//                           name="suggestion"
//                           placeholder="Any suggestions for how this issue should be resolved?"
//                           rows="3"
//                           value={formData.suggestion}
//                           onChange={handleChange}
//                         />
//                         <small className="text-muted">
//                           Your suggestions help departments implement better solutions
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 3: Review & Submit */}
//                 {currentStep === 3 && (
//                   <div className="animate__animated animate__fadeIn">
//                     <h4 className="fw-bold mb-4 border-bottom pb-3">
//                       <FileText className="me-2" />
//                       Review & Submit
//                     </h4>
                    
//                     {/* Review Card */}
//                     <div className="card border mb-4">
//                       <div className="card-body">
//                         <h5 className="fw-bold mb-3">Review Your Complaint</h5>
//                         <div className="row g-3">
//                           <div className="col-md-6">
//                             <strong>Category:</strong>
//                             <p>{categories.find(c => c.id == formData.category)?.name || 'Not selected'}</p>
//                           </div>
//                           <div className="col-md-6">
//                             <strong>Priority:</strong>
//                             <p>
//                               <span className={`badge ${formData.priority === 'high' ? 'bg-danger' : formData.priority === 'medium' ? 'bg-warning' : 'bg-success'}`}>
//                                 {formData.priority?.toUpperCase()}
//                               </span>
//                             </p>
//                           </div>
//                           <div className="col-12">
//                             <strong>Department Assignment:</strong>
//                             <p className="text-info fw-semibold">
//                               <span className="badge bg-info me-2">AI-POWERED</span>
//                               Will be automatically assigned based on your description
//                             </p>
//                             <div className="alert alert-light border mt-2">
//                               <small className="text-muted">
//                                 <strong>Behind the scenes:</strong> Our NLP engine analyzes keywords in your description 
//                                 to route your complaint to the most appropriate department.
//                               </small>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <strong>Location:</strong>
//                             <p className="text-truncate">
//                               <MapPin size={16} className="me-1" />
//                               {formData.location || 'Not provided'}
//                             </p>
//                           </div>
//                           <div className="col-12">
//                             <strong>Description:</strong>
//                             <p className="text-muted">{formData.description || 'Not provided'}</p>
//                           </div>
//                           {formData.suggestion && (
//                             <div className="col-12">
//                               <strong>Your Suggestion:</strong>
//                               <p className="text-muted">{formData.suggestion}</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Attachment Upload */}
//                     <div className="mb-4">
//                       <label className="form-label fw-semibold">
//                         <Camera className="me-2" />
//                         Attach Evidence (Optional)
//                       </label>
//                       <div className={`border rounded p-4 text-center ${errors.attachment ? 'border-danger' : ''}`}
//                         style={{ borderStyle: 'dashed' }}>
//                         <input
//                           type="file"
//                           name="attachment"
//                           className="d-none"
//                           id="attachment"
//                           onChange={handleChange}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                         />
//                         <label htmlFor="attachment" className="cursor-pointer">
//                           <Upload size={48} className="text-muted mb-3" />
//                           <h5 className="mb-2">Click to upload evidence</h5>
//                           <p className="text-muted small mb-2">
//                             Upload photos or documents related to your complaint
//                           </p>
//                           <small className="text-muted">Max file size: 5MB • JPG, PNG, PDF</small>
//                         </label>
//                         {fileName && (
//                           <div className="alert alert-success mt-3 animate__animated animate__fadeIn">
//                             ✅ File selected: <strong>{fileName}</strong>
//                           </div>
//                         )}
//                         {errors.attachment && (
//                           <div className="alert alert-danger mt-3">
//                             {errors.attachment}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Terms & Submit */}
//                     <div className="form-check mb-4">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="terms"
//                         required
//                       />
//                       <label className="form-check-label" htmlFor="terms">
//                         I confirm that all information provided is accurate to the best of my knowledge.
//                         I understand that false complaints may lead to legal action.
//                       </label>
//                     </div>
//                   </div>
//                 )}

//                 {/* Navigation Buttons - ALWAYS VISIBLE */}
//                 <div className="d-flex justify-content-between mt-5 pt-4 border-top">
//                   {currentStep > 1 ? (
//                     <button 
//                       type="button" 
//                       className="btn btn-outline-secondary px-5 py-3"
//                       onClick={prevStep}
//                       disabled={loading}
//                     >
//                       ← Back
//                     </button>
//                   ) : (
//                     <div></div> // Empty div to maintain spacing
//                   )}
                  
//                   {currentStep < totalSteps ? (
//                     <button 
//                       type="button" 
//                       className="btn btn-primary px-5 py-3"
//                       onClick={nextStep}
//                       disabled={loading}
//                     >
//                       Continue →
//                     </button>
//                   ) : (
//                     <button 
//                       type="submit" 
//                       className="btn btn-success px-5 py-3 fw-bold"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2"></span>
//                           Submitting...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="me-2" />
//                           Submit Complaint
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Help Card */}
//           <div className="card border-0 shadow-sm mt-4 animate__animated animate__fadeInUp animate__delay-1s">
//             <div className="card-body p-4">
//               <h5 className="fw-bold mb-3">
//                 <Clock className="me-2" />
//                 What happens after submission?
//               </h5>
//               <div className="row g-3">
//                 {[
//                   { icon: "📋", title: "Complaint Registered", desc: "You'll receive a complaint ID for tracking" },
//                   { icon: "🤖", title: "AI Analysis", desc: "NLP identifies department and priority automatically" },
//                   { icon: "🔀", title: "Smart Routing", desc: "Complaint routed to the most relevant department" },
//                   { icon: "✅", title: "Resolution", desc: "You'll be notified when the issue is resolved" }
//                 ].map((step, index) => (
//                   <div className="col-md-6 col-lg-3" key={index}>
//                     <div className="text-center p-3 h-100">
//                       <div className="fs-2 mb-3">{step.icon}</div>
//                       <h6 className="fw-semibold mb-2">{step.title}</h6>
//                       <small className="text-muted">{step.desc}</small>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               {/* Safety Net Information */}
//               <div className="alert alert-warning mt-4">
//                 <h6 className="fw-bold">🛡️ Safety Features Built-in:</h6>
//                 <small className="d-block">
//                   • If AI can't determine department, complaint goes to <strong>General Administration</strong>
//                 </small>
//                 <small className="d-block mt-1">
//                   • Administrators can reassign complaints if needed
//                 </small>
//                 <small className="d-block mt-1">
//                   • System learns and improves from corrections
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .cursor-pointer {
//           cursor: pointer;
//         }
        
//         .progress-bar {
//           transition: width 0.3s ease;
//         }
        
//         .form-control:focus, .form-select:focus {
//           border-color: #0d6efd;
//           box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
//         }
        
//         .btn {
//           border-radius: 10px;
//           transition: all 0.3s ease;
//         }
        
//         .btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         }
        
//         .card {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
        
//         .btn-success:hover:not(:disabled) {
//           animation: pulse 1s infinite;
//         }
        
//         .modal {
//           display: block !important;
//           background-color: rgba(0,0,0,0.5);
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import privateAPI from "./api/privateAxios";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AlertCircle,
  Upload,
  MapPin,
  FileText,
  Clock,
  CheckCircle,
  Lightbulb,
  Shield,
  Camera,
  Send
} from "lucide-react";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    suggestion: "",
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const totalSteps = 2; // Reduced to 2 steps only

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "attachment") {
      if (files && files[0]) {
        if (files[0].size > 5 * 1024 * 1024) {
          setErrors({ ...errors, attachment: "File size must be less than 5MB" });
          return;
        }
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
        if (!validTypes.includes(files[0].type)) {
          setErrors({ ...errors, attachment: "Only JPG, PNG, and PDF files are allowed" });
          return;
        }
        setFormData({ ...formData, attachment: files[0] });
        setFileName(files[0].name);
        setErrors({ ...errors, attachment: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  /* ================= GET CURRENT LOCATION ================= */
  const getCurrentLocation = () => {
    setShowLocationModal(true);
  };

  const confirmLocation = () => {
    setShowLocationModal(false);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `${latitude}, ${longitude}`;
            setFormData({ ...formData, location: address });
            setLoading(false);
          })
          .catch(() => {
            setFormData({ ...formData, location: `${latitude}, ${longitude}` });
            setLoading(false);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
        alert("Unable to retrieve your location. Please enter manually.");
      }
    );
  };

  /* ================= VALIDATE FORM ================= */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = "Please describe your problem";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Please describe your problem in more detail (at least 10 characters)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If not on last step, move to next step
    if (currentStep < totalSteps) {
      // Validate current step
      let stepValid = true;
      const stepErrors = {};
      
      if (currentStep === 1) {
        if (!formData.description.trim()) {
          stepErrors.description = "Please describe your problem";
          stepValid = false;
        } else if (formData.description.trim().length < 10) {
          stepErrors.description = "Please describe your problem in more detail (at least 10 characters)";
          stepValid = false;
        }
      }
      
      if (!stepValid) {
        setErrors(stepErrors);
        return;
      }
      
      setCurrentStep(currentStep + 1);
      return;
    }
    
    // If on last step, submit the form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("description", formData.description);
    
    // Only add location if provided (optional)
    if (formData.location.trim()) {
      data.append("location", formData.location);
    }
    
    // Only add suggestion if provided (optional)
    if (formData.suggestion?.trim()) {
      data.append("suggestion", formData.suggestion);
    }

    if (formData.attachment) {
      data.append("attachment", formData.attachment);
    }

    try {
      await privateAPI.post("/accounts/citizen/complaints/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnimateSuccess(true);
      setTimeout(() => {
        setAnimateSuccess(false);
        
        // Reset form
        setFormData({
          location: "",
          description: "",
          suggestion: "",
          attachment: null,
        });
        setFileName("");
        setErrors({});
        setCurrentStep(1);
        
        // Show success message
        const complaintId = "CMP" + Date.now().toString().slice(-8);
        showNotification(
          `✅ Complaint Submitted Successfully!<br>
          <strong>Your Complaint ID: ${complaintId}</strong><br>
          <small>AI is analyzing your complaint and will route it to the right department.</small>`,
          "success"
        );
        
      }, 2000);
    } catch (err) {
      console.error(err);
      let errorMessage = "❌ Submission failed. Please try again.";
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "❌ Invalid data. Please check all fields.";
        } else if (err.response.status === 401) {
          errorMessage = "❌ Session expired. Please login again.";
        } else if (err.response.status === 500) {
          errorMessage = "❌ Server error. Please try again later.";
        }
        
        // Display specific field errors from API
        if (err.response.data) {
          const apiErrors = err.response.data;
          const fieldErrors = {};
          Object.keys(apiErrors).forEach(key => {
            fieldErrors[key] = Array.isArray(apiErrors[key]) 
              ? apiErrors[key][0] 
              : apiErrors[key];
          });
          setErrors(fieldErrors);
        }
      }
      
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type === "success" ? "success" : "danger"} animate__animated animate__fadeInUp position-fixed`;
    notification.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <span class="me-2">${type === "success" ? "✅" : "⚠️"}</span>
        <div>${message}</div>
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  };

  const nextStep = () => {
    // Validate current step before proceeding
    let stepValid = true;
    const stepErrors = {};
    
    if (currentStep === 1) {
      if (!formData.description.trim()) {
        stepErrors.description = "Please describe your problem";
        stepValid = false;
      } else if (formData.description.trim().length < 10) {
        stepErrors.description = "Please describe your problem in more detail (at least 10 characters)";
        stepValid = false;
      }
    }
    
    if (!stepValid) {
      setErrors(stepErrors);
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container-fluid py-4" style={{
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', 'Roboto', sans-serif"
    }}>
      {/* Success Overlay */}
      {animateSuccess && (
        <div
          className="animate__animated animate__fadeIn fixed-top d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            background: "linear-gradient(135deg, rgba(25,135,84,0.95) 0%, rgba(21,101,71,0.95) 100%)",
            zIndex: 9999,
          }}
        >
          <div className="text-center text-white animate__animated animate__zoomIn">
            <div className="display-1 mb-4 animate__animated animate__bounceIn">
              <CheckCircle size={80} />
            </div>
            <h2 className="mb-3 fw-bold">Complaint Registered!</h2>
            <p className="fs-5 opacity-90">
              AI is now analyzing your complaint and will automatically<br />
              route it to the right government department.
            </p>
            <div className="mt-4">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Processing...</span>
              </div>
              <p className="mt-3 small">AI is determining the right department...</p>
            </div>
          </div>
        </div>
      )}

      {/* Location Permission Modal */}
      {showLocationModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📍 Location Access</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowLocationModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Allow access to your location for accurate complaint mapping?</p>
                <div className="alert alert-info">
                  <small>Your location will only be used to pinpoint the issue location on the map.</small>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowLocationModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={confirmLocation}
                >
                  Allow Location Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          {/* Header Card */}
          <div className="card border-0 shadow-lg mb-4 animate__animated animate__fadeInDown">
            <div className="card-body p-4" style={{
              background: "linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)",
              borderRadius: "15px 15px 0 0"
            }}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h1 className="text-white fw-bold mb-2">
                    <AlertCircle className="me-3" size={32} />
                    Report a Problem
                  </h1>
                  <p className="text-white-50 mb-0">
                    Just describe your issue. AI will handle everything else.
                  </p>
                </div>
                <div className="col-md-4 text-end">
                  <div className="bg-white bg-opacity-20 rounded-pill d-inline-flex align-items-center px-4 py-2">
                    <Shield size={20} className="me-2 text-white" />
                    <span className="text-green fw-medium">AI-Powered Portal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps - SIMPLIFIED */}
          <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                {[1, 2].map((step) => (
                  <div key={step} className="text-center">
                    <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 
                      ${currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'}`}
                      style={{ width: '40px', height: '40px' }}>
                      {step}
                    </div>
                    <div className="small fw-medium">
                      {step === 1 && "Describe Problem"}
                      {step === 2 && "Review & Submit"}
                    </div>
                  </div>
                ))}
                <div className="flex-grow-1 mx-3">
                  <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar" 
                      style={{ width: `${(currentStep - 1) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="card border-0 shadow-lg animate__animated animate__fadeInUp">
            <form onSubmit={handleSubmit}>
              <div className="card-body p-4 p-md-5">
                {/* Step 1: Describe Problem */}
                {currentStep === 1 && (
                  <div className="animate__animated animate__fadeIn">
                    <h4 className="fw-bold mb-4 border-bottom pb-3">
                      Describe Your Problem
                    </h4>
                    
                    <div className="row g-4">
                      {/* Main Problem Description */}
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          What's the problem? <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className={`form-control form-control-lg ${errors.description ? 'is-invalid' : ''}`}
                          name="description"
                          placeholder="Explain your problem in simple words...
Example 1: 'There is a big pothole on Main Road near the market that needs urgent repair.'
Example 2: 'My birth certificate application has been pending for 3 months at the corporation office.'
Example 3: 'Street lights on Gandhi Nagar 5th street are not working for a week.'"
                          rows="5"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                        {errors.description && (
                          <div className="invalid-feedback d-block">
                            {errors.description}
                          </div>
                        )}
                        
                        {/* VERY IMPORTANT HELP TEXT */}
                        <div className="alert alert-info mt-3">
                          <div className="d-flex align-items-start">
                            <div className="me-3 fs-5">🤖</div>
                            <div>
                              <strong className="d-block mb-1">No need to know government departments!</strong>
                              <small className="text-muted">
                                Just describe your issue naturally. Our AI will automatically:
                              </small>
                              <ul className="small text-muted mt-2 mb-0">
                                <li>Identify the right department</li>
                                <li>Set appropriate priority level</li>
                                <li>Route your complaint efficiently</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between mt-2">
                          <small className="text-muted">
                            Minimum 10 characters
                          </small>
                          <small className={formData.description.length < 10 ? 'text-danger' : 'text-success'}>
                            {formData.description.length} characters
                          </small>
                        </div>
                      </div>

                      {/* Location (Optional) */}
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          <MapPin className="me-2" size={18} />
                          Where is it located? (Optional)
                        </label>
                        <div className="input-group mb-3">
                          <input
                            className="form-control form-control-lg"
                            name="location"
                            placeholder="Enter location (street, landmark, area)"
                            value={formData.location}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={getCurrentLocation}
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <>
                                <MapPin className="me-2" size={16} />
                                Use My Location
                              </>
                            )}
                          </button>
                        </div>
                        <small className="text-muted">
                          Adding location helps departments respond faster
                        </small>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Review & Submit */}
                {currentStep === 2 && (
                  <div className="animate__animated animate__fadeIn">
                    <h4 className="fw-bold mb-4 border-bottom pb-3">
                      <FileText className="me-2" />
                      Review & Submit
                    </h4>
                    
                    {/* Review Card */}
                    <div className="card border mb-4">
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">Your Complaint</h5>
                        <div className="row g-3">
                          <div className="col-12">
                            <strong>Your Problem:</strong>
                            <p className="text-muted">{formData.description}</p>
                          </div>
                          {formData.location && (
                            <div className="col-12">
                              <strong>Location:</strong>
                              <p className="text-truncate">
                                <MapPin size={16} className="me-1" />
                                {formData.location}
                              </p>
                            </div>
                          )}
                          
                          {/* AI Processing Info */}
                          <div className="col-12">
                            <div className="alert alert-light border">
                              <h6 className="fw-bold mb-2">🤖 AI Processing Preview</h6>
                              <div className="row g-2">
                                <div className="col-md-6">
                                  <strong className="small">Department:</strong>
                                  <p className="text-info small mb-0">
                                    <span className="badge bg-info me-1">AI-POWERED</span>
                                    Will be automatically assigned
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <strong className="small">Priority:</strong>
                                  <p className="small mb-0">
                                    <span className="badge bg-warning me-1">AUTO-DETECT</span>
                                    Based on urgency keywords
                                  </p>
                                </div>
                              </div>
                              <small className="text-muted d-block mt-2">
                                Our AI analyzes your description to determine the best department and priority level.
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optional Fields */}
                    <div className="row g-4">
                      {/* Suggestion */}
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          <Lightbulb className="me-2" size={18} />
                          Your Suggestion (Optional)
                        </label>
                        <textarea
                          className="form-control form-control-lg"
                          name="suggestion"
                          placeholder="Any suggestions for how this issue should be resolved?"
                          rows="3"
                          value={formData.suggestion}
                          onChange={handleChange}
                        />
                        <small className="text-muted">
                          Your suggestions help departments implement better solutions
                        </small>
                      </div>

                      {/* Attachment Upload */}
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          <Camera className="me-2" />
                          Attach Evidence (Optional)
                        </label>
                        <div className={`border rounded p-4 text-center ${errors.attachment ? 'border-danger' : ''}`}
                          style={{ borderStyle: 'dashed' }}>
                          <input
                            type="file"
                            name="attachment"
                            className="d-none"
                            id="attachment"
                            onChange={handleChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                          />
                          <label htmlFor="attachment" className="cursor-pointer">
                            <Upload size={48} className="text-muted mb-3" />
                            <h5 className="mb-2">Click to upload evidence</h5>
                            <p className="text-muted small mb-2">
                              Upload photos or documents related to your complaint
                            </p>
                            <small className="text-muted">Max file size: 5MB • JPG, PNG, PDF</small>
                          </label>
                          {fileName && (
                            <div className="alert alert-success mt-3 animate__animated animate__fadeIn">
                              ✅ File selected: <strong>{fileName}</strong>
                            </div>
                          )}
                          {errors.attachment && (
                            <div className="alert alert-danger mt-3">
                              {errors.attachment}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Terms & Submit */}
                    <div className="form-check mb-4 mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I confirm that all information provided is accurate to the best of my knowledge.
                        I understand that false complaints may lead to legal action.
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons - ALWAYS VISIBLE */}
                <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                  {currentStep > 1 ? (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-5 py-3"
                      onClick={prevStep}
                      disabled={loading}
                    >
                      ← Back
                    </button>
                  ) : (
                    <div></div> // Empty div to maintain spacing
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button 
                      type="button" 
                      className="btn btn-primary px-5 py-3"
                      onClick={nextStep}
                      disabled={loading}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="btn btn-success px-5 py-3 fw-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="me-2" />
                          Submit Complaint
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Help Card */}
          <div className="card border-0 shadow-sm mt-4 animate__animated animate__fadeInUp animate__delay-1s">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">
                <Clock className="me-2" />
                How It Works
              </h5>
              <div className="row g-3">
                {[
                  { 
                    icon: "📝", 
                    title: "Describe Issue", 
                    desc: "Simply explain your problem in plain language" 
                  },
                  { 
                    icon: "🤖", 
                    title: "AI Analysis", 
                    desc: "NLP automatically identifies department and priority" 
                  },
                  { 
                    icon: "🔀", 
                    title: "Smart Routing", 
                    desc: "Complaint routed to the most relevant department" 
                  },
                  { 
                    icon: "✅", 
                    title: "Resolution", 
                    desc: "You'll be notified when the issue is resolved" 
                  }
                ].map((step, index) => (
                  <div className="col-md-6 col-lg-3" key={index}>
                    <div className="text-center p-3 h-100">
                      <div className="fs-2 mb-3">{step.icon}</div>
                      <h6 className="fw-semibold mb-2">{step.title}</h6>
                      <small className="text-muted">{step.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Real Examples */}
              <div className="alert alert-light border mt-4">
                <h6 className="fw-bold mb-2">💡 Real Examples of What Citizens Say:</h6>
                <div className="row g-2">
                  <div className="col-md-6">
                    <small className="d-block text-muted">
                      <strong>Road Issue:</strong><br />
                      "There's a big pothole on MG Road near the bus stop causing accidents"
                    </small>
                  </div>
                  <div className="col-md-6">
                    <small className="d-block text-muted">
                      <strong>Certificate Issue:</strong><br />
                      "My birth certificate application is stuck for 2 months"
                    </small>
                  </div>
                  <div className="col-md-6">
                    <small className="d-block text-muted">
                      <strong>Electricity Issue:</strong><br />
                      "Our area has no electricity for 3 days, affecting hospitals"
                    </small>
                  </div>
                  <div className="col-md-6">
                    <small className="d-block text-muted">
                      <strong>Water Issue:</strong><br />
                      "Dirty water is coming from taps in Gandhi Nagar"
                    </small>
                  </div>
                </div>
              </div>
              
              {/* Safety Net Information */}
              <div className="alert alert-warning mt-3">
                <h6 className="fw-bold mb-2">🛡️ Smart Fallback System:</h6>
                <small className="d-block">
                  • If AI can't determine department, complaint goes to <strong>General Administration</strong>
                </small>
                <small className="d-block mt-1">
                  • Administrators can reassign complaints if needed
                </small>
                <small className="d-block mt-1">
                  • System learns and improves from every complaint
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        
        .progress-bar {
          transition: width 0.3s ease;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        
        .btn {
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .card {
          border-radius: 15px;
          overflow: hidden;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .btn-success:hover:not(:disabled) {
          animation: pulse 1s infinite;
        }
        
        .modal {
          display: block !important;
          background-color: rgba(0,0,0,0.5);
        }
        
        textarea {
          resize: vertical;
          min-height: 120px;
        }
      `}</style>
    </div>
  );
}