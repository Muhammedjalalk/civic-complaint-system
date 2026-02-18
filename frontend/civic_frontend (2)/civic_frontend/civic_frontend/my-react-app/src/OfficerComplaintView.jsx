// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   // Fetch complaints assigned to officer's department
//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/officer/complaints/");
//       setComplaints(res.data);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all approved staff (no department filter)
//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/officer/officer/staff-list/");
//       setStaffList(res.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   // Assign selected staff to complaint
//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       alert("Please select a staff member.");
//       return;
//     }

//     try {
//       await axios.post("/officer/assigned_staff/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       alert("Complaint assigned successfully!");

//       // Update status locally
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       alert("Failed to assign complaint.");
//     }
//   };

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div style={container}>
//       <h1>Department Complaints</h1>

//       {complaints.length === 0 ? (
//         <p>No complaints found for your department.</p>
//       ) : (
//         <ul>
//           {complaints.map((c) => (
//             <li key={c.id} style={card}>
//               <h3>Category: {c.category}</h3>
//               <p><strong>Priority:</strong> {c.priority}</p>
//               <p><strong>Location:</strong> {c.location}</p>
//               <p><strong>Description:</strong> {c.description}</p>
//               <p><strong>Department:</strong> {c.department}</p>
//               <p><strong>Status:</strong> {c.status || "Pending"}</p>

//               {c.attachment && (
//                 <p>
//                   <a href={c.attachment} target="_blank" rel="noopener noreferrer">
//                     View Attachment
//                   </a>
//                 </p>
//               )}

//               <p><strong>Date:</strong> {new Date(c.created_at).toLocaleString()}</p>

//               {/* Assign Section */}
//               <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
//                 <select
//                   value={selectedStaff[c.id] || ""}
//                   onChange={(e) =>
//                     setSelectedStaff({ ...selectedStaff, [c.id]: e.target.value })
//                   }
//                   style={{ padding: "5px", flexGrow: 1 }}
//                 >
//                   <option value="">Select Staff</option>
//                   {staffList.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.full_name}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   style={assignBtn}
//                   onClick={() => assignComplaint(c.id)}
//                 >
//                   Assign
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// /* Styles */
// const container = {
//   width: "90%",
//   maxWidth: "800px",
//   margin: "40px auto",
//   padding: "20px",
// };

// const card = {
//   padding: "15px",
//   marginBottom: "15px",
//   borderRadius: "8px",
//   background: "#f5f5f5",
//   border: "1px solid #ddd",
// };

// const assignBtn = {
//   marginLeft: "10px",
//   padding: "6px 12px",
//   cursor: "pointer",
//   backgroundColor: "#0d6efd",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
// };

// export default OfficerComplaintView;


// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import { motion } from "framer-motion";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/complaints/");
//       setComplaints(res.data);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
//       setStaffList(res.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//     }
//   };

//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.post("/accounts/officer/assign-complaint/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       // Update status locally
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       // Clear selection
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case "Assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "In Progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "Resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "Pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   const filteredComplaints = complaints.filter(complaint => {
//     const matchesSearch = 
//       complaint.category?.toLowerCase().includes(searchQuery.toLowerCase())
//       complaint.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       complaint.description?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesPriority = 
//       filterPriority === "all" || complaint.priority?.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || complaint.status === filterStatus;

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search complaints..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Assigned">Assigned</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={complaint.id} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {complaint.category || "Uncategorized"}
//                       </h5>
//                       <small className="text-muted">ID: {complaint.id}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(complaint.id)}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item">
//                             <i className="bi bi-download me-2"></i>
//                             Export Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status || "Pending")}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <span className="text-truncate">{complaint.location || "Location not specified"}</span>
//                       </div>
                      
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span>{complaint.department || "No department"}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
//                     </div>

//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     {/* Assign Section */}
//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[complaint.id] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [complaint.id]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {staffList.map((staff) => (
//                             <option key={staff.id} value={staff.id}>
//                               {staff.full_name} 
//                               {staff.department ? ` (${staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(complaint.id)}
//                           disabled={!selectedStaff[complaint.id]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredComplaints.length > 0 && (
//           <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeIn">
//             <nav>
//               <ul className="pagination">
//                 <li className="page-item disabled">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {staffList.map((staff) => (
//                       <option key={staff.id} value={staff.id}>
//                         <div className="d-flex align-items-center">
//                           <div className="avatar-sm bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2">
//                             <i className="bi bi-person text-primary"></i>
//                           </div>
//                           <div>
//                             <div>{staff.full_name}</div>
//                             <small className="text-muted">{staff.department || 'No department'}</small>
//                           </div>
//                         </div>
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{activeComplaint.category}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         {activeComplaint.location}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status || "Pending")}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Department</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {activeComplaint.department}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {new Date(activeComplaint.created_at).toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description}</p>
//                     </div>
//                   </div>
//                 </div>
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(activeComplaint.id);
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 9999;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;


// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import { motion } from "framer-motion";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   // FIXED: Handle API response correctly
//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/complaints/");
      
//       // Check if response is an object with complaints array or just an array
//       if (res.data && Array.isArray(res.data)) {
//         // API returns array directly
//         setComplaints(res.data);
//       } else if (res.data && res.data.complaints && Array.isArray(res.data.complaints)) {
//         // API returns object with complaints key
//         setComplaints(res.data.complaints);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         // API returns paginated results
//         setComplaints(res.data.results);
//       } else {
//         // Fallback: try to extract array from response
//         console.warn("Unexpected API response format:", res.data);
//         // Try to find any array in the response
//         const possibleArray = Object.values(res.data).find(val => Array.isArray(val));
//         setComplaints(possibleArray || []);
//       }
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FIXED: Also handle staff API response
//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
      
//       // Handle different response formats
//       if (Array.isArray(res.data)) {
//         setStaffList(res.data);
//       } else if (res.data && res.data.staff && Array.isArray(res.data.staff)) {
//         setStaffList(res.data.staff);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setStaffList(res.data.results);
//       } else {
//         setStaffList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//       setStaffList([]);
//     }
//   };

//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.get("/accounts/officer/assigned-complaints/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       // Update status locally
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       // Clear selection
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     if (!status) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(status) {
//       case "Assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "In Progress":
//       case "in_progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "Resolved":
//       case "resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "Pending":
//       case "pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   // FIXED: Search filter logic - added missing OR operator and improved null safety
//   const filteredComplaints = complaints.filter(complaint => {
//     if (!complaint) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     const matchesSearch = 
//       (complaint.category && complaint.category.toLowerCase().includes(searchLower)) ||
//       (complaint.department && complaint.department.toLowerCase().includes(searchLower)) ||
//       (complaint.department_name && complaint.department_name.toLowerCase().includes(searchLower)) ||
//       (complaint.location && complaint.location.toLowerCase().includes(searchLower)) ||
//       (complaint.description && complaint.description.toLowerCase().includes(searchLower)) ||
//       (complaint.title && complaint.title.toLowerCase().includes(searchLower));

//     const matchesPriority = 
//       filterPriority === "all" || 
//       !complaint.priority || 
//       complaint.priority.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || 
//       !complaint.status || 
//       complaint.status === filterStatus;

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   // FIXED: Added safe access to complaint data
//   const getComplaintValue = (complaint, key) => {
//     if (!complaint) return "N/A";
    
//     // Handle department field that might be object or string
//     if (key === 'department') {
//       if (typeof complaint.department === 'object' && complaint.department !== null) {
//         return complaint.department.name || "N/A";
//       }
//       return complaint.department || complaint.department_name || "N/A";
//     }
    
//     // Handle category
//     if (key === 'category') {
//       return complaint.category || "Uncategorized";
//     }
    
//     return complaint[key] || "N/A";
//   };

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   // FIXED: Render department name properly
//   const renderDepartment = (complaint) => {
//     if (!complaint) return "No department";
    
//     if (typeof complaint.department === 'object' && complaint.department !== null) {
//       return complaint.department.name || complaint.department_name || "No department";
//     }
    
//     return complaint.department || complaint.department_name || "No department";
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by category, location, description..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//               <button 
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilterPriority("all");
//                   setFilterStatus("all");
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={complaint.id} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {getComplaintValue(complaint, 'category')}
//                       </h5>
//                       <small className="text-muted">ID: {complaint.id}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(complaint.id)}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item">
//                             <i className="bi bi-download me-2"></i>
//                             Export Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status)}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <span className="text-truncate">{complaint.location || "Location not specified"}</span>
//                       </div>
                      
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span>{renderDepartment(complaint)}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
//                     </div>

//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     {/* Assign Section */}
//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[complaint.id] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [complaint.id]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {staffList.map((staff) => (
//                             <option key={staff.id} value={staff.id}>
//                               {staff.full_name || staff.username || `Staff ${staff.id}`}
//                               {staff.department ? ` (${staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(complaint.id)}
//                           disabled={!selectedStaff[complaint.id]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination - Optional */}
//         {filteredComplaints.length > 0 && (
//           <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeIn">
//             <nav>
//               <ul className="pagination">
//                 <li className="page-item disabled">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {staffList.map((staff) => (
//                       <option key={staff.id} value={staff.id}>
//                         <div className="d-flex align-items-center">
//                           <div className="avatar-sm bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2">
//                             <i className="bi bi-person text-primary"></i>
//                           </div>
//                           <div>
//                             <div>{staff.full_name || staff.username || `Staff ${staff.id}`}</div>
//                             <small className="text-muted">{staff.department || 'No department'}</small>
//                           </div>
//                         </div>
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{getComplaintValue(activeComplaint, 'category')}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         {activeComplaint.location || "Location not specified"}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status)}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Department</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {renderDepartment(activeComplaint)}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
//                     </div>
//                   </div>
//                 </div>
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(activeComplaint.id);
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 9999;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;


// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import { motion } from "framer-motion";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   // FIXED: Handle API response correctly
//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/complaints/");
      
//       // Check if response is an object with complaints array or just an array
//       if (res.data && Array.isArray(res.data)) {
//         // API returns array directly
//         setComplaints(res.data);
//       } else if (res.data && res.data.complaints && Array.isArray(res.data.complaints)) {
//         // API returns object with complaints key
//         setComplaints(res.data.complaints);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         // API returns paginated results
//         setComplaints(res.data.results);
//       } else {
//         // Fallback: try to extract array from response
//         console.warn("Unexpected API response format:", res.data);
//         // Try to find any array in the response
//         const possibleArray = Object.values(res.data).find(val => Array.isArray(val));
//         setComplaints(possibleArray || []);
//       }
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FIXED: Also handle staff API response
//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
      
//       // Handle different response formats
//       if (Array.isArray(res.data)) {
//         setStaffList(res.data);
//       } else if (res.data && res.data.staff && Array.isArray(res.data.staff)) {
//         setStaffList(res.data.staff);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setStaffList(res.data.results);
//       } else {
//         setStaffList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//       setStaffList([]);
//     }
//   };

//   // FIXED: Changed from GET to POST method
//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.post("/accounts/officer/assigned-complaints/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       // Update status locally
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       // Clear selection
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     if (!status) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(status) {
//       case "Assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "In Progress":
//       case "in_progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "Resolved":
//       case "resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "Pending":
//       case "pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   // FIXED: Search filter logic - added missing OR operator and improved null safety
//   const filteredComplaints = complaints.filter(complaint => {
//     if (!complaint) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     const matchesSearch = 
//       (complaint.category && complaint.category.toLowerCase().includes(searchLower)) ||
//       (complaint.department && complaint.department.toLowerCase().includes(searchLower)) ||
//       (complaint.department_name && complaint.department_name.toLowerCase().includes(searchLower)) ||
//       (complaint.location && complaint.location.toLowerCase().includes(searchLower)) ||
//       (complaint.description && complaint.description.toLowerCase().includes(searchLower)) ||
//       (complaint.title && complaint.title.toLowerCase().includes(searchLower));

//     const matchesPriority = 
//       filterPriority === "all" || 
//       !complaint.priority || 
//       complaint.priority.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || 
//       !complaint.status || 
//       complaint.status === filterStatus;

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   // FIXED: Added safe access to complaint data
//   const getComplaintValue = (complaint, key) => {
//     if (!complaint) return "N/A";
    
//     // Handle department field that might be object or string
//     if (key === 'department') {
//       if (typeof complaint.department === 'object' && complaint.department !== null) {
//         return complaint.department.name || "N/A";
//       }
//       return complaint.department || complaint.department_name || "N/A";
//     }
    
//     // Handle category
//     if (key === 'category') {
//       return complaint.category || "Uncategorized";
//     }
    
//     return complaint[key] || "N/A";
//   };

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   // FIXED: Render department name properly
//   const renderDepartment = (complaint) => {
//     if (!complaint) return "No department";
    
//     if (typeof complaint.department === 'object' && complaint.department !== null) {
//       return complaint.department.name || complaint.department_name || "No department";
//     }
    
//     return complaint.department || complaint.department_name || "No department";
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by category, location, description..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//               <button 
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilterPriority("all");
//                   setFilterStatus("all");
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={complaint.id} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {getComplaintValue(complaint, 'category')}
//                       </h5>
//                       <small className="text-muted">ID: {complaint.id}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(complaint.id)}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item">
//                             <i className="bi bi-download me-2"></i>
//                             Export Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status)}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <span className="text-truncate">{complaint.location || "Location not specified"}</span>
//                       </div>
                      
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span>{renderDepartment(complaint)}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
//                     </div>

//                     {/* FIXED: Added base URL to attachment links */}
//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment ? (complaint.attachment.startsWith('http') ? complaint.attachment : `http://localhost:8000${complaint.attachment}`) : "#"}
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     {/* Assign Section */}
//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[complaint.id] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [complaint.id]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {/* FIXED: Handle department object or string */}
//                           {staffList.map((staff) => (
//                             <option key={staff.id} value={staff.id}>
//                               {staff.full_name || staff.username || `Staff ${staff.id}`}
//                               {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(complaint.id)}
//                           disabled={!selectedStaff[complaint.id]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination - Optional */}
//         {filteredComplaints.length > 0 && (
//           <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeIn">
//             <nav>
//               <ul className="pagination">
//                 <li className="page-item disabled">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {/* FIXED: Handle department object or string in modal */}
//                     {staffList.map((staff) => (
//                       <option key={staff.id} value={staff.id}>
//                         {staff.full_name || staff.username || `Staff ${staff.id}`}
//                         {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{getComplaintValue(activeComplaint, 'category')}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         {activeComplaint.location || "Location not specified"}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status)}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Department</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {renderDepartment(activeComplaint)}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* FIXED: Added base URL to attachment links in modal */}
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment ? (activeComplaint.attachment.startsWith('http') ? activeComplaint.attachment : `http://localhost:8000${activeComplaint.attachment}`) : "#"}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(activeComplaint.id);
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 9999;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;


// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   // ✅ Added departments to response handling
//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/complaints/");
      
//       if (res.data && Array.isArray(res.data)) {
//         setComplaints(res.data);
//       } else if (res.data && res.data.complaints && Array.isArray(res.data.complaints)) {
//         setComplaints(res.data.complaints);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setComplaints(res.data.results);
//       } else {
//         console.warn("Unexpected API response format:", res.data);
//         const possibleArray = Object.values(res.data).find(val => Array.isArray(val));
//         setComplaints(possibleArray || []);
//       }
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
      
//       if (Array.isArray(res.data)) {
//         setStaffList(res.data);
//       } else if (res.data && res.data.staff && Array.isArray(res.data.staff)) {
//         setStaffList(res.data.staff);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setStaffList(res.data.results);
//       } else {
//         setStaffList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//       setStaffList([]);
//     }
//   };

//   // ✅ NEW: Department renderer for multiple departments
//   const renderDepartments = (complaint) => {
//     if (!complaint) return "No department";
    
//     // Handle multiple departments
//     if (Array.isArray(complaint.departments) && complaint.departments.length > 0) {
//       return complaint.departments
//         .map(dept => dept.name || "Unnamed Department")
//         .join(", ");
//     }
    
//     // Fallback for backward compatibility
//     if (complaint.department_name) return complaint.department_name;
//     if (complaint.department) {
//       if (typeof complaint.department === 'object') {
//         return complaint.department.name || "No department";
//       }
//       return complaint.department;
//     }
    
//     return "No department";
//   };

//   // ✅ UPDATED: Search filter to handle multiple departments
//   const filteredComplaints = complaints.filter(complaint => {
//     if (!complaint) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     const matchesSearch = 
//       (complaint.category && complaint.category.toLowerCase().includes(searchLower)) ||
//       // Search in multiple departments
//       (Array.isArray(complaint.departments) && 
//         complaint.departments.some(dept => 
//           dept.name && dept.name.toLowerCase().includes(searchLower)
//         )) ||
//       // Fallback search for single department
//       (complaint.department_name && complaint.department_name.toLowerCase().includes(searchLower)) ||
//       (complaint.department && typeof complaint.department === 'string' && 
//         complaint.department.toLowerCase().includes(searchLower)) ||
//       (complaint.location && complaint.location.toLowerCase().includes(searchLower)) ||
//       (complaint.description && complaint.description.toLowerCase().includes(searchLower)) ||
//       (complaint.title && complaint.title.toLowerCase().includes(searchLower)) ||
//       // Search in suggestions
//       (complaint.suggestion && complaint.suggestion.toLowerCase().includes(searchLower));

//     const matchesPriority = 
//       filterPriority === "all" || 
//       !complaint.priority || 
//       complaint.priority.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || 
//       !complaint.status || 
//       complaint.status === filterStatus;

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.post("/accounts/officer/assigned-complaints/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     if (!status) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(status) {
//       case "Assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "In Progress":
//       case "in_progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "Resolved":
//       case "resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "Pending":
//       case "pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by department, category, location..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//               <button 
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilterPriority("all");
//                   setFilterStatus("all");
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={complaint.id} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {complaint.category || "Uncategorized"}
//                       </h5>
//                       <small className="text-muted">ID: {complaint.id}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(complaint.id)}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item">
//                             <i className="bi bi-download me-2"></i>
//                             Export Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status)}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <span className="text-truncate">{complaint.location || "Location not specified"}</span>
//                       </div>
                      
//                       {/* ✅ FIXED: Now shows multiple departments */}
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span>{renderDepartments(complaint)}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
                      
//                       {/* ✅ NEW: Show citizen suggestion if exists */}
//                       {complaint.suggestion && (
//                         <div className="alert alert-info mt-2 p-2 small">
//                           <div className="d-flex align-items-center">
//                             <i className="bi bi-lightbulb me-2"></i>
//                             <strong className="me-2">Citizen Suggestion:</strong>
//                           </div>
//                           <p className="mb-0 mt-1">{complaint.suggestion}</p>
//                         </div>
//                       )}
//                     </div>

//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment ? (complaint.attachment.startsWith('http') ? complaint.attachment : `http://localhost:8000${complaint.attachment}`) : "#"}
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[complaint.id] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [complaint.id]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {staffList.map((staff) => (
//                             <option key={staff.id} value={staff.id}>
//                               {staff.full_name || staff.username || `Staff ${staff.id}`}
//                               {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(complaint.id)}
//                           disabled={!selectedStaff[complaint.id]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredComplaints.length > 0 && (
//           <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeIn">
//             <nav>
//               <ul className="pagination">
//                 <li className="page-item disabled">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {staffList.map((staff) => (
//                       <option key={staff.id} value={staff.id}>
//                         {staff.full_name || staff.username || `Staff ${staff.id}`}
//                         {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{activeComplaint.category || "Uncategorized"}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         {activeComplaint.location || "Location not specified"}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status)}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Departments</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {renderDepartments(activeComplaint)}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* ✅ NEW: Show citizen suggestion in modal */}
//                 {activeComplaint.suggestion && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Citizen Suggestion</label>
//                     <div className="card border-info">
//                       <div className="card-header bg-info bg-opacity-10 d-flex align-items-center">
//                         <i className="bi bi-lightbulb text-info me-2"></i>
//                         <strong>Citizen's Input</strong>
//                       </div>
//                       <div className="card-body">
//                         <p className="mb-0">{activeComplaint.suggestion}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment ? (activeComplaint.attachment.startsWith('http') ? activeComplaint.attachment : `http://localhost:8000${activeComplaint.attachment}`) : "#"}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(activeComplaint.id);
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 9999;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;

// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   // ✅ UPDATED: Better API response handling with logging
//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/complaints/");
//       console.log("API Response:", res.data); // Debug log
      
//       let complaintsData = [];
      
//       if (Array.isArray(res.data)) {
//         complaintsData = res.data;
//       } else if (res.data && res.data.complaints && Array.isArray(res.data.complaints)) {
//         complaintsData = res.data.complaints;
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         complaintsData = res.data.results;
//       } else {
//         console.warn("Unexpected API response format:", res.data);
//         complaintsData = [];
//       }
      
//       // ✅ DEBUG: Check first complaint's department structure
//       if (complaintsData.length > 0) {
//         console.log("First complaint departments:", complaintsData[0].departments);
//         console.log("Department type:", typeof complaintsData[0].departments);
//       }
      
//       setComplaints(complaintsData);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
      
//       if (Array.isArray(res.data)) {
//         setStaffList(res.data);
//       } else if (res.data && res.data.staff && Array.isArray(res.data.staff)) {
//         setStaffList(res.data.staff);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setStaffList(res.data.results);
//       } else {
//         setStaffList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//       setStaffList([]);
//     }
//   };

//   // ✅ UPDATED: Universal department renderer that handles ALL formats
//   const renderDepartments = (complaint) => {
//     if (!complaint) return "No department";
    
//     // Handle array of objects with name property
//     if (Array.isArray(complaint.departments)) {
//       if (complaint.departments.length === 0) return "No department";
      
//       // Check if first element is object with name property
//       if (typeof complaint.departments[0] === 'object' && complaint.departments[0] !== null) {
//         return complaint.departments
//           .map(dept => dept.name || "Unnamed Department")
//           .join(", ");
//       } 
//       // Handle array of strings (like citizen API)
//       else if (typeof complaint.departments[0] === 'string') {
//         return complaint.departments.join(", ");
//       }
//     }
    
//     // Handle string formats (backward compatibility)
//     if (complaint.department_name) return complaint.department_name;
//     if (complaint.department) {
//       if (typeof complaint.department === 'object') {
//         return complaint.department.name || "No department";
//       }
//       return complaint.department;
//     }
    
//     return "No department";
//   };

//   // ✅ UPDATED: Universal search that handles all department formats
//   const filteredComplaints = complaints.filter(complaint => {
//     if (!complaint) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     let matchesDepartment = false;
    
//     // Search in departments - handle ALL formats
//     if (Array.isArray(complaint.departments)) {
//       if (complaint.departments.length > 0) {
//         if (typeof complaint.departments[0] === 'object') {
//           // Array of objects
//           matchesDepartment = complaint.departments.some(dept => 
//             dept.name && dept.name.toLowerCase().includes(searchLower)
//           );
//         } else if (typeof complaint.departments[0] === 'string') {
//           // Array of strings
//           matchesDepartment = complaint.departments.some(dept => 
//             dept.toLowerCase().includes(searchLower)
//           );
//         }
//       }
//     } else if (complaint.department_name && complaint.department_name.toLowerCase().includes(searchLower)) {
//       // Single department string (old format)
//       matchesDepartment = true;
//     } else if (complaint.department && typeof complaint.department === 'string' && 
//                complaint.department.toLowerCase().includes(searchLower)) {
//       // Single department string
//       matchesDepartment = true;
//     }
    
//     const matchesSearch = 
//       matchesDepartment ||
//       (complaint.category && complaint.category.toLowerCase().includes(searchLower)) ||
//       (complaint.location && complaint.location.toLowerCase().includes(searchLower)) ||
//       (complaint.description && complaint.description.toLowerCase().includes(searchLower)) ||
//       (complaint.title && complaint.title.toLowerCase().includes(searchLower)) ||
//       (complaint.suggestion && complaint.suggestion.toLowerCase().includes(searchLower));

//     const matchesPriority = 
//       filterPriority === "all" || 
//       !complaint.priority || 
//       complaint.priority.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || 
//       !complaint.status || 
//       complaint.status === filterStatus;

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.post("/accounts/officer/assigned-complaints/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     if (!status) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(status) {
//       case "Assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "In Progress":
//       case "in_progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "Resolved":
//       case "resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "Pending":
//       case "pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   // ✅ NEW: Debug component to check data
//   const DebugInfo = () => (
//     <div className="alert alert-info mt-3">
//       <h5>Debug Info:</h5>
//       <p>Total complaints: {complaints.length}</p>
//       <p>Filtered complaints: {filteredComplaints.length}</p>
//       {complaints.length > 0 && (
//         <div>
//           <p>First complaint departments: {JSON.stringify(complaints[0].departments)}</p>
//           <p>Rendered as: {renderDepartments(complaints[0])}</p>
//         </div>
//       )}
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* ✅ DEBUG: Uncomment to see data structure */}
//         {/* <DebugInfo /> */}
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by department, category, location..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//               <button 
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilterPriority("all");
//                   setFilterStatus("all");
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={complaint.id} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {complaint.category || "Uncategorized"}
//                       </h5>
//                       <small className="text-muted">ID: {complaint.id}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(complaint.id)}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item">
//                             <i className="bi bi-download me-2"></i>
//                             Export Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status)}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <span className="text-truncate">{complaint.location || "Location not specified"}</span>
//                       </div>
                      
//                       {/* ✅ FIXED: Now handles all department formats */}
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span>{renderDepartments(complaint)}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
                      
//                       {/* ✅ Suggestion display */}
//                       {complaint.suggestion && (
//                         <div className="alert alert-info mt-2 p-2 small">
//                           <div className="d-flex align-items-center">
//                             <i className="bi bi-lightbulb me-2"></i>
//                             <strong className="me-2">Citizen Suggestion:</strong>
//                           </div>
//                           <p className="mb-0 mt-1">{complaint.suggestion}</p>
//                         </div>
//                       )}
//                     </div>

//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment ? (complaint.attachment.startsWith('http') ? complaint.attachment : `http://localhost:8000${complaint.attachment}`) : "#"}
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[complaint.id] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [complaint.id]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {staffList.map((staff) => (
//                             <option key={staff.id} value={staff.id}>
//                               {staff.full_name || staff.username || `Staff ${staff.id}`}
//                               {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(complaint.id)}
//                           disabled={!selectedStaff[complaint.id]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredComplaints.length > 0 && (
//           <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeIn">
//             <nav>
//               <ul className="pagination">
//                 <li className="page-item disabled">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {staffList.map((staff) => (
//                       <option key={staff.id} value={staff.id}>
//                         {staff.full_name || staff.username || `Staff ${staff.id}`}
//                         {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{activeComplaint.category || "Uncategorized"}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         {activeComplaint.location || "Location not specified"}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status)}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Departments</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {renderDepartments(activeComplaint)}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Suggestion */}
//                 {activeComplaint.suggestion && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Citizen Suggestion</label>
//                     <div className="card border-info">
//                       <div className="card-header bg-info bg-opacity-10 d-flex align-items-center">
//                         <i className="bi bi-lightbulb text-info me-2"></i>
//                         <strong>Citizen's Input</strong>
//                       </div>
//                       <div className="card-body">
//                         <p className="mb-0">{activeComplaint.suggestion}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment ? (activeComplaint.attachment.startsWith('http') ? activeComplaint.attachment : `http://localhost:8000${activeComplaint.attachment}`) : "#"}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(activeComplaint.id);
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 9999;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;

// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
//   // ✅ NEW: Reply states
//   const [replyText, setReplyText] = useState("");
//   const [replyingToComplaintId, setReplyingToComplaintId] = useState(null);
//   const [showReplyBox, setShowReplyBox] = useState(false);

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/complaints/");
      
//       if (res.data && Array.isArray(res.data)) {
//         setComplaints(res.data);
//       } else if (res.data && res.data.complaints && Array.isArray(res.data.complaints)) {
//         setComplaints(res.data.complaints);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setComplaints(res.data.results);
//       } else {
//         console.warn("Unexpected API response format:", res.data);
//         const possibleArray = Object.values(res.data).find(val => Array.isArray(val));
//         setComplaints(possibleArray || []);
//       }
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
      
//       if (Array.isArray(res.data)) {
//         setStaffList(res.data);
//       } else if (res.data && res.data.staff && Array.isArray(res.data.staff)) {
//         setStaffList(res.data.staff);
//       } else if (res.data && res.data.results && Array.isArray(res.data.results)) {
//         setStaffList(res.data.results);
//       } else {
//         setStaffList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//       setStaffList([]);
//     }
//   };

//   // ✅ NEW: Submit reply to suggestion
//   const submitReply = async (complaintId) => {
//     if (!replyText.trim()) {
//       showNotification("Please enter a reply", "warning");
//       return;
//     }

//     try {
//       await axios.post(`/accounts/officer/complaints/${complaintId}/reply-suggestion/`, {
//         suggestion_reply: replyText,
//       });

//       showNotification("Reply submitted successfully!", "success");

//       // Update complaint with new reply
//       setComplaints(prev => 
//         prev.map(c => 
//           c.id === complaintId 
//             ? { ...c, suggestion_reply: replyText, replied_at: new Date().toISOString() }
//             : c
//         )
//       );

//       // Update active complaint if open
//       if (activeComplaint && activeComplaint.id === complaintId) {
//         setActiveComplaint(prev => ({
//           ...prev,
//           suggestion_reply: replyText,
//           replied_at: new Date().toISOString()
//         }));
//       }

//       // Reset reply state
//       setReplyText("");
//       setReplyingToComplaintId(null);
//       setShowReplyBox(false);
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//       showNotification("Failed to submit reply", "danger");
//     }
//   };

//   // ✅ NEW: Open reply box
//   const openReplyBox = (complaintId, currentReply = "") => {
//     setReplyingToComplaintId(complaintId);
//     setReplyText(currentReply || "");
//     setShowReplyBox(true);
//   };

//   const renderDepartments = (complaint) => {
//     if (!complaint) return "No department";
    
//     if (Array.isArray(complaint.departments) && complaint.departments.length > 0) {
//       if (typeof complaint.departments[0] === 'object') {
//         return complaint.departments
//           .map(dept => dept.name || "Unnamed Department")
//           .join(", ");
//       } else {
//         return complaint.departments.join(", ");
//       }
//     }
    
//     if (complaint.department_name) return complaint.department_name;
//     if (complaint.department) {
//       if (typeof complaint.department === 'object') {
//         return complaint.department.name || "No department";
//       }
//       return complaint.department;
//     }
    
//     return "No department";
//   };

//   const filteredComplaints = complaints.filter(complaint => {
//     if (!complaint) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     let matchesDepartment = false;
    
//     if (Array.isArray(complaint.departments)) {
//       if (complaint.departments.length > 0) {
//         if (typeof complaint.departments[0] === 'object') {
//           matchesDepartment = complaint.departments.some(dept => 
//             dept.name && dept.name.toLowerCase().includes(searchLower)
//           );
//         } else {
//           matchesDepartment = complaint.departments.some(dept => 
//             dept.toLowerCase().includes(searchLower)
//           );
//         }
//       }
//     } else if (complaint.department_name && complaint.department_name.toLowerCase().includes(searchLower)) {
//       matchesDepartment = true;
//     } else if (complaint.department && typeof complaint.department === 'string' && 
//                complaint.department.toLowerCase().includes(searchLower)) {
//       matchesDepartment = true;
//     }
    
//     const matchesSearch = 
//       matchesDepartment ||
//       (complaint.category && complaint.category.toLowerCase().includes(searchLower)) ||
//       (complaint.location && complaint.location.toLowerCase().includes(searchLower)) ||
//       (complaint.description && complaint.description.toLowerCase().includes(searchLower)) ||
//       (complaint.title && complaint.title.toLowerCase().includes(searchLower)) ||
//       (complaint.suggestion && complaint.suggestion.toLowerCase().includes(searchLower)) ||
//       (complaint.suggestion_reply && complaint.suggestion_reply.toLowerCase().includes(searchLower));

//     const matchesPriority = 
//       filterPriority === "all" || 
//       !complaint.priority || 
//       complaint.priority.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || 
//       !complaint.status || 
//       complaint.status === filterStatus;

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.post("/accounts/officer/assigned-complaints/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === complaintId ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     if (!status) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(status) {
//       case "Assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "In Progress":
//       case "in_progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "Resolved":
//       case "resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "Pending":
//       case "pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by department, category, location..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//               <button 
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilterPriority("all");
//                   setFilterStatus("all");
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={complaint.id} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {complaint.category || "Uncategorized"}
//                       </h5>
//                       <small className="text-muted">ID: {complaint.id}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(complaint.id)}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         {complaint.suggestion && (
//                           <li>
//                             <button 
//                               className="dropdown-item text-primary"
//                               onClick={() => openReplyBox(complaint.id, complaint.suggestion_reply)}
//                             >
//                               <i className="bi bi-reply me-2"></i>
//                               Reply to Suggestion
//                             </button>
//                           </li>
//                         )}
//                         <li>
//                           <button className="dropdown-item">
//                             <i className="bi bi-download me-2"></i>
//                             Export Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status)}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <span className="text-truncate">{complaint.location || "Location not specified"}</span>
//                       </div>
                      
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span>{renderDepartments(complaint)}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
                      
//                       {/* ✅ Suggestion Display */}
//                       {complaint.suggestion && (
//                         <div className="mt-3">
//                           <div className="alert alert-info p-2 small mb-2">
//                             <div className="d-flex align-items-center">
//                               <i className="bi bi-lightbulb me-2"></i>
//                               <strong className="me-2">Citizen Suggestion:</strong>
//                             </div>
//                             <p className="mb-0 mt-1">{complaint.suggestion}</p>
//                           </div>
                          
//                           {/* ✅ Officer Reply Display */}
//                           {complaint.suggestion_reply ? (
//                             <div className="alert alert-success p-2 small">
//                               <div className="d-flex justify-content-between align-items-center mb-1">
//                                 <strong>
//                                   <i className="bi bi-check-circle me-1"></i>
//                                   Your Reply:
//                                 </strong>
//                                 <button 
//                                   className="btn btn-sm btn-outline-primary"
//                                   onClick={() => openReplyBox(complaint.id, complaint.suggestion_reply)}
//                                 >
//                                   <i className="bi bi-pencil"></i> Edit
//                                 </button>
//                               </div>
//                               <p className="mb-0">{complaint.suggestion_reply}</p>
//                               {complaint.replied_at && (
//                                 <small className="text-muted d-block mt-1">
//                                   <i className="bi bi-clock me-1"></i>
//                                   {new Date(complaint.replied_at).toLocaleString()}
//                                 </small>
//                               )}
//                             </div>
//                           ) : (
//                             <button 
//                               className="btn btn-sm btn-outline-primary w-100"
//                               onClick={() => openReplyBox(complaint.id)}
//                             >
//                               <i className="bi bi-reply me-1"></i>
//                               Reply to Suggestion
//                             </button>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment ? (complaint.attachment.startsWith('http') ? complaint.attachment : `http://localhost:8000${complaint.attachment}`) : "#"}
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[complaint.id] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [complaint.id]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {staffList.map((staff) => (
//                             <option key={staff.id} value={staff.id}>
//                               {staff.full_name || staff.username || `Staff ${staff.id}`}
//                               {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(complaint.id)}
//                           disabled={!selectedStaff[complaint.id]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredComplaints.length > 0 && (
//           <div className="d-flex justify-content-center mt-4 animate__animated animate__fadeIn">
//             <nav>
//               <ul className="pagination">
//                 <li className="page-item disabled">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                 </li>
//                 <li className="page-item active">
//                   <button className="page-link">1</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">2</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">3</button>
//                 </li>
//                 <li className="page-item">
//                   <button className="page-link">
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* ✅ Reply Modal */}
//       {showReplyBox && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-info text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-reply me-2"></i>
//                   Reply to Citizen Suggestion
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowReplyBox(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Your Reply</label>
//                   <textarea
//                     className="form-control"
//                     rows="4"
//                     placeholder="Type your reply to the citizen's suggestion..."
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                     maxLength="500"
//                   />
//                   <div className="text-end text-muted small mt-1">
//                     {replyText.length}/500 characters
//                   </div>
//                 </div>
//                 <div className="alert alert-warning">
//                   <i className="bi bi-info-circle me-2"></i>
//                   Your reply will be visible to the citizen and cannot be deleted.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowReplyBox(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => submitReply(replyingToComplaintId)}
//                   disabled={!replyText.trim()}
//                 >
//                   <i className="bi bi-send-check me-2"></i>
//                   Submit Reply
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {staffList.map((staff) => (
//                       <option key={staff.id} value={staff.id}>
//                         {staff.full_name || staff.username || `Staff ${staff.id}`}
//                         {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{activeComplaint.category || "Uncategorized"}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         {activeComplaint.location || "Location not specified"}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status)}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Departments</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {renderDepartments(activeComplaint)}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* ✅ Enhanced: Suggestion with Reply Box in Modal */}
//                 {activeComplaint.suggestion && (
//                   <div className="mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <label className="form-label text-muted fw-bold">Citizen Suggestion</label>
//                       <button 
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => {
//                           setActiveComplaint(null);
//                           openReplyBox(activeComplaint.id, activeComplaint.suggestion_reply);
//                         }}
//                       >
//                         <i className="bi bi-reply me-1"></i>
//                         {activeComplaint.suggestion_reply ? "Edit Reply" : "Reply"}
//                       </button>
//                     </div>
                    
//                     <div className="card border-info mb-3">
//                       <div className="card-header bg-info bg-opacity-10 d-flex align-items-center">
//                         <i className="bi bi-lightbulb text-info me-2"></i>
//                         <strong>Citizen's Input</strong>
//                       </div>
//                       <div className="card-body">
//                         <p className="mb-0">{activeComplaint.suggestion}</p>
//                       </div>
//                     </div>
                    
//                     {/* ✅ Officer's Reply in Modal */}
//                     {activeComplaint.suggestion_reply ? (
//                       <div className="card border-success">
//                         <div className="card-header bg-success bg-opacity-10 d-flex align-items-center">
//                           <i className="bi bi-check-circle text-success me-2"></i>
//                           <strong>Your Reply</strong>
//                           <span className="ms-auto text-muted small">
//                             {activeComplaint.replied_at && (
//                               <>Replied: {new Date(activeComplaint.replied_at).toLocaleString()}</>
//                             )}
//                           </span>
//                         </div>
//                         <div className="card-body">
//                           <p className="mb-0">{activeComplaint.suggestion_reply}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="alert alert-warning">
//                         <i className="bi bi-exclamation-triangle me-2"></i>
//                         No reply has been provided yet. Consider replying to the citizen's suggestion.
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment ? (activeComplaint.attachment.startsWith('http') ? activeComplaint.attachment : `http://localhost:8000${activeComplaint.attachment}`) : "#"}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(activeComplaint.id);
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//                 {activeComplaint.suggestion && !activeComplaint.suggestion_reply && (
//                   <button 
//                     type="button" 
//                     className="btn btn-info"
//                     onClick={() => {
//                       setActiveComplaint(null);
//                       openReplyBox(activeComplaint.id);
//                     }}
//                   >
//                     <i className="bi bi-reply me-2"></i>
//                     Reply to Suggestion
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 9999;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
        
//         .reply-box {
//           border-left: 4px solid #198754;
//           background-color: rgba(25, 135, 84, 0.05);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;

// import React, { useEffect, useState } from "react";
// import axios from "./api/privateAxios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import MapModal from "./MapModal"; // Import the MapModal component

// // Import Leaflet images
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import L from 'leaflet';

// // Fix Leaflet icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const OfficerComplaintView = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     assigned: 0,
//     resolved: 0
//   });
//   const [activeComplaint, setActiveComplaint] = useState(null);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [assigningComplaintId, setAssigningComplaintId] = useState(null);
//   const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
//   // Reply states
//   const [replyText, setReplyText] = useState("");
//   const [replyingToComplaintId, setReplyingToComplaintId] = useState(null);
//   const [showReplyBox, setShowReplyBox] = useState(false);
  
//   // Map modal states
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [mapComplaint, setMapComplaint] = useState(null);
//   const [locationCoordinates, setLocationCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });

//   useEffect(() => {
//     fetchComplaints();
//     fetchStaff();
//   }, []);

//   useEffect(() => {
//     if (complaints.length > 0) {
//       const total = complaints.length;
//       const pending = complaints.filter(c => c.status === "Pending" || c.status === "pending").length;
//       const assigned = complaints.filter(c => c.status === "Assigned" || c.status === "assigned").length;
//       const resolved = complaints.filter(c => c.status === "Resolved" || c.status === "resolved").length;
//       setStats({ total, pending, assigned, resolved });
//     }
//   }, [complaints]);

//   const fetchComplaints = async () => {
//     try {
//       console.log("Fetching complaints...");
//       const res = await axios.get("/accounts/officer/complaints/");
//       console.log("Complaints API Response:", res.data);
      
//       if (res.data) {
//         // Check different possible response structures
//         if (Array.isArray(res.data)) {
//           setComplaints(res.data);
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//           setComplaints(res.data.data);
//         } else if (res.data.complaints && Array.isArray(res.data.complaints)) {
//           setComplaints(res.data.complaints);
//         } else if (res.data.results && Array.isArray(res.data.results)) {
//           setComplaints(res.data.results);
//         } else {
//           // Try to find any array in the response
//           const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
//           if (arrayKey) {
//             setComplaints(res.data[arrayKey]);
//           } else {
//             console.warn("No array found in response, setting empty array");
//             setComplaints([]);
//           }
//         }
//       } else {
//         setComplaints([]);
//       }
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       showNotification("Error loading complaints", "danger");
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("/accounts/officer/staff-list/");
      
//       if (res.data) {
//         if (Array.isArray(res.data)) {
//           setStaffList(res.data);
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//           setStaffList(res.data.data);
//         } else if (res.data.staff && Array.isArray(res.data.staff)) {
//           setStaffList(res.data.staff);
//         } else if (res.data.results && Array.isArray(res.data.results)) {
//           setStaffList(res.data.results);
//         } else {
//           const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
//           if (arrayKey) {
//             setStaffList(res.data[arrayKey]);
//           } else {
//             setStaffList([]);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       showNotification("Error loading staff list", "danger");
//       setStaffList([]);
//     }
//   };

//   // ✅ Open Map Modal with Complaint Location
//   const openMapModal = (complaint) => {
//     if (!complaint || !complaint.location || complaint.location === "Location not specified") {
//       showNotification("No location specified", "warning");
//       return;
//     }

//     setMapComplaint(complaint);
    
//     // Check if complaint has coordinates
//     if (complaint.latitude && complaint.longitude) {
//       setLocationCoordinates({
//         lat: parseFloat(complaint.latitude),
//         lng: parseFloat(complaint.longitude)
//       });
//     } else {
//       // Use geocoding fallback for demo
//       const locations = {
//         "New York": { lat: 40.7128, lng: -74.0060 },
//         "London": { lat: 51.5074, lng: -0.1278 },
//         "Tokyo": { lat: 35.6762, lng: 139.6503 },
//         "Paris": { lat: 48.8566, lng: 2.3522 },
//         "Mumbai": { lat: 19.0760, lng: 72.8777 },
//         "Delhi": { lat: 28.7041, lng: 77.1025 },
//         "Bangalore": { lat: 12.9716, lng: 77.5946 },
//         "Chennai": { lat: 13.0827, lng: 80.2707 },
//         "Kolkata": { lat: 22.5726, lng: 88.3639 },
//         "Hyderabad": { lat: 17.3850, lng: 78.4867 }
//       };
      
//       let found = false;
//       for (const [key, coords] of Object.entries(locations)) {
//         if (complaint.location.toLowerCase().includes(key.toLowerCase())) {
//           setLocationCoordinates(coords);
//           found = true;
//           break;
//         }
//       }
      
//       // If no match, use random coordinates near the default
//       if (!found) {
//         setLocationCoordinates({
//           lat: 40.7128 + (Math.random() - 0.5) * 0.1,
//           lng: -74.0060 + (Math.random() - 0.5) * 0.1
//         });
//       }
//     }
    
//     setShowMapModal(true);
//   };

//   // ✅ Submit reply to suggestion
//   const submitReply = async (complaintId) => {
//     if (!replyText.trim()) {
//       showNotification("Please enter a reply", "warning");
//       return;
//     }

//     try {
//       await axios.post(`/accounts/officer/complaints/${complaintId}/reply-suggestion/`, {
//         suggestion_reply: replyText,
//       });

//       showNotification("Reply submitted successfully!", "success");

//       // Update complaint with new reply
//       setComplaints(prev => 
//         prev.map(c => 
//           c.id === complaintId || c._id === complaintId
//             ? { ...c, suggestion_reply: replyText, replied_at: new Date().toISOString() }
//             : c
//         )
//       );

//       // Update active complaint if open
//       if (activeComplaint && (activeComplaint.id === complaintId || activeComplaint._id === complaintId)) {
//         setActiveComplaint(prev => ({
//           ...prev,
//           suggestion_reply: replyText,
//           replied_at: new Date().toISOString()
//         }));
//       }

//       // Reset reply state
//       setReplyText("");
//       setReplyingToComplaintId(null);
//       setShowReplyBox(false);
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//       showNotification("Failed to submit reply", "danger");
//     }
//   };

//   // ✅ Open reply box
//   const openReplyBox = (complaintId, currentReply = "") => {
//     setReplyingToComplaintId(complaintId);
//     setReplyText(currentReply || "");
//     setShowReplyBox(true);
//   };

//   const renderDepartments = (complaint) => {
//     if (!complaint) return "No department";
    
//     if (Array.isArray(complaint.departments) && complaint.departments.length > 0) {
//       if (typeof complaint.departments[0] === 'object') {
//         return complaint.departments
//           .map(dept => dept.name || "Unnamed Department")
//           .join(", ");
//       } else {
//         return complaint.departments.join(", ");
//       }
//     }
    
//     if (complaint.department_name) return complaint.department_name;
//     if (complaint.department) {
//       if (typeof complaint.department === 'object') {
//         return complaint.department.name || "No department";
//       }
//       return complaint.department;
//     }
    
//     return "No department";
//   };

//   const filteredComplaints = complaints.filter(complaint => {
//     if (!complaint) return false;
    
//     const searchLower = searchQuery.toLowerCase();
    
//     // Check if location matches search
//     const matchesLocation = complaint.location && 
//       complaint.location.toLowerCase().includes(searchLower);
    
//     // Check if category matches search
//     const matchesCategory = complaint.category && 
//       complaint.category.toLowerCase().includes(searchLower);
    
//     // Check if description matches search
//     const matchesDescription = complaint.description && 
//       complaint.description.toLowerCase().includes(searchLower);
    
//     // Check if department matches search
//     const matchesDepartment = renderDepartments(complaint).toLowerCase().includes(searchLower);
    
//     const matchesSearch = matchesLocation || matchesCategory || 
//                          matchesDescription || matchesDepartment;

//     const matchesPriority = 
//       filterPriority === "all" || 
//       !complaint.priority || 
//       complaint.priority.toLowerCase() === filterPriority.toLowerCase();

//     const matchesStatus = 
//       filterStatus === "all" || 
//       !complaint.status || 
//       complaint.status.toLowerCase() === filterStatus.toLowerCase();

//     return matchesSearch && matchesPriority && matchesStatus;
//   });

//   const assignComplaint = async (complaintId) => {
//     const staffId = selectedStaff[complaintId];
//     if (!staffId) {
//       showNotification("Please select a staff member", "warning");
//       return;
//     }

//     try {
//       await axios.post("/accounts/officer/assigned-complaints/", {
//         complaint_id: complaintId,
//         staff_id: staffId,
//       });

//       showNotification("Complaint assigned successfully!", "success");

//       setComplaints((prev) =>
//         prev.map((c) =>
//           (c.id === complaintId || c._id === complaintId) ? { ...c, status: "Assigned" } : c
//         )
//       );
      
//       setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
//       setShowAssignModal(false);
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       showNotification("Failed to assign complaint", "danger");
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   const getPriorityBadge = (priority) => {
//     if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
//     switch(priority.toLowerCase()) {
//       case "high":
//         return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
//       case "low":
//         return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
//       default:
//         return <span className="badge bg-secondary">{priority}</span>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     if (!status) return <span className="badge bg-secondary">N/A</span>;
    
//     const statusLower = status.toLowerCase();
//     switch(statusLower) {
//       case "assigned":
//         return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
//       case "in progress":
//       case "in_progress":
//         return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
//       case "resolved":
//         return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
//       case "pending":
//       default:
//         return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
//     }
//   };

//   const openAssignModal = (complaintId) => {
//     setAssigningComplaintId(complaintId);
//     setShowAssignModal(true);
//   };

//   const getComplaintId = (complaint) => {
//     return complaint.id || complaint._id || 'N/A';
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="mt-3 text-muted">Loading Complaints...</h4>
//           <p className="text-muted">Please wait while we fetch the data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Notification Toast */}
//       {notification.show && (
//         <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
//           <div className={`toast-header bg-${notification.type} text-white`}>
//             <strong className="me-auto">
//               {notification.type === 'success' ? '✓ Success' : 
//                notification.type === 'warning' ? '⚠ Warning' : 
//                '✗ Error'}
//             </strong>
//             <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
//           </div>
//           <div className="toast-body">
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="bg-primary text-white py-4 shadow">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
//                 <i className="bi bi-clipboard-data me-3"></i>
//                 Department Complaints
//               </h1>
//               <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
//                 Manage and assign complaints to your department staff
//               </p>
//             </div>
//             <div className="col-md-4 text-end animate__animated animate__fadeInRight">
//               <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
//                 <i className="bi bi-building me-2"></i>
//                 <span className="fw-semibold">Officer Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3 animate__animated animate__fadeInUp">
//           <div className="col-md-3">
//             <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Total Complaints</h6>
//                     <h2 className="mb-0 fw-bold">{stats.total}</h2>
//                   </div>
//                   <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-inbox text-primary fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-arrow-up me-1"></i>
//                     {Math.round((stats.total / (stats.total || 1)) * 100)}%
//                   </span>
//                   <small className="text-muted ms-2">This month</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending</h6>
//                     <h2 className="mb-0 fw-bold">{stats.pending}</h2>
//                   </div>
//                   <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-clock text-warning fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-warning">
//                     <i className="bi bi-clock-history me-1"></i>
//                     Needs attention
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Assigned</h6>
//                     <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
//                   </div>
//                   <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-person-check text-info fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-info">
//                     <i className="bi bi-arrow-right me-1"></i>
//                     In progress
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Resolved</h6>
//                     <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
//                   </div>
//                   <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
//                     <i className="bi bi-check-circle text-success fs-3"></i>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <span className="text-success">
//                     <i className="bi bi-graph-up me-1"></i>
//                     {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="container mt-4">
//         <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
//           <div className="card-body">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-4">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text bg-light border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0"
//                     placeholder="Search by location, category, department..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                 >
//                   <option value="all">All Priorities</option>
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <select 
//                   className="form-select form-select-lg"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button 
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => {
//                     setSearchQuery("");
//                     setFilterPriority("all");
//                     setFilterStatus("all");
//                   }}
//                 >
//                   <i className="bi bi-arrow-clockwise me-2"></i>
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Complaints List */}
//       <div className="container mt-4 mb-5">
//         {complaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-inbox display-1 text-muted"></i>
//               <h3 className="mt-3">No Complaints Found</h3>
//               <p className="text-muted">There are no complaints assigned to your department yet.</p>
//               <button className="btn btn-outline-primary mt-3" onClick={fetchComplaints}>
//                 <i className="bi bi-arrow-clockwise me-2"></i>
//                 Refresh
//               </button>
//             </div>
//           </div>
//         ) : filteredComplaints.length === 0 ? (
//           <div className="text-center py-5 animate__animated animate__fadeIn">
//             <div className="empty-state">
//               <i className="bi bi-search display-1 text-muted"></i>
//               <h3 className="mt-3">No Matching Complaints</h3>
//               <p className="text-muted">Try adjusting your filters or search terms.</p>
//               <button 
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilterPriority("all");
//                   setFilterStatus("all");
//                 }}
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {filteredComplaints.map((complaint, index) => (
//               <div 
//                 key={getComplaintId(complaint)} 
//                 className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="card complaint-card h-100 shadow-sm border-hover">
//                   <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                     <div>
//                       <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
//                         {complaint.category || complaint.title || "Uncategorized"}
//                       </h5>
//                       <small className="text-muted">ID: {getComplaintId(complaint)}</small>
//                     </div>
//                     <div className="dropdown">
//                       <button 
//                         className="btn btn-sm btn-outline-secondary rounded-circle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         <i className="bi bi-three-dots-vertical"></i>
//                       </button>
//                       <ul className="dropdown-menu dropdown-menu-end">
//                         <li>
//                           <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
//                             <i className="bi bi-eye me-2"></i>
//                             View Details
//                           </button>
//                         </li>
//                         <li>
//                           <button className="dropdown-item" onClick={() => openAssignModal(getComplaintId(complaint))}>
//                             <i className="bi bi-person-plus me-2"></i>
//                             Assign Staff
//                           </button>
//                         </li>
//                         <li>
//                           <button 
//                             className="dropdown-item text-info"
//                             onClick={() => openMapModal(complaint)}
//                           >
//                             <i className="bi bi-map me-2"></i>
//                             View on Map
//                           </button>
//                         </li>
//                         {complaint.suggestion && (
//                           <li>
//                             <button 
//                               className="dropdown-item text-primary"
//                               onClick={() => openReplyBox(getComplaintId(complaint), complaint.suggestion_reply)}
//                             >
//                               <i className="bi bi-reply me-2"></i>
//                               Reply to Suggestion
//                             </button>
//                           </li>
//                         )}
//                       </ul>
//                     </div>
//                   </div>
                  
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       {getPriorityBadge(complaint.priority)}
//                       {getStatusBadge(complaint.status)}
//                     </div>

//                     <div className="complaint-info mb-3">
//                       {/* Clickable Location Link */}
//                       <div className="d-flex align-items-center mb-2">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <button 
//                           className="btn btn-link p-0 text-decoration-none text-start text-truncate location-link"
//                           onClick={() => openMapModal(complaint)}
//                           title="Click to view on map"
//                           style={{ maxWidth: '250px' }}
//                         >
//                           <span className="text-primary fw-medium">
//                             <i className="bi bi-geo-fill me-1"></i>
//                             {complaint.location || "Location not specified"}
//                             <i className="bi bi-box-arrow-up-right ms-1 small"></i>
//                           </span>
//                         </button>
//                       </div>
                      
//                       <div className="d-flex align-items-center mb-3">
//                         <i className="bi bi-building text-info me-2"></i>
//                         <span className="text-truncate">{renderDepartments(complaint)}</span>
//                       </div>

//                       <p className="complaint-description">
//                         <i className="bi bi-chat-left-text text-muted me-2"></i>
//                         {complaint.description || "No description provided"}
//                       </p>
                      
//                       {/* Suggestion Display */}
//                       {complaint.suggestion && (
//                         <div className="mt-3">
//                           <div className="alert alert-info p-2 small mb-2">
//                             <div className="d-flex align-items-center">
//                               <i className="bi bi-lightbulb me-2"></i>
//                               <strong className="me-2">Citizen Suggestion:</strong>
//                             </div>
//                             <p className="mb-0 mt-1">{complaint.suggestion}</p>
//                           </div>
                          
//                           {/* Officer Reply Display */}
//                           {complaint.suggestion_reply ? (
//                             <div className="alert alert-success p-2 small">
//                               <div className="d-flex justify-content-between align-items-center mb-1">
//                                 <strong>
//                                   <i className="bi bi-check-circle me-1"></i>
//                                   Your Reply:
//                                 </strong>
//                                 <button 
//                                   className="btn btn-sm btn-outline-primary"
//                                   onClick={() => openReplyBox(getComplaintId(complaint), complaint.suggestion_reply)}
//                                 >
//                                   <i className="bi bi-pencil"></i> Edit
//                                 </button>
//                               </div>
//                               <p className="mb-0">{complaint.suggestion_reply}</p>
//                               {complaint.replied_at && (
//                                 <small className="text-muted d-block mt-1">
//                                   <i className="bi bi-clock me-1"></i>
//                                   {new Date(complaint.replied_at).toLocaleString()}
//                                 </small>
//                               )}
//                             </div>
//                           ) : (
//                             <button 
//                               className="btn btn-sm btn-outline-primary w-100"
//                               onClick={() => openReplyBox(getComplaintId(complaint))}
//                             >
//                               <i className="bi bi-reply me-1"></i>
//                               Reply to Suggestion
//                             </button>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {complaint.attachment && (
//                       <div className="mb-3">
//                         <a 
//                           href={complaint.attachment}
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="btn btn-outline-primary btn-sm w-100"
//                         >
//                           <i className="bi bi-paperclip me-2"></i>
//                           View Attachment
//                         </a>
//                       </div>
//                     )}

//                     <div className="text-muted small mb-3">
//                       <i className="bi bi-calendar3 me-1"></i>
//                       {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : "Date not available"}
//                     </div>

//                     <div className="assign-section">
//                       <label className="form-label fw-semibold mb-2">
//                         <i className="bi bi-person-workspace me-2"></i>
//                         Assign to Staff
//                       </label>
//                       <div className="d-flex gap-2">
//                         <select
//                           className="form-select form-select-sm"
//                           value={selectedStaff[getComplaintId(complaint)] || ""}
//                           onChange={(e) =>
//                             setSelectedStaff({ ...selectedStaff, [getComplaintId(complaint)]: e.target.value })
//                           }
//                         >
//                           <option value="">Select Staff Member</option>
//                           {staffList.map((staff) => (
//                             <option key={staff.id || staff._id} value={staff.id || staff._id}>
//                               {staff.full_name || staff.username || staff.name || `Staff ${staff.id}`}
//                               {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => assignComplaint(getComplaintId(complaint))}
//                           disabled={!selectedStaff[getComplaintId(complaint)]}
//                         >
//                           <i className="bi bi-send-check"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ✅ Map Modal Component */}
//       <MapModal 
//         show={showMapModal}
//         onClose={() => setShowMapModal(false)}
//         complaint={mapComplaint}
//         location={mapComplaint?.location || "Unknown Location"}
//         coordinates={locationCoordinates}
//       />

//       {/* ✅ Reply Modal */}
//       {showReplyBox && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-info text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-reply me-2"></i>
//                   Reply to Citizen Suggestion
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowReplyBox(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Your Reply</label>
//                   <textarea
//                     className="form-control"
//                     rows="4"
//                     placeholder="Type your reply to the citizen's suggestion..."
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                     maxLength="500"
//                   />
//                   <div className="text-end text-muted small mt-1">
//                     {replyText.length}/500 characters
//                   </div>
//                 </div>
//                 <div className="alert alert-warning">
//                   <i className="bi bi-info-circle me-2"></i>
//                   Your reply will be visible to the citizen and cannot be deleted.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowReplyBox(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => submitReply(replyingToComplaintId)}
//                   disabled={!replyText.trim()}
//                 >
//                   <i className="bi bi-send-check me-2"></i>
//                   Submit Reply
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Assign Modal */}
//       {showAssignModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
//           <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign Complaint
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Select Staff Member</label>
//                   <select
//                     className="form-select form-select-lg"
//                     value={selectedStaff[assigningComplaintId] || ""}
//                     onChange={(e) =>
//                       setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
//                     }
//                   >
//                     <option value="">Choose a staff member...</option>
//                     {staffList.map((staff) => (
//                       <option key={staff.id || staff._id} value={staff.id || staff._id}>
//                         {staff.full_name || staff.username || staff.name || `Staff ${staff.id}`}
//                         {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="alert alert-info">
//                   <i className="bi bi-info-circle me-2"></i>
//                   The selected staff member will receive a notification about this assignment.
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={() => assignComplaint(assigningComplaintId)}
//                   disabled={!selectedStaff[assigningComplaintId]}
//                 >
//                   <i className="bi bi-check-circle me-2"></i>
//                   Confirm Assignment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Complaint Detail Modal */}
//       {activeComplaint && (
//         <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
//           <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
//             <div className="modal-content">
//               <div className="modal-header bg-gradient-primary text-white">
//                 <h5 className="modal-title">
//                   <i className="bi bi-clipboard-check me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Category</label>
//                       <div className="fs-5 fw-semibold">{activeComplaint.category || activeComplaint.title || "Uncategorized"}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Location</label>
//                       <div className="fs-5">
//                         <i className="bi bi-geo-alt text-primary me-2"></i>
//                         <button 
//                           className="btn btn-link p-0 text-decoration-none text-start location-link"
//                           onClick={() => openMapModal(activeComplaint)}
//                         >
//                           <span className="text-primary fw-medium">
//                             {activeComplaint.location || "Location not specified"}
//                             <i className="bi bi-box-arrow-up-right ms-1 small"></i>
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Priority</label>
//                       <div>{getPriorityBadge(activeComplaint.priority)}</div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Status</label>
//                       <div>{getStatusBadge(activeComplaint.status)}</div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Departments</label>
//                       <div className="fs-5">
//                         <i className="bi bi-building text-info me-2"></i>
//                         {renderDepartments(activeComplaint)}
//                       </div>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label text-muted">Date Submitted</label>
//                       <div className="fs-5">
//                         <i className="bi bi-calendar3 text-success me-2"></i>
//                         {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <label className="form-label text-muted">Description</label>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Enhanced: Suggestion with Reply Box in Modal */}
//                 {activeComplaint.suggestion && (
//                   <div className="mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <label className="form-label text-muted fw-bold">Citizen Suggestion</label>
//                       <button 
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => {
//                           setActiveComplaint(null);
//                           openReplyBox(getComplaintId(activeComplaint), activeComplaint.suggestion_reply);
//                         }}
//                       >
//                         <i className="bi bi-reply me-1"></i>
//                         {activeComplaint.suggestion_reply ? "Edit Reply" : "Reply"}
//                       </button>
//                     </div>
                    
//                     <div className="card border-info mb-3">
//                       <div className="card-header bg-info bg-opacity-10 d-flex align-items-center">
//                         <i className="bi bi-lightbulb text-info me-2"></i>
//                         <strong>Citizen's Input</strong>
//                       </div>
//                       <div className="card-body">
//                         <p className="mb-0">{activeComplaint.suggestion}</p>
//                       </div>
//                     </div>
                    
//                     {/* Officer's Reply in Modal */}
//                     {activeComplaint.suggestion_reply ? (
//                       <div className="card border-success">
//                         <div className="card-header bg-success bg-opacity-10 d-flex align-items-center">
//                           <i className="bi bi-check-circle text-success me-2"></i>
//                           <strong>Your Reply</strong>
//                           <span className="ms-auto text-muted small">
//                             {activeComplaint.replied_at && (
//                               <>Replied: {new Date(activeComplaint.replied_at).toLocaleString()}</>
//                             )}
//                           </span>
//                         </div>
//                         <div className="card-body">
//                           <p className="mb-0">{activeComplaint.suggestion_reply}</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="alert alert-warning">
//                         <i className="bi bi-exclamation-triangle me-2"></i>
//                         No reply has been provided yet. Consider replying to the citizen's suggestion.
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 {activeComplaint.attachment && (
//                   <div className="mb-3">
//                     <label className="form-label text-muted">Attachment</label>
//                     <a 
//                       href={activeComplaint.attachment}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="btn btn-outline-primary"
//                     >
//                       <i className="bi bi-paperclip me-2"></i>
//                       View Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
//                   Close
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-outline-primary"
//                   onClick={() => openMapModal(activeComplaint)}
//                 >
//                   <i className="bi bi-map me-2"></i>
//                   View on Map
//                 </button>
//                 <button type="button" className="btn btn-primary" onClick={() => {
//                   setActiveComplaint(null);
//                   openAssignModal(getComplaintId(activeComplaint));
//                 }}>
//                   <i className="bi bi-person-plus me-2"></i>
//                   Assign to Staff
//                 </button>
//                 {activeComplaint.suggestion && !activeComplaint.suggestion_reply && (
//                   <button 
//                     type="button" 
//                     className="btn btn-info"
//                     onClick={() => {
//                       setActiveComplaint(null);
//                       openReplyBox(getComplaintId(activeComplaint));
//                     }}
//                   >
//                     <i className="bi bi-reply me-2"></i>
//                     Reply to Suggestion
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         .bg-white-20 {
//           background: rgba(255, 255, 255, 0.2);
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .complaint-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .complaint-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//           border-color: #0d6efd;
//         }
        
//         .border-hover:hover {
//           border-color: #0d6efd !important;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .complaint-description {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           line-height: 1.5;
//         }
        
//         .empty-state {
//           padding: 3rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
//         }
        
//         .modal-content {
//           border-radius: 15px;
//           overflow: hidden;
//         }
        
//         .modal-header {
//           border-radius: 15px 15px 0 0;
//         }
        
//         .toast {
//           z-index: 10000;
//         }
        
//         .location-link:hover {
//           text-decoration: underline !important;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
        
//         /* Map modal z-index */
//         .map-modal {
//           z-index: 9999;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerComplaintView;

// correct code above

import React, { useEffect, useState } from "react";
import axios from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import MapModal from "./MapModal"; // Import the MapModal component

// Import Leaflet images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const OfficerComplaintView = () => {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    resolved: 0
  });
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningComplaintId, setAssigningComplaintId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
  // Reply states
  const [replyText, setReplyText] = useState("");
  const [replyingToComplaintId, setReplyingToComplaintId] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  
  // Map modal states
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapComplaint, setMapComplaint] = useState(null);
  const [locationCoordinates, setLocationCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });

  useEffect(() => {
    fetchComplaints();
    fetchStaff();
  }, []);

  useEffect(() => {
    if (complaints.length > 0) {
      const total = complaints.length;
      const pending = complaints.filter(c => c.status === "Pending" || c.status === "pending").length;
      const assigned = complaints.filter(c => c.status === "Assigned" || c.status === "assigned").length;
      const resolved = complaints.filter(c => c.status === "Resolved" || c.status === "resolved").length;
      setStats({ total, pending, assigned, resolved });
    }
  }, [complaints]);

  const fetchComplaints = async () => {
    try {
      console.log("Fetching complaints...");
      const res = await axios.get("/accounts/officer/complaints/");
      console.log("Complaints API Response:", res.data);
      
      if (res.data) {
        // Check different possible response structures
        if (Array.isArray(res.data)) {
          setComplaints(res.data);
        } else if (res.data.data && Array.isArray(res.data.data)) {
          setComplaints(res.data.data);
        } else if (res.data.complaints && Array.isArray(res.data.complaints)) {
          setComplaints(res.data.complaints);
        } else if (res.data.results && Array.isArray(res.data.results)) {
          setComplaints(res.data.results);
        } else {
          // Try to find any array in the response
          const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
          if (arrayKey) {
            setComplaints(res.data[arrayKey]);
          } else {
            console.warn("No array found in response, setting empty array");
            setComplaints([]);
          }
        }
      } else {
        setComplaints([]);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      showNotification("Error loading complaints", "danger");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("/accounts/officer/staff-list/");
      
      if (res.data) {
        if (Array.isArray(res.data)) {
          setStaffList(res.data);
        } else if (res.data.data && Array.isArray(res.data.data)) {
          setStaffList(res.data.data);
        } else if (res.data.staff && Array.isArray(res.data.staff)) {
          setStaffList(res.data.staff);
        } else if (res.data.results && Array.isArray(res.data.results)) {
          setStaffList(res.data.results);
        } else {
          const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
          if (arrayKey) {
            setStaffList(res.data[arrayKey]);
          } else {
            setStaffList([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      showNotification("Error loading staff list", "danger");
      setStaffList([]);
    }
  };

  // Helper function to get full attachment URL
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

  // ✅ Open Map Modal with Complaint Location
  const openMapModal = (complaint) => {
    if (!complaint || !complaint.location || complaint.location === "Location not specified") {
      showNotification("No location specified", "warning");
      return;
    }

    setMapComplaint(complaint);
    
    // Check if complaint has coordinates
    if (complaint.latitude && complaint.longitude) {
      setLocationCoordinates({
        lat: parseFloat(complaint.latitude),
        lng: parseFloat(complaint.longitude)
      });
    } else {
      // Use geocoding fallback for demo
      const locations = {
        "New York": { lat: 40.7128, lng: -74.0060 },
        "London": { lat: 51.5074, lng: -0.1278 },
        "Tokyo": { lat: 35.6762, lng: 139.6503 },
        "Paris": { lat: 48.8566, lng: 2.3522 },
        "Mumbai": { lat: 19.0760, lng: 72.8777 },
        "Delhi": { lat: 28.7041, lng: 77.1025 },
        "Bangalore": { lat: 12.9716, lng: 77.5946 },
        "Chennai": { lat: 13.0827, lng: 80.2707 },
        "Kolkata": { lat: 22.5726, lng: 88.3639 },
        "Hyderabad": { lat: 17.3850, lng: 78.4867 }
      };
      
      let found = false;
      for (const [key, coords] of Object.entries(locations)) {
        if (complaint.location.toLowerCase().includes(key.toLowerCase())) {
          setLocationCoordinates(coords);
          found = true;
          break;
        }
      }
      
      // If no match, use random coordinates near the default
      if (!found) {
        setLocationCoordinates({
          lat: 40.7128 + (Math.random() - 0.5) * 0.1,
          lng: -74.0060 + (Math.random() - 0.5) * 0.1
        });
      }
    }
    
    setShowMapModal(true);
  };

  // ✅ Submit reply to suggestion
  const submitReply = async (complaintId) => {
    if (!replyText.trim()) {
      showNotification("Please enter a reply", "warning");
      return;
    }

    try {
      await axios.post(`/accounts/officer/complaints/${complaintId}/reply-suggestion/`, {
        suggestion_reply: replyText,
      });

      showNotification("Reply submitted successfully!", "success");

      // Update complaint with new reply
      setComplaints(prev => 
        prev.map(c => 
          c.id === complaintId || c._id === complaintId
            ? { ...c, suggestion_reply: replyText, replied_at: new Date().toISOString() }
            : c
        )
      );

      // Update active complaint if open
      if (activeComplaint && (activeComplaint.id === complaintId || activeComplaint._id === complaintId)) {
        setActiveComplaint(prev => ({
          ...prev,
          suggestion_reply: replyText,
          replied_at: new Date().toISOString()
        }));
      }

      // Reset reply state
      setReplyText("");
      setReplyingToComplaintId(null);
      setShowReplyBox(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
      showNotification("Failed to submit reply", "danger");
    }
  };

  // ✅ Open reply box
  const openReplyBox = (complaintId, currentReply = "") => {
    setReplyingToComplaintId(complaintId);
    setReplyText(currentReply || "");
    setShowReplyBox(true);
  };

  const renderDepartments = (complaint) => {
    if (!complaint) return "No department";
    
    if (Array.isArray(complaint.departments) && complaint.departments.length > 0) {
      if (typeof complaint.departments[0] === 'object') {
        return complaint.departments
          .map(dept => dept.name || "Unnamed Department")
          .join(", ");
      } else {
        return complaint.departments.join(", ");
      }
    }
    
    if (complaint.department_name) return complaint.department_name;
    if (complaint.department) {
      if (typeof complaint.department === 'object') {
        return complaint.department.name || "No department";
      }
      return complaint.department;
    }
    
    return "No department";
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (!complaint) return false;
    
    const searchLower = searchQuery.toLowerCase();
    
    // Check if location matches search
    const matchesLocation = complaint.location && 
      complaint.location.toLowerCase().includes(searchLower);
    
    // Check if category matches search
    const matchesCategory = complaint.category && 
      complaint.category.toLowerCase().includes(searchLower);
    
    // Check if description matches search
    const matchesDescription = complaint.description && 
      complaint.description.toLowerCase().includes(searchLower);
    
    // Check if department matches search
    const matchesDepartment = renderDepartments(complaint).toLowerCase().includes(searchLower);
    
    const matchesSearch = matchesLocation || matchesCategory || 
                         matchesDescription || matchesDepartment;

    const matchesPriority = 
      filterPriority === "all" || 
      !complaint.priority || 
      complaint.priority.toLowerCase() === filterPriority.toLowerCase();

    const matchesStatus = 
      filterStatus === "all" || 
      !complaint.status || 
      complaint.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const assignComplaint = async (complaintId) => {
    const staffId = selectedStaff[complaintId];
    if (!staffId) {
      showNotification("Please select a staff member", "warning");
      return;
    }

    try {
      await axios.post("/accounts/officer/assigned-complaints/", {
        complaint_id: complaintId,
        staff_id: staffId,
      });

      showNotification("Complaint assigned successfully!", "success");

      setComplaints((prev) =>
        prev.map((c) =>
          (c.id === complaintId || c._id === complaintId) ? { ...c, status: "Assigned" } : c
        )
      );
      
      setSelectedStaff(prev => ({ ...prev, [complaintId]: "" }));
      setShowAssignModal(false);
    } catch (error) {
      console.error("Assignment failed:", error);
      showNotification("Failed to assign complaint", "danger");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const getPriorityBadge = (priority) => {
    if (!priority) return <span className="badge bg-secondary">N/A</span>;
    
    switch(priority.toLowerCase()) {
      case "high":
        return <span className="badge bg-danger animate__animated animate__pulse animate__infinite"><i className="bi bi-exclamation-triangle-fill me-1"></i>High</span>;
      case "medium":
        return <span className="badge bg-warning text-dark"><i className="bi bi-exclamation-circle me-1"></i>Medium</span>;
      case "low":
        return <span className="badge bg-success"><i className="bi bi-info-circle me-1"></i>Low</span>;
      default:
        return <span className="badge bg-secondary">{priority}</span>;
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return <span className="badge bg-secondary">N/A</span>;
    
    const statusLower = status.toLowerCase();
    switch(statusLower) {
      case "assigned":
        return <span className="badge bg-primary"><i className="bi bi-person-check me-1"></i>Assigned</span>;
      case "in progress":
      case "in_progress":
        return <span className="badge bg-info"><i className="bi bi-arrow-repeat me-1"></i>In Progress</span>;
      case "resolved":
        return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Resolved</span>;
      case "pending":
      default:
        return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i>Pending</span>;
    }
  };

  const openAssignModal = (complaintId) => {
    setAssigningComplaintId(complaintId);
    setShowAssignModal(true);
  };

  const getComplaintId = (complaint) => {
    return complaint.id || complaint._id || 'N/A';
  };

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3 text-muted">Loading Complaints...</h4>
          <p className="text-muted">Please wait while we fetch the data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`toast show position-fixed top-0 end-0 m-3 animate__animated animate__fadeInDown`} role="alert">
          <div className={`toast-header bg-${notification.type} text-white`}>
            <strong className="me-auto">
              {notification.type === 'success' ? '✓ Success' : 
               notification.type === 'warning' ? '⚠ Warning' : 
               '✗ Error'}
            </strong>
            <button type="button" className="btn-close btn-close-white" onClick={() => setNotification({ show: false, message: "", type: "" })}></button>
          </div>
          <div className="toast-body">
            {notification.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-primary text-white py-4 shadow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2 animate__animated animate__fadeInLeft">
                <i className="bi bi-clipboard-data me-3"></i>
                Department Complaints
              </h1>
              <p className="lead mb-0 animate__animated animate__fadeInLeft animate__delay-1s">
                Manage and assign complaints to your department staff
              </p>
            </div>
            <div className="col-md-4 text-end animate__animated animate__fadeInRight">
              <div className="bg-white-20 d-inline-block rounded-pill px-4 py-2">
                <i className="bi bi-building me-2"></i>
                <span className="fw-semibold">Officer Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mt-4">
        <div className="row g-3 animate__animated animate__fadeInUp">
          <div className="col-md-3">
            <div className="card border-start border-primary border-4 shadow-sm h-100 hover-lift">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Complaints</h6>
                    <h2 className="mb-0 fw-bold">{stats.total}</h2>
                  </div>
                  <div className="avatar bg-primary bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-inbox text-primary fs-3"></i>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-success">
                    <i className="bi bi-arrow-up me-1"></i>
                    {Math.round((stats.total / (stats.total || 1)) * 100)}%
                  </span>
                  <small className="text-muted ms-2">This month</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-start border-warning border-4 shadow-sm h-100 hover-lift">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Pending</h6>
                    <h2 className="mb-0 fw-bold">{stats.pending}</h2>
                  </div>
                  <div className="avatar bg-warning bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-clock text-warning fs-3"></i>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-warning">
                    <i className="bi bi-clock-history me-1"></i>
                    Needs attention
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-start border-info border-4 shadow-sm h-100 hover-lift">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Assigned</h6>
                    <h2 className="mb-0 fw-bold">{stats.assigned}</h2>
                  </div>
                  <div className="avatar bg-info bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-person-check text-info fs-3"></i>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-info">
                    <i className="bi bi-arrow-right me-1"></i>
                    In progress
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-start border-success border-4 shadow-sm h-100 hover-lift">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Resolved</h6>
                    <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
                  </div>
                  <div className="avatar bg-success bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-check-circle text-success fs-3"></i>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-success">
                    <i className="bi bi-graph-up me-1"></i>
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% rate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mt-4">
        <div className="card shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by location, category, department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select form-select-lg"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select form-select-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="col-md-2">
                <button 
                  className="btn btn-primary btn-lg w-100"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterPriority("all");
                    setFilterStatus("all");
                  }}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="container mt-4 mb-5">
        {complaints.length === 0 ? (
          <div className="text-center py-5 animate__animated animate__fadeIn">
            <div className="empty-state">
              <i className="bi bi-inbox display-1 text-muted"></i>
              <h3 className="mt-3">No Complaints Found</h3>
              <p className="text-muted">There are no complaints assigned to your department yet.</p>
              <button className="btn btn-outline-primary mt-3" onClick={fetchComplaints}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh
              </button>
            </div>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center py-5 animate__animated animate__fadeIn">
            <div className="empty-state">
              <i className="bi bi-search display-1 text-muted"></i>
              <h3 className="mt-3">No Matching Complaints</h3>
              <p className="text-muted">Try adjusting your filters or search terms.</p>
              <button 
                className="btn btn-outline-primary mt-3"
                onClick={() => {
                  setSearchQuery("");
                  setFilterPriority("all");
                  setFilterStatus("all");
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredComplaints.map((complaint, index) => (
              <div 
                key={getComplaintId(complaint)} 
                className={`col-lg-6 col-xl-4 animate__animated animate__fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card complaint-card h-100 shadow-sm border-hover">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0 fw-bold text-truncate" style={{maxWidth: '200px'}}>
                        {complaint.category || complaint.title || "Uncategorized"}
                      </h5>
                      <small className="text-muted">ID: {getComplaintId(complaint)}</small>
                    </div>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item" onClick={() => setActiveComplaint(complaint)}>
                            <i className="bi bi-eye me-2"></i>
                            View Details
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => openAssignModal(getComplaintId(complaint))}>
                            <i className="bi bi-person-plus me-2"></i>
                            Assign Staff
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item text-info"
                            onClick={() => openMapModal(complaint)}
                          >
                            <i className="bi bi-map me-2"></i>
                            View on Map
                          </button>
                        </li>
                        {complaint.suggestion && (
                          <li>
                            <button 
                              className="dropdown-item text-primary"
                              onClick={() => openReplyBox(getComplaintId(complaint), complaint.suggestion_reply)}
                            >
                              <i className="bi bi-reply me-2"></i>
                              Reply to Suggestion
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      {getPriorityBadge(complaint.priority)}
                      {getStatusBadge(complaint.status)}
                    </div>

                    <div className="complaint-info mb-3">
                      {/* Clickable Location Link */}
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt text-primary me-2"></i>
                        <button 
                          className="btn btn-link p-0 text-decoration-none text-start text-truncate location-link"
                          onClick={() => openMapModal(complaint)}
                          title="Click to view on map"
                          style={{ maxWidth: '250px' }}
                        >
                          <span className="text-primary fw-medium">
                            <i className="bi bi-geo-fill me-1"></i>
                            {complaint.location || "Location not specified"}
                            <i className="bi bi-box-arrow-up-right ms-1 small"></i>
                          </span>
                        </button>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-building text-info me-2"></i>
                        <span className="text-truncate">{renderDepartments(complaint)}</span>
                      </div>

                      <p className="complaint-description">
                        <i className="bi bi-chat-left-text text-muted me-2"></i>
                        {complaint.description || "No description provided"}
                      </p>
                      
                      {/* Suggestion Display */}
                      {complaint.suggestion && (
                        <div className="mt-3">
                          <div className="alert alert-info p-2 small mb-2">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-lightbulb me-2"></i>
                              <strong className="me-2">Citizen Suggestion:</strong>
                            </div>
                            <p className="mb-0 mt-1">{complaint.suggestion}</p>
                          </div>
                          
                          {/* Officer Reply Display */}
                          {complaint.suggestion_reply ? (
                            <div className="alert alert-success p-2 small">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <strong>
                                  <i className="bi bi-check-circle me-1"></i>
                                  Your Reply:
                                </strong>
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => openReplyBox(getComplaintId(complaint), complaint.suggestion_reply)}
                                >
                                  <i className="bi bi-pencil"></i> Edit
                                </button>
                              </div>
                              <p className="mb-0">{complaint.suggestion_reply}</p>
                              {complaint.replied_at && (
                                <small className="text-muted d-block mt-1">
                                  <i className="bi bi-clock me-1"></i>
                                  {new Date(complaint.replied_at).toLocaleString()}
                                </small>
                              )}
                            </div>
                          ) : (
                            <button 
                              className="btn btn-sm btn-outline-primary w-100"
                              onClick={() => openReplyBox(getComplaintId(complaint))}
                            >
                              <i className="bi bi-reply me-1"></i>
                              Reply to Suggestion
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* FIXED: Attachment Viewing - Same as ComplaintHistory */}
                    <div className="mb-3">
                      <div className="field-label">Attachment:</div>
                      <div className="field-value">
                        {complaint.attachment ? (
                          <a
                            href={getAttachmentUrl(complaint.attachment)}
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

                    <div className="text-muted small mb-3">
                      <i className="bi bi-calendar3 me-1"></i>
                      {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : "Date not available"}
                    </div>

                    <div className="assign-section">
                      <label className="form-label fw-semibold mb-2">
                        <i className="bi bi-person-workspace me-2"></i>
                        Assign to Staff
                      </label>
                      <div className="d-flex gap-2">
                        <select
                          className="form-select form-select-sm"
                          value={selectedStaff[getComplaintId(complaint)] || ""}
                          onChange={(e) =>
                            setSelectedStaff({ ...selectedStaff, [getComplaintId(complaint)]: e.target.value })
                          }
                        >
                          <option value="">Select Staff Member</option>
                          {staffList.map((staff) => (
                            <option key={staff.id || staff._id} value={staff.id || staff._id}>
                              {staff.full_name || staff.username || staff.name || `Staff ${staff.id}`}
                              {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => assignComplaint(getComplaintId(complaint))}
                          disabled={!selectedStaff[getComplaintId(complaint)]}
                        >
                          <i className="bi bi-send-check"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Map Modal Component */}
      <MapModal 
        show={showMapModal}
        onClose={() => setShowMapModal(false)}
        complaint={mapComplaint}
        location={mapComplaint?.location || "Unknown Location"}
        coordinates={locationCoordinates}
      />

      {/* ✅ Reply Modal */}
      {showReplyBox && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
          <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <i className="bi bi-reply me-2"></i>
                  Reply to Citizen Suggestion
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowReplyBox(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Reply</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type your reply to the citizen's suggestion..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    maxLength="500"
                  />
                  <div className="text-end text-muted small mt-1">
                    {replyText.length}/500 characters
                  </div>
                </div>
                <div className="alert alert-warning">
                  <i className="bi bi-info-circle me-2"></i>
                  Your reply will be visible to the citizen and cannot be deleted.
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowReplyBox(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => submitReply(replyingToComplaintId)}
                  disabled={!replyText.trim()}
                >
                  <i className="bi bi-send-check me-2"></i>
                  Submit Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
          <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-plus me-2"></i>
                  Assign Complaint
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAssignModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Staff Member</label>
                  <select
                    className="form-select form-select-lg"
                    value={selectedStaff[assigningComplaintId] || ""}
                    onChange={(e) =>
                      setSelectedStaff({ ...selectedStaff, [assigningComplaintId]: e.target.value })
                    }
                  >
                    <option value="">Choose a staff member...</option>
                    {staffList.map((staff) => (
                      <option key={staff.id || staff._id} value={staff.id || staff._id}>
                        {staff.full_name || staff.username || staff.name || `Staff ${staff.id}`}
                        {staff.department ? ` (${typeof staff.department === 'object' ? staff.department.name : staff.department})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  The selected staff member will receive a notification about this assignment.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => assignComplaint(assigningComplaintId)}
                  disabled={!selectedStaff[assigningComplaintId]}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complaint Detail Modal */}
      {activeComplaint && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
          <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeIn">
            <div className="modal-content">
              <div className="modal-header bg-gradient-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-clipboard-check me-2"></i>
                  Complaint Details
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setActiveComplaint(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">Category</label>
                      <div className="fs-5 fw-semibold">{activeComplaint.category || activeComplaint.title || "Uncategorized"}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">Location</label>
                      <div className="fs-5">
                        <i className="bi bi-geo-alt text-primary me-2"></i>
                        <button 
                          className="btn btn-link p-0 text-decoration-none text-start location-link"
                          onClick={() => openMapModal(activeComplaint)}
                        >
                          <span className="text-primary fw-medium">
                            {activeComplaint.location || "Location not specified"}
                            <i className="bi bi-box-arrow-up-right ms-1 small"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">Priority</label>
                      <div>{getPriorityBadge(activeComplaint.priority)}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">Status</label>
                      <div>{getStatusBadge(activeComplaint.status)}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">Departments</label>
                      <div className="fs-5">
                        <i className="bi bi-building text-info me-2"></i>
                        {renderDepartments(activeComplaint)}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted">Date Submitted</label>
                      <div className="fs-5">
                        <i className="bi bi-calendar3 text-success me-2"></i>
                        {activeComplaint.created_at ? new Date(activeComplaint.created_at).toLocaleString() : "Date not available"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-muted">Description</label>
                  <div className="card bg-light">
                    <div className="card-body">
                      <p className="mb-0">{activeComplaint.description || "No description provided"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced: Suggestion with Reply Box in Modal */}
                {activeComplaint.suggestion && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label text-muted fw-bold">Citizen Suggestion</label>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setActiveComplaint(null);
                          openReplyBox(getComplaintId(activeComplaint), activeComplaint.suggestion_reply);
                        }}
                      >
                        <i className="bi bi-reply me-1"></i>
                        {activeComplaint.suggestion_reply ? "Edit Reply" : "Reply"}
                      </button>
                    </div>
                    
                    <div className="card border-info mb-3">
                      <div className="card-header bg-info bg-opacity-10 d-flex align-items-center">
                        <i className="bi bi-lightbulb text-info me-2"></i>
                        <strong>Citizen's Input</strong>
                      </div>
                      <div className="card-body">
                        <p className="mb-0">{activeComplaint.suggestion}</p>
                      </div>
                    </div>
                    
                    {/* Officer's Reply in Modal */}
                    {activeComplaint.suggestion_reply ? (
                      <div className="card border-success">
                        <div className="card-header bg-success bg-opacity-10 d-flex align-items-center">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          <strong>Your Reply</strong>
                          <span className="ms-auto text-muted small">
                            {activeComplaint.replied_at && (
                              <>Replied: {new Date(activeComplaint.replied_at).toLocaleString()}</>
                            )}
                          </span>
                        </div>
                        <div className="card-body">
                          <p className="mb-0">{activeComplaint.suggestion_reply}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-warning">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        No reply has been provided yet. Consider replying to the citizen's suggestion.
                      </div>
                    )}
                  </div>
                )}
                
                {/* FIXED: Modal Attachment Section - Same as ComplaintHistory */}
                <div className="mb-3">
                  <label className="form-label text-muted">Attachment:</label>
                  <div className="field-value">
                    {activeComplaint.attachment ? (
                      <a
                        href={getAttachmentUrl(activeComplaint.attachment)}
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveComplaint(null)}>
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary"
                  onClick={() => openMapModal(activeComplaint)}
                >
                  <i className="bi bi-map me-2"></i>
                  View on Map
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  setActiveComplaint(null);
                  openAssignModal(getComplaintId(activeComplaint));
                }}>
                  <i className="bi bi-person-plus me-2"></i>
                  Assign to Staff
                </button>
                {activeComplaint.suggestion && !activeComplaint.suggestion_reply && (
                  <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={() => {
                      setActiveComplaint(null);
                      openReplyBox(getComplaintId(activeComplaint));
                    }}
                  >
                    <i className="bi bi-reply me-2"></i>
                    Reply to Suggestion
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .bg-white-20 {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .avatar {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .complaint-card {
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }
        
        .complaint-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
          border-color: #0d6efd;
        }
        
        .border-hover:hover {
          border-color: #0d6efd !important;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
        }
        
        .complaint-description {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
        }
        
        .empty-state {
          padding: 3rem;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
        }
        
        .modal-content {
          border-radius: 15px;
          overflow: hidden;
        }
        
        .modal-header {
          border-radius: 15px 15px 0 0;
        }
        
        .toast {
          z-index: 10000;
        }
        
        .location-link:hover {
          text-decoration: underline !important;
        }
        
        /* Add these styles for attachment consistency */
        .field-label {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .field-value {
          color: #2d3748;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Map modal z-index */
        .map-modal {
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default OfficerComplaintView;