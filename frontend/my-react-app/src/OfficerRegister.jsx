

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