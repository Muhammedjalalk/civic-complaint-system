
// import React from "react";

// const OfficerDashboard = () => {
//   const name = localStorage.getItem("name"); // <--- FETCH NAME

//   return (
//     <div style={dashBox}>
//       <h1>Officer Dashboard</h1>

//       <h2>Welcome, {name ? name : "Officer"} 👋</h2>

//       <p>You are logged in successfully.</p>

//       {/* Link to view complaints */}
//       <a href="/officer-complaint based-dpt" style={linkStyle}>
      
//         View Complaints
//       </a>
//        {/* Link to view complaints */}
//       <a href="/officer/profile" style={linkStyle}>
      
//         View Profile
//       </a>
//       <a href="/office_staff_details/" style={linkStyle}>
      
//         View staff_details
//       </a>
//       <a href="/staff_verified_complaint" style={linkStyle}>
      
//         View Verified
//       </a>
//       <a href="/citizen/complaints/map" style={linkStyle}>
      
//         citizen Map Areas 
//       </a>
//     </div>
//   );
// };

// const dashBox = {
//   width: "500px",
//   margin: "60px auto",
//   padding: "30px",
//   borderRadius: "12px",
//   background: "#e0f7fa",
//   textAlign: "center",
//   boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
// };

// const linkStyle = {
//   display: "inline-block",
//   marginTop: "20px",
//   padding: "10px 20px",
//   background: "#00796b",
//   color: "#fff",
//   borderRadius: "8px",
//   textDecoration: "none",
//   fontWeight: "bold",
// };

// export default OfficerDashboard;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const OfficerDashboard = () => {
//   const [officerData, setOfficerData] = useState({
//     name: "",
//     department: "",
//     stats: {
//       totalAssigned: 0,
//       pending: 0,
//       resolved: 0,
//       rating: 4.8
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [timeOfDay, setTimeOfDay] = useState("");

//   useEffect(() => {
//     // Fetch officer data
//     const name = localStorage.getItem("name") || "Officer";
//     const department = localStorage.getItem("department") || "Administration";
    
//     // Simulate API call
//     setTimeout(() => {
//       setOfficerData({
//         name,
//         department,
//         stats: {
//           totalAssigned: 24,
//           pending: 8,
//           resolved: 16,
//           rating: 4.8
//         }
//       });
      
//       // Set time-based greeting
//       const hour = new Date().getHours();
//       if (hour < 12) setTimeOfDay("morning");
//       else if (hour < 17) setTimeOfDay("afternoon");
//       else setTimeOfDay("evening");
      
//       setLoading(false);
//     }, 800);
//   }, []);

//   const dashboardCards = [
//     {
//       title: "View Complaints",
//       description: "Manage and assign department complaints",
//       icon: "bi-clipboard-data",
//       link: "/officer-complaint based-dpt",
//       color: "primary",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//     },
//     {
//       title: "Staff Details",
//       description: "View and manage department staff",
//       icon: "bi-people",
//       link: "/office_staff_details",
//       color: "info",
//       gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
//     },
//     {
//       title: "Verified Complaints",
//       description: "Track resolved and verified cases",
//       icon: "bi-check-circle",
//       link: "/staff_verified_complaint",
//       color: "success",
//       gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
//     },
//     {
//       title: "Area Map",
//       description: "View citizen complaints by location",
//       icon: "bi-map",
//       link: "/citizen/complaints/map",
//       color: "warning",
//       gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
//     },
//     {
//       title: "My Profile",
//       description: "Update your profile and settings",
//       icon: "bi-person-circle",
//       link: "/officer/profile",
//       color: "dark",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//     },
//     {
//       title: "Reports & Analytics",
//       description: "Generate reports and view analytics",
//       icon: "bi-graph-up",
//       link: "/officer/analytics",
//       color: "purple",
//       gradient: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
//     }
//   ];

//   const quickStats = [
//     { label: "Assigned", value: officerData.stats.totalAssigned, icon: "bi-inbox" },
//     { label: "Pending", value: officerData.stats.pending, icon: "bi-clock" },
//     { label: "Resolved", value: officerData.stats.resolved, icon: "bi-check-circle" },
//     { label: "Rating", value: officerData.stats.rating, icon: "bi-star" }
//   ];

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-gradient-primary">
//         <div className="text-center text-white">
//           <div className="spinner-border mb-3" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4>Loading Dashboard...</h4>
//           <p className="text-white-50">Preparing your workspace</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Animated Background */}
//       <div className="position-fixed top-0 start-0 w-100 h-100" style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         zIndex: -1,
//         opacity: 0.1
//       }}></div>

//       {/* Header Section */}
//       <div className="bg-white shadow-sm py-3">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="fw-bold mb-0 text-primary">
//                 <i className="bi bi-speedometer2 me-2"></i>
//                 Officer Dashboard
//               </h1>
//             </div>
//             <div className="col-md-4 text-end">
//               <div className="dropdown">
//                 <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
//                   <i className="bi bi-person-circle me-2"></i>
//                   {officerData.name.split(' ')[0]}
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                   <li><Link className="dropdown-item" to="/officer/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
//                   <li><Link className="dropdown-item" to="/settings"><i className="bi bi-gear me-2"></i>Settings</Link></li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><Link className="dropdown-item text-danger" to="/logout"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Welcome Section */}
//       <div className="container mt-4">
//         <div className="card border-0 shadow-lg animate__animated animate__fadeIn">
//           <div className="card-body p-4">
//             <div className="row align-items-center">
//               <div className="col-md-8">
//                 <div className="d-flex align-items-center">
//                   <div className="avatar-xl bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4">
//                     <i className="bi bi-person-badge text-primary fs-1"></i>
//                   </div>
//                   <div>
//                     <h2 className="fw-bold mb-1">Good {timeOfDay}, {officerData.name} 👋</h2>
//                     <p className="text-muted mb-0">
//                       <i className="bi bi-building me-2"></i>
//                       {officerData.department} Department
//                     </p>
//                     <div className="d-flex align-items-center mt-2">
//                       <div className="rating-stars">
//                         {[...Array(5)].map((_, i) => (
//                           <i key={i} className={`bi bi-star${i < Math.floor(officerData.stats.rating) ? '-fill' : ''} text-warning me-1`}></i>
//                         ))}
//                       </div>
//                       <span className="ms-2 text-muted">{officerData.stats.rating}/5.0 Rating</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4 text-end">
//                 <div className="text-muted">
//                   <i className="bi bi-calendar3 me-2"></i>
//                   {new Date().toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//                 <div className="mt-2">
//                   <span className="badge bg-success">
//                     <i className="bi bi-check-circle me-1"></i>
//                     Active Now
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3">
//           {quickStats.map((stat, index) => (
//             <div key={index} className="col-md-3">
//               <div className="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
//                 <div className="card-body p-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6 className="text-muted mb-2">{stat.label}</h6>
//                       <h2 className="mb-0 fw-bold">
//                         {stat.label === 'Rating' ? stat.value : stat.value}
//                       </h2>
//                     </div>
//                     <div className={`avatar bg-${stat.label === 'Pending' ? 'warning' : stat.label === 'Resolved' ? 'success' : stat.label === 'Rating' ? 'info' : 'primary'}-subtle p-3 rounded-circle`}>
//                       <i className={`${stat.icon} fs-3 text-${stat.label === 'Pending' ? 'warning' : stat.label === 'Resolved' ? 'success' : stat.label === 'Rating' ? 'info' : 'primary'}`}></i>
//                     </div>
//                   </div>
//                   <div className="mt-3">
//                     {stat.label === 'Resolved' && officerData.stats.totalAssigned > 0 ? (
//                       <div className="progress" style={{height: '6px'}}>
//                         <div 
//                           className="progress-bar bg-success" 
//                           role="progressbar" 
//                           style={{width: `${(officerData.stats.resolved / officerData.stats.totalAssigned) * 100}%`}}
//                         ></div>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Dashboard Cards */}
//       <div className="container mt-5">
//         <h3 className="fw-bold mb-4">
//           <i className="bi bi-grid me-2"></i>
//           Quick Actions
//         </h3>
//         <div className="row g-4">
//           {dashboardCards.map((card, index) => (
//             <div key={index} className="col-md-4">
//               <Link to={card.link} className="text-decoration-none">
//                 <div className="card dashboard-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp hover-lift"
//                      style={{animationDelay: `${index * 0.1}s`}}>
//                   <div className="card-body p-4">
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="avatar-lg bg-gradient-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
//                            style={{background: card.gradient, width: '60px', height: '60px'}}>
//                         <i className={`${card.icon} fs-3 text-${card.color}`}></i>
//                       </div>
//                       <div>
//                         <h5 className="fw-bold mb-1">{card.title}</h5>
//                         <p className="text-muted mb-0">{card.description}</p>
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <span className={`badge bg-${card.color} bg-opacity-10 text-${card.color}`}>
//                         Click to access <i className="bi bi-arrow-right ms-1"></i>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activity & Announcements */}
//       <div className="container mt-5 mb-5">
//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-bold mb-0">
//                   <i className="bi bi-clock-history me-2"></i>
//                   Recent Activity
//                 </h5>
//               </div>
//               <div className="card-body">
//                 <ul className="list-group list-group-flush">
//                   {[
//                     { activity: "Assigned complaint #1234 to John Doe", time: "2 hours ago", icon: "bi-person-plus", color: "primary" },
//                     { activity: "Resolved complaint #1231", time: "Yesterday", icon: "bi-check-circle", color: "success" },
//                     { activity: "Received new complaint #1235", time: "2 days ago", icon: "bi-inbox", color: "info" },
//                     { activity: "Updated staff schedule", time: "3 days ago", icon: "bi-calendar", color: "warning" }
//                   ].map((item, index) => (
//                     <li key={index} className="list-group-item border-0 px-0 py-3">
//                       <div className="d-flex align-items-center">
//                         <div className={`avatar-sm bg-${item.color}-subtle rounded-circle d-flex align-items-center justify-content-center me-3`}>
//                           <i className={`${item.icon} text-${item.color}`}></i>
//                         </div>
//                         <div className="flex-grow-1">
//                           <p className="mb-0">{item.activity}</p>
//                           <small className="text-muted">{item.time}</small>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-bold mb-0">
//                   <i className="bi bi-megaphone me-2"></i>
//                   Announcements
//                 </h5>
//               </div>
//               <div className="card-body">
//                 <div className="alert alert-primary">
//                   <div className="d-flex">
//                     <i className="bi bi-info-circle fs-5 me-3"></i>
//                     <div>
//                       <strong>System Update</strong>
//                       <p className="mb-0 small">New complaint tracking features are now available.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="alert alert-success">
//                   <div className="d-flex">
//                     <i className="bi bi-check-circle fs-5 me-3"></i>
//                     <div>
//                       <strong>Department Meeting</strong>
//                       <p className="mb-0 small">Monthly review meeting scheduled for Friday, 3 PM.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="alert alert-warning">
//                   <div className="d-flex">
//                     <i className="bi bi-exclamation-triangle fs-5 me-3"></i>
//                     <div>
//                       <strong>High Priority</strong>
//                       <p className="mb-0 small">Please review pending complaints with high priority.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-light py-4 mt-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-6">
//               <p className="mb-0 text-muted">
//                 <i className="bi bi-shield-check me-2"></i>
//                 Officer Dashboard v2.0 • Secure Portal
//               </p>
//             </div>
//             <div className="col-md-6 text-end">
//               <p className="mb-0 text-muted">
//                 <i className="bi bi-clock me-2"></i>
//                 Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .dashboard-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .dashboard-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
//           border-color: #667eea;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .avatar-sm {
//           width: 40px;
//           height: 40px;
//         }
        
//         .avatar-lg {
//           width: 60px;
//           height: 60px;
//         }
        
//         .avatar-xl {
//           width: 80px;
//           height: 80px;
//         }
        
//         .rating-stars {
//           color: #ffc107;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         }
        
//         .bg-purple {
//           background-color: #6f42c1;
//         }
        
//         .bg-purple-subtle {
//           background-color: rgba(111, 66, 193, 0.1);
//         }
        
//         .text-purple {
//           color: #6f42c1;
//         }
        
//         .bg-success-subtle {
//           background-color: rgba(25, 135, 84, 0.1);
//         }
        
//         .bg-warning-subtle {
//           background-color: rgba(255, 193, 7, 0.1);
//         }
        
//         .bg-info-subtle {
//           background-color: rgba(13, 202, 240, 0.1);
//         }
        
//         .bg-primary-subtle {
//           background-color: rgba(13, 110, 253, 0.1);
//         }
        
//         .card-header {
//           border-bottom: 1px solid rgba(0,0,0,.125);
//         }
        
//         .list-group-item:last-child {
//           border-bottom: 0;
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

// export default OfficerDashboard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const OfficerDashboard = () => {
//   const [officerData, setOfficerData] = useState({
//     name: "",
//     department: "",
//     stats: {
//       totalAssigned: 0,
//       pending: 0,
//       resolved: 0,
//       rating: 4.8,
//       feedbackReceived: 0
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [timeOfDay, setTimeOfDay] = useState("");

//   useEffect(() => {
//     // Fetch officer data
//     const name = localStorage.getItem("name") || "Officer";
//     const department = localStorage.getItem("department") || "Administration";
    
//     // Simulate API call
//     setTimeout(() => {
//       setOfficerData({
//         name,
//         department,
//         stats: {
//           totalAssigned: 24,
//           pending: 8,
//           resolved: 16,
//           rating: 4.8,
//           feedbackReceived: 42 // Added feedback count
//         }
//       });
      
//       // Set time-based greeting
//       const hour = new Date().getHours();
//       if (hour < 12) setTimeOfDay("morning");
//       else if (hour < 17) setTimeOfDay("afternoon");
//       else setTimeOfDay("evening");
      
//       setLoading(false);
//     }, 800);
//   }, []);

//   const dashboardCards = [
//     {
//       title: "View Complaints",
//       description: "Manage and assign department complaints",
//       icon: "bi-clipboard-data",
//       link: "/officer-complaint based-dpt",
//       color: "primary",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//     },
//     {
//       title: "Staff Details",
//       description: "View and manage department staff",
//       icon: "bi-people",
//       link: "/office_staff_details",
//       color: "info",
//       gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
//     },
//     {
//       title: "Verified Complaints",
//       description: "Track resolved and verified cases",
//       icon: "bi-check-circle",
//       link: "/staff_verified_complaint",
//       color: "success",
//       gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
//     },
//     {
//       title: "Citizen Feedback",
//       description: "View and analyze citizen feedback",
//       icon: "bi-star",
//       link: "/officer_view_feedback/",
//       color: "warning",
//       gradient: "linear-gradient(135deg, #fad961 0%, #f76b1c 100%)"
//     },
//     {
//       title: "My Profile",
//       description: "Update your profile and settings",
//       icon: "bi-person-circle",
//       link: "/officer/profile",
//       color: "dark",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//     },
//     {
//       title: "Reports & Analytics",
//       description: "Generate reports and view analytics",
//       icon: "bi-graph-up",
//       link: "/officer/analytics",
//       color: "purple",
//       gradient: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
//     }
//   ];

//   const quickStats = [
//     { label: "Assigned", value: officerData.stats.totalAssigned, icon: "bi-inbox", color: "primary" },
//     { label: "Pending", value: officerData.stats.pending, icon: "bi-clock", color: "warning" },
//     { label: "Resolved", value: officerData.stats.resolved, icon: "bi-check-circle", color: "success" },
//     { label: "Feedback", value: officerData.stats.feedbackReceived, icon: "bi-star", color: "info" }
//   ];

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-gradient-primary">
//         <div className="text-center text-white">
//           <div className="spinner-border mb-3" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4>Loading Dashboard...</h4>
//           <p className="text-white-50">Preparing your workspace</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Animated Background */}
//       <div className="position-fixed top-0 start-0 w-100 h-100" style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         zIndex: -1,
//         opacity: 0.1
//       }}></div>

//       {/* Header Section */}
//       <div className="bg-white shadow-sm py-3">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="fw-bold mb-0 text-primary">
//                 <i className="bi bi-speedometer2 me-2"></i>
//                 Officer Dashboard
//               </h1>
//             </div>
//             <div className="col-md-4 text-end">
//               <div className="dropdown">
//                 <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
//                   <i className="bi bi-person-circle me-2"></i>
//                   {officerData.name.split(' ')[0]}
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                   <li><Link className="dropdown-item" to="/officer/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
//                   <li><Link className="dropdown-item" to="/settings"><i className="bi bi-gear me-2"></i>Settings</Link></li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><Link className="dropdown-item text-danger" to="/logout"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Welcome Section */}
//       <div className="container mt-4">
//         <div className="card border-0 shadow-lg animate__animated animate__fadeIn">
//           <div className="card-body p-4">
//             <div className="row align-items-center">
//               <div className="col-md-8">
//                 <div className="d-flex align-items-center">
//                   <div className="avatar-xl bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4">
//                     <i className="bi bi-person-badge text-primary fs-1"></i>
//                   </div>
//                   <div>
//                     <h2 className="fw-bold mb-1">Good {timeOfDay}, {officerData.name} 👋</h2>
//                     <p className="text-muted mb-0">
//                       <i className="bi bi-building me-2"></i>
//                       {officerData.department} Department
//                     </p>
//                     <div className="d-flex align-items-center mt-2">
//                       <div className="rating-stars">
//                         {[...Array(5)].map((_, i) => (
//                           <i key={i} className={`bi bi-star${i < Math.floor(officerData.stats.rating) ? '-fill' : ''} text-warning me-1`}></i>
//                         ))}
//                       </div>
//                       <span className="ms-2 text-muted">{officerData.stats.rating}/5.0 Rating</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4 text-end">
//                 <div className="text-muted">
//                   <i className="bi bi-calendar3 me-2"></i>
//                   {new Date().toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//                 <div className="mt-2">
//                   <span className="badge bg-success">
//                     <i className="bi bi-check-circle me-1"></i>
//                     Active Now
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3">
//           {quickStats.map((stat, index) => (
//             <div key={index} className="col-md-3">
//               <div className="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
//                 <div className="card-body p-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6 className="text-muted mb-2">{stat.label}</h6>
//                       <h2 className="mb-0 fw-bold">
//                         {stat.label === 'Rating' ? stat.value : stat.value}
//                         {stat.label === 'Feedback' && <span className="fs-6 text-muted"> reviews</span>}
//                       </h2>
//                     </div>
//                     <div className={`avatar bg-${stat.color}-subtle p-3 rounded-circle`}>
//                       <i className={`${stat.icon} fs-3 text-${stat.color}`}></i>
//                     </div>
//                   </div>
//                   <div className="mt-3">
//                     {stat.label === 'Resolved' && officerData.stats.totalAssigned > 0 ? (
//                       <div className="progress" style={{height: '6px'}}>
//                         <div 
//                           className="progress-bar bg-success" 
//                           role="progressbar" 
//                           style={{width: `${(officerData.stats.resolved / officerData.stats.totalAssigned) * 100}%`}}
//                         ></div>
//                       </div>
//                     ) : stat.label === 'Feedback' ? (
//                       <div className="d-flex align-items-center">
//                         <div className="rating-stars small">
//                           {[...Array(5)].map((_, i) => (
//                             <i key={i} className={`bi bi-star${i < 4 ? '-fill' : ''} text-warning me-1`}></i>
//                           ))}
//                         </div>
//                         <small className="text-muted ms-2">Avg: 4.2/5</small>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Dashboard Cards */}
//       <div className="container mt-5">
//         <h3 className="fw-bold mb-4">
//           <i className="bi bi-grid me-2"></i>
//           Quick Actions
//         </h3>
//         <div className="row g-4">
//           {dashboardCards.map((card, index) => (
//             <div key={index} className="col-md-4">
//               <Link to={card.link} className="text-decoration-none">
//                 <div className="card dashboard-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp hover-lift"
//                      style={{animationDelay: `${index * 0.1}s`}}>
//                   <div className="card-body p-4">
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="avatar-lg bg-gradient-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
//                            style={{background: card.gradient, width: '60px', height: '60px'}}>
//                         <i className={`${card.icon} fs-3 text-${card.color}`}></i>
//                       </div>
//                       <div>
//                         <h5 className="fw-bold mb-1">{card.title}</h5>
//                         <p className="text-muted mb-0">{card.description}</p>
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <span className={`badge bg-${card.color} bg-opacity-10 text-${card.color}`}>
//                         Click to access <i className="bi bi-arrow-right ms-1"></i>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activity & Announcements */}
//       <div className="container mt-5 mb-5">
//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-bold mb-0">
//                   <i className="bi bi-clock-history me-2"></i>
//                   Recent Activity
//                 </h5>
//               </div>
//               <div className="card-body">
//                 <ul className="list-group list-group-flush">
//                   {[
//                     { activity: "Assigned complaint #1234 to John Doe", time: "2 hours ago", icon: "bi-person-plus", color: "primary" },
//                     { activity: "Resolved complaint #1231", time: "Yesterday", icon: "bi-check-circle", color: "success" },
//                     { activity: "Received new complaint #1235", time: "2 days ago", icon: "bi-inbox", color: "info" },
//                     { activity: "Reviewed 5 citizen feedback entries", time: "3 days ago", icon: "bi-star", color: "warning" }
//                   ].map((item, index) => (
//                     <li key={index} className="list-group-item border-0 px-0 py-3">
//                       <div className="d-flex align-items-center">
//                         <div className={`avatar-sm bg-${item.color}-subtle rounded-circle d-flex align-items-center justify-content-center me-3`}>
//                           <i className={`${item.icon} text-${item.color}`}></i>
//                         </div>
//                         <div className="flex-grow-1">
//                           <p className="mb-0">{item.activity}</p>
//                           <small className="text-muted">{item.time}</small>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-bold mb-0">
//                   <i className="bi bi-megaphone me-2"></i>
//                   Announcements
//                 </h5>
//               </div>
//               <div className="card-body">
//                 <div className="alert alert-primary">
//                   <div className="d-flex">
//                     <i className="bi bi-info-circle fs-5 me-3"></i>
//                     <div>
//                       <strong>Feedback System Launched</strong>
//                       <p className="mb-0 small">Citizens can now provide feedback on resolved complaints. Check the new Feedback section.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="alert alert-success">
//                   <div className="d-flex">
//                     <i className="bi bi-check-circle fs-5 me-3"></i>
//                     <div>
//                       <strong>Department Meeting</strong>
//                       <p className="mb-0 small">Monthly review meeting scheduled for Friday, 3 PM.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="alert alert-warning">
//                   <div className="d-flex">
//                     <i className="bi bi-exclamation-triangle fs-5 me-3"></i>
//                     <div>
//                       <strong>High Priority</strong>
//                       <p className="mb-0 small">Please review pending complaints with high priority.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feedback Summary */}
//       <div className="container mt-4">
//         <div className="card border-0 shadow-sm">
//           <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//             <h5 className="fw-bold mb-0">
//               <i className="bi bi-star-fill text-warning me-2"></i>
//               Recent Citizen Feedback
//             </h5>
//             <Link to="/officer/feedback" className="btn btn-sm btn-outline-warning">
//               View All <i className="bi bi-arrow-right ms-1"></i>
//             </Link>
//           </div>
//           <div className="card-body">
//             <div className="row g-3">
//               {[
//                 { id: 1231, rating: 5, comment: "Excellent service, resolved quickly!", type: "Resolution Quality", date: "Today" },
//                 { id: 1228, rating: 4, comment: "Good response time, could improve communication", type: "Timeliness", date: "Yesterday" },
//                 { id: 1225, rating: 5, comment: "Very satisfied with the outcome", type: "Overall Satisfaction", date: "2 days ago" },
//                 { id: 1220, rating: 3, comment: "Average experience, took longer than expected", type: "General Feedback", date: "3 days ago" }
//               ].map((feedback, index) => (
//                 <div key={index} className="col-md-3">
//                   <div className="card border-0 shadow-sm h-100">
//                     <div className="card-body text-center">
//                       <div className="mb-2">
//                         <div className="rating-stars">
//                           {[...Array(5)].map((_, i) => (
//                             <i key={i} className={`bi bi-star${i < feedback.rating ? '-fill' : ''} text-warning`}></i>
//                           ))}
//                         </div>
//                       </div>
//                       <h6 className="fw-bold mb-1">Complaint #{feedback.id}</h6>
//                       <p className="text-muted small mb-2">{feedback.type}</p>
//                       <p className="small mb-2" style={{fontSize: '0.8rem'}}>"{feedback.comment}"</p>
//                       <small className="text-muted">{feedback.date}</small>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-light py-4 mt-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-6">
//               <p className="mb-0 text-muted">
//                 <i className="bi bi-shield-check me-2"></i>
//                 Officer Dashboard v2.0 • Secure Portal
//               </p>
//             </div>
//             <div className="col-md-6 text-end">
//               <p className="mb-0 text-muted">
//                 <i className="bi bi-clock me-2"></i>
//                 Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .dashboard-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .dashboard-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
//           border-color: #667eea;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .avatar-sm {
//           width: 40px;
//           height: 40px;
//         }
        
//         .avatar-lg {
//           width: 60px;
//           height: 60px;
//         }
        
//         .avatar-xl {
//           width: 80px;
//           height: 80px;
//         }
        
//         .rating-stars {
//           color: #ffc107;
//         }
        
//         .rating-stars.small i {
//           font-size: 0.8rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         }
        
//         .bg-purple {
//           background-color: #6f42c1;
//         }
        
//         .bg-purple-subtle {
//           background-color: rgba(111, 66, 193, 0.1);
//         }
        
//         .text-purple {
//           color: #6f42c1;
//         }
        
//         .bg-success-subtle {
//           background-color: rgba(25, 135, 84, 0.1);
//         }
        
//         .bg-warning-subtle {
//           background-color: rgba(255, 193, 7, 0.1);
//         }
        
//         .bg-info-subtle {
//           background-color: rgba(13, 202, 240, 0.1);
//         }
        
//         .bg-primary-subtle {
//           background-color: rgba(13, 110, 253, 0.1);
//         }
        
//         .card-header {
//           border-bottom: 1px solid rgba(0,0,0,.125);
//         }
        
//         .list-group-item:last-child {
//           border-bottom: 0;
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

// export default OfficerDashboard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const OfficerDashboard = () => {
//   const [officerData, setOfficerData] = useState({
//     name: "",
//     department: "",
//     stats: {
//       totalAssigned: 0,
//       pending: 0,
//       resolved: 0,
//       rating: 4.8,
//       feedbackReceived: 0,
//       escalations: 3 // Added escalations count
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [timeOfDay, setTimeOfDay] = useState("");

//   useEffect(() => {
//     // Fetch officer data
//     const name = localStorage.getItem("name") || "Officer";
//     const department = localStorage.getItem("department") || "Administration";
    
//     // Simulate API call
//     setTimeout(() => {
//       setOfficerData({
//         name,
//         department,
//         stats: {
//           totalAssigned: 24,
//           pending: 8,
//           resolved: 16,
//           rating: 4.8,
//           feedbackReceived: 42,
//           escalations: 3
//         }
//       });
      
//       // Set time-based greeting
//       const hour = new Date().getHours();
//       if (hour < 12) setTimeOfDay("morning");
//       else if (hour < 17) setTimeOfDay("afternoon");
//       else setTimeOfDay("evening");
      
//       setLoading(false);
//     }, 800);
//   }, []);

//   const dashboardCards = [
//     {
//       title: "View Complaints",
//       description: "Manage and assign department complaints",
//       icon: "bi-clipboard-data",
//       link: "/officer-complaint based-dpt",
//       color: "primary",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//     },
//     {
//       title: "Escalations",
//       description: "View and manage escalated complaints",
//       icon: "bi-exclamation-triangle",
//       link: "/officer/escalations",
//       color: "danger",
//       gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
//     },
//     {
//       title: "Staff Details",
//       description: "View and manage department staff",
//       icon: "bi-people",
//       link: "/office_staff_details",
//       color: "info",
//       gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
//     },
//     {
//       title: "Verified Complaints",
//       description: "Track resolved and verified cases",
//       icon: "bi-check-circle",
//       link: "/staff_verified_complaint",
//       color: "success",
//       gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
//     },
//     {
//       title: "Citizen Feedback",
//       description: "View and analyze citizen feedback",
//       icon: "bi-star",
//       link: "/officer_view_feedback/",
//       color: "warning",
//       gradient: "linear-gradient(135deg, #fad961 0%, #f76b1c 100%)"
//     },
//     {
//       title: "My Profile",
//       description: "Update your profile and settings",
//       icon: "bi-person-circle",
//       link: "/officer/profile",
//       color: "dark",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//     },
//     {
//       title: "Reports & Analytics",
//       description: "Generate reports and view analytics",
//       icon: "bi-graph-up",
//       link: "/officer/analytics",
//       color: "purple",
//       gradient: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
//     }
//   ];

//   const quickStats = [
//     { label: "Assigned", value: officerData.stats.totalAssigned, icon: "bi-inbox", color: "primary" },
//     { label: "Pending", value: officerData.stats.pending, icon: "bi-clock", color: "warning" },
//     { label: "Resolved", value: officerData.stats.resolved, icon: "bi-check-circle", color: "success" },
//     { label: "Escalations", value: officerData.stats.escalations, icon: "bi-exclamation-triangle", color: "danger" },
//     { label: "Feedback", value: officerData.stats.feedbackReceived, icon: "bi-star", color: "info" }
//   ];

//   // Navbar items
//   const navItems = [
//     { name: "Dashboard", path: "/officer/dashboard", icon: "bi-speedometer2" },
//     { name: "Complaints", path: "/officer-complaint-based-dpt", icon: "bi-clipboard-data" },
//     { name: "Escalations", path: "/officer/escalations", icon: "bi-exclamation-triangle" },
//     { name: "Staff", path: "/office_staff_details", icon: "bi-people" },
//     { name: "Verified", path: "/staff_verified_complaint", icon: "bi-check-circle" },
//     { name: "Feedback", path: "/officer_view_feedback", icon: "bi-star" },
//     { name: "Reports", path: "/officer/analytics", icon: "bi-graph-up" }
//   ];

//   if (loading) {
//     return (
//       <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-gradient-primary">
//         <div className="text-center text-white">
//           <div className="spinner-border mb-3" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4>Loading Dashboard...</h4>
//           <p className="text-white-50">Preparing your workspace</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0">
//       {/* Animated Background */}
//       <div className="position-fixed top-0 start-0 w-100 h-100" style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         zIndex: -1,
//         opacity: 0.1
//       }}></div>

//       {/* Header Section */}
//       <div className="bg-white shadow-sm py-3">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1 className="fw-bold mb-0 text-primary">
//                 <i className="bi bi-speedometer2 me-2"></i>
//                 Officer Dashboard
//               </h1>
//             </div>
//             <div className="col-md-4 text-end">
//               <div className="dropdown">
//                 <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
//                   <i className="bi bi-person-circle me-2"></i>
//                   {officerData.name.split(' ')[0]}
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                   <li><Link className="dropdown-item" to="/officer/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
//                   <li><Link className="dropdown-item" to="/settings"><i className="bi bi-gear me-2"></i>Settings</Link></li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><Link className="dropdown-item text-danger" to="/logout"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
//         <div className="container">
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#officerNavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="officerNavbar">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               {navItems.map((item, index) => (
//                 <li className="nav-item" key={index}>
//                   <Link 
//                     className="nav-link d-flex align-items-center" 
//                     to={item.path}
//                     style={{ position: 'relative' }}
//                   >
//                     <i className={`${item.icon} me-2`}></i>
//                     {item.name}
//                     {item.name === "Escalations" && officerData.stats.escalations > 0 && (
//                       <span className="badge bg-danger rounded-pill ms-2">
//                         {officerData.stats.escalations}
//                       </span>
//                     )}
//                     {item.name === "Complaints" && officerData.stats.pending > 0 && (
//                       <span className="badge bg-warning rounded-pill ms-2">
//                         {officerData.stats.pending}
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//             <div className="d-flex">
//               <div className="dropdown">
//                 <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
//                   <i className="bi bi-grid me-2"></i>
//                   Quick Links
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                   <li><Link className="dropdown-item" to="/officer/escalations/high-priority">
//                     <i className="bi bi-flag-fill text-danger me-2"></i>
//                     High Priority Escalations
//                   </Link></li>
//                   <li><Link className="dropdown-item" to="/officer/complaints/urgent">
//                     <i className="bi bi-clock-history text-warning me-2"></i>
//                     Urgent Complaints
//                   </Link></li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><Link className="dropdown-item" to="/officer/escalations/reports">
//                     <i className="bi bi-file-earmark-text me-2"></i>
//                     Escalation Reports
//                   </Link></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Welcome Section */}
//       <div className="container mt-4">
//         <div className="card border-0 shadow-lg animate__animated animate__fadeIn">
//           <div className="card-body p-4">
//             <div className="row align-items-center">
//               <div className="col-md-8">
//                 <div className="d-flex align-items-center">
//                   <div className="avatar-xl bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4">
//                     <i className="bi bi-person-badge text-primary fs-1"></i>
//                   </div>
//                   <div>
//                     <h2 className="fw-bold mb-1">Good {timeOfDay}, {officerData.name} 👋</h2>
//                     <p className="text-muted mb-0">
//                       <i className="bi bi-building me-2"></i>
//                       {officerData.department} Department
//                     </p>
//                     <div className="d-flex align-items-center mt-2">
//                       <div className="rating-stars">
//                         {[...Array(5)].map((_, i) => (
//                           <i key={i} className={`bi bi-star${i < Math.floor(officerData.stats.rating) ? '-fill' : ''} text-warning me-1`}></i>
//                         ))}
//                       </div>
//                       <span className="ms-2 text-muted">{officerData.stats.rating}/5.0 Rating</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4 text-end">
//                 <div className="text-muted">
//                   <i className="bi bi-calendar3 me-2"></i>
//                   {new Date().toLocaleDateString('en-US', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//                 <div className="mt-2">
//                   {officerData.stats.escalations > 0 ? (
//                     <div className="d-flex justify-content-end align-items-center">
//                       <span className="badge bg-danger me-2">
//                         <i className="bi bi-exclamation-triangle me-1"></i>
//                         {officerData.stats.escalations} Escalations
//                       </span>
//                       <span className="badge bg-success">
//                         <i className="bi bi-check-circle me-1"></i>
//                         Active Now
//                       </span>
//                     </div>
//                   ) : (
//                     <span className="badge bg-success">
//                       <i className="bi bi-check-circle me-1"></i>
//                       Active Now
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="container mt-4">
//         <div className="row g-3">
//           {quickStats.map((stat, index) => (
//             <div key={index} className="col-md-3">
//               <div className="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
//                 <div className="card-body p-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6 className="text-muted mb-2">{stat.label}</h6>
//                       <h2 className="mb-0 fw-bold">
//                         {stat.value}
//                         {stat.label === 'Feedback' && <span className="fs-6 text-muted"> reviews</span>}
//                       </h2>
//                     </div>
//                     <div className={`avatar bg-${stat.color}-subtle p-3 rounded-circle`}>
//                       <i className={`${stat.icon} fs-3 text-${stat.color}`}></i>
//                     </div>
//                   </div>
//                   <div className="mt-3">
//                     {stat.label === 'Resolved' && officerData.stats.totalAssigned > 0 ? (
//                       <div className="progress" style={{height: '6px'}}>
//                         <div 
//                           className="progress-bar bg-success" 
//                           role="progressbar" 
//                           style={{width: `${(officerData.stats.resolved / officerData.stats.totalAssigned) * 100}%`}}
//                         ></div>
//                       </div>
//                     ) : stat.label === 'Escalations' && officerData.stats.escalations > 0 ? (
//                       <div className="d-flex align-items-center">
//                         <small className={`text-${stat.color}`}>
//                           <i className="bi bi-exclamation-triangle me-1"></i>
//                           {officerData.stats.escalations} need immediate attention
//                         </small>
//                       </div>
//                     ) : stat.label === 'Feedback' ? (
//                       <div className="d-flex align-items-center">
//                         <div className="rating-stars small">
//                           {[...Array(5)].map((_, i) => (
//                             <i key={i} className={`bi bi-star${i < 4 ? '-fill' : ''} text-warning me-1`}></i>
//                           ))}
//                         </div>
//                         <small className="text-muted ms-2">Avg: 4.2/5</small>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Dashboard Cards */}
//       <div className="container mt-5">
//         <h3 className="fw-bold mb-4">
//           <i className="bi bi-grid me-2"></i>
//           Quick Actions
//         </h3>
//         <div className="row g-4">
//           {dashboardCards.map((card, index) => (
//             <div key={index} className="col-md-4 col-lg-3">
//               <Link to={card.link} className="text-decoration-none">
//                 <div className="card dashboard-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp hover-lift"
//                      style={{animationDelay: `${index * 0.1}s`}}>
//                   <div className="card-body p-4">
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="avatar-lg bg-gradient-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
//                            style={{background: card.gradient, width: '60px', height: '60px'}}>
//                         <i className={`${card.icon} fs-3 text-${card.color}`}></i>
//                       </div>
//                       <div>
//                         <h5 className="fw-bold mb-1">{card.title}</h5>
//                         <p className="text-muted mb-0">{card.description}</p>
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <span className={`badge bg-${card.color} bg-opacity-10 text-${card.color}`}>
//                         Click to access <i className="bi bi-arrow-right ms-1"></i>
//                       </span>
//                       {card.title === "Escalations" && officerData.stats.escalations > 0 && (
//                         <span className="badge bg-danger ms-2">
//                           <i className="bi bi-exclamation-triangle me-1"></i>
//                           {officerData.stats.escalations} Pending
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activity & Announcements */}
//       <div className="container mt-5 mb-5">
//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h5 className="fw-bold mb-0">
//                   <i className="bi bi-clock-history me-2"></i>
//                   Recent Activity
//                 </h5>
//                 <Link to="/officer/activity" className="btn btn-sm btn-outline-primary">
//                   View All
//                 </Link>
//               </div>
//               <div className="card-body">
//                 <ul className="list-group list-group-flush">
//                   {[
//                     { activity: "Escalation #E-789 assigned to you", time: "1 hour ago", icon: "bi-exclamation-triangle", color: "danger", priority: "high" },
//                     { activity: "Assigned complaint #1234 to John Doe", time: "2 hours ago", icon: "bi-person-plus", color: "primary" },
//                     { activity: "Resolved complaint #1231", time: "Yesterday", icon: "bi-check-circle", color: "success" },
//                     { activity: "Received new complaint #1235", time: "2 days ago", icon: "bi-inbox", color: "info" },
//                     { activity: "Reviewed 5 citizen feedback entries", time: "3 days ago", icon: "bi-star", color: "warning" }
//                   ].map((item, index) => (
//                     <li key={index} className="list-group-item border-0 px-0 py-3">
//                       <div className="d-flex align-items-center">
//                         <div className={`avatar-sm bg-${item.color}-subtle rounded-circle d-flex align-items-center justify-content-center me-3`}>
//                           <i className={`${item.icon} text-${item.color}`}></i>
//                         </div>
//                         <div className="flex-grow-1">
//                           <div className="d-flex justify-content-between align-items-center">
//                             <p className="mb-0">{item.activity}</p>
//                             {item.priority === "high" && (
//                               <span className="badge bg-danger">High Priority</span>
//                             )}
//                           </div>
//                           <small className="text-muted">{item.time}</small>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h5 className="fw-bold mb-0">
//                   <i className="bi bi-megaphone me-2"></i>
//                   Announcements
//                 </h5>
//                 <span className="badge bg-info">3 New</span>
//               </div>
//               <div className="card-body">
//                 <div className="alert alert-danger">
//                   <div className="d-flex">
//                     <i className="bi bi-exclamation-triangle fs-5 me-3"></i>
//                     <div>
//                       <strong>Escalation Protocol Updated</strong>
//                       <p className="mb-0 small">New escalation handling procedures effective immediately. Review in the Escalations section.</p>
//                       <small className="text-muted">Posted 2 hours ago</small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="alert alert-primary">
//                   <div className="d-flex">
//                     <i className="bi bi-info-circle fs-5 me-3"></i>
//                     <div>
//                       <strong>Feedback System Launched</strong>
//                       <p className="mb-0 small">Citizens can now provide feedback on resolved complaints. Check the new Feedback section.</p>
//                       <small className="text-muted">Posted 1 day ago</small>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="alert alert-success">
//                   <div className="d-flex">
//                     <i className="bi bi-check-circle fs-5 me-3"></i>
//                     <div>
//                       <strong>Department Meeting</strong>
//                       <p className="mb-0 small">Monthly review meeting scheduled for Friday, 3 PM.</p>
//                       <small className="text-muted">Posted 2 days ago</small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Escalations Preview */}
//       {officerData.stats.escalations > 0 && (
//         <div className="container mt-4">
//           <div className="card border-0 shadow-sm border-danger">
//             <div className="card-header bg-danger text-white border-0 d-flex justify-content-between align-items-center">
//               <h5 className="fw-bold mb-0">
//                 <i className="bi bi-exclamation-triangle me-2"></i>
//                 Pending Escalations
//               </h5>
//               <Link to="/officer/escalations" className="btn btn-sm btn-light">
//                 Manage All <i className="bi bi-arrow-right ms-1"></i>
//               </Link>
//             </div>
//             <div className="card-body">
//               <div className="row g-3">
//                 {[
//                   { id: "E-789", title: "Water Supply Issue", department: "Public Works", priority: "High", assignedTo: "You", days: 2 },
//                   { id: "E-788", title: "Road Repair Delay", department: "Transport", priority: "Medium", assignedTo: "Sarah Johnson", days: 5 },
//                   { id: "E-787", title: "Garbage Collection", department: "Sanitation", priority: "High", assignedTo: "You", days: 1 }
//                 ].map((escalation, index) => (
//                   <div key={index} className="col-md-4">
//                     <div className={`card border-${escalation.priority === "High" ? "danger" : "warning"} h-100`}>
//                       <div className="card-body">
//                         <div className="d-flex justify-content-between align-items-start mb-2">
//                           <span className={`badge bg-${escalation.priority === "High" ? "danger" : "warning"}`}>
//                             {escalation.priority} Priority
//                           </span>
//                           <span className="text-muted small">#{escalation.id}</span>
//                         </div>
//                         <h6 className="fw-bold">{escalation.title}</h6>
//                         <p className="small text-muted mb-2">{escalation.department}</p>
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="small">
//                             <i className="bi bi-person me-1"></i>
//                             {escalation.assignedTo}
//                           </span>
//                           <span className="small text-muted">
//                             <i className="bi bi-clock me-1"></i>
//                             {escalation.days} day{escalation.days > 1 ? 's' : ''}
//                           </span>
//                         </div>
//                         {escalation.assignedTo === "You" && (
//                           <div className="mt-3">
//                             <Link to="/officer/escalations" className="btn btn-sm btn-danger w-100">
//                               <i className="bi bi-arrow-right-circle me-1"></i>
//                               Take Action
//                             </Link>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Feedback Summary */}
//       <div className="container mt-4">
//         <div className="card border-0 shadow-sm">
//           <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//             <h5 className="fw-bold mb-0">
//               <i className="bi bi-star-fill text-warning me-2"></i>
//               Recent Citizen Feedback
//             </h5>
//             <Link to="/officer/feedback" className="btn btn-sm btn-outline-warning">
//               View All <i className="bi bi-arrow-right ms-1"></i>
//             </Link>
//           </div>
//           <div className="card-body">
//             <div className="row g-3">
//               {[
//                 { id: 1231, rating: 5, comment: "Excellent service, resolved quickly!", type: "Resolution Quality", date: "Today" },
//                 { id: 1228, rating: 4, comment: "Good response time, could improve communication", type: "Timeliness", date: "Yesterday" },
//                 { id: 1225, rating: 5, comment: "Very satisfied with the outcome", type: "Overall Satisfaction", date: "2 days ago" },
//                 { id: 1220, rating: 3, comment: "Average experience, took longer than expected", type: "General Feedback", date: "3 days ago" }
//               ].map((feedback, index) => (
//                 <div key={index} className="col-md-3">
//                   <div className="card border-0 shadow-sm h-100">
//                     <div className="card-body text-center">
//                       <div className="mb-2">
//                         <div className="rating-stars">
//                           {[...Array(5)].map((_, i) => (
//                             <i key={i} className={`bi bi-star${i < feedback.rating ? '-fill' : ''} text-warning`}></i>
//                           ))}
//                         </div>
//                       </div>
//                       <h6 className="fw-bold mb-1">Complaint #{feedback.id}</h6>
//                       <p className="text-muted small mb-2">{feedback.type}</p>
//                       <p className="small mb-2" style={{fontSize: '0.8rem'}}>"{feedback.comment}"</p>
//                       <small className="text-muted">{feedback.date}</small>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-light py-4 mt-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-6">
//               <p className="mb-0 text-muted">
//                 <i className="bi bi-shield-check me-2"></i>
//                 Officer Dashboard v2.0 • Secure Portal
//               </p>
//             </div>
//             <div className="col-md-6 text-end">
//               <p className="mb-0 text-muted">
//                 <i className="bi bi-clock me-2"></i>
//                 Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 {officerData.stats.escalations > 0 && (
//                   <span className="ms-3 badge bg-danger">
//                     <i className="bi bi-exclamation-triangle me-1"></i>
//                     {officerData.stats.escalations} Active Escalations
//                   </span>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .dashboard-card {
//           transition: all 0.3s ease;
//           border: 1px solid #e9ecef;
//         }
        
//         .dashboard-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
//           border-color: #667eea;
//         }
        
//         .hover-lift {
//           transition: all 0.3s ease;
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
//         }
        
//         .avatar {
//           width: 50px;
//           height: 50px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .avatar-sm {
//           width: 40px;
//           height: 40px;
//         }
        
//         .avatar-lg {
//           width: 60px;
//           height: 60px;
//         }
        
//         .avatar-xl {
//           width: 80px;
//           height: 80px;
//         }
        
//         .rating-stars {
//           color: #ffc107;
//         }
        
//         .rating-stars.small i {
//           font-size: 0.8rem;
//         }
        
//         .bg-gradient-primary {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         }
        
//         .bg-purple {
//           background-color: #6f42c1;
//         }
        
//         .bg-purple-subtle {
//           background-color: rgba(111, 66, 193, 0.1);
//         }
        
//         .text-purple {
//           color: #6f42c1;
//         }
        
//         .bg-success-subtle {
//           background-color: rgba(25, 135, 84, 0.1);
//         }
        
//         .bg-warning-subtle {
//           background-color: rgba(255, 193, 7, 0.1);
//         }
        
//         .bg-info-subtle {
//           background-color: rgba(13, 202, 240, 0.1);
//         }
        
//         .bg-primary-subtle {
//           background-color: rgba(13, 110, 253, 0.1);
//         }
        
//         .bg-danger-subtle {
//           background-color: rgba(220, 53, 69, 0.1);
//         }
        
//         .card-header {
//           border-bottom: 1px solid rgba(0,0,0,.125);
//         }
        
//         .list-group-item:last-child {
//           border-bottom: 0;
//         }
        
//         .navbar-nav .nav-link {
//           position: relative;
//           padding: 0.5rem 1rem;
//           border-radius: 0.375rem;
//           transition: all 0.3s ease;
//         }
        
//         .navbar-nav .nav-link:hover {
//           background-color: rgba(102, 126, 234, 0.1);
//           color: #667eea;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
        
//         .border-danger {
//           border: 2px solid #dc3545 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OfficerDashboard;

// updated code

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const OfficerDashboard = () => {
  const [officerData, setOfficerData] = useState({
    name: "",
    department: "",
    stats: {
      totalAssigned: 0,
      pending: 0,
      resolved: 0,
      rating: 4.8,
      feedbackReceived: 0,
      escalations: 3 // Added escalations count
    }
  });
  const [loading, setLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch officer data
    const name = localStorage.getItem("full_name") || "Officer";
    const department = localStorage.getItem("department") || "Administration";
    
    // Simulate API call
    setTimeout(() => {
      setOfficerData({
        name,
        department,
        stats: {
          totalAssigned: 24,
          pending: 8,
          resolved: 16,
          rating: 4.8,
          feedbackReceived: 42,
          escalations: 3
        }
      });
      
      // Set time-based greeting
      const hour = new Date().getHours();
      if (hour < 12) setTimeOfDay("morning");
      else if (hour < 17) setTimeOfDay("afternoon");
      else setTimeOfDay("evening");
      
      setLoading(false);
    }, 800);
  }, []);

  // Logout function
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      // Call logout API if you have one
      // await privateAPI.post("/accounts/logout/");
      
      // Clear tokens/local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_info");
      localStorage.removeItem("name");
      localStorage.removeItem("department");
      
      // Clear any other stored data
      localStorage.clear();
      
      // Redirect to login page
      navigate("/login");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local storage and redirect even if API call fails
      localStorage.clear();
      navigate("/login");
    }
  };

  const dashboardCards = [
    {
      title: "View Complaints",
      description: "Manage and assign department complaints",
      icon: "bi-clipboard-data",
      link: "/officer-complaint based-dpt",
      color: "primary",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Escalations",
      description: "View and manage escalated complaints",
      icon: "bi-exclamation-triangle",
      link: "/officer/escalations",
      color: "danger",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "Staff Details",
      description: "View and manage department staff",
      icon: "bi-people",
      link: "/office_staff_details",
      color: "info",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      title: "Verified Complaints",
      description: "Track resolved and verified cases",
      icon: "bi-check-circle",
      link: "/staff_verified_complaint",
      color: "success",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      title: "Citizen Feedback",
      description: "View and analyze citizen feedback",
      icon: "bi-star",
      link: "/officer_view_feedback/",
      color: "warning",
      gradient: "linear-gradient(135deg, #fad961 0%, #f76b1c 100%)"
    },
    {
      title: "My Profile",
      description: "Update your profile and settings",
      icon: "bi-person-circle",
      link: "/officer/profile",
      color: "dark",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Reports & Analytics",
      description: "Generate reports and view analytics",
      icon: "bi-graph-up",
      link: "/complaint/analytics/",
      color: "purple",
      gradient: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
    }
  ];

  const quickStats = [
    { label: "Assigned", value: officerData.stats.totalAssigned, icon: "bi-inbox", color: "primary" },
    { label: "Pending", value: officerData.stats.pending, icon: "bi-clock", color: "warning" },
    { label: "Resolved", value: officerData.stats.resolved, icon: "bi-check-circle", color: "success" },
    { label: "Escalations", value: officerData.stats.escalations, icon: "bi-exclamation-triangle", color: "danger" },
    { label: "Feedback", value: officerData.stats.feedbackReceived, icon: "bi-star", color: "info" }
  ];

  // Navbar items
  const navItems = [
    { name: "Dashboard", path: "/officer/dashboard", icon: "bi-speedometer2" },
    { name: "Complaints", path: "/officer-complaint-based-dpt", icon: "bi-clipboard-data" },
    { name: "Escalations", path: "/officer/escalations", icon: "bi-exclamation-triangle" },
    { name: "Staff", path: "/office_staff_details", icon: "bi-people" },
    { name: "Verified", path: "/staff_verified_complaint", icon: "bi-check-circle" },
    { name: "Feedback", path: "/officer_view_feedback", icon: "bi-star" },
    { name: "Reports", path: "/officer/analytics", icon: "bi-graph-up" }
  ];

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-gradient-primary">
        <div className="text-center text-white">
          <div className="spinner-border mb-3" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Dashboard...</h4>
          <p className="text-white-50">Preparing your workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Animated Background */}
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        zIndex: -1,
        opacity: 0.1
      }}></div>

      {/* Header Section */}
      <div className="bg-white shadow-sm py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="fw-bold mb-0 text-primary">
                <i className="bi bi-speedometer2 me-2"></i>
                Officer Dashboard
              </h1>
            </div>
            <div className="col-md-4 text-end">
              <div className="dropdown">
                <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-2"></i>
                  {officerData.name.split(' ')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/officer/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
                  <li><Link className="dropdown-item" to="/settings"><i className="bi bi-gear me-2"></i>Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                      style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
              {/* Quick Logout Button (Optional) */}
              <button 
                className="btn btn-outline-danger btn-sm ms-2"
                onClick={handleLogout}
                title="Logout"
                style={{ padding: '5px 10px' }}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#officerNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="officerNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link 
                    className="nav-link d-flex align-items-center" 
                    to={item.path}
                    style={{ position: 'relative' }}
                  >
                    <i className={`${item.icon} me-2`}></i>
                    {item.name}
                    {item.name === "Escalations" && officerData.stats.escalations > 0 && (
                      <span className="badge bg-danger rounded-pill ms-2">
                        {officerData.stats.escalations}
                      </span>
                    )}
                    {item.name === "Complaints" && officerData.stats.pending > 0 && (
                      <span className="badge bg-warning rounded-pill ms-2">
                        {officerData.stats.pending}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="d-flex">
              <div className="dropdown">
                <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-grid me-2"></i>
                  Quick Links
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/officer/escalations/high-priority">
                    <i className="bi bi-flag-fill text-danger me-2"></i>
                    High Priority Escalations
                  </Link></li>
                  <li><Link className="dropdown-item" to="/officer/complaints/urgent">
                    <i className="bi bi-clock-history text-warning me-2"></i>
                    Urgent Complaints
                  </Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/officer/escalations/reports">
                    <i className="bi bi-file-earmark-text me-2"></i>
                    Escalation Reports
                  </Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="container mt-4">
        <div className="card border-0 shadow-lg animate__animated animate__fadeIn">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center">
                  <div className="avatar-xl bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4">
                    <i className="bi bi-person-badge text-primary fs-1"></i>
                  </div>
                  <div>
                    <h2 className="fw-bold mb-1">Good {timeOfDay}, {officerData.name} 👋</h2>
                    <p className="text-muted mb-0">
                      <i className="bi bi-building me-2"></i>
                      {officerData.department} Department
                    </p>
                    <div className="d-flex align-items-center mt-2">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`bi bi-star${i < Math.floor(officerData.stats.rating) ? '-fill' : ''} text-warning me-1`}></i>
                        ))}
                      </div>
                      <span className="ms-2 text-muted">{officerData.stats.rating}/5.0 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <div className="text-muted">
                  <i className="bi bi-calendar3 me-2"></i>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="mt-2">
                  {officerData.stats.escalations > 0 ? (
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="badge bg-danger me-2">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        {officerData.stats.escalations} Escalations
                      </span>
                      <span className="badge bg-success">
                        <i className="bi bi-check-circle me-1"></i>
                        Active Now
                      </span>
                    </div>
                  ) : (
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle me-1"></i>
                      Active Now
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mt-4">
        <div className="row g-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="col-md-3">
              <div className="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">{stat.label}</h6>
                      <h2 className="mb-0 fw-bold">
                        {stat.value}
                        {stat.label === 'Feedback' && <span className="fs-6 text-muted"> reviews</span>}
                      </h2>
                    </div>
                    <div className={`avatar bg-${stat.color}-subtle p-3 rounded-circle`}>
                      <i className={`${stat.icon} fs-3 text-${stat.color}`}></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    {stat.label === 'Resolved' && officerData.stats.totalAssigned > 0 ? (
                      <div className="progress" style={{height: '6px'}}>
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{width: `${(officerData.stats.resolved / officerData.stats.totalAssigned) * 100}%`}}
                        ></div>
                      </div>
                    ) : stat.label === 'Escalations' && officerData.stats.escalations > 0 ? (
                      <div className="d-flex align-items-center">
                        <small className={`text-${stat.color}`}>
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          {officerData.stats.escalations} need immediate attention
                        </small>
                      </div>
                    ) : stat.label === 'Feedback' ? (
                      <div className="d-flex align-items-center">
                        <div className="rating-stars small">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < 4 ? '-fill' : ''} text-warning me-1`}></i>
                          ))}
                        </div>
                        <small className="text-muted ms-2">Avg: 4.2/5</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Cards */}
      <div className="container mt-5">
        <h3 className="fw-bold mb-4">
          <i className="bi bi-grid me-2"></i>
          Quick Actions
        </h3>
        <div className="row g-4">
          {dashboardCards.map((card, index) => (
            <div key={index} className="col-md-4 col-lg-3">
              <Link to={card.link} className="text-decoration-none">
                <div className="card dashboard-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp hover-lift"
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="avatar-lg bg-gradient-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                           style={{background: card.gradient, width: '60px', height: '60px'}}>
                        <i className={`${card.icon} fs-3 text-${card.color}`}></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{card.title}</h5>
                        <p className="text-muted mb-0">{card.description}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={`badge bg-${card.color} bg-opacity-10 text-${card.color}`}>
                        Click to access <i className="bi bi-arrow-right ms-1"></i>
                      </span>
                      {card.title === "Escalations" && officerData.stats.escalations > 0 && (
                        <span className="badge bg-danger ms-2">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          {officerData.stats.escalations} Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Announcements */}
      <div className="container mt-5 mb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">
                  <i className="bi bi-clock-history me-2"></i>
                  Recent Activity
                </h5>
                <Link to="/officer/activity" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {[
                    { activity: "Escalation #E-789 assigned to you", time: "1 hour ago", icon: "bi-exclamation-triangle", color: "danger", priority: "high" },
                    { activity: "Assigned complaint #1234 to John Doe", time: "2 hours ago", icon: "bi-person-plus", color: "primary" },
                    { activity: "Resolved complaint #1231", time: "Yesterday", icon: "bi-check-circle", color: "success" },
                    { activity: "Received new complaint #1235", time: "2 days ago", icon: "bi-inbox", color: "info" },
                    { activity: "Reviewed 5 citizen feedback entries", time: "3 days ago", icon: "bi-star", color: "warning" }
                  ].map((item, index) => (
                    <li key={index} className="list-group-item border-0 px-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className={`avatar-sm bg-${item.color}-subtle rounded-circle d-flex align-items-center justify-content-center me-3`}>
                          <i className={`${item.icon} text-${item.color}`}></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0">{item.activity}</p>
                            {item.priority === "high" && (
                              <span className="badge bg-danger">High Priority</span>
                            )}
                          </div>
                          <small className="text-muted">{item.time}</small>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">
                  <i className="bi bi-megaphone me-2"></i>
                  Announcements
                </h5>
                <span className="badge bg-info">3 New</span>
              </div>
              <div className="card-body">
                <div className="alert alert-danger">
                  <div className="d-flex">
                    <i className="bi bi-exclamation-triangle fs-5 me-3"></i>
                    <div>
                      <strong>Escalation Protocol Updated</strong>
                      <p className="mb-0 small">New escalation handling procedures effective immediately. Review in the Escalations section.</p>
                      <small className="text-muted">Posted 2 hours ago</small>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary">
                  <div className="d-flex">
                    <i className="bi bi-info-circle fs-5 me-3"></i>
                    <div>
                      <strong>Feedback System Launched</strong>
                      <p className="mb-0 small">Citizens can now provide feedback on resolved complaints. Check the new Feedback section.</p>
                      <small className="text-muted">Posted 1 day ago</small>
                    </div>
                  </div>
                </div>
                <div className="alert alert-success">
                  <div className="d-flex">
                    <i className="bi bi-check-circle fs-5 me-3"></i>
                    <div>
                      <strong>Department Meeting</strong>
                      <p className="mb-0 small">Monthly review meeting scheduled for Friday, 3 PM.</p>
                      <small className="text-muted">Posted 2 days ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Escalations Preview */}
      {officerData.stats.escalations > 0 && (
        <div className="container mt-4">
          <div className="card border-0 shadow-sm border-danger">
            <div className="card-header bg-danger text-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Pending Escalations
              </h5>
              <Link to="/officer/escalations" className="btn btn-sm btn-light">
                Manage All <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {[
                  { id: "E-789", title: "Water Supply Issue", department: "Public Works", priority: "High", assignedTo: "You", days: 2 },
                  { id: "E-788", title: "Road Repair Delay", department: "Transport", priority: "Medium", assignedTo: "Sarah Johnson", days: 5 },
                  { id: "E-787", title: "Garbage Collection", department: "Sanitation", priority: "High", assignedTo: "You", days: 1 }
                ].map((escalation, index) => (
                  <div key={index} className="col-md-4">
                    <div className={`card border-${escalation.priority === "High" ? "danger" : "warning"} h-100`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className={`badge bg-${escalation.priority === "High" ? "danger" : "warning"}`}>
                            {escalation.priority} Priority
                          </span>
                          <span className="text-muted small">#{escalation.id}</span>
                        </div>
                        <h6 className="fw-bold">{escalation.title}</h6>
                        <p className="small text-muted mb-2">{escalation.department}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="small">
                            <i className="bi bi-person me-1"></i>
                            {escalation.assignedTo}
                          </span>
                          <span className="small text-muted">
                            <i className="bi bi-clock me-1"></i>
                            {escalation.days} day{escalation.days > 1 ? 's' : ''}
                          </span>
                        </div>
                        {escalation.assignedTo === "You" && (
                          <div className="mt-3">
                            <Link to="/officer/escalations" className="btn btn-sm btn-danger w-100">
                              <i className="bi bi-arrow-right-circle me-1"></i>
                              Take Action
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Summary */}
      <div className="container mt-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-star-fill text-warning me-2"></i>
              Recent Citizen Feedback
            </h5>
            <Link to="/officer/feedback" className="btn btn-sm btn-outline-warning">
              View All <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {[
                { id: 1231, rating: 5, comment: "Excellent service, resolved quickly!", type: "Resolution Quality", date: "Today" },
                { id: 1228, rating: 4, comment: "Good response time, could improve communication", type: "Timeliness", date: "Yesterday" },
                { id: 1225, rating: 5, comment: "Very satisfied with the outcome", type: "Overall Satisfaction", date: "2 days ago" },
                { id: 1220, rating: 3, comment: "Average experience, took longer than expected", type: "General Feedback", date: "3 days ago" }
              ].map((feedback, index) => (
                <div key={index} className="col-md-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <div className="mb-2">
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < feedback.rating ? '-fill' : ''} text-warning`}></i>
                          ))}
                        </div>
                      </div>
                      <h6 className="fw-bold mb-1">Complaint #{feedback.id}</h6>
                      <p className="text-muted small mb-2">{feedback.type}</p>
                      <p className="small mb-2" style={{fontSize: '0.8rem'}}>"{feedback.comment}"</p>
                      <small className="text-muted">{feedback.date}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-light py-4 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted">
                <i className="bi bi-shield-check me-2"></i>
                Officer Dashboard v2.0 • Secure Portal
              </p>
            </div>
            <div className="col-md-6 text-end">
              <p className="mb-0 text-muted">
                <i className="bi bi-clock me-2"></i>
                Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {officerData.stats.escalations > 0 && (
                  <span className="ms-3 badge bg-danger">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    {officerData.stats.escalations} Active Escalations
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .dashboard-card {
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }
        
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
          border-color: #667eea;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
        }
        
        .avatar {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .avatar-sm {
          width: 40px;
          height: 40px;
        }
        
        .avatar-lg {
          width: 60px;
          height: 60px;
        }
        
        .avatar-xl {
          width: 80px;
          height: 80px;
        }
        
        .rating-stars {
          color: #ffc107;
        }
        
        .rating-stars.small i {
          font-size: 0.8rem;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bg-purple {
          background-color: #6f42c1;
        }
        
        .bg-purple-subtle {
          background-color: rgba(111, 66, 193, 0.1);
        }
        
        .text-purple {
          color: #6f42c1;
        }
        
        .bg-success-subtle {
          background-color: rgba(25, 135, 84, 0.1);
        }
        
        .bg-warning-subtle {
          background-color: rgba(255, 193, 7, 0.1);
        }
        
        .bg-info-subtle {
          background-color: rgba(13, 202, 240, 0.1);
        }
        
        .bg-primary-subtle {
          background-color: rgba(13, 110, 253, 0.1);
        }
        
        .bg-danger-subtle {
          background-color: rgba(220, 53, 69, 0.1);
        }
        
        .card-header {
          border-bottom: 1px solid rgba(0,0,0,.125);
        }
        
        .list-group-item:last-child {
          border-bottom: 0;
        }
        
        .navbar-nav .nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
        }
        
        .navbar-nav .nav-link:hover {
          background-color: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .border-danger {
          border: 2px solid #dc3545 !important;
        }
      `}</style>
    </div>
  );
};

export default OfficerDashboard;