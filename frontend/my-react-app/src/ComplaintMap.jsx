import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom priority markers
const createPriorityIcon = (priority) => {
  const iconColor = getPriorityColor(priority);
  
  return new L.DivIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${iconColor};
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'priority-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return '#e53e3e';
    case 'medium': return '#d69e2e';
    case 'low': return '#38a169';
    default: return '#718096';
  }
};

// Default location (Kerala center)
const DEFAULT_CENTER = [10.8505, 76.2711];
const DEFAULT_ZOOM = 8;

// Location mapping for common places in Kerala
const LOCATION_COORDINATES = {
  'malappuram': [11.041, 76.081],
  'kozhikode': [11.2588, 75.7804],
  'kochi': [9.9312, 76.2673],
  'thiruvananthapuram': [8.5241, 76.9366],
  'ernakulam': [9.9816, 76.2999],
  'thrissur': [10.5276, 76.2144],
  'kannur': [11.8745, 75.3704],
  'kollam': [8.8932, 76.6141],
  'alappuzha': [9.4981, 76.3388],
  'palakkad': [10.7867, 76.6548],
  'kasaragod': [12.4996, 74.9869],
  'wayanad': [11.6850, 76.1320],
  'idukki': [9.8494, 76.9686],
  'pathanamthitta': [9.2648, 76.7870],
};

const getCoordinatesFromLocation = (location) => {
  if (!location) return null;
  
  // Try to find exact match
  const lowerLocation = location.toLowerCase();
  if (LOCATION_COORDINATES[lowerLocation]) {
    return LOCATION_COORDINATES[lowerLocation];
  }
  
  // Try to find partial match
  for (const [key, coords] of Object.entries(LOCATION_COORDINATES)) {
    if (lowerLocation.includes(key) || key.includes(lowerLocation)) {
      return coords;
    }
  }
  
  return null;
};

const ComplaintMap = ({ complaints }) => {
  const validComplaints = complaints.filter(complaint => {
    const coords = getCoordinatesFromLocation(complaint.location);
    return coords && complaint.location;
  });

  const mapCenter = validComplaints.length > 0 
    ? getCoordinatesFromLocation(validComplaints[0].location) 
    : DEFAULT_CENTER;

  return (
    <MapContainer
      center={mapCenter}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {validComplaints.map((complaint) => {
        const coordinates = getCoordinatesFromLocation(complaint.location);
        if (!coordinates) return null;
        
        return (
          <Marker
            key={complaint.id}
            position={coordinates}
            icon={createPriorityIcon(complaint.priority)}
          >
            <Popup>
              <div style={{ padding: '5px', minWidth: '200px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#2d3748' }}>
                  Complaint #{complaint.id}
                </div>
                <div style={{ marginBottom: '6px', fontSize: '13px' }}>
                  <strong>Location:</strong> {complaint.location}
                </div>
                <div style={{ marginBottom: '6px', fontSize: '13px' }}>
                  <strong>Priority:</strong> 
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    marginLeft: '8px',
                    backgroundColor: getPriorityColor(complaint.priority),
                    color: 'white'
                  }}>
                    {complaint.priority}
                  </span>
                </div>
                <div style={{ marginBottom: '6px', fontSize: '13px' }}>
                  <strong>Status:</strong> {complaint.status}
                </div>
                <div style={{ marginBottom: '6px', fontSize: '13px' }}>
                  <strong>Description:</strong> {complaint.description?.substring(0, 100)}...
                </div>
                <div style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
                  <i>{new Date(complaint.created_at).toLocaleDateString()}</i>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ComplaintMap;