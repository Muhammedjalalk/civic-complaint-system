


import { useState } from "react";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const CitizenRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    place: "",
    pin: "",
    phone: "",
    password: "",
    confirmPassword: "",
    document_type: "",
    government_document: null,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          government_document: "File size must be less than 2MB",
        });
        return;
      }
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setFormErrors({
          ...formErrors,
          government_document: "Only JPG, PNG, and PDF files are allowed",
        });
        return;
      }
      
      setFormData({ ...formData, [name]: file });
      setFileName(file.name);
      
      // Clear file error if any
      if (formErrors.government_document) {
        setFormErrors({ ...formErrors, government_document: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear field-specific error
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.full_name.trim()) errors.full_name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.place.trim()) errors.place = "Place is required";
    if (!formData.pin.trim()) errors.pin = "PIN code is required";
    else if (!/^\d{6}$/.test(formData.pin)) errors.pin = "PIN must be 6 digits";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone must be 10 digits";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.document_type) errors.document_type = "Document type is required";
    if (!formData.government_document) errors.government_document = "Government document is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      
      data.append("full_name", formData.full_name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);
      data.append("place", formData.place);
      data.append("pin", formData.pin);
      data.append("document_type", formData.document_type);
      data.append("government_document", formData.government_document);

      await API.post("/accounts/register/citizen/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Success animation
      setSuccess("✅ Registration successful! You'll receive an email once your account is approved by admin.");
      
      // Add success animation effect
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        // Handle API validation errors
        const apiErrors = {};
        Object.keys(errorData).forEach(key => {
          apiErrors[key] = Array.isArray(errorData[key]) ? errorData[key][0] : errorData[key];
        });
        setFormErrors(apiErrors);
        setError("Please fix the errors below");
      } else {
        setError("❌ Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          {/* Success Animation Overlay */}
          {success && (
            <div className="animate__animated animate__fadeIn animate__faster fixed-top d-flex justify-content-center align-items-center"
                 style={{
                   height: '100vh',
                   backgroundColor: 'rgba(25, 135, 84, 0.95)',
                   zIndex: 9999
                 }}>
              <div className="text-center text-white">
                <div className="display-1 mb-4 animate__animated animate__bounceIn">✓</div>
                <h2 className="animate__animated animate__fadeInUp">Registration Submitted!</h2>
                <p className="animate__animated animate__fadeInUp animate__delay-1s">
                  Your registration is pending admin approval.<br />
                  You'll receive an email notification once approved.
                </p>
                <p className="animate__animated animate__fadeInUp animate__delay-2s">
                  Redirecting to login page...
                </p>
              </div>
            </div>
          )}

          {/* Registration Card */}
          <div className="card shadow-lg border-0 animate__animated animate__fadeInUp">
            <div className="card-header bg-primary-gradient text-white py-4">
              <div className="text-center">
                <h1 className="h3 mb-2 fw-bold">
                  <span className="me-2">📋</span>
                  Citizen Registration
                </h1>
                <p className="mb-0 opacity-75">Join our civic community today</p>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Info Alert */}
              <div className="alert alert-info animate__animated animate__fadeIn d-flex align-items-center mb-4"
                   role="alert">
                <span className="me-2">ℹ️</span>
                <div>
                  <strong>Important:</strong> All registrations require government document verification.
                  Account activation takes 24-48 hours after admin approval.
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger animate__animated animate__shakeX d-flex align-items-center"
                     role="alert">
                  <span className="me-2">⚠️</span>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="full_name" className="form-label fw-semibold">
                    <span className="me-2">👤</span>
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${formErrors.full_name ? 'is-invalid' : ''}`}
                    id="full_name"
                    name="full_name"
                    placeholder="Enter your full name as per government document"
                    value={formData.full_name}
                    onChange={handleChange}
                    style={{
                      borderLeft: formErrors.full_name ? '4px solid #dc3545' : '4px solid #0d6efd',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
                    onBlur={(e) => e.target.style.borderLeft = formErrors.full_name ? '4px solid #dc3545' : '4px solid #0d6efd'}
                  />
                  {formErrors.full_name && (
                    <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                      {formErrors.full_name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <span className="me-2">📧</span>
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      borderLeft: formErrors.email ? '4px solid #dc3545' : '4px solid #0d6efd',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderLeft = '4px solid #198754'}
                    onBlur={(e) => e.target.style.borderLeft = formErrors.email ? '4px solid #dc3545' : '4px solid #0d6efd'}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                      {formErrors.email}
                    </div>
                  )}
                </div>

                {/* Place & PIN Row */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="place" className="form-label fw-semibold">
                      <span className="me-2">📍</span>
                      Place <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${formErrors.place ? 'is-invalid' : ''}`}
                      id="place"
                      name="place"
                      placeholder="Your city/town"
                      value={formData.place}
                      onChange={handleChange}
                    />
                    {formErrors.place && (
                      <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                        {formErrors.place}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pin" className="form-label fw-semibold">
                      <span className="me-2">📮</span>
                      PIN Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${formErrors.pin ? 'is-invalid' : ''}`}
                      id="pin"
                      name="pin"
                      placeholder="6-digit PIN"
                      value={formData.pin}
                      onChange={handleChange}
                      maxLength="6"
                    />
                    {formErrors.pin && (
                      <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                        {formErrors.pin}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label fw-semibold">
                    <span className="me-2">📱</span>
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">+91</span>
                    <input
                      type="tel"
                      className={`form-control form-control-lg ${formErrors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                    />
                  </div>
                  {formErrors.phone && (
                    <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                      {formErrors.phone}
                    </div>
                  )}
                </div>

                {/* Password Row */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label fw-semibold">
                      <span className="me-2">🔒</span>
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control form-control-lg ${formErrors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {formErrors.password && (
                      <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                      <span className="me-2">🔒</span>
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-lg ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {formErrors.confirmPassword && (
                      <div className="invalid-feedback d-block animate__animated animate__fadeIn">
                        {formErrors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Type */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <span className="me-2">🆔</span>
                    Government Document Type <span className="text-danger">*</span>
                  </label>
                  <select
                    name="document_type"
                    className={`form-select form-select-lg ${formErrors.document_type ? "is-invalid" : ""}`}
                    value={formData.document_type}
                    onChange={handleChange}
                  >
                    <option value="">Select document type</option>
                    <option value="AADHAAR">Aadhaar Card</option>
                    <option value="VOTER">Voter ID Card</option>
                    <option value="PASSPORT">Passport</option>
                    <option value="DL">Driving License</option>
                  </select>
                  {formErrors.document_type && (
                    <div className="invalid-feedback d-block">{formErrors.document_type}</div>
                  )}
                </div>

                {/* Document Upload */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <span className="me-2">📎</span>
                    Upload Government Document <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="file"
                      name="government_document"
                      className={`form-control form-control-lg ${formErrors.government_document ? "is-invalid" : ""}`}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange}
                    />
                    {fileName && (
                      <span className="input-group-text bg-success text-white">
                        ✓ Uploaded
                      </span>
                    )}
                  </div>
                  {fileName && (
                    <div className="form-text text-success mt-1">
                      <small>Selected: {fileName}</small>
                    </div>
                  )}
                  {formErrors.government_document && (
                    <div className="invalid-feedback d-block">
                      {formErrors.government_document}
                    </div>
                  )}
                  <div className="form-text">
                    <small>Upload scanned copy/photo of your document (Max: 2MB, Formats: JPG, PNG, PDF)</small>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label className="form-check-label text-muted" htmlFor="terms">
                    I agree to the <a href="#" className="text-primary">Terms of Service</a> and confirm that all information provided is accurate.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold py-3"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)',
                      border: 'none',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {loading ? (
                      <span className="d-flex align-items-center justify-content-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying & Submitting...
                      </span>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center">
                        <span className="me-2">📝</span>
                        Submit for Verification
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted mb-0">
                  Already have an account?{" "}
                  <a 
                    href="/login" 
                    className="text-primary fw-semibold text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                    style={{ transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#0d6efd'}
                    onMouseLeave={(e) => e.target.style.color = '#0d6efd'}
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="card shadow-sm border-0 mt-4 animate__animated animate__fadeInUp animate__delay-1s">
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3">
                <span className="me-2">✨</span>
                Registration Process
              </h5>
              <div className="row">
                {[
                  { icon: "📝", title: "Submit Details", desc: "Fill form with accurate information" },
                  { icon: "📎", title: "Upload Document", desc: "Upload government ID proof" },
                  { icon: "⏳", title: "Admin Review", desc: "Verification within 48 hours" },
                  { icon: "📧", title: "Email Confirmation", desc: "Receive approval notification" },
                  { icon: "🔐", title: "Account Activation", desc: "Login after approval" },
                  { icon: "📢", title: "Start Reporting", desc: "File civic complaints" }
                ].map((feature, index) => (
                  <div className="col-6 mb-3" key={index}>
                    <div className="d-flex align-items-center">
                      <span className="text-primary fs-4 me-2">{feature.icon}</span>
                      <div>
                        <h6 className="fw-semibold mb-1">{feature.title}</h6>
                        <small className="text-muted">{feature.desc}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-primary-gradient {
          background: linear-gradient(135deg, #0d6efd 0%, #198754 100%);
        }
        
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          border-color: #0d6efd;
        }
        
        .input-group-text {
          border-right: none;
        }
        
        .input-group .form-control {
          border-left: none;
        }
        
        .btn-outline-secondary:hover {
          background-color: #6c757d;
          color: white;
        }
        
        .card {
          border-radius: 15px;
          overflow: hidden;
        }
        
        .btn {
          transition: all 0.3s ease;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        a:hover {
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
};

export default CitizenRegister;