import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import your navbar
import CitizenRegister from "./CitizenRegister";
import OfficerRegister from "./OfficerRegister";
import Login from "./Login"; // import Login page
import Navbar from "./Navbar";
import OfficerDashboardLayout from "./OfficerDashboardLayout";
import CitizenDashboardLayout from "./CitizenDashboardLayout";
import Home from "./Home";
import ComplaintForm from "./ComplaintForm";
import ComplaintHistory from "./ComplaintList";
import VerifyEmail from "./VerifyEmail";
import OfficerComplaintView from "./OfficerComplaintView";
import StaffRegister from "./Staff_Register";
import PendingStaffList from "./Offier_view_staff_list";
import StaffDashboard from "./Staff_Dashboard";
import StaffAssignedComplaints from "./StaffAssignedComplaints";
import OfficerReturnedComplaints from "./Officer_view_staffVerify";
import GeoComplaintsMap from "./GeocomplaintMap";
import CitizenProfile from "./Profile";
import StaffProfile from "./StaffProfile";
import OfficerProfile from "./OfficerProfile";
import { LogOut } from "lucide-react";
import Logout from "./Logout";
import CitizenSuggestionForm from "./Suggestions";
import OfficerViewStaffDetails from "./OfficerViewStaffDetails";
import CitizenTrackComplaint from "./CitizenTrackComplaint";
import TrackComplaint from "./ComplaintTracking";
import ComplaintFeedback from "./Feedback";
import VerifiedComplaints from "./Citizenview_final_verify";
import OfficerViewFeedback from "./OfficerViewFeedback";
import OfficerEscalatedComplaints from "./OfficerEscalatedComplaints";
import CitizenEscalatedComplaints from "./CitizenEscalatedComplaints";
import AnalyticsDashboard from "./AnalyticsDashboard";
// import CitizenSuggestionForm from "./Suggestions";





function App() {
  return (
    <Router>
      
       {location.pathname === "/login" && <Navbar />}
  {/* Navbar appears on all pages */}
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/logout" element={<Logout />} />
        <Route path="/citizen-register" element={<CitizenRegister />} />
        <Route path="/officer-register" element={<OfficerRegister />} />
        <Route path="/staff-register" element={<StaffRegister />} />
        <Route path="/citizen/complaints/map" element={<GeoComplaintsMap />} />
        <Route path="/pending-list" element={<PendingStaffList />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/Assign_complained_view" element={<StaffAssignedComplaints/>} />
        <Route path="/login" element={<Login />} />
         <Route path="/officer-dashboard" element={<OfficerDashboardLayout />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboardLayout />} />
        <Route path="/citizen-profile" element={<CitizenProfile />} />
        {/* <Route path="/citizen-create-complaint" element={<ComplaintForm/>} /> */}
        <Route path="/citizen/complaints" element={<ComplaintForm />} />
         <Route path="/citizen/complaints/History" element={<ComplaintHistory />} />
         <Route path="/verify-email/:uidb64/:token" element={<VerifyEmail />} />
          <Route path="/officer-complaint based-dpt" element={<OfficerComplaintView />} />
                <Route path="/staff_verified_complaint" element={<OfficerReturnedComplaints/>} />
                 <Route path="/staff_profile_view" element={<StaffProfile/>} />
                 <Route path="/officer/profile"element={<OfficerProfile />}/>
                  <Route path="/suggection/sent/"element={<CitizenSuggestionForm />}/>
                  <Route path="/office_staff_details/"element={<OfficerViewStaffDetails />}/>
                       <Route path="/citizen_track_complaint/:id"element={<TrackComplaint />}/>
                      <Route path="/complaint_feedback/"element={<ComplaintFeedback />}/>
                      <Route path="/citizen_view_final/"element={<VerifiedComplaints />}/>
                      <Route path="/officer_view_feedback/"element={<OfficerViewFeedback />}/>
                    <Route path="/officer/escalations" element={<OfficerEscalatedComplaints />} />
        <Route path="/citizen/escalations" element={<CitizenEscalatedComplaints />} />
                <Route path="/complaint/analytics/" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
    
  );
}

export default App;
