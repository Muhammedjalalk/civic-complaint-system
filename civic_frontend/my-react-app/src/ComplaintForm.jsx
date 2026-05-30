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