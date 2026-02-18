import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons - use imports instead of require
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapModal = ({ 
  show, 
  onClose, 
  complaint, 
  location, 
  coordinates 
}) => {
  const [isOpenStreetMap, setIsOpenStreetMap] = useState(true);
  const [searchAddress, setSearchAddress] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      // Generate Google Maps URL when modal opens
      const googleUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15`;
      setGoogleMapsUrl(googleUrl);
      setSearchAddress(location);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show, coordinates, location]);

  // Create priority-based marker icon
  const createPriorityIcon = (priority) => {
    let color = '#6c757d'; // Default gray
    
    if (priority) {
      switch(priority.toLowerCase()) {
        case 'high':
          color = '#dc3545'; // Red
          break;
        case 'medium':
          color = '#ffc107'; // Yellow/Orange
          break;
        case 'low':
          color = '#198754'; // Green
          break;
      }
    }
    
    return new L.DivIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          transition: all 0.3s ease;
        ">
          <i class="bi bi-geo-alt-fill" style="font-size: 14px;"></i>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Get priority color for badge
  const getPriorityColor = (priority) => {
    if (!priority) return 'secondary';
    switch(priority.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  // Get status color for badge
  const getStatusColor = (status) => {
    if (!status) return 'secondary';
    const statusLower = status.toLowerCase();
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'assigned') return 'primary';
    if (statusLower === 'in progress' || statusLower === 'in_progress') return 'info';
    if (statusLower === 'resolved') return 'success';
    return 'secondary';
  };

  const handleGoogleMapsClick = () => {
    if (!location || location === "Unknown Location") {
      alert("No location available to open in Google Maps");
      return;
    }
    
    // Create Google Maps URL with coordinates
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCoordinates = () => {
    const coords = `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`;
    navigator.clipboard.writeText(coords)
      .then(() => {
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed top-50 start-50 translate-middle';
        notification.style.zIndex = '9999';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.textContent = 'Coordinates copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 2000);
      })
      .catch(err => console.error('Failed to copy coordinates:', err));
  };

  const handleSearchInGoogleMaps = () => {
    if (!searchAddress.trim()) {
      alert("Please enter an address to search");
      return;
    }
    
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchAddress)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectionsClick = () => {
    // Open Google Maps with directions from current location
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareLocation = () => {
    const shareText = `Complaint Location: ${location}\nCoordinates: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}\nGoogle Maps: ${googleMapsUrl}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Complaint Location',
        text: shareText,
        url: googleMapsUrl
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Location information copied to clipboard!');
        });
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ 
      backgroundColor: 'rgba(0,0,0,0.7)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1050
    }}>
      <div className="modal-dialog modal-dialog-centered modal-xl animate__animated animate__zoomIn" style={{ maxWidth: '95%' }}>
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div className="modal-header bg-primary text-white border-0" style={{ borderRadius: '12px 12px 0 0', padding: '1rem 1.5rem' }}>
            <h5 className="modal-title fw-bold">
              <i className="bi bi-map me-2"></i>
              {complaint?.category || "Complaint"} Location
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body p-0 position-relative" style={{ minHeight: '500px' }}>
            {/* Map Type Toggle */}
            <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 1000 }}>
              <div className="btn-group btn-group-sm shadow-sm">
                <button 
                  className={`btn ${isOpenStreetMap ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setIsOpenStreetMap(true)}
                >
                  <i className="bi bi-globe me-1"></i> OSM
                </button>
                <button 
                  className={`btn ${!isOpenStreetMap ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setIsOpenStreetMap(false)}
                >
                  <i className="bi bi-map me-1"></i> Satellite
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div style={{ height: '500px', width: '100%' }}>
              <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                className="rounded-0"
                zoomControl={true}
                scrollWheelZoom={true}
                dragging={true}
              >
                {isOpenStreetMap ? (
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                ) : (
                  <TileLayer
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                  />
                )}
                <Marker 
                  position={[coordinates.lat, coordinates.lng]} 
                  icon={createPriorityIcon(complaint?.priority)}
                  eventHandlers={{
                    mouseover: (e) => e.target.openPopup(),
                    mouseout: (e) => e.target.closePopup(),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h6 className="fw-bold mb-2">{complaint?.category || "Complaint"}</h6>
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <i className="bi bi-geo-alt me-1"></i>
                          {location}
                        </small>
                      </div>
                      <div className="d-flex gap-2 mb-2">
                        <span className={`badge bg-${getPriorityColor(complaint?.priority)}`}>
                          {complaint?.priority || 'N/A'}
                        </span>
                        <span className={`badge bg-${getStatusColor(complaint?.status)}`}>
                          {complaint?.status || 'N/A'}
                        </span>
                      </div>
                      <div className="text-muted small">
                        <i className="bi bi-geo me-1"></i>
                        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                      </div>
                      <div className="mt-2">
                        <a 
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary w-100"
                        >
                          <i className="bi bi-google me-1"></i> Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Location Info Overlay */}
            <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 1000 }}>
              <div className="card shadow-sm bg-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', maxWidth: '300px' }}>
                <div className="card-body p-3">
                  <h6 className="card-title fw-bold mb-2">
                    <i className="bi bi-info-circle me-2 text-primary"></i>
                    Location Details
                  </h6>
                  
                  {/* Search Address */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Search Address in Google Maps</label>
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address..."
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchInGoogleMaps()}
                      />
                      <button 
                        className="btn btn-primary"
                        onClick={handleSearchInGoogleMaps}
                        title="Search in Google Maps"
                      >
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <small className="text-muted">Coordinates</small>
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fw-medium">
                        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                      </p>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleCopyCoordinates}
                        title="Copy coordinates"
                      >
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </div>
                  </div>
                  
                  {complaint && (
                    <div className="mt-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <small className="text-muted">Priority:</small>
                        <span className={`badge bg-${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority || 'N/A'}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <small className="text-muted">Status:</small>
                        <span className={`badge bg-${getStatusColor(complaint.status)}`}>
                          {complaint.status || 'N/A'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Overlay */}
            <div className="position-absolute bottom-0 start-0 m-3" style={{ zIndex: 1000 }}>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary btn-sm shadow-sm"
                  onClick={handleGoogleMapsClick}
                  title="Open in Google Maps"
                >
                  <i className="bi bi-google me-1"></i> Google Maps
                </button>
                <button 
                  className="btn btn-success btn-sm shadow-sm"
                  onClick={handleDirectionsClick}
                  title="Get Directions"
                >
                  <i className="bi bi-signpost me-1"></i> Directions
                </button>
                <button 
                  className="btn btn-info btn-sm shadow-sm"
                  onClick={handleShareLocation}
                  title="Share Location"
                >
                  <i className="bi bi-share me-1"></i> Share
                </button>
              </div>
            </div>
          </div>
          
          <div className="modal-footer border-top bg-light" style={{ padding: '1rem 1.5rem' }}>
            {/* Priority Legend */}
            <div className="d-flex align-items-center gap-3 me-auto">
              <small className="fw-bold text-muted">Priority:</small>
              <div className="d-flex align-items-center gap-1">
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#dc3545',
                  display: 'inline-block'
                }}></div>
                <small>High</small>
              </div>
              <div className="d-flex align-items-center gap-1">
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ffc107',
                  display: 'inline-block'
                }}></div>
                <small>Medium</small>
              </div>
              <div className="d-flex align-items-center gap-1">
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#198754',
                  display: 'inline-block'
                }}></div>
                <small>Low</small>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              <a
                href={`https://www.google.com/maps/@${coordinates.lat},${coordinates.lng},17z`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                <i className="bi bi-google me-1"></i>
                Street View
              </a>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                <i className="bi bi-x-lg me-1"></i>
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleGoogleMapsClick}
              >
                <i className="bi bi-google me-1"></i>
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          border-left: 4px solid #0d6efd !important;
        }
        
        .leaflet-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        .leaflet-popup-content {
          margin: 12px !important;
        }
        
        .leaflet-popup-content p {
          margin: 0 0 8px 0 !important;
        }
        
        .leaflet-popup-content-wrapper {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        
        .leaflet-control-zoom {
          margin: 10px !important;
        }
        
        .modal-footer a {
          text-decoration: none;
        }
        
        @media (max-width: 768px) {
          .position-absolute {
            position: relative !important;
            margin: 1rem !important;
            top: 0 !important;
            bottom: auto !important;
          }
          
          .position-absolute.start-0 {
            width: calc(100% - 2rem) !important;
          }
          
          .modal-footer {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .modal-footer > div {
            width: 100% !important;
            justify-content: center !important;
          }
          
          .btn-group {
            width: 100% !important;
          }
          
          .btn-group .btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MapModal;