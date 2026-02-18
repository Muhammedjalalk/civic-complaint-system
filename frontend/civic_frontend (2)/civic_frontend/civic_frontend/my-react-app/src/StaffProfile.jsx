import React, { useEffect, useState } from "react";
import axios from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";

const StaffProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/accounts/staff/profile/");
      setProfile(res.data.staff_profile);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Staff Profile</h4>
            </div>

            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Full Name</th>
                    <td>{profile.full_name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{profile.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{profile.phone}</td>
                  </tr>
                  <tr>
                    <th>License Number</th>
                    <td>{profile.license_number}</td>
                  </tr>
                  <tr>
                    <th>Place</th>
                    <td>{profile.place}</td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>{profile.department?.name || "Not Assigned"}</td>
                  </tr>
                  <tr>
                    <th>Approval Status</th>
                    <td>
                      <span
                        className={`badge ${
                          profile.approval_status === "Approved"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {profile.approval_status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Account Status</th>
                    <td>
                      {profile.is_active ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-footer text-center text-muted">
              Role: <strong>{profile.role}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
