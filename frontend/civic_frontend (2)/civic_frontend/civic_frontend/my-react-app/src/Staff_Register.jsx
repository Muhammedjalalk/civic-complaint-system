// import React, { useState } from "react";
// import axios from "axios";

// export default function StaffRegister() {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     license_number: "",
//     department: "",
//     place: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/accounts/staff/register/", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true, // include if using session authentication
//       });

//       setMessage(response.data.message);
//       setFormData({
//         full_name: "",
//         email: "",
//         phone: "",
//         password: "",
//         license_number: "",
//         department: "",
//        place: "",
//       });
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.error || "Registration failed. Try again."
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Staff Registration</h2>

//       {message && <div className="alert alert-info">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Full Name</label>
//           <input
//             type="text"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">License Number</label>
//           <input
//             type="text"
//             name="license_number"
//             value={formData.license_number}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Department</label>
//           <input
//             type="text"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Place</label>
//           <textarea
//             name="place"
//             value={formData.address}
//             onChange={handleChange}
//             className="form-control"
//             rows="3"
//             required  
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StaffRegister() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    license_number: "",
    category: "", // Changed from direct department to category
    department: "", // This will now be department ID
    place: "",
  });

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    setLoadingCategories(true);
    axios.get("http://127.0.0.1:8000/api/accounts/CategoryList/")
      .then((res) => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please refresh the page.");
        setLoadingCategories(false);
      });
  }, []);

  // Fetch departments when category changes
  useEffect(() => {
    if (formData.category) {
      setLoadingDepartments(true);
      axios.get(`http://127.0.0.1:8000/api/accounts/departments/?category=${formData.category}`)
        .then((res) => {
          setDepartments(res.data);
          setLoadingDepartments(false);
        })
        .catch((err) => {
          console.error("Error fetching departments:", err);
          setError("Failed to load departments for this category.");
          setLoadingDepartments(false);
          setDepartments([]);
        });
    } else {
      setDepartments([]);
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "category") {
      // Reset department when category changes
      setFormData({ 
        ...formData, 
        [name]: value,
        department: "" 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation
    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (!formData.department) {
      setError("Please select a department");
      return;
    }

    // Prepare data for API
    const submitData = {
      ...formData,
      // Ensure department is sent as ID (convert to integer if needed)
      department: parseInt(formData.department) || formData.department
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/staff/register/", 
        submitData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setMessage(response.data.message || "Staff registered successfully!");
      
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        license_number: "",
        category: "",
        department: "",
        place: "",
      });
      setDepartments([]);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Staff Registration
              </h2>
              <p className="mb-0 text-white-50 small">Register new staff member with department assignment</p>
            </div>
            
            <div className="card-body">
              {message && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {message}
                  <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-person me-2"></i>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-envelope me-2"></i>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="example@domain.com"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-telephone me-2"></i>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="+1234567890"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-key me-2"></i>
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Create a strong password"
                      required
                      minLength="6"
                    />
                    <small className="form-text text-muted">Minimum 6 characters</small>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-card-checklist me-2"></i>
                      License Number *
                    </label>
                    <input
                      type="text"
                      name="license_number"
                      value={formData.license_number}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter license number"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-geo-alt me-2"></i>
                      Place/Area *
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter place/area"
                      required
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-tags me-2"></i>
                      Category *
                    </label>
                    {loadingCategories ? (
                      <div className="d-flex align-items-center">
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span>Loading categories...</span>
                      </div>
                    ) : (
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id || category.value} value={category.id || category.value}>
                            {category.name || category.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Department Selection (depends on category) */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-building me-2"></i>
                      Department *
                    </label>
                    {!formData.category ? (
                      <div className="alert alert-warning py-2 mb-0">
                        <small>
                          <i className="bi bi-info-circle me-1"></i>
                          Please select a category first
                        </small>
                      </div>
                    ) : loadingDepartments ? (
                      <div className="d-flex align-items-center">
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span>Loading departments...</span>
                      </div>
                    ) : departments.length === 0 ? (
                      <div className="alert alert-warning py-2 mb-0">
                        <small>
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          No departments found for this category
                        </small>
                      </div>
                    ) : (
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                            {dept.category && ` (${dept.category})`}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                {formData.department && departments.length > 0 && (
                  <div className="alert alert-info mb-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-info-circle fs-5 me-2"></i>
                      <div>
                        <strong>Selected Department:</strong>
                        <p className="mb-0 small">
                          {departments.find(d => d.id == formData.department)?.name}
                          {departments.find(d => d.id == formData.department)?.description && 
                            ` - ${departments.find(d => d.id == formData.department)?.description}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => {
                      setFormData({
                        full_name: "",
                        email: "",
                        phone: "",
                        password: "",
                        license_number: "",
                        category: "",
                        department: "",
                        place: "",
                      });
                      setDepartments([]);
                      setMessage("");
                      setError("");
                    }}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Clear Form
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4"
                    disabled={loadingCategories || loadingDepartments}
                  >
                    {loadingCategories || loadingDepartments ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Register Staff
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="card-footer bg-light">
              <small className="text-muted">
                <i className="bi bi-shield-check me-1"></i>
                All information is securely stored and encrypted.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-8 col-lg-6">
          <div className="card border-info">
            <div className="card-header bg-info bg-opacity-10">
              <h6 className="mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                How to Register Staff
              </h6>
            </div>
            <div className="card-body">
              <ol className="mb-0">
                <li>Fill in all personal details (name, email, phone)</li>
                <li>Create a secure password</li>
                <li>Enter the staff's license number</li>
                <li><strong>Select a category</strong> (e.g., Sanitation, Infrastructure)</li>
                <li><strong>Choose a department</strong> from the filtered list</li>
                <li>Specify the area/place of operation</li>
                <li>Click "Register Staff" to complete</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .card {
          border-radius: 10px;
        }
        
        .card-header {
          border-radius: 10px 10px 0 0 !important;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        
        .alert {
          border-radius: 8px;
          border: none;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
          border: none;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}