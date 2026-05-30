// GeoComplaintsMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GeoComplaintsMap = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from API
    fetch('/accounts/complaints/geo/', {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with JWT if needed
      },
    })
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error(err));
  }, []);

  // Function to get marker color based on priority
  const getMarkerColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'blue';
    }
  };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer center={[12.9716, 77.5946]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {complaints.map((complaint) => 
          complaint.latitude && complaint.longitude && (
            <CircleMarker
              key={complaint.id}
              center={[complaint.latitude, complaint.longitude]}
              color={getMarkerColor(complaint.priority)}
              radius={8}
              fillOpacity={0.8}
            >
              <Popup>
                <b>Category:</b> {complaint.category} <br />
                <b>Priority:</b> {complaint.priority} <br />
                <b>Location:</b> {complaint.location} <br />
                <b>Created At:</b> {complaint.created_at}
              </Popup>
            </CircleMarker>
          )
        )}
      </MapContainer>
    </div>
  );
};

export default GeoComplaintsMap;
