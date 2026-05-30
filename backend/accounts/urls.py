from django.conf.urls.static import static
from django.conf import settings
from django.urls import path
from accounts.views import (
    citizen_register,
    citizen_login,
    CitizenProfileView,
    CitizenComplaintView,
    VerifyEmailView,
    CitizenComplaintHistoryView,
       CitizenTrackComplaintView
)
from accounts.views import (
    officer_register,
    officer_login,
    OfficerComplaintView,
    pending_staff_list,
    update_staff_status,
    OfficerStaffListView,
    # AssignComplaintView
)
from accounts.views import (
    staff_register,
    staff_login,
    StaffAssignedComplaintsView,
    UpdateAssignmentStatusView,
    ReturnComplaintToOfficer,
    EscalateComplaintView,
    MultiDepartmentAssignmentView,
    ComplaintGeoMapView,
    ScheduleMeetingView,
    ListMeetingsView,
    DepartmentByCategoryView,
    CategoryListView,
     officerAssignComplaintView,
     StaffProfileView,
     OfficerProfileView,
    #  CitizenSuggestionCreateView,
    #  DepartmentListView,
    #  CitizenSuggestionListView,
    SuggestionReplyView,
    OfficerReturnedComplaintsView,
   OfficerViewStaffDetails,
   OfficerFinalVerificationView,
   OfficerEscalateComplaintsView,
   OfficerVerificationHistoryView,
  ComplaintFeedbackView,
  citizen_verified_complaints,
  CitizenComplaintFeedbackView,
  OfficerViewFeedback,
OfficerEscalatedComplaintsView,
CitizenEscalatedComplaintsView,
CitizenComplaintDeleteView,
CitizenComplaintUpdateView,
OfficerReassignedComplaintVerificationView

 


  

)

urlpatterns = [

    # -------------------- Citizen --------------------
    path("register/citizen/", citizen_register, name="citizen-register"),
    path("citizen/login/", citizen_login, name="citizen-login"),
    path("citizen/profile/", CitizenProfileView.as_view(), name="citizen-profile"),
    path("citizen/complaints/", CitizenComplaintView.as_view(), name="citizen-complaints"),
    path("citizen/complaints/history/", CitizenComplaintHistoryView.as_view(), name="citizen-complaints-history"),
    path("citizen/verify-email/", VerifyEmailView.as_view(), name="citizen-verify-email"),

    # -------------------- Officer --------------------
    path("register/officer/",officer_register, name="officer-register"),
    path("officer/login/", officer_login, name="officer-login"),
    path("officer/complaints/", OfficerComplaintView.as_view(), name="officer-complaints"),
    path("officer/pending-staff/", pending_staff_list, name="pending-staff-list"),
    path("officer/staff/<int:staff_id>/update-status/", update_staff_status, name="update-staff-status"),
    path("officer/staff-list/", OfficerStaffListView.as_view(), name="officer-staff-list"),
    # path("officer/assign-complaint/", AssignComplaintView.as_view(), name="assign-complaint"),

    # -------------------- Staff --------------------
    path("staff/register/", staff_register, name="staff-register"),
    path("staff/login/", staff_login, name="staff-login"),
    path("staff/assigned-complaints/", StaffAssignedComplaintsView.as_view(), name="staff-assigned-complaints"),
    path("staff/update-assignment-status/", UpdateAssignmentStatusView.as_view(), name="update-assignment-status"),
    path("staff/return-complaint/", ReturnComplaintToOfficer.as_view(), name="return-complaint"),
    path('assignment/<int:assignment_id>/escalate/', EscalateComplaintView.as_view(), name='escalate-complaint'),
    path('complaint/<int:complaint_id>/assign-multi-department/', MultiDepartmentAssignmentView.as_view(), name='multi-department-assign'),
     path('complaints/geo/', ComplaintGeoMapView.as_view(), name='complaints-geo'),
    path('meetings/schedule/', ScheduleMeetingView.as_view(), name='schedule-meeting'),
    path('meetings/', ListMeetingsView.as_view(), name='list-meetings'),
    path("departments/", DepartmentByCategoryView.as_view()),
    path("CategoryList/", CategoryListView.as_view()),
    path("officer/assigned-complaints/",  officerAssignComplaintView.as_view()),
    path("staff/profile/", StaffProfileView.as_view(), name="staff-profile"),
    path("officer/profile/", OfficerProfileView.as_view(), name="officer-profile"),
    # path('departments/', DepartmentListView.as_view(), name='department-list'),
    # path("citizen/suggestions/create/", CitizenSuggestionCreateView.as_view()),
    # path("citizen/suggestions/", CitizenSuggestionListView.as_view()),
    path("officer/complaints/<int:complaint_id>/reply-suggestion/",SuggestionReplyView.as_view()),
    path("officer/staff/details/",OfficerViewStaffDetails.as_view(),name="officer-view-staff-profile"),
    #  path("officer/staff/<int:staff_id>/", OfficerViewStaffProfile.as_view()),
    path("officer/returned-complaints/",OfficerReturnedComplaintsView.as_view(),name="officer-returned-complaints"),
    path("officer/final-verification/",OfficerFinalVerificationView.as_view()),
    path("officer/escalate-complaints/",OfficerEscalateComplaintsView.as_view()),
    path("officer/verification-history/",OfficerVerificationHistoryView.as_view()),
    path("citizen/complaints/track/<int:complaint_id>/",CitizenTrackComplaintView.as_view(),name="track-complaint"),
    path("citizen/complaints/<int:complaint_id>/feedback/",ComplaintFeedbackView.as_view(),name="complaint-feedback"),
    path('citizen/verified-complaints/', citizen_verified_complaints, name='verified-complaints'),
    path("accounts/citizen/feedback/",CitizenComplaintFeedbackView.as_view(),name="citizen-feedback"),
    path("officer/feedback_view/",OfficerViewFeedback.as_view(),name="OfficerViewFeedback"),
    path("officer/escalated-complaints/",OfficerEscalatedComplaintsView.as_view(),name="officer-escalated-complaints",),
    path("citizen/escalated-complaints/",CitizenEscalatedComplaintsView.as_view(),name="citizen-escalated-complaints",),
    # path("officer/final-verification/<int:escalation_id>/",OfficerFinalVerificationView.as_view(),name="officer-final-verification")
    path('citizen/complaints/delete/<int:pk>/', CitizenComplaintDeleteView.as_view()),
    path('citizen/complaints/update/<int:pk>/', CitizenComplaintUpdateView.as_view()),
     path("accounts/officer/reassigned-verify/",OfficerReassignedComplaintVerificationView.as_view(),name="officer-reassigned-verify"),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)