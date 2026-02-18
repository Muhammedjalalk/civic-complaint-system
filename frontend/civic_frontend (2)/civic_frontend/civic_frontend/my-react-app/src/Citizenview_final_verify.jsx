// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios"; // your axios instance with auth headers

// export default function VerifiedComplaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await privateAPI.get("/accounts/citizen/verified-complaints/ ");
//         setComplaints(res.data);
//       } catch (error) {
//         console.error("Error fetching verified complaints:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   if (loading) return <p>Loading verified complaints...</p>;

//   if (complaints.length === 0) return <p>No verified complaints found.</p>;

//   return (
//     <div>
//       <h2>Verified Complaints</h2>
//       {complaints.map((c) => (
//         <div
//           key={c.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "15px",
//             marginBottom: "15px",
//             borderRadius: "8px",
//             boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
//           }}
//         >
//           <p><strong>Complaint ID:</strong> {c.id}</p>
//           <p><strong>Priority:</strong> {c.priority}</p>
//           <p><strong>Departments:</strong> {c.departments.join(", ")}</p>
//           <p><strong>Location:</strong> {c.location}</p>
//           <p><strong>Description:</strong> {c.description}</p>
//           {c.attachment && (
//             <p>
//               <strong>Attachment:</strong>{" "}
//               <a href={c.attachment} target="_blank" rel="noopener noreferrer">View File</a>
//             </p>
//           )}
//           <p><strong>Status:</strong> {c.status}</p>
//           <p><strong>Created At:</strong> {new Date(c.created_at).toLocaleString()}</p>
//           <hr />
//           <p><strong>Verified By:</strong> {c.verified_by}</p>
//           <p><strong>Verified At:</strong> {new Date(c.verified_at).toLocaleString()}</p>
//           <p><strong>Remarks:</strong> {c.verification_remarks || "N/A"}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios"; // your axios instance with auth headers
// import { useNavigate } from "react-router-dom";

// export default function VerifiedComplaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // Feedback modal states
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [feedbackComment, setFeedbackComment] = useState("");
//   const [feedbackType, setFeedbackType] = useState(""); // "satisfaction", "resolution", "timeliness", "general"
//   const [submittingFeedback, setSubmittingFeedback] = useState(false);

//   // Feedback options
//   const feedbackOptions = [
//     { id: "satisfaction", label: "Overall Satisfaction", icon: "bi-emoji-smile" },
//     { id: "resolution", label: "Resolution Quality", icon: "bi-check-circle" },
//     { id: "timeliness", label: "Timeliness", icon: "bi-clock" },
//     { id: "general", label: "General Feedback", icon: "bi-chat-left" },
//   ];

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     try {
//       const res = await privateAPI.get("/accounts/citizen/verified-complaints/");
//       setComplaints(res.data);
//     } catch (error) {
//       console.error("Error fetching verified complaints:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open feedback modal
//   const openFeedbackModal = (complaint) => {
//     setSelectedComplaint(complaint);
//     setRating(0);
//     setHoverRating(0);
//     setFeedbackComment("");
//     setFeedbackType("");
//     setShowFeedbackModal(true);
//   };

//   // Close feedback modal
//   const closeFeedbackModal = () => {
//     setShowFeedbackModal(false);
//     setSelectedComplaint(null);
//     setRating(0);
//     setHoverRating(0);
//     setFeedbackComment("");
//     setFeedbackType("");
//   };

//   // Submit feedback
//   const submitFeedback = async () => {
//     if (!selectedComplaint || rating === 0 || !feedbackType) {
//       alert("Please select a feedback type and provide a rating");
//       return;
//     }

//     setSubmittingFeedback(true);
//     try {
//       const feedbackData = {
//         complaint: selectedComplaint.id,
//         rating: rating,
//         feedback_type: feedbackType,
//         comment: feedbackComment,
//         submitted_at: new Date().toISOString(),
//       };

//       await privateAPI.post("/accounts/accounts/citizen/feedback/", feedbackData);
      
//       // Update the complaint locally to show feedback was submitted
//       setComplaints(prev => prev.map(c => 
//         c.id === selectedComplaint.id 
//           ? { ...c, has_feedback: true, feedback_type: feedbackType, feedback_rating: rating }
//           : c
//       ));

//       alert("Thank you for your feedback!");
//       closeFeedbackModal();
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       alert("Failed to submit feedback. Please try again.");
//     } finally {
//       setSubmittingFeedback(false);
//     }
//   };

//   // Render star rating component
//   const renderStars = (rating, forDisplay = false) => {
//     const stars = [];
//     const maxStars = 5;
    
//     for (let i = 1; i <= maxStars; i++) {
//       stars.push(
//         <span
//           key={i}
//           className={`star ${i <= (forDisplay ? rating : hoverRating || rating) ? "filled" : ""}`}
//           onClick={forDisplay ? null : () => setRating(i)}
//           onMouseEnter={forDisplay ? null : () => setHoverRating(i)}
//           onMouseLeave={forDisplay ? null : () => setHoverRating(0)}
//           style={{ cursor: forDisplay ? "default" : "pointer", fontSize: forDisplay ? "1.2rem" : "2rem" }}
//         >
//           <i className={`bi ${i <= (forDisplay ? rating : hoverRating || rating) ? "bi-star-fill" : "bi-star"}`}></i>
//         </span>
//       );
//     }
    
//     return (
//       <div className={`d-flex ${forDisplay ? "justify-content-center mb-2" : "justify-content-center mb-4"}`}>
//         {stars}
//       </div>
//     );
//   };

//   // Filter and search functionality
//   const filteredComplaints = complaints.filter((c) => {
//     const matchesFilter = filter === "all" || c.priority?.toLowerCase() === filter;
//     const matchesSearch = 
//       searchTerm === "" ||
//       c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.id?.toString().includes(searchTerm);
    
//     return matchesFilter && matchesSearch;
//   });

//   // Get priority badge styling
//   const getPriorityBadge = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "high":
//         return "danger";
//       case "medium":
//         return "warning";
//       case "low":
//         return "success";
//       default:
//         return "secondary";
//     }
//   };

//   // Get status badge styling
//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case "resolved":
//         return "success";
//       case "in progress":
//         return "primary";
//       case "pending":
//         return "warning";
//       default:
//         return "secondary";
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 text-center">
//             <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <h4 className="text-primary">Loading Verified Complaints</h4>
//             <p className="text-muted">Please wait while we fetch your complaint history</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (complaints.length === 0) {
//     return (
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 text-center">
//             <div className="card border-0 shadow-lg">
//               <div className="card-body p-5">
//                 <div className="mb-4">
//                   <i className="bi bi-shield-check text-muted" style={{ fontSize: '4rem' }}></i>
//                 </div>
//                 <h3 className="text-muted mb-3">No Verified Complaints</h3>
//                 <p className="text-muted mb-4">
//                   You haven't submitted any complaints yet, or none have been verified.
//                 </p>
//                 <button 
//                   className="btn btn-primary btn-lg"
//                   onClick={() => navigate("/submit-complaint")}
//                 >
//                   <i className="bi bi-plus-circle me-2"></i>Submit New Complaint
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       {/* Header Section */}
//       <div className="row mb-4">
//         <div className="col">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h1 className="display-6 fw-bold text-primary">
//                 <i className="bi bi-shield-check me-2"></i>
//                 Verified Complaints
//               </h1>
//               <p className="text-muted">
//                 View all complaints that have been verified and are under review
//                 <span className="badge bg-primary ms-2">{complaints.length} Total</span>
//               </p>
//             </div>
//             <button 
//               className="btn btn-primary"
//               onClick={fetchComplaints}
//             >
//               <i className="bi bi-arrow-clockwise me-1"></i>Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="row mb-4">
//         <div className="col-md-3 mb-3">
//           <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="text-muted">Total Verified</h6>
//                   <h3 className="fw-bold">{complaints.length}</h3>
//                 </div>
//                 <i className="bi bi-list-check text-primary fs-3"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 mb-3">
//           <div className="card border-0 shadow-sm bg-warning bg-opacity-10">
//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="text-muted">High Priority</h6>
//                   <h3 className="fw-bold">
//                     {complaints.filter(c => c.priority?.toLowerCase() === "high").length}
//                   </h3>
//                 </div>
//                 <i className="bi bi-flag-fill text-warning fs-3"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 mb-3">
//           <div className="card border-0 shadow-sm bg-info bg-opacity-10">
//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="text-muted">In Progress</h6>
//                   <h3 className="fw-bold">
//                     {complaints.filter(c => c.status?.toLowerCase() === "in progress").length}
//                   </h3>
//                 </div>
//                 <i className="bi bi-gear-fill text-info fs-3"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3 mb-3">
//           <div className="card border-0 shadow-sm bg-success bg-opacity-10">
//             <div className="card-body">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="text-muted">Feedback Given</h6>
//                   <h3 className="fw-bold">
//                     {complaints.filter(c => c.has_feedback).length}
//                   </h3>
//                 </div>
//                 <i className="bi bi-star-fill text-success fs-3"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter and Search Bar */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-md-6">
//               <div className="input-group">
//                 <span className="input-group-text bg-transparent border-end-0">
//                   <i className="bi bi-search"></i>
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control border-start-0"
//                   placeholder="Search complaints by ID, description, or location..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="d-flex align-items-center">
//                 <span className="me-3 text-muted">Filter by:</span>
//                 <div className="btn-group" role="group">
//                   <button
//                     type="button"
//                     className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
//                     onClick={() => setFilter("all")}
//                   >
//                     All
//                   </button>
//                   <button
//                     type="button"
//                     className={`btn btn-outline-danger ${filter === "high" ? "active" : ""}`}
//                     onClick={() => setFilter("high")}
//                   >
//                     High Priority
//                   </button>
//                   <button
//                     type="button"
//                     className={`btn btn-outline-warning ${filter === "medium" ? "active" : ""}`}
//                     onClick={() => setFilter("medium")}
//                   >
//                     Medium
//                   </button>
//                   <button
//                     type="button"
//                     className={`btn btn-outline-success ${filter === "low" ? "active" : ""}`}
//                     onClick={() => setFilter("low")}
//                   >
//                     Low
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="row">
//         <div className="col-12">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="fw-bold">
//               Showing {filteredComplaints.length} of {complaints.length} complaints
//             </h5>
//             <div className="text-muted">
//               <i className="bi bi-info-circle me-1"></i>
//               Sorted by latest
//             </div>
//           </div>

//           {filteredComplaints.length === 0 ? (
//             <div className="text-center py-5">
//               <i className="bi bi-search text-muted mb-3" style={{ fontSize: '3rem' }}></i>
//               <h5 className="text-muted">No matching complaints found</h5>
//               <p className="text-muted">Try adjusting your search or filter criteria</p>
//             </div>
//           ) : (
//             <div className="row g-4">
//               {filteredComplaints.map((c) => (
//                 <div key={c.id} className="col-lg-6">
//                   <div className="card border-0 shadow-lg h-100 hover-lift">
//                     <div className="card-header bg-white border-0 pt-4">
//                       <div className="d-flex justify-content-between align-items-start mb-3">
//                         <div>
//                           <span className="badge bg-primary mb-2">#{c.id}</span>
//                           <h5 className="card-title fw-bold mb-1">Complaint #{c.id}</h5>
//                           <p className="text-muted mb-0">
//                             <i className="bi bi-calendar3 me-1"></i>
//                             {new Date(c.created_at).toLocaleDateString('en-US', {
//                               weekday: 'long',
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric'
//                             })}
//                           </p>
//                         </div>
//                         <div className="text-end">
//                           <span className={`badge bg-${getPriorityBadge(c.priority)} py-2 px-3 mb-2`}>
//                             <i className="bi bi-flag-fill me-1"></i>
//                             {c.priority} Priority
//                           </span>
//                           <br />
//                           <span className={`badge bg-${getStatusBadge(c.status)} py-2`}>
//                             {c.status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="card-body">
//                       {/* Description */}
//                       <div className="mb-3">
//                         <h6 className="text-muted mb-2">
//                           <i className="bi bi-chat-left-text me-1"></i>
//                           Description
//                         </h6>
//                         <p className="mb-0">{c.description}</p>
//                       </div>

//                       <div className="row g-3">
//                         {/* Location */}
//                         <div className="col-md-6">
//                           <div className="d-flex align-items-start">
//                             <i className="bi bi-geo-alt text-primary mt-1 me-2"></i>
//                             <div>
//                               <small className="text-muted d-block">Location</small>
//                               <span className="fw-semibold">{c.location}</span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Departments */}
//                         <div className="col-md-6">
//                           <div className="d-flex align-items-start">
//                             <i className="bi bi-building text-primary mt-1 me-2"></i>
//                             <div>
//                               <small className="text-muted d-block">Departments</small>
//                               <div className="d-flex flex-wrap gap-1">
//                                 {c.departments?.map((dept, idx) => (
//                                   <span key={idx} className="badge bg-light text-dark border">
//                                     {dept}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Attachment */}
//                         {c.attachment && (
//                           <div className="col-12">
//                             <div className="d-flex align-items-center">
//                               <i className="bi bi-paperclip text-primary me-2"></i>
//                               <div>
//                                 <small className="text-muted d-block">Attachment</small>
//                                 <a 
//                                   href={c.attachment} 
//                                   target="_blank" 
//                                   rel="noopener noreferrer"
//                                   className="text-decoration-none"
//                                 >
//                                   <i className="bi bi-download me-1"></i>
//                                   View File
//                                 </a>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {/* Verification Details */}
//                         <div className="col-12">
//                           <div className="border-top pt-3 mt-3">
//                             <div className="d-flex align-items-center mb-2">
//                               <i className="bi bi-shield-check text-success me-2"></i>
//                               <h6 className="mb-0 text-success">Verification Details</h6>
//                             </div>
//                             <div className="row g-2">
//                               <div className="col-md-6">
//                                 <small className="text-muted">Verified By</small>
//                                 <p className="mb-0 fw-semibold">{c.verified_by}</p>
//                               </div>
//                               <div className="col-md-6">
//                                 <small className="text-muted">Verified At</small>
//                                 <p className="mb-0 fw-semibold">
//                                   {new Date(c.verified_at).toLocaleString()}
//                                 </p>
//                               </div>
//                               <div className="col-12">
//                                 <small className="text-muted">Remarks</small>
//                                 <p className="mb-0">
//                                   {c.verification_remarks || (
//                                     <span className="text-muted">No remarks provided</span>
//                                   )}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Feedback Status */}
//                         {c.has_feedback && (
//                           <div className="col-12">
//                             <div className="border-top pt-3 mt-3">
//                               <div className="d-flex align-items-center mb-2">
//                                 <i className="bi bi-star-fill text-warning me-2"></i>
//                                 <h6 className="mb-0 text-warning">Your Feedback</h6>
//                               </div>
//                               <div className="d-flex align-items-center">
//                                 {renderStars(c.feedback_rating || 0, true)}
//                                 <span className="ms-3 badge bg-light text-dark">
//                                   <i className={`bi ${feedbackOptions.find(f => f.id === c.feedback_type)?.icon || 'bi-chat'} me-1`}></i>
//                                   {feedbackOptions.find(f => f.id === c.feedback_type)?.label || 'General'}
//                                 </span>
//                               </div>
//                               <p className="mt-2 mb-0 small">
//                                 <i className="bi bi-check-circle text-success me-1"></i>
//                                 Thank you for your feedback!
//                               </p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="card-footer bg-white border-0 pt-0">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <button 
//                             className="btn btn-outline-primary btn-sm me-2"
//                             onClick={() => navigate(`/track/${c.id}`)}
//                           >
//                             <i className="bi bi-eye me-1"></i>Track Status
//                           </button>
//                           {!c.has_feedback && (
//                             <button 
//                               className="btn btn-outline-success btn-sm"
//                               onClick={() => openFeedbackModal(c)}
//                             >
//                               <i className="bi bi-star me-1"></i>Give Feedback
//                             </button>
//                           )}
//                         </div>
//                         <div className="text-muted">
//                           <small>
//                             <i className="bi bi-clock-history me-1"></i>
//                             Updated {new Date(c.updated_at || c.created_at).toLocaleDateString()}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Feedback Modal */}
//       {showFeedbackModal && selectedComplaint && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   <i className="bi bi-star-fill text-warning me-2"></i>
//                   Provide Feedback for Complaint #{selectedComplaint.id}
//                 </h5>
//                 <button 
//                   type="button" 
//                   className="btn-close" 
//                   onClick={closeFeedbackModal}
//                   disabled={submittingFeedback}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-4">
//                   <h6 className="mb-3">What would you like to provide feedback on?</h6>
//                   <div className="row g-2">
//                     {feedbackOptions.map((option) => (
//                       <div key={option.id} className="col-md-6">
//                         <button
//                           className={`btn w-100 text-start p-3 ${feedbackType === option.id ? 'btn-primary' : 'btn-outline-primary'}`}
//                           onClick={() => setFeedbackType(option.id)}
//                           disabled={submittingFeedback}
//                         >
//                           <i className={`bi ${option.icon} me-2`}></i>
//                           {option.label}
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {feedbackType && (
//                   <>
//                     <div className="mb-4">
//                       <h6 className="mb-3">Rate your experience (1-5 stars)</h6>
//                       {renderStars(rating)}
//                       <div className="text-center mt-2">
//                         <small className="text-muted">
//                           {hoverRating > 0 ? hoverRating : rating} out of 5 stars
//                         </small>
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="feedbackComment" className="form-label">
//                         <i className="bi bi-chat-left me-1"></i>
//                         Additional Comments (Optional)
//                       </label>
//                       <textarea
//                         id="feedbackComment"
//                         className="form-control"
//                         rows="3"
//                         placeholder="Share any additional thoughts about your experience..."
//                         value={feedbackComment}
//                         onChange={(e) => setFeedbackComment(e.target.value)}
//                         disabled={submittingFeedback}
//                       ></textarea>
//                     </div>

//                     <div className="alert alert-info">
//                       <i className="bi bi-info-circle me-2"></i>
//                       Your feedback helps us improve our services. Thank you for taking the time to share your experience.
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   onClick={closeFeedbackModal}
//                   disabled={submittingFeedback}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={submitFeedback}
//                   disabled={!feedbackType || rating === 0 || submittingFeedback}
//                 >
//                   {submittingFeedback ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <i className="bi bi-send me-2"></i>
//                       Submit Feedback
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="row mt-5">
//         <div className="col">
//           <div className="text-center">
//             <div className="alert alert-light border" role="alert">
//               <div className="d-flex align-items-center justify-content-center">
//                 <i className="bi bi-info-circle text-primary me-2"></i>
//                 <p className="mb-0 small">
//                   Verified complaints have been reviewed and assigned to relevant departments for action.
//                   You can track each complaint's progress using the "Track Status" button and provide feedback to help us improve.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .star {
//           color: #e4e5e9;
//           transition: color 0.2s;
//           margin: 0 2px;
//         }
//         .star.filled {
//           color: #ffc107;
//         }
//         .star:hover {
//           transform: scale(1.1);
//         }
//         .modal-backdrop {
//           background-color: rgba(0,0,0,0.5);
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios"; // your axios instance with auth headers
import { useNavigate } from "react-router-dom";

export default function VerifiedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Feedback modal states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // "satisfaction", "resolution", "timeliness", "general"
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Feedback options
  const feedbackOptions = [
    { id: "satisfaction", label: "Overall Satisfaction", icon: "bi-emoji-smile" },
    { id: "resolution", label: "Resolution Quality", icon: "bi-check-circle" },
    { id: "timeliness", label: "Timeliness", icon: "bi-clock" },
    { id: "general", label: "General Feedback", icon: "bi-chat-left" },
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await privateAPI.get("/accounts/citizen/verified-complaints/");
      console.log("Verified Complaints API Response:", res.data); // Debug log
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching verified complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD THIS FUNCTION - Same as other components
  const getAttachmentUrl = (attachment) => {
    if (!attachment) return null;
    
    // If it's already a full URL
    if (attachment.startsWith('http://') || attachment.startsWith('https://')) {
      return attachment;
    }
    
    // If it's a file path starting with /media/
    if (attachment.startsWith('/media/')) {
      return `http://127.0.0.1:8000${attachment}`;
    }
    
    // If it's just a filename, assume it's in media folder
    return `http://127.0.0.1:8000/media/${attachment}`;
  };

  // Open feedback modal
  const openFeedbackModal = (complaint) => {
    setSelectedComplaint(complaint);
    setRating(0);
    setHoverRating(0);
    setFeedbackComment("");
    setFeedbackType("");
    setShowFeedbackModal(true);
  };

  // Close feedback modal
  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedComplaint(null);
    setRating(0);
    setHoverRating(0);
    setFeedbackComment("");
    setFeedbackType("");
  };

  // Submit feedback
  const submitFeedback = async () => {
    if (!selectedComplaint || rating === 0 || !feedbackType) {
      alert("Please select a feedback type and provide a rating");
      return;
    }

    setSubmittingFeedback(true);
    try {
      const feedbackData = {
        complaint: selectedComplaint.id,
        rating: rating,
        feedback_type: feedbackType,
        comment: feedbackComment,
        submitted_at: new Date().toISOString(),
      };

      await privateAPI.post("/accounts/accounts/citizen/feedback/", feedbackData);
      
      // Update the complaint locally to show feedback was submitted
      setComplaints(prev => prev.map(c => 
        c.id === selectedComplaint.id 
          ? { ...c, has_feedback: true, feedback_type: feedbackType, feedback_rating: rating }
          : c
      ));

      alert("Thank you for your feedback!");
      closeFeedbackModal();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // Render star rating component
  const renderStars = (rating, forDisplay = false) => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (forDisplay ? rating : hoverRating || rating) ? "filled" : ""}`}
          onClick={forDisplay ? null : () => setRating(i)}
          onMouseEnter={forDisplay ? null : () => setHoverRating(i)}
          onMouseLeave={forDisplay ? null : () => setHoverRating(0)}
          style={{ cursor: forDisplay ? "default" : "pointer", fontSize: forDisplay ? "1.2rem" : "2rem" }}
        >
          <i className={`bi ${i <= (forDisplay ? rating : hoverRating || rating) ? "bi-star-fill" : "bi-star"}`}></i>
        </span>
      );
    }
    
    return (
      <div className={`d-flex ${forDisplay ? "justify-content-center mb-2" : "justify-content-center mb-4"}`}>
        {stars}
      </div>
    );
  };

  // Filter and search functionality
  const filteredComplaints = complaints.filter((c) => {
    const matchesFilter = filter === "all" || c.priority?.toLowerCase() === filter;
    const matchesSearch = 
      searchTerm === "" ||
      c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id?.toString().includes(searchTerm);
    
    return matchesFilter && matchesSearch;
  });

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-primary">Loading Verified Complaints</h4>
            <p className="text-muted">Please wait while we fetch your complaint history</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (complaints.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="mb-4">
                  <i className="bi bi-shield-check text-muted" style={{ fontSize: '4rem' }}></i>
                </div>
                <h3 className="text-muted mb-3">No Verified Complaints</h3>
                <p className="text-muted mb-4">
                  You haven't submitted any complaints yet, or none have been verified.
                </p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/submit-complaint")}
                >
                  <i className="bi bi-plus-circle me-2"></i>Submit New Complaint
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="display-6 fw-bold text-primary">
                <i className="bi bi-shield-check me-2"></i>
                Verified Complaints
              </h1>
              <p className="text-muted">
                View all complaints that have been verified and are under review
                <span className="badge bg-primary ms-2">{complaints.length} Total</span>
              </p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={fetchComplaints}
            >
              <i className="bi bi-arrow-clockwise me-1"></i>Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Verified</h6>
                  <h3 className="fw-bold">{complaints.length}</h3>
                </div>
                <i className="bi bi-list-check text-primary fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-warning bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">High Priority</h6>
                  <h3 className="fw-bold">
                    {complaints.filter(c => c.priority?.toLowerCase() === "high").length}
                  </h3>
                </div>
                <i className="bi bi-flag-fill text-warning fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-info bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">In Progress</h6>
                  <h3 className="fw-bold">
                    {complaints.filter(c => c.status?.toLowerCase() === "in progress").length}
                  </h3>
                </div>
                <i className="bi bi-gear-fill text-info fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm bg-success bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Feedback Given</h6>
                  <h3 className="fw-bold">
                    {complaints.filter(c => c.has_feedback).length}
                  </h3>
                </div>
                <i className="bi bi-star-fill text-success fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search complaints by ID, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <span className="me-3 text-muted">Filter by:</span>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-danger ${filter === "high" ? "active" : ""}`}
                    onClick={() => setFilter("high")}
                  >
                    High Priority
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-warning ${filter === "medium" ? "active" : ""}`}
                    onClick={() => setFilter("medium")}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-success ${filter === "low" ? "active" : ""}`}
                    onClick={() => setFilter("low")}
                  >
                    Low
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </h5>
            <div className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Sorted by latest
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search text-muted mb-3" style={{ fontSize: '3rem' }}></i>
              <h5 className="text-muted">No matching complaints found</h5>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredComplaints.map((c) => {
                const attachmentUrl = getAttachmentUrl(c.attachment);
                
                return (
                  <div key={c.id} className="col-lg-6">
                    <div className="card border-0 shadow-lg h-100 hover-lift">
                      <div className="card-header bg-white border-0 pt-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <span className="badge bg-primary mb-2">#{c.id}</span>
                            <h5 className="card-title fw-bold mb-1">Complaint #{c.id}</h5>
                            <p className="text-muted mb-0">
                              <i className="bi bi-calendar3 me-1"></i>
                              {new Date(c.created_at).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="text-end">
                            <span className={`badge bg-${getPriorityBadge(c.priority)} py-2 px-3 mb-2`}>
                              <i className="bi bi-flag-fill me-1"></i>
                              {c.priority} Priority
                            </span>
                            <br />
                            <span className={`badge bg-${getStatusBadge(c.status)} py-2`}>
                              {c.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        {/* Description */}
                        <div className="mb-3">
                          <h6 className="text-muted mb-2">
                            <i className="bi bi-chat-left-text me-1"></i>
                            Description
                          </h6>
                          <p className="mb-0">{c.description}</p>
                        </div>

                        <div className="row g-3">
                          {/* Location */}
                          <div className="col-md-6">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-geo-alt text-primary mt-1 me-2"></i>
                              <div>
                                <small className="text-muted d-block">Location</small>
                                <span className="fw-semibold">{c.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Departments */}
                          <div className="col-md-6">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-building text-primary mt-1 me-2"></i>
                              <div>
                                <small className="text-muted d-block">Departments</small>
                                <div className="d-flex flex-wrap gap-1">
                                  {c.departments?.map((dept, idx) => (
                                    <span key={idx} className="badge bg-light text-dark border">
                                      {dept}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ✅ CORRECTED ATTACHMENT SECTION */}
                          {attachmentUrl && (
                            <div className="col-12">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-paperclip text-primary me-2"></i>
                                <div>
                                  <small className="text-muted d-block">Attachment</small>
                                  <a 
                                    href={attachmentUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      padding: '4px 10px',
                                      background: '#ebf8ff',
                                      color: '#3182ce',
                                      borderRadius: '6px',
                                      textDecoration: 'none',
                                      fontSize: '13px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    <i className="bi bi-eye"></i>
                                    View File
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Verification Details */}
                          <div className="col-12">
                            <div className="border-top pt-3 mt-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-shield-check text-success me-2"></i>
                                <h6 className="mb-0 text-success">Verification Details</h6>
                              </div>
                              <div className="row g-2">
                                <div className="col-md-6">
                                  <small className="text-muted">Verified By</small>
                                  <p className="mb-0 fw-semibold">{c.verified_by}</p>
                                </div>
                                <div className="col-md-6">
                                  <small className="text-muted">Verified At</small>
                                  <p className="mb-0 fw-semibold">
                                    {new Date(c.verified_at).toLocaleString()}
                                  </p>
                                </div>
                                <div className="col-12">
                                  <small className="text-muted">Remarks</small>
                                  <p className="mb-0">
                                    {c.verification_remarks || (
                                      <span className="text-muted">No remarks provided</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Feedback Status */}
                          {c.has_feedback && (
                            <div className="col-12">
                              <div className="border-top pt-3 mt-3">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="bi bi-star-fill text-warning me-2"></i>
                                  <h6 className="mb-0 text-warning">Your Feedback</h6>
                                </div>
                                <div className="d-flex align-items-center">
                                  {renderStars(c.feedback_rating || 0, true)}
                                  <span className="ms-3 badge bg-light text-dark">
                                    <i className={`bi ${feedbackOptions.find(f => f.id === c.feedback_type)?.icon || 'bi-chat'} me-1`}></i>
                                    {feedbackOptions.find(f => f.id === c.feedback_type)?.label || 'General'}
                                  </span>
                                </div>
                                <p className="mt-2 mb-0 small">
                                  <i className="bi bi-check-circle text-success me-1"></i>
                                  Thank you for your feedback!
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="card-footer bg-white border-0 pt-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <button 
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => navigate(`/track/${c.id}`)}
                            >
                              <i className="bi bi-eye me-1"></i>Track Status
                            </button>
                            {!c.has_feedback && (
                              <button 
                                className="btn btn-outline-success btn-sm"
                                onClick={() => openFeedbackModal(c)}
                              >
                                <i className="bi bi-star me-1"></i>Give Feedback
                              </button>
                            )}
                          </div>
                          <div className="text-muted">
                            <small>
                              <i className="bi bi-clock-history me-1"></i>
                              Updated {new Date(c.updated_at || c.created_at).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedComplaint && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  Provide Feedback for Complaint #{selectedComplaint.id}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeFeedbackModal}
                  disabled={submittingFeedback}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <h6 className="mb-3">What would you like to provide feedback on?</h6>
                  <div className="row g-2">
                    {feedbackOptions.map((option) => (
                      <div key={option.id} className="col-md-6">
                        <button
                          className={`btn w-100 text-start p-3 ${feedbackType === option.id ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setFeedbackType(option.id)}
                          disabled={submittingFeedback}
                        >
                          <i className={`bi ${option.icon} me-2`}></i>
                          {option.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {feedbackType && (
                  <>
                    <div className="mb-4">
                      <h6 className="mb-3">Rate your experience (1-5 stars)</h6>
                      {renderStars(rating)}
                      <div className="text-center mt-2">
                        <small className="text-muted">
                          {hoverRating > 0 ? hoverRating : rating} out of 5 stars
                        </small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="feedbackComment" className="form-label">
                        <i className="bi bi-chat-left me-1"></i>
                        Additional Comments (Optional)
                      </label>
                      <textarea
                        id="feedbackComment"
                        className="form-control"
                        rows="3"
                        placeholder="Share any additional thoughts about your experience..."
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        disabled={submittingFeedback}
                      ></textarea>
                    </div>

                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      Your feedback helps us improve our services. Thank you for taking the time to share your experience.
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeFeedbackModal}
                  disabled={submittingFeedback}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={submitFeedback}
                  disabled={!feedbackType || rating === 0 || submittingFeedback}
                >
                  {submittingFeedback ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="row mt-5">
        <div className="col">
          <div className="text-center">
            <div className="alert alert-light border" role="alert">
              <div className="d-flex align-items-center justify-content-center">
                <i className="bi bi-info-circle text-primary me-2"></i>
                <p className="mb-0 small">
                  Verified complaints have been reviewed and assigned to relevant departments for action.
                  You can track each complaint's progress using the "Track Status" button and provide feedback to help us improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .star {
          color: #e4e5e9;
          transition: color 0.2s;
          margin: 0 2px;
        }
        .star.filled {
          color: #ffc107;
        }
        .star:hover {
          transform: scale(1.1);
        }
        .modal-backdrop {
          background-color: rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}