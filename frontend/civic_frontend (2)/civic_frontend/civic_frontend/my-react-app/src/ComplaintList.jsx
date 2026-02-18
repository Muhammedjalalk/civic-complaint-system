
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "./api/axios";

// export default function ComplaintHistory() {
//   const [complaints, setComplaints] = useState([]);
//   const navigate = useNavigate();

//   const fetchComplaints = () => {
//     axiosInstance
//       .get("/citizen/complaints/history/")
//       .then((res) => setComplaints(res.data))
//       .catch(() => alert("Failed to load history"));
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?")) return;

//     try {
//       await axiosInstance.delete(`/citizen/complaints/delete/${id}/`);
//       alert("Complaint deleted successfully!");
//       fetchComplaints();
//     } catch (err) {
//       console.error(err.response || err);
//       alert("Failed to delete complaint.");
//     }
//   };

//   const handleUpdate = (id) => {
//     // Navigate to the update form page with complaint id
//     navigate(`/complaints/update/${id}`);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>My Complaint History</h2>

//       {complaints.length === 0 ? (
//         <p>No complaints found.</p>
//       ) : (
//         complaints.map((item) => (
//           <div className="card mb-2" key={item.id}>
//             <div className="card-body">
//               <h5>{item.category}</h5>
//               <p>{item.description}</p>
//               <p>Status: {item.status}</p>
//               <p>Priority: {item.priority}</p>
//               <p>Submitted on: {new Date(item.created_at).toLocaleString()}</p>

//               <button
//                 className="btn btn-primary btn-sm me-2"
//                 onClick={() => handleUpdate(item.id)}
//               >
//                 Update
//               </button>
//               <button
//                className="btn btn-sm btn-outline-primary"
//                 onClick={() => navigate(`/citizen/complaints/track/${c.id}`)}>
//                      Track
//                   </button>
//                   <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDelete(item.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "./api/axios";

// export default function ComplaintHistory() {
//   const [complaints, setComplaints] = useState([]);
//   const navigate = useNavigate();

//   const fetchComplaints = async () => {
//     try {
//       const res = await axiosInstance.get("/citizen/complaints/history/");
//       setComplaints(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load complaint history");
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // ✅ DELETE COMPLAINT
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?")) return;

//     try {
//       await axiosInstance.delete(`/citizen/complaints/delete/${id}/`);
//       alert("✅ Complaint deleted successfully!");
//       fetchComplaints();
//     } catch (err) {
//       console.error(err.response || err);
//       alert("❌ Failed to delete complaint.");
//     }
//   };

//   // ✅ UPDATE COMPLAINT
//   const handleUpdate = (id) => {
//     navigate(`/complaints/update/${id}`);
//   };

//   // ✅ TRACK COMPLAINT
//   const handleTrack = (id) => {
//     navigate(`/citizen/complaints/track/${id}`);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold mb-4">My Complaint History</h2>

//       {complaints.length === 0 ? (
//         <p className="text-muted">No complaints found.</p>
//       ) : (
//         complaints.map((item, index) => (
//           <div className="card mb-3 shadow-sm" key={item.id}>
//             <div className="card-body">
//               <h5 className="fw-bold mb-2">
//                 {index + 1}. {item.category}
//               </h5>

//               <p className="mb-1">{item.description}</p>

//               <p className="mb-1">
//                 <b>Status:</b>{" "}
//                 <span className="badge bg-info text-dark">
//                   {item.status}
//                 </span>
//               </p>

//               <p className="mb-1">
//                 <b>Priority:</b>{" "}
//                 <span className="badge bg-warning text-dark">
//                   {item.priority}
//                 </span>
//               </p>

//               <p className="text-muted small">
//                 Submitted on: {new Date(item.created_at).toLocaleString()}
//               </p>
//               <div className="mt-3">
//                 <button
//                   className="btn btn-primary btn-sm me-2"
//                   onClick={() => handleUpdate(item.id)}
//                 >
//                   Update
//                 </button>

//                 <button
//                   className="btn btn-outline-success btn-sm me-2"
//                   onClick={() => handleTrack(item.id)}
//                 >
//                   Track
//                 </button>

//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import privateAPI from "./api/privateAxios";

// export default function ComplaintHistory() {
//   const [complaints, setComplaints] = useState([]);
//   const navigate = useNavigate();

//   // Fetch complaints from backend
//   const fetchComplaints = async () => {
//     try {
//       const res = await privateAPI.get("/accounts/citizen/complaints/history/");
//       setComplaints(res.data || []);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load complaint history");
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // DELETE COMPLAINT
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?")) return;

//     try {
//       await privateAPI.delete(`/citizen/complaints/delete/${id}/`);
//       alert("Complaint deleted successfully!");
//       fetchComplaints();
//     } catch (err) {
//       console.error(err.response || err);
//       alert("Failed to delete complaint.");
//     }
//   };

//   // UPDATE COMPLAINT
//   const handleUpdate = (id) => {
//     navigate(`/complaints/update/${id}`);
//   };

//   // TRACK COMPLAINT
//   const handleTrack = (id) => {
//     navigate(`/citizen/complaints/track/${id}`);
//   };

//   // Get badge class based on status safely
//   const getStatusBadgeClass = (status) => {
//     if (!status) return "bg-secondary";

//     switch (status.toUpperCase()) {
//       case "PENDING":
//         return "bg-secondary";
//       case "ASSIGNED":
//         return "bg-info text-dark";
//       case "IN_PROGRESS":
//         return "bg-warning text-dark";
//       case "RESOLVED":
//         return "bg-success";
//       case "REJECTED":
//         return "bg-danger";
//       default:
//         return "bg-secondary";
//     }
//   };

//   // Format status for display safely
//   const formatStatus = (status) => {
//     if (!status) return "Unknown";

//     return status
//       .toLowerCase()
//       .split('_')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   // Check if complaint can be updated/deleted (only when PENDING)
//   const canModifyComplaint = (status) => status?.toUpperCase() === "PENDING";

//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold mb-4">My Complaint History</h2>

//       {complaints.length === 0 ? (
//         <p className="text-muted">No complaints found.</p>
//       ) : (
//         complaints.map((item, index) => (
//           <div className="card mb-3 shadow-sm" key={item.id}>
//             <div className="card-body">

//               {/* COMPLAINT NUMBER */}
//               <div className="d-flex justify-content-between align-items-start mb-2">
//                 <h5 className="fw-bold mb-0">
//                   {index + 1}. Complaint #{item.id}
//                 </h5>
//               </div>

//               {/* DEPARTMENTS */}
//               <p className="mb-1">
//                 <b>Department:</b>{" "}
//                 {item.departments && item.departments.length > 0
//                   ? item.departments.join(", ")
//                   : "No departments assigned"}
//               </p>

//               {/* DESCRIPTION */}
//               <p className="mb-1"><b>Description:</b> {item.description || "N/A"}</p>

//               {/* PRIORITY */}
//               <p className="mb-1">
//                 <b>Priority:</b>{" "}
//                 <span className="badge bg-warning text-dark">
//                   {item.priority || "N/A"}
//                 </span>
//               </p>

//               {/* STATUS */}
//               <p className="mb-1">
//                 <b>Status:</b>{" "}
//                 <span className={`badge ${getStatusBadgeClass(item.status)}`}>
//                   {formatStatus(item.status)}
//                 </span>
//               </p>

//               {/* LOCATION */}
//               <p className="mb-1"><b>Location:</b> {item.location || "N/A"}</p>

//               {/* ATTACHMENT */}
//               {item.attachment ? (
//                 <p className="mb-1">
//                   <b>Attachment:</b>{" "}
//                   <a
//                     href={item.attachment}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary"
//                   >
//                     View File
//                   </a>
//                 </p>
//               ) : (
//                 <p className="mb-1"><b>Attachment:</b> None</p>
//               )}

//               {/* REPLY */}
//               <p className={item.reply ? "text-success" : "text-danger"}>
//                 <b>Reply:</b> {item.reply || "No reply yet"}
//               </p>

//               {/* DATES */}
//               <div className="text-muted small">
//                 <p className="mb-0">Submitted: {new Date(item.created_at).toLocaleString()}</p>
//                 {item.updated_at && item.updated_at !== item.created_at && (
//                   <p className="mb-0">Last Updated: {new Date(item.updated_at).toLocaleString()}</p>
//                 )}
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="mt-3">
//                 <button
//                   className="btn btn-primary btn-sm me-2"
//                   onClick={() => handleUpdate(item.id)}
//                   disabled={!canModifyComplaint(item.status)}
//                   title={!canModifyComplaint(item.status) ? "Can only update PENDING complaints" : ""}
//                 >
//                   Update
//                 </button>

//                 <button
//                   className="btn btn-outline-success btn-sm me-2"
//                   onClick={() => handleTrack(item.id)}
//                 >
//                   Track
//                 </button>

//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(item.id)}
//                   disabled={!canModifyComplaint(item.status)}
//                   title={!canModifyComplaint(item.status) ? "Can only delete PENDING complaints" : ""}
//                 >
//                   Delete
//                 </button>
//               </div>

//               {/* Status message for non-modifiable complaints */}
//               {!canModifyComplaint(item.status) && (
//                 <p className="text-danger small mt-2 mb-0">
//                   <i>Update and Delete are only available for PENDING complaints</i>
//                 </p>
//               )}

//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import privateAPI from "./api/privateAxios";

// export default function ComplaintHistory() {
//   const [complaints, setComplaints] = useState([]);
//   const navigate = useNavigate();

//   const fetchComplaints = async () => {
//     try {
//       const res = await privateAPI.get("/accounts/citizen/complaints/history/");
//       setComplaints(res.data || []);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load complaint history");
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?")) return;

//     try {
//       await privateAPI.delete(`/citizen/complaints/delete/${id}/`);
//       alert("Complaint deleted successfully!");
//       fetchComplaints();
//     } catch (err) {
//       console.error(err.response || err);
//       alert("Failed to delete complaint.");
//     }
//   };

//   const handleUpdate = (id) => navigate(`/complaints/update/${id}`);
//   const handleTrack = (id) => navigate(`/citizen/complaints/track/${id}`);

//   const getStatusBadgeClass = (status) => {
//     if (!status) return "bg-secondary";
//     switch (status.toUpperCase()) {
//       case "PENDING": return "bg-secondary";
//       case "ASSIGNED": return "bg-info text-dark";
//       case "IN_PROGRESS": return "bg-warning text-dark";
//       case "RESOLVED": return "bg-success";
//       case "REJECTED": return "bg-danger";
//       default: return "bg-secondary";
//     }
//   };

//   const formatStatus = (status) =>
//     status
//       ? status.toLowerCase().split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
//       : "Unknown";

//   const canModifyComplaint = (status) => status?.toUpperCase() === "PENDING";

//   return (
//     <div className="container mt-4">
//       <h2 className="fw-bold mb-4">My Complaint History</h2>

//       {complaints.length === 0 ? (
//         <p className="text-muted">No complaints found.</p>
//       ) : (
//         complaints.map((item, index) => (
//           <div className="card mb-3 shadow-sm" key={item.id}>
//             <div className="card-body">

//               <h5 className="fw-bold mb-2">
//                 {index + 1}. Complaint #{item.id}
//               </h5>

//               {/* DEPARTMENT */}
//               <p className="mb-1">
//                 <b>Department:</b>{" "}
//                 {item.departments?.length ? item.departments.join(", ") : "N/A"}
//               </p>

//               {/* DESCRIPTION */}
//               <p className="mb-1">
//                 <b>Complaint:</b> {item.description || "N/A"}
//               </p>

//               {/* ✅ NEW: SUGGESTION */}
//               <p className="mb-1">
//                 <b>Suggestion:</b>{" "}
//                 {item.suggestion ? (
//                   <span className="text-primary">{item.suggestion}</span>
//                 ) : (
//                   <span className="text-muted">No suggestion provided</span>
//                 )}
//               </p>

//               {/* PRIORITY */}
//               <p className="mb-1">
//                 <b>Priority:</b>{" "}
//                 <span className="badge bg-warning text-dark">
//                   {item.priority || "N/A"}
//                 </span>
//               </p>

//               {/* STATUS */}
//               <p className="mb-1">
//                 <b>Status:</b>{" "}
//                 <span className={`badge ${getStatusBadgeClass(item.status)}`}>
//                   {formatStatus(item.status)}
//                 </span>
//               </p>

//               {/* LOCATION */}
//               <p className="mb-1">
//                 <b>Location:</b> {item.location || "N/A"}
//               </p>

//               {/* ATTACHMENT */}
//               <p className="mb-1">
//                 <b>Attachment:</b>{" "}
//                 {item.attachment ? (
//                   <a
//                     href={item.attachment}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View File
//                   </a>
//                 ) : (
//                   "None"
//                 )}
//               </p>

//               {/* REPLY */}
//               <p className={item.reply ? "text-success" : "text-danger"}>
//                 <b>Reply:</b> {item.reply || "No reply yet"}
//               </p>

//               {/* DATES */}
//               <div className="text-muted small">
//                 <p className="mb-0">
//                   Submitted: {new Date(item.created_at).toLocaleString()}
//                 </p>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="mt-3">
//                 <button
//                   className="btn btn-primary btn-sm me-2"
//                   onClick={() => handleUpdate(item.id)}
//                   disabled={!canModifyComplaint(item.status)}
//                 >
//                   Update
//                 </button>

//                 <button
//                   className="btn btn-outline-success btn-sm me-2"
//                   onClick={() => handleTrack(item.id)}
//                 >
//                   Track
//                 </button>

//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(item.id)}
//                   disabled={!canModifyComplaint(item.status)}
//                 >
//                   Delete
//                 </button>
//               </div>

//               {!canModifyComplaint(item.status) && (
//                 <p className="text-danger small mt-2 mb-0">
//                   <i>Update/Delete allowed only when status is PENDING</i>
//                 </p>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import privateAPI from "./api/privateAxios";
// import ComplaintMap from "./ComplaintMap";
// import "./ComplaintHistory.css";

// export default function ComplaintHistory() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       const res = await privateAPI.get("/accounts/citizen/complaints/history/");
//       setComplaints(res.data || []);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load complaint history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?")) return;

//     try {
//       await privateAPI.delete(`/accounts/citizen/complaints/delete/${id}/`);
//       alert("Complaint deleted successfully!");
//       fetchComplaints();
//     } catch (err) {
//       console.error(err.response || err);
//       alert("Failed to delete complaint.");
//     }
//   };

//   const handleUpdate = (id) => navigate(`/accounts/citizen/complaints/update/${id}/`);
//   // const handleTrack = (id) => navigate(`/citizen/complaints/track/${id}`);
//   // const handleTrack = (id) => navigate(`/citizen_track_complaint/?id=${id}`);
//   const handleTrack = (id) => {
//   navigate(`/citizen_track_complaint/${id}`);
// };


//   const getStatusBadgeClass = (status) => {
//     if (!status) return "status-pending";
//     switch (status.toUpperCase()) {
//       case "PENDING": return "status-pending";
//       case "ASSIGNED": return "status-assigned";
//       case "IN_PROGRESS": return "status-in_progress";
//       case "RESOLVED": return "status-resolved";
//       case "REJECTED": return "status-rejected";
//       default: return "status-pending";
//     }
//   };

//   const getPriorityClass = (priority) => {
//     if (!priority) return "priority-low";
//     switch (priority.toLowerCase()) {
//       case "high": return "priority-high";
//       case "medium": return "priority-medium";
//       case "low": return "priority-low";
//       default: return "priority-low";
//     }
//   };

//   const getStatusText = (status) => {
//     if (!status) return "Pending";
//     return status.toLowerCase().split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const canModifyComplaint = (status) => status?.toUpperCase() === "PENDING";

//   // Calculate statistics
//   const totalComplaints = complaints.length;
//   const pendingCount = complaints.filter(c => c.status?.toUpperCase() === "PENDING").length;
//   const resolvedCount = complaints.filter(c => c.status?.toUpperCase() === "RESOLVED").length;
//   const locationsCount = new Set(complaints.map(c => c.location).filter(Boolean)).size;

//   if (loading) {
//     return (
//       <div className="loading-state">
//         <div className="loading-spinner"></div>
//         <p style={{ color: '#667eea', fontWeight: 600, marginTop: 15 }}>
//           Loading your complaint history...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="complaint-history-page">
//       {/* Header Section */}
//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title">
//             <h1>
//               <i className="bi bi-clock-history"></i>
//               My Complaint History
//             </h1>
//             <p>Track and manage all your submitted complaints</p>
//           </div>
          
//           <div className="header-stats">
//             <div className="stat-item">
//               <span className="stat-number">{totalComplaints}</span>
//               <span className="stat-label">Total</span>
//             </div>
//             <div className="stat-item">
//               <span className="stat-number">{pendingCount}</span>
//               <span className="stat-label">Pending</span>
//             </div>
//             <div className="stat-item">
//               <span className="stat-number">{resolvedCount}</span>
//               <span className="stat-label">Resolved</span>
//             </div>
//             <div className="stat-item">
//               <span className="stat-number">{locationsCount}</span>
//               <span className="stat-label">Locations</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Layout */}
//       <div className="main-layout">
//         {/* Map Section */}
//         <div className="map-container">
//           <div className="map-header">
//             <h3>
//               <i className="bi bi-geo-alt"></i>
//               Complaint Locations Map
//             </h3>
//             <div className="map-legend">
//               <div className="legend-item">
//                 <div className="legend-dot high"></div>
//                 <span>High Priority</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot medium"></div>
//                 <span>Medium Priority</span>
//               </div>
//               <div className="legend-item">
//                 <div className="legend-dot low"></div>
//                 <span>Low Priority</span>
//               </div>
//             </div>
//           </div>
//           <ComplaintMap complaints={complaints} />
//         </div>

//         {/* Complaints List Section */}
//         <div className="complaints-cards-container">
//           <div className="cards-header">
//             <h3>
//               <i className="bi bi-list-ul"></i>
//               Your Complaints ({totalComplaints})
//             </h3>
//           </div>
          
//           <div className="complaints-list">
//             {complaints.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-icon">
//                   <i className="bi bi-inbox"></i>
//                 </div>
//                 <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>
//                   No Complaints Found
//                 </h3>
//                 <p style={{ color: '#718096' }}>
//                   You haven't submitted any complaints yet.
//                 </p>
//               </div>
//             ) : (
//               complaints.map((item, index) => (
//                 <div 
//                   className={`complaint-card ${item.status?.toLowerCase() || 'pending'}`} 
//                   key={item.id}
//                 >
//                   <div className="complaint-header">
//                     <div className="complaint-title">
//                       <span className="complaint-number">
//                         {index + 1}. Complaint 
//                       </span>
//                       <span className="complaint-id">#{item.id}</span>
//                       <span className={`priority-badge ${getPriorityClass(item.priority)}`}>
//                         {item.priority || "Low"}
//                       </span>
//                       <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
//                         {getStatusText(item.status)}
//                       </span>
//                     </div>
//                     <div className="complaint-date">
//                       <i className="bi bi-calendar3"></i>
//                       {formatDate(item.created_at)}
//                     </div>
//                   </div>

//                   <div className="complaint-body">
//                     <div className="complaint-field">
//                       <div className="field-label">Department:</div>
//                       <div className="field-value">
//                         {item.departments?.length ? (
//                           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                             {item.departments.map((dept, idx) => (
//                               <span key={idx} style={{
//                                 background: '#edf2f7',
//                                 padding: '2px 8px',
//                                 borderRadius: '6px',
//                                 fontSize: '13px',
//                                 color: '#4a5568'
//                               }}>
//                                 {dept}
//                               </span>
//                             ))}
//                           </div>
//                         ) : "N/A"}
//                       </div>
//                     </div>

//                     <div className="complaint-field">
//                       <div className="field-label">Complaint:</div>
//                       <div className="field-value">{item.description || "N/A"}</div>
//                     </div>

//                     <div className="complaint-field">
//                       <div className="field-label">Suggestion:</div>
//                       <div className="field-value">
//                         {item.suggestion ? (
//                           <span style={{ color: '#4c6ef5', fontStyle: 'italic' }}>
//                             {item.suggestion}
//                           </span>
//                         ) : (
//                           <span className="text-muted">No suggestion provided</span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="complaint-field">
//                       <div className="field-label">Location:</div>
//                       <div className="field-value">
//                         {item.location ? (
//                           <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                             <i className="bi bi-geo-alt" style={{ color: '#667eea' }}></i>
//                             {item.location}
//                           </span>
//                         ) : "N/A"}
//                       </div>
//                     </div>

//                     <div className="complaint-field">
//                       <div className="field-label">Attachment:</div>
//                       <div className="field-value">
//                         {item.attachment ? (
//                           <a
//                             href={item.attachment}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               gap: '6px',
//                               padding: '6px 12px',
//                               background: '#ebf8ff',
//                               color: '#3182ce',
//                               borderRadius: '6px',
//                               textDecoration: 'none',
//                               fontSize: '13px',
//                               fontWeight: '500'
//                             }}
//                           >
//                             <i className="bi bi-eye"></i>
//                             View File
//                           </a>
//                         ) : "None"}
//                       </div>
//                     </div>

//                     <div className="complaint-field">
//                       <div className="field-label">Reply:</div>
//                       <div className="field-value" style={{ 
//                         color: item.reply ? '#38a169' : '#e53e3c',
//                         fontStyle: item.reply ? 'normal' : 'italic'
//                       }}>
//                         {item.reply || "No reply yet"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="complaint-actions">
//                     <button
//                       className="action-btn btn-update"
//                       onClick={() => handleUpdate(item.id)}
//                       disabled={!canModifyComplaint(item.status)}
//                     >
//                       <i className="bi bi-pencil-square"></i>
//                       Update
//                     </button>

//                     <button
//                       className="action-btn btn-track"
//                       onClick={() => handleTrack(item.id)}
//                     >
//                       <i className="bi bi-binoculars"></i>
//                       Track
//                     </button>

//                     <button
//                       className="action-btn btn-delete"
//                       onClick={() => handleDelete(item.id)}
//                       disabled={!canModifyComplaint(item.status)}
//                     >
//                       <i className="bi bi-trash"></i>
//                       Delete
//                     </button>
//                   </div>

//                   {!canModifyComplaint(item.status) && (
//                     <div style={{
//                       padding: '10px 20px',
//                       background: '#fff5f5',
//                       borderTop: '1px solid #fed7d7',
//                       fontSize: '13px',
//                       color: '#c53030',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px'
//                     }}>
//                       <i className="bi bi-info-circle"></i>
//                       <span>Update/Delete allowed only when status is PENDING</span>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import privateAPI from "./api/privateAxios";
import ComplaintMap from "./ComplaintMap";
import "./ComplaintHistory.css";

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await privateAPI.get("/accounts/citizen/complaints/history/");
      setComplaints(res.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load complaint history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      await privateAPI.delete(`/accounts/citizen/complaints/delete/${id}/`);
      alert("Complaint deleted successfully!");
      fetchComplaints();
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to delete complaint.");
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the update form page with complaint id
    navigate(`/complaints/update/${id}`);
  };
  
  const handleTrack = (id) => {
    navigate(`/citizen_track_complaint/${id}`);
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return "status-pending";
    switch (status.toUpperCase()) {
      case "PENDING": return "status-pending";
      case "ASSIGNED": return "status-assigned";
      case "IN_PROGRESS": return "status-in_progress";
      case "RESOLVED": return "status-resolved";
      case "REJECTED": return "status-rejected";
      default: return "status-pending";
    }
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "priority-low";
    switch (priority.toLowerCase()) {
      case "high": return "priority-high";
      case "medium": return "priority-medium";
      case "low": return "priority-low";
      default: return "priority-low";
    }
  };

  const getStatusText = (status) => {
    if (!status) return "Pending";
    return status.toLowerCase().split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const canModifyComplaint = (status) => status?.toUpperCase() === "PENDING";

  // Calculate statistics
  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter(c => c.status?.toUpperCase() === "PENDING").length;
  const resolvedCount = complaints.filter(c => c.status?.toUpperCase() === "RESOLVED").length;
  const locationsCount = new Set(complaints.map(c => c.location).filter(Boolean)).size;

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p style={{ color: '#667eea', fontWeight: 600, marginTop: 15 }}>
          Loading your complaint history...
        </p>
      </div>
    );
  }

  return (
    <div className="complaint-history-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className="bi bi-clock-history"></i>
              My Complaint History
            </h1>
            <p>Track and manage all your submitted complaints</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{totalComplaints}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{pendingCount}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{resolvedCount}</span>
              <span className="stat-label">Resolved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{locationsCount}</span>
              <span className="stat-label">Locations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="main-layout">
        {/* Map Section */}
        <div className="map-container">
          <div className="map-header">
            <h3>
              <i className="bi bi-geo-alt"></i>
              Complaint Locations Map
            </h3>
            <div className="map-legend">
              <div className="legend-item">
                <div className="legend-dot high"></div>
                <span>High Priority</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot medium"></div>
                <span>Medium Priority</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot low"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>
          <ComplaintMap complaints={complaints} />
        </div>

        {/* Complaints List Section */}
        <div className="complaints-cards-container">
          <div className="cards-header">
            <h3>
              <i className="bi bi-list-ul"></i>
              Your Complaints ({totalComplaints})
            </h3>
          </div>
          
          <div className="complaints-list">
            {complaints.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="bi bi-inbox"></i>
                </div>
                <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>
                  No Complaints Found
                </h3>
                <p style={{ color: '#718096' }}>
                  You haven't submitted any complaints yet.
                </p>
              </div>
            ) : (
              complaints.map((item, index) => (
                <div 
                  className={`complaint-card ${item.status?.toLowerCase() || 'pending'}`} 
                  key={item.id}
                >
                  <div className="complaint-header">
                    <div className="complaint-title">
                      <span className="complaint-number">
                        {index + 1}. Complaint 
                      </span>
                      <span className="complaint-id">#{item.id}</span>
                      <span className={`priority-badge ${getPriorityClass(item.priority)}`}>
                        {item.priority || "Low"}
                      </span>
                      <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    <div className="complaint-date">
                      <i className="bi bi-calendar3"></i>
                      {formatDate(item.created_at)}
                    </div>
                  </div>

                  <div className="complaint-body">
                    <div className="complaint-field">
                      <div className="field-label">Department:</div>
                      <div className="field-value">
                        {item.departments?.length ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {item.departments.map((dept, idx) => (
                              <span key={idx} style={{
                                background: '#edf2f7',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                color: '#4a5568'
                              }}>
                                {dept}
                              </span>
                            ))}
                          </div>
                        ) : "N/A"}
                      </div>
                    </div>

                    <div className="complaint-field">
                      <div className="field-label">Complaint:</div>
                      <div className="field-value">{item.description || "N/A"}</div>
                    </div>

                    <div className="complaint-field">
                      <div className="field-label">Suggestion:</div>
                      <div className="field-value">
                        {item.suggestion ? (
                          <span style={{ color: '#4c6ef5', fontStyle: 'italic' }}>
                            {item.suggestion}
                          </span>
                        ) : (
                          <span className="text-muted">No suggestion provided</span>
                        )}
                      </div>
                    </div>

                    <div className="complaint-field">
                      <div className="field-label">Location:</div>
                      <div className="field-value">
                        {item.location ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="bi bi-geo-alt" style={{ color: '#667eea' }}></i>
                            {item.location}
                          </span>
                        ) : "N/A"}
                      </div>
                    </div>

                    <div className="complaint-field">
                      <div className="field-label">Attachment:</div>
                      <div className="field-value">
                        {item.attachment ? (
                          <a
                            href={item.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
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
                        ) : "None"}
                      </div>
                    </div>

                    <div className="complaint-field">
                      <div className="field-label">Reply:</div>
                      <div className="field-value" style={{ 
                        color: item.reply ? '#38a169' : '#e53e3c',
                        fontStyle: item.reply ? 'normal' : 'italic'
                      }}>
                        {item.reply || "No reply yet"}
                      </div>
                    </div>
                  </div>

                  <div className="complaint-actions">
                    <button
                      className="action-btn btn-update"
                      onClick={() => handleUpdate(item.id)}
                      disabled={!canModifyComplaint(item.status)}
                    >
                      <i className="bi bi-pencil-square"></i>
                      Update
                    </button>

                    <button
                      className="action-btn btn-track"
                      onClick={() => handleTrack(item.id)}
                    >
                      <i className="bi bi-binoculars"></i>
                      Track
                    </button>

                    <button
                      className="action-btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                      disabled={!canModifyComplaint(item.status)}
                    >
                      <i className="bi bi-trash"></i>
                      Delete
                    </button>
                  </div>

                  {!canModifyComplaint(item.status) && (
                    <div style={{
                      padding: '10px 20px',
                      background: '#fff5f5',
                      borderTop: '1px solid #fed7d7',
                      fontSize: '13px',
                      color: '#c53030',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <i className="bi bi-info-circle"></i>
                      <span>Update/Delete allowed only when status is PENDING</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}