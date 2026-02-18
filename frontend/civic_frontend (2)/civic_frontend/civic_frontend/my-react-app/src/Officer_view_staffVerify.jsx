// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const OfficerReturnedComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReturnedComplaints();
//   }, []);

//   const fetchReturnedComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/staff/return-complaint/");
//       setComplaints(res.data);
//     } catch (error) {
//       alert(error?.response?.data?.error || "Failed to load complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p>Loading returned complaints...</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">📝 Complaints Returned by Staff</h3>
//       {complaints.length === 0 ? (
//         <div className="alert alert-info">No complaints returned by staff.</div>
//       ) : (
//         <div className="row g-4">
//           {complaints.map((a) => (
//             <div key={a.assignment_id} className="col-md-6 col-lg-4">
//               <div className="card shadow h-100">
//                 <div className="card-header">
//                   <strong>Complaint #{a.complaint_id}</strong>
//                   <br />
//                   <small>Staff: {a.staff_name} (ID: {a.staff_id})</small>
//                 </div>
//                 <div className="card-body">
//                   <p><strong>Category:</strong> {a.category}</p>
//                   <p><strong>Priority:</strong> {a.priority}</p>
//                   <p><strong>Location:</strong> {a.location}</p>
//                   <p className="text-muted">{a.description}</p>
//                   <p><strong>Remarks:</strong> {a.remarks || "No remarks"}</p>
//                   {a.attachment && (
//                     <a href={a.attachment} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm w-100 mb-2">
//                       View Attachment
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfficerReturnedComplaints;

// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios"; // your authenticated axios instance

// const OfficerReturnedComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchReturnedComplaints();
//   }, []);

//   const fetchReturnedComplaints = async () => {
//     try {
//       const response = await privateAPI.get(
//         "/accounts/officer/returned-complaints/"
//       );
//       setComplaints(response.data.returned_complaints);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load returned complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading returned complaints...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Returned Complaints (Final Verification)</h2>

//       {complaints.length === 0 ? (
//         <p>No returned complaints found.</p>
//       ) : (
//         <table
//           border="1"
//           cellPadding="10"
//           cellSpacing="0"
//           width="100%"
//           style={{ marginTop: "15px", borderCollapse: "collapse" }}
//         >
//           <thead style={{ backgroundColor: "#f2f2f2" }}>
//             <tr>
//               <th>Complaint ID</th>
//               <th>Staff</th>
//               <th>Department</th>
//               <th>Priority</th>
//               <th>Description</th>
//               <th>Remarks</th>
//               <th>Attachment</th>
//               <th>Returned At</th>
//             </tr>
//           </thead>

//           <tbody>
//             {complaints.map((item) => (
//               <tr key={item.assignment_id}>
//                 <td>{item.complaint.id}</td>

//                 <td>
//                   {item.staff?.name || "N/A"}
//                 </td>

//                 <td>
//                   {item.complaint.departments
//                     .map((dept) => dept.name)
//                     .join(", ")}
//                 </td>

//                 <td>{item.complaint.priority}</td>

//                 <td>{item.complaint.description}</td>

//                 <td>{item.remarks || "—"}</td>

//                 <td>
//                   {item.complaint.attachment ? (
//                     <a
//                       href={item.complaint.attachment}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       View
//                     </a>
//                   ) : (
//                     "No file"
//                   )}
//                 </td>

//                 <td>
//                   {new Date(item.returned_at).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default OfficerReturnedComplaints;


// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const OfficerReturnedComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchReturnedComplaints();
//   }, []);

//   const fetchReturnedComplaints = async () => {
//     try {
//       setLoading(true);
//       const response = await privateAPI.get(
//         "/accounts/officer/returned-complaints/"
//       );
//       setComplaints(response.data.returned_complaints || []);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load returned complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFinalVerification = () => {
//     if (complaints.length === 0) {
//       alert("No complaints available for final verification");
//       return;
//     }
//     alert("Complaints marked for Final Verification");
//     // 🔗 API call can be added later
//   };

//   const handleEscalate = () => {
//     if (complaints.length === 0) {
//       alert("No complaints available to escalate");
//       return;
//     }
//     alert("Complaints escalated to higher authority");
//     // 🔗 API call can be added later
//   };

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="spinner-border text-primary"></div>
//         <p className="mt-3">Loading returned complaints...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger text-center">
//           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="text-primary">
//           <i className="bi bi-arrow-return-right me-2"></i>
//           Returned Complaints – Final Verification
//         </h3>

//         <button className="btn btn-outline-primary btn-sm" onClick={fetchReturnedComplaints}>
//           <i className="bi bi-arrow-clockwise"></i>
//         </button>
//       </div>

//       {/* Table */}
//       {complaints.length === 0 ? (
//         <div className="alert alert-info text-center">
//           <i className="bi bi-info-circle me-2"></i>
//           No returned complaints found
//         </div>
//       ) : (
//         <div className="table-responsive shadow-sm">
//           <table className="table table-bordered table-hover align-middle">
//             <thead className="table-primary">
//               <tr>
//                 <th>Complaint ID</th>
//                 <th>Staff</th>
//                 <th>Department</th>
//                 <th>Priority</th>
//                 <th>Description</th>
//                 <th>Remarks</th>
//                 <th>Attachment</th>
//                 <th>Returned At</th>
//               </tr>
//             </thead>

//             <tbody>
//               {complaints.map((item) => (
//                 <tr key={item.assignment_id || item.complaint?.id}>
//                   <td className="fw-bold">#{item.complaint?.id}</td>

//                   <td>
//                     <i className="bi bi-person-circle me-2 text-primary"></i>
//                     {item.staff?.name || "N/A"}
//                   </td>

//                   <td>
//                     <span className="badge bg-info">
//                       {item.complaint?.departments
//                         ?.map((dept) => dept.name)
//                         .join(", ")}
//                     </span>
//                   </td>

//                   <td>
//                     <span
//                       className={`badge ${
//                         item.complaint?.priority === "High"
//                           ? "bg-danger"
//                           : item.complaint?.priority === "Medium"
//                           ? "bg-warning text-dark"
//                           : "bg-success"
//                       }`}
//                     >
//                       {item.complaint?.priority || "Low"}
//                     </span>
//                   </td>

//                   <td>{item.complaint?.description}</td>

//                   <td>{item.remarks || "—"}</td>

//                   <td>
//                     {item.complaint?.attachment ? (
//                       <a
//                         href={item.complaint.attachment}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="btn btn-sm btn-outline-secondary"
//                       >
//                         <i className="bi bi-eye me-1"></i>
//                         View
//                       </a>
//                     ) : (
//                       <span className="text-muted">No file</span>
//                     )}
//                   </td>

//                   <td>
//                     <i className="bi bi-calendar3 me-1"></i>
//                     {new Date(item.returned_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="row mt-4">
//         <div className="col-md-6 mb-3">
//           <button
//             className="btn btn-primary w-100 btn-lg"
//             onClick={handleFinalVerification}
//           >
//             <i className="bi bi-shield-check me-2"></i>
//             Final Verification
//           </button>
//         </div>

//         <div className="col-md-6 mb-3">
//           <button
//             className="btn btn-danger w-100 btn-lg"
//             onClick={handleEscalate}
//           >
//             <i className="bi bi-exclamation-triangle me-2"></i>
//             Escalate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfficerReturnedComplaints;


// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const OfficerReturnedComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showHistory, setShowHistory] = useState(false);
//   const [verificationHistory, setVerificationHistory] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(false);
  
//   // Modal states
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [showEscalationModal, setShowEscalationModal] = useState(false);
//   const [remarks, setRemarks] = useState("");
//   const [actionType, setActionType] = useState(""); // "verify" or "escalate"
//   const [processing, setProcessing] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     fetchReturnedComplaints();
//   }, []);

//   const fetchReturnedComplaints = async () => {
//     try {
//       setLoading(true);
//       const response = await privateAPI.get(
//         "/accounts/officer/returned-complaints/"
//       );
//       setComplaints(response.data.returned_complaints || []);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load returned complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchVerificationHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const response = await privateAPI.get(
//         "/accounts/officer/verification-history/"
//       );
//       setVerificationHistory(response.data.history || []);
//     } catch (err) {
//       console.error("Failed to fetch verification history:", err);
//       const history = complaints.filter(
//         (c) => c.returned_status === "Verified" || c.returned_status === "Escalated"
//       );
//       setVerificationHistory(history);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const toggleHistory = () => {
//     if (!showHistory && verificationHistory.length === 0) {
//       fetchVerificationHistory();
//     }
//     setShowHistory(!showHistory);
//   };

//   // Open verification modal
//   const openVerificationModal = () => {
//     if (!hasReturnedComplaints) {
//       alert("No complaints with 'Returned' status available for verification");
//       return;
//     }
//     setActionType("verify");
//     setRemarks("");
//     setShowVerificationModal(true);
//   };

//   // Open escalation modal
//   const openEscalationModal = () => {
//     if (!hasReturnedComplaints) {
//       alert("No complaints with 'Returned' status available to escalate");
//       return;
//     }
//     setActionType("escalate");
//     setRemarks("");
//     setShowEscalationModal(true);
//   };

//   // Handle verification with remarks
//   const handleVerificationWithRemarks = async () => {
//     const returnedComplaints = complaints.filter(
//       (c) => c.returned_status === "Returned"
//     );

//     if (returnedComplaints.length === 0) {
//       alert("No complaints with 'Returned' status available");
//       return;
//     }

//     setProcessing(true);
//     try {
//       const response = await privateAPI.post("/accounts/officer/final-verification/", {
//         complaint_ids: returnedComplaints.map((c) => c.complaint.id),
//         remarks: remarks || "No remarks provided"
//       });

//       setSuccessMessage(`✅ ${returnedComplaints.length} complaint(s) successfully verified`);
//       setShowVerificationModal(false);
      
//       // Refresh data
//       await fetchReturnedComplaints();
//       if (showHistory) {
//         await fetchVerificationHistory();
//       }
      
//       // Clear remarks
//       setRemarks("");
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Final verification failed");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Handle escalation with remarks
//   const handleEscalationWithRemarks = async () => {
//     const returnedComplaints = complaints.filter(
//       (c) => c.returned_status === "Returned"
//     );

//     if (returnedComplaints.length === 0) {
//       alert("No complaints with 'Returned' status available");
//       return;
//     }

//     setProcessing(true);
//     try {
//       await privateAPI.post("/accounts/officer/escalate-complaints/", {
//         complaint_ids: returnedComplaints.map((c) => c.complaint.id),
//         escalation_reason: remarks || "No reason provided"
//       });

//       setSuccessMessage(`⚠️ ${returnedComplaints.length} complaint(s) escalated successfully`);
//       setShowEscalationModal(false);
      
//       // Refresh data
//       await fetchReturnedComplaints();
//       if (showHistory) {
//         await fetchVerificationHistory();
//       }
      
//       // Clear remarks
//       setRemarks("");
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Escalation failed");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Close modals
//   const closeModals = () => {
//     setShowVerificationModal(false);
//     setShowEscalationModal(false);
//     setRemarks("");
//     setProcessing(false);
//   };

//   // Check if there are any complaints with "Returned" status
//   const hasReturnedComplaints = complaints.some(
//     (c) => c.returned_status === "Returned"
//   );

//   // Filter active returned complaints (status: Returned)
//   const activeReturnedComplaints = complaints.filter(
//     (c) => c.returned_status === "Returned"
//   );

//   // Get history from verificationHistory state or filter from complaints
//   const displayHistory = verificationHistory.length > 0 
//     ? verificationHistory 
//     : complaints.filter(c => c.returned_status === "Verified" || c.returned_status === "Escalated");

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="spinner-border text-primary"></div>
//         <p className="mt-3">Loading returned complaints...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger text-center">
//           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="text-primary">
//           <i className="bi bi-arrow-return-right me-2"></i>
//           Returned Complaints – Final Verification
//         </h3>

//         <div className="d-flex gap-2">
//           <button
//             className="btn btn-outline-primary btn-sm"
//             onClick={fetchReturnedComplaints}
//             title="Refresh complaints"
//           >
//             <i className="bi bi-arrow-clockwise"></i>
//           </button>
          
//           <button
//             className={`btn btn-sm ${showHistory ? 'btn-info' : 'btn-outline-info'}`}
//             onClick={toggleHistory}
//             title="Show verification history"
//           >
//             <i className="bi bi-clock-history me-1"></i>
//             {showHistory ? 'Hide History' : 'Show History'}
//           </button>
//         </div>
//       </div>

//       {/* Success Message */}
//       {successMessage && (
//         <div className="alert alert-success alert-dismissible fade show" role="alert">
//           <i className="bi bi-check-circle-fill me-2"></i>
//           {successMessage}
//           <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
//         </div>
//       )}

//       {/* Active Returned Complaints Table */}
//       <div className="mb-5">
//         <h5 className="text-secondary mb-3">
//           <i className="bi bi-exclamation-circle me-2"></i>
//           Active Returned Complaints ({activeReturnedComplaints.length})
//         </h5>
        
//         {activeReturnedComplaints.length === 0 ? (
//           <div className="alert alert-warning text-center">
//             <i className="bi bi-check-circle me-2"></i>
//             No active returned complaints. All complaints have been processed.
//           </div>
//         ) : (
//           <div className="table-responsive shadow-sm">
//             <table className="table table-bordered table-hover align-middle">
//               <thead className="table-warning">
//                 <tr>
//                   <th>Complaint ID</th>
//                   <th>Staff</th>
//                   <th>Department</th>
//                   <th>Priority</th>
//                   <th>Status</th>
//                   <th>Description</th>
//                   <th>Remarks</th>
//                   <th>Attachment</th>
//                   <th>Returned At</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {activeReturnedComplaints.map((item) => (
//                   <tr key={item.assignment_id || item.complaint?.id}>
//                     <td className="fw-bold">#{item.complaint?.id}</td>
//                     <td>{item.staff?.name || "N/A"}</td>
//                     <td>
//                       {item.complaint?.departments
//                         ?.map((d) => d.name)
//                         .join(", ")}
//                     </td>
//                     <td>{item.complaint?.priority}</td>
                    
//                     <td>
//                       <span className="badge bg-warning text-dark">
//                         {item.returned_status}
//                       </span>
//                     </td>
                    
//                     <td>{item.complaint?.description}</td>
//                     <td>{item.remarks || "—"}</td>
//                     <td>
//                       {item.complaint?.attachment ? (
//                         <a
//                           href={item.complaint.attachment}
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           View
//                         </a>
//                       ) : (
//                         "No file"
//                       )}
//                     </td>
//                     <td>{new Date(item.returned_at).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* ACTION BUTTONS */}
//         <div className="row mt-4">
//           <div className="col-md-6 mb-3">
//             <button
//               className={`btn w-100 btn-lg ${
//                 hasReturnedComplaints ? "btn-primary" : "btn-secondary"
//               }`}
//               onClick={openVerificationModal}
//               disabled={!hasReturnedComplaints}
//             >
//               <i className="bi bi-shield-check me-2"></i>
//               {hasReturnedComplaints
//                 ? "Final Verification"
//                 : "No Returned Complaints"}
//             </button>
//             {!hasReturnedComplaints && (
//               <small className="text-muted d-block mt-1 text-center">
//                 Only complaints with "Returned" status can be verified
//               </small>
//             )}
//           </div>

//           <div className="col-md-6 mb-3">
//             <button
//               className={`btn w-100 btn-lg ${
//                 hasReturnedComplaints ? "btn-danger" : "btn-secondary"
//               }`}
//               onClick={openEscalationModal}
//               disabled={!hasReturnedComplaints}
//             >
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {hasReturnedComplaints
//                 ? "Escalate"
//                 : "No Returned Complaints"}
//             </button>
//             {!hasReturnedComplaints && (
//               <small className="text-muted d-block mt-1 text-center">
//                 Only complaints with "Returned" status can be escalated
//               </small>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Verification History Section */}
//       {showHistory && (
//         <div className="mt-5 pt-4 border-top">
//           <h5 className="text-success mb-3">
//             <i className="bi bi-clock-history me-2"></i>
//             Verification History ({displayHistory.length})
//           </h5>
          
//           {historyLoading ? (
//             <div className="text-center my-4">
//               <div className="spinner-border spinner-border-sm text-success"></div>
//               <p className="mt-2">Loading history...</p>
//             </div>
//           ) : displayHistory.length === 0 ? (
//             <div className="alert alert-info text-center">
//               <i className="bi bi-info-circle me-2"></i>
//               No verification history found
//             </div>
//           ) : (
//             <div className="table-responsive shadow-sm">
//               <table className="table table-bordered table-hover align-middle">
//                 <thead className="table-success">
//                   <tr>
//                     <th>Complaint ID</th>
//                     <th>Staff</th>
//                     <th>Department</th>
//                     <th>Priority</th>
//                     <th>Final Status</th>
//                     <th>Action By</th>
//                     <th>Description</th>
//                     <th>Final Remarks</th>
//                     <th>Completed At</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {displayHistory.map((item) => (
//                     <tr key={`history-${item.assignment_id}`}>
//                       <td className="fw-bold">#{item.complaint?.id}</td>
//                       <td>{item.staff?.name || "N/A"}</td>
//                       <td>
//                         {item.complaint?.departments
//                           ?.map((d) => d.name)
//                           .join(", ")}
//                       </td>
//                       <td>{item.complaint?.priority}</td>
                      
//                       <td>
//                         <span
//                           className={`badge ${
//                             item.returned_status === "Verified"
//                               ? "bg-success"
//                               : item.returned_status === "Escalated"
//                               ? "bg-danger"
//                               : "bg-secondary"
//                           }`}
//                         >
//                           {item.returned_status}
//                         </span>
//                       </td>
                      
//                       <td>
//                         <span className="badge bg-info">
//                           Officer
//                         </span>
//                       </td>
                      
//                       <td>{item.complaint?.description}</td>
//                       <td>
//                         {item.final_remarks || item.remarks || "—"}
//                         {item.escalation_reason && (
//                           <div className="text-danger small mt-1">
//                             <strong>Reason:</strong> {item.escalation_reason}
//                           </div>
//                         )}
//                       </td>
//                       <td>
//                         {item.verified_at 
//                           ? new Date(item.verified_at).toLocaleString()
//                           : item.escalated_at
//                           ? new Date(item.escalated_at).toLocaleString()
//                           : new Date(item.returned_at).toLocaleString()
//                         }
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Summary Stats */}
//           {displayHistory.length > 0 && (
//             <div className="row mt-3">
//               <div className="col-md-6">
//                 <div className="alert alert-success mb-2">
//                   <i className="bi bi-check-circle-fill me-2"></i>
//                   <strong>Verified:</strong> {displayHistory.filter(h => h.returned_status === "Verified").length} complaints
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="alert alert-danger mb-2">
//                   <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                   <strong>Escalated:</strong> {displayHistory.filter(h => h.returned_status === "Escalated").length} complaints
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Verification Modal */}
//       {showVerificationModal && (
//         <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-shield-check me-2"></i>
//                   Final Verification Remarks
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={closeModals}></button>
//               </div>
//               <div className="modal-body">
//                 <p className="text-muted">
//                   You are about to verify <strong>{activeReturnedComplaints.length}</strong> complaint(s).
//                   Please add remarks for this verification:
//                 </p>
//                 <div className="mb-3">
//                   <label htmlFor="verificationRemarks" className="form-label">
//                     Verification Remarks <span className="text-muted">(optional)</span>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="verificationRemarks"
//                     rows="4"
//                     value={remarks}
//                     onChange={(e) => setRemarks(e.target.value)}
//                     placeholder="Enter verification remarks here..."
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={closeModals} disabled={processing}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary" 
//                   onClick={handleVerificationWithRemarks}
//                   disabled={processing}
//                 >
//                   {processing ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2"></span>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <i className="bi bi-check-circle me-2"></i>
//                       Verify Complaints
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Escalation Modal */}
//       {showEscalationModal && (
//         <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header bg-danger text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-exclamation-triangle me-2"></i>
//                   Escalation Reason
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={closeModals}></button>
//               </div>
//               <div className="modal-body">
//                 <p className="text-muted">
//                   You are about to escalate <strong>{activeReturnedComplaints.length}</strong> complaint(s) to higher authority.
//                   Please provide the reason for escalation:
//                 </p>
//                 <div className="mb-3">
//                   <label htmlFor="escalationReason" className="form-label">
//                     Escalation Reason <span className="text-danger">*</span>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="escalationReason"
//                     rows="4"
//                     value={remarks}
//                     onChange={(e) => setRemarks(e.target.value)}
//                     placeholder="Enter escalation reason here..."
//                     required
//                   />
//                   <div className="form-text">Please provide a detailed reason for escalation</div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={closeModals} disabled={processing}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-danger" 
//                   onClick={handleEscalationWithRemarks}
//                   disabled={processing || !remarks.trim()}
//                 >
//                   {processing ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2"></span>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <i className="bi bi-arrow-up-right-circle me-2"></i>
//                       Escalate Complaints
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfficerReturnedComplaints;

import React, { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const OfficerReturnedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  // Modal states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState(""); // "verify" or "escalate"
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Selection states
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchReturnedComplaints();
  }, []);

  const fetchReturnedComplaints = async () => {
    try {
      setLoading(true);
      const response = await privateAPI.get(
        "/accounts/officer/returned-complaints/"
      );
      setComplaints(response.data.returned_complaints || []);
      setError("");
      // Clear selections when data is refreshed
      setSelectedComplaints([]);
      setSelectAll(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load returned complaints");
    } finally {
      setLoading(false);
    }
  };

  const fetchVerificationHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await privateAPI.get(
        "/accounts/officer/verification-history/"
      );
      
      // Backend already provides both 'remark' and 'final_remarks' for verified
      // and 'remark' and 'escalation_reason' for escalated
      // We'll use 'remark' for both as per backend response
      setVerificationHistory(response.data.history || []);
    } catch (err) {
      console.error("Failed to fetch verification history:", err);
      const history = complaints.filter(
        (c) => c.returned_status === "Verified" || c.returned_status === "Escalated"
      );
      setVerificationHistory(history);
    } finally {
      setHistoryLoading(false);
    }
  };

  const toggleHistory = () => {
    if (!showHistory && verificationHistory.length === 0) {
      fetchVerificationHistory();
    }
    setShowHistory(!showHistory);
  };

  // Handle individual complaint selection
  const handleSelectComplaint = (complaintId) => {
    if (selectedComplaints.includes(complaintId)) {
      setSelectedComplaints(selectedComplaints.filter(id => id !== complaintId));
    } else {
      setSelectedComplaints([...selectedComplaints, complaintId]);
    }
  };

  // Handle select all/deselect all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedComplaints([]);
      setSelectAll(false);
    } else {
      const allIds = activeReturnedComplaints.map(item => item.complaint.id);
      setSelectedComplaints(allIds);
      setSelectAll(true);
    }
  };

  // Open verification modal
  const openVerificationModal = () => {
    if (selectedComplaints.length === 0) {
      alert("Please select at least one complaint to verify");
      return;
    }
    setActionType("verify");
    setRemarks("");
    setShowVerificationModal(true);
  };

  // Open escalation modal
  const openEscalationModal = () => {
    if (selectedComplaints.length === 0) {
      alert("Please select at least one complaint to escalate");
      return;
    }
    setActionType("escalate");
    setRemarks("");
    setShowEscalationModal(true);
  };

  // Handle verification with remarks
  const handleVerificationWithRemarks = async () => {
    if (selectedComplaints.length === 0) {
      alert("No complaints selected for verification");
      return;
    }

    setProcessing(true);
    try {
      const response = await privateAPI.post("/accounts/officer/final-verification/", {
        complaint_ids: selectedComplaints,
        remarks: remarks || "No remarks provided"  // Backend expects 'remarks' for verification
      });

      setSuccessMessage(`✅ ${selectedComplaints.length} complaint(s) successfully verified`);
      setShowVerificationModal(false);
      
      // Refresh data
      await fetchReturnedComplaints();
      if (showHistory) {
        await fetchVerificationHistory();
      }
      
      // Clear selections and remarks
      setSelectedComplaints([]);
      setSelectAll(false);
      setRemarks("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("❌ Final verification failed");
    } finally {
      setProcessing(false);
    }
  };

  // Handle escalation with remarks
  const handleEscalationWithRemarks = async () => {
    if (selectedComplaints.length === 0) {
      alert("No complaints selected for escalation");
      return;
    }

    setProcessing(true);
    try {
      // Backend accepts either 'remark' or 'remarks' field
      await privateAPI.post("/accounts/officer/escalate-complaints/", {
        complaint_ids: selectedComplaints,
        remark: remarks || "No reason provided"  // Send as 'remark' (backend will save to ComplaintEscalation.reason)
      });

      setSuccessMessage(`⚠️ ${selectedComplaints.length} complaint(s) escalated successfully`);
      setShowEscalationModal(false);
      
      // Refresh data
      await fetchReturnedComplaints();
      if (showHistory) {
        await fetchVerificationHistory();
      }
      
      // Clear selections and remarks
      setSelectedComplaints([]);
      setSelectAll(false);
      setRemarks("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("❌ Escalation failed");
    } finally {
      setProcessing(false);
    }
  };

  // Close modals
  const closeModals = () => {
    setShowVerificationModal(false);
    setShowEscalationModal(false);
    setRemarks("");
    setProcessing(false);
  };

  // Check if there are any complaints with "Returned" status
  const hasReturnedComplaints = complaints.some(
    (c) => c.returned_status === "Returned"
  );

  // Filter active returned complaints (status: Returned)
  const activeReturnedComplaints = complaints.filter(
    (c) => c.returned_status === "Returned"
  );

  // Get history from verificationHistory state
  const displayHistory = verificationHistory.length > 0 
    ? verificationHistory 
    : complaints.filter(c => c.returned_status === "Verified" || c.returned_status === "Escalated");

  // Get selected complaint details for display in modals
  const getSelectedComplaintDetails = () => {
    return activeReturnedComplaints.filter(item => 
      selectedComplaints.includes(item.complaint.id)
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading returned complaints...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">
          <i className="bi bi-arrow-return-right me-2"></i>
          Returned Complaints – Final Verification
        </h3>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={fetchReturnedComplaints}
            title="Refresh complaints"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          
          <button
            className={`btn btn-sm ${showHistory ? 'btn-info' : 'btn-outline-info'}`}
            onClick={toggleHistory}
            title="Show verification history"
          >
            <i className="bi bi-clock-history me-1"></i>
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
        </div>
      )}

      {/* Active Returned Complaints Table */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-secondary mb-0">
            <i className="bi bi-exclamation-circle me-2"></i>
            Active Returned Complaints ({activeReturnedComplaints.length})
          </h5>
          
          {/* Selection Info */}
          <div className="d-flex align-items-center gap-3">
            {selectedComplaints.length > 0 && (
              <div className="text-primary fw-bold">
                <i className="bi bi-check-circle-fill me-1"></i>
                {selectedComplaints.length} selected
              </div>
            )}
            
            {activeReturnedComplaints.length > 0 && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleSelectAll}
              >
                {selectAll ? (
                  <>
                    <i className="bi bi-x-circle me-1"></i>
                    Deselect All
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-square me-1"></i>
                    Select All
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        {activeReturnedComplaints.length === 0 ? (
          <div className="alert alert-warning text-center">
            <i className="bi bi-check-circle me-2"></i>
            No active returned complaints. All complaints have been processed.
          </div>
        ) : (
          <div className="table-responsive shadow-sm">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-warning">
                <tr>
                  <th style={{ width: '50px' }}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectAll && selectedComplaints.length === activeReturnedComplaints.length}
                        onChange={handleSelectAll}
                        disabled={activeReturnedComplaints.length === 0}
                      />
                    </div>
                  </th>
                  <th>Complaint ID</th>
                  <th>Staff</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Remarks</th>
                  <th>Attachment</th>
                  <th>Returned At</th>
                </tr>
              </thead>

              <tbody>
                {activeReturnedComplaints.map((item) => (
                  <tr key={item.assignment_id || item.complaint?.id}>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedComplaints.includes(item.complaint.id)}
                          onChange={() => handleSelectComplaint(item.complaint.id)}
                        />
                      </div>
                    </td>
                    <td className="fw-bold">#{item.complaint?.id}</td>
                    <td>{item.staff?.name || "N/A"}</td>
                    <td>
                      {item.complaint?.departments
                        ?.map((d) => d.name)
                        .join(", ")}
                    </td>
                    <td>
                      <span className={`badge bg-${item.complaint?.priority === 'High' ? 'danger' : item.complaint?.priority === 'Medium' ? 'warning' : 'info'}`}>
                        {item.complaint?.priority}
                      </span>
                    </td>
                    
                    <td>
                      <span className="badge bg-warning text-dark">
                        {item.returned_status}
                      </span>
                    </td>
                    
                    <td>{item.complaint?.description}</td>
                    <td>{item.remarks || "—"}</td>
                    <td>
                      {item.complaint?.attachment ? (
                        <a
                          href={item.complaint.attachment}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View
                        </a>
                      ) : (
                        <span className="text-muted">No file</span>
                      )}
                    </td>
                    <td>{new Date(item.returned_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <button
              className={`btn w-100 btn-lg ${
                selectedComplaints.length > 0 ? "btn-primary" : "btn-secondary"
              }`}
              onClick={openVerificationModal}
              disabled={selectedComplaints.length === 0}
            >
              <i className="bi bi-shield-check me-2"></i>
              {selectedComplaints.length > 0
                ? `Verify Selected (${selectedComplaints.length})`
                : "Select to Verify"}
            </button>
            {selectedComplaints.length === 0 && (
              <small className="text-muted d-block mt-1 text-center">
                Select complaints to verify
              </small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <button
              className={`btn w-100 btn-lg ${
                selectedComplaints.length > 0 ? "btn-danger" : "btn-secondary"
              }`}
              onClick={openEscalationModal}
              disabled={selectedComplaints.length === 0}
            >
              <i className="bi bi-exclamation-triangle me-2"></i>
              {selectedComplaints.length > 0
                ? `Escalate Selected (${selectedComplaints.length})`
                : "Select to Escalate"}
            </button>
            {selectedComplaints.length === 0 && (
              <small className="text-muted d-block mt-1 text-center">
                Select complaints to escalate
              </small>
            )}
          </div>
        </div>

        {/* Selected Complaints Preview */}
        {selectedComplaints.length > 0 && (
          <div className="alert alert-info mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-info-circle me-2"></i>
                <strong>Selected {selectedComplaints.length} complaint(s):</strong> 
                <span className="ms-2">
                  {getSelectedComplaintDetails()
                    .slice(0, 3)
                    .map(item => `#${item.complaint.id}`)
                    .join(", ")}
                  {selectedComplaints.length > 3 && ` and ${selectedComplaints.length - 3} more...`}
                </span>
              </div>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={() => {
                  setSelectedComplaints([]);
                  setSelectAll(false);
                }}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verification History Section */}
      {showHistory && (
        <div className="mt-5 pt-4 border-top">
          <h5 className="text-success mb-3">
            <i className="bi bi-clock-history me-2"></i>
            Verification History ({displayHistory.length})
          </h5>
          
          {historyLoading ? (
            <div className="text-center my-4">
              <div className="spinner-border spinner-border-sm text-success"></div>
              <p className="mt-2">Loading history...</p>
            </div>
          ) : displayHistory.length === 0 ? (
            <div className="alert alert-info text-center">
              <i className="bi bi-info-circle me-2"></i>
              No verification history found
            </div>
          ) : (
            <div className="table-responsive shadow-sm">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-success">
                  <tr>
                    <th>Complaint ID</th>
                    <th>Staff</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Final Status</th>
                    <th>Action By</th>
                    <th>Description</th>
                    <th>Final Remarks</th>
                    <th>Completed At</th>
                  </tr>
                </thead>

                <tbody>
                  {displayHistory.map((item) => (
                    <tr key={`history-${item.assignment_id || item.complaint?.id}`}>
                      <td className="fw-bold">#{item.complaint?.id}</td>
                      <td>{item.staff?.name || "N/A"}</td>
                      <td>
                        {item.complaint?.departments
                          ?.map((d) => d.name)
                          .join(", ")}
                      </td>
                      <td>
                        <span className={`badge bg-${item.complaint?.priority === 'High' ? 'danger' : item.complaint?.priority === 'Medium' ? 'warning' : 'info'}`}>
                          {item.complaint?.priority}
                        </span>
                      </td>
                      
                      <td>
                        <span
                          className={`badge ${
                            item.returned_status === "Verified"
                              ? "bg-success"
                              : item.returned_status === "Escalated"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {item.returned_status}
                        </span>
                      </td>
                      
                      <td>
                        <span className="badge bg-info">
                          Officer
                        </span>
                      </td>
                      
                      <td>{item.complaint?.description}</td>
                      <td>
                        {/* Unified display using 'remark' field from backend */}
                        <div>
                          <strong>
                            {item.returned_status === "Verified" 
                              ? "Verification Remarks" 
                              : "Escalation Reason"}:
                          </strong>{" "}
                          {item.remark || item.final_remarks || "—"}
                        </div>
                      </td>
                      <td>
                        {item.verified_at 
                          ? new Date(item.verified_at).toLocaleString()
                          : item.escalated_at
                          ? new Date(item.escalated_at).toLocaleString()
                          : new Date(item.returned_at).toLocaleString()
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Stats */}
          {displayHistory.length > 0 && (
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="alert alert-success mb-2">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>Verified:</strong> {displayHistory.filter(h => h.returned_status === "Verified").length} complaints
                </div>
              </div>
              <div className="col-md-6">
                <div className="alert alert-danger mb-2">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Escalated:</strong> {displayHistory.filter(h => h.returned_status === "Escalated").length} complaints
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-shield-check me-2"></i>
                  Final Verification Remarks
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModals}></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  You are about to verify <strong>{selectedComplaints.length}</strong> selected complaint(s).
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Selected Complaints:</label>
                  <div className="border rounded p-2 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {getSelectedComplaintDetails().map(item => (
                      <div key={item.complaint.id} className="d-flex align-items-center mb-2">
                        <span className="badge bg-primary me-2">#{item.complaint.id}</span>
                        <span>{item.complaint.description?.substring(0, 50)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="verificationRemarks" className="form-label">
                    Verification Remarks <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="verificationRemarks"
                    rows="4"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter verification remarks here..."
                  />
                  <div className="form-text">These remarks will be applied to all selected complaints</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModals} disabled={processing}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleVerificationWithRemarks}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Verify {selectedComplaints.length} Complaint(s)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {showEscalationModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Escalation Reason
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModals}></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning mb-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  You are about to escalate <strong>{selectedComplaints.length}</strong> selected complaint(s) to higher authority.
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Selected Complaints:</label>
                  <div className="border rounded p-2 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {getSelectedComplaintDetails().map(item => (
                      <div key={item.complaint.id} className="d-flex align-items-center mb-2">
                        <span className="badge bg-danger me-2">#{item.complaint.id}</span>
                        <span>{item.complaint.description?.substring(0, 50)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="escalationReason" className="form-label">
                    Escalation Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="escalationReason"
                    rows="4"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter escalation reason here..."
                    required
                  />
                  <div className="form-text">Please provide a detailed reason for escalation. This reason will be applied to all selected complaints.</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModals} disabled={processing}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleEscalationWithRemarks}
                  disabled={processing || !remarks.trim()}
                >
                  {processing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-arrow-up-right-circle me-2"></i>
                      Escalate {selectedComplaints.length} Complaint(s)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerReturnedComplaints;