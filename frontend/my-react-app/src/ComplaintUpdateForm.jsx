
import React, { useState, useEffect } from "react";
import axiosInstance from "./api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ComplaintUpdateForm() {
  const { id } = useParams(); // complaint id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    location: "",
    description: "",
    attachment: null,
  });

  // Fetch complaint details
  useEffect(() => {
    axiosInstance
      .get(`/citizen/complaints/update/${id}/`)
      .then((res) => {
        setFormData({
          category: res.data.category,
          priority: res.data.priority,
          location: res.data.location,
          description: res.data.description,
          attachment: null, // don't prefill file input
        });
      })
      .catch(() => alert("Failed to load complaint"));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // Submit updated complaint
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      await axiosInstance.put(`http://127.0.0.1:8000/api/citizen/complaints/update/%3Cint:complaint_id%3E/`, data);
      alert("Complaint updated successfully!");
      navigate("/citizen/complaints/history"); // navigate back to history page
    } catch (err) {
      console.error(err);
      alert("Failed to update complaint");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="category"
          value={formData.category}
          placeholder="Category"
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          className="form-control mb-2"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        ></textarea>

        <input
          type="file"
          className="form-control mb-2"
          name="attachment"
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Update Complaint
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/citizen/complaints/history/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
