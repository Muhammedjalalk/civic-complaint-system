// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios"; // adjust path if needed

// export default function OfficerViewStaffDetails() {
//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchStaffDetails();
//   }, []);

//   const fetchStaffDetails = async () => {
//     try {
//       const res = await privateAPI.get("/accounts/officer/staff/details/");
//       setStaffList(res.data.staff);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch staff details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading staff details...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Department Staff Details</h2>

//       {staffList.length === 0 ? (
//         <p>No staff found for your department</p>
//       ) : (
//         <table border="1" cellPadding="10" width="100%">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Department</th>
//               <th>Status</th>
//               <th>Active</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.map((staff) => (
//               <tr key={staff.id}>
//                 <td>{staff.full_name}</td>
//                 <td>{staff.email}</td>
//                 <td>{staff.phone}</td>
//                 <td>{staff.department?.name}</td>
//                 <td>{staff.approval_status}</td>
//                 <td>{staff.is_active ? "Yes" : "No"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function OfficerViewStaffDetails() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const fetchStaffDetails = async () => {
    try {
      const res = await privateAPI.get("/accounts/officer/staff/details/");
      setStaffList(res.data.staff);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch staff details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <i className="bi bi-people-fill me-2"></i>
          Department Staff Details
        </h2>
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={fetchStaffDetails}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>

      {staffList.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No staff found for your department
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th>
                  <i className="bi bi-person me-2"></i>
                  Name
                </th>
                <th>
                  <i className="bi bi-envelope me-2"></i>
                  Email
                </th>
                <th>
                  <i className="bi bi-telephone me-2"></i>
                  Phone
                </th>
                <th>
                  <i className="bi bi-building me-2"></i>
                  Department
                </th>
                <th>
                  <i className="bi bi-info-circle me-2"></i>
                  Status
                </th>
                <th>
                  <i className="bi bi-toggle-on me-2"></i>
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id}>
                  <td className="fw-medium">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    {staff.full_name}
                  </td>
                  <td>
                    <i className="bi bi-envelope me-2 text-muted"></i>
                    {staff.email}
                  </td>
                  <td>
                    <i className="bi bi-telephone me-2 text-muted"></i>
                    {staff.phone || "N/A"}
                  </td>
                  <td>
                    <span className="badge bg-info">
                      <i className="bi bi-building me-1"></i>
                      {staff.department?.name || "N/A"}
                    </span>
                  </td>
                  <td>
                    {staff.approval_status === "approved" ? (
                      <span className="badge bg-success">
                        <i className="bi bi-check-circle me-1"></i>
                        Approved
                      </span>
                    ) : staff.approval_status === "pending" ? (
                      <span className="badge bg-warning text-dark">
                        <i className="bi bi-clock me-1"></i>
                        Pending
                      </span>
                    ) : (
                      <span className="badge bg-secondary">
                        {staff.approval_status || "N/A"}
                      </span>
                    )}
                  </td>
                  <td>
                    {staff.is_active ? (
                      <span className="badge bg-success">
                        <i className="bi bi-check-circle me-1"></i>
                        Yes
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        <i className="bi bi-x-circle me-1"></i>
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}