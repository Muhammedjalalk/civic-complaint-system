


# accounts/admin.py
from django.contrib import admin
from django.db.models import Count
from .models import (
    User,
    Department,
    Complaint,
    ComplaintAssignment,
    ComplaintEscalation,
    ComplaintReassign,
    ComplaintActionHistory,
    CitizenMeeting,
    ComplaintFeedback,
    ComplaintFinalVerification,
    DistrictDashboard,
    ComplaintReport,
    DepartmentPerformance,
    RecurringProblems,
)
# @admin.register(DistrictDashboard)
# class DistrictDashboardAdmin(admin.ModelAdmin):
#     list_display = ("id", "priority", "status", "location", "created_at")
#     list_filter = ("status", "priority", "location")
#     search_fields = ("description", "location")

#     def has_add_permission(self, request):
#         return False

#     def has_delete_permission(self, request, obj=None):
#         return False
from django.contrib import admin
from .models import DistrictDashboard


@admin.register(DistrictDashboard)
class DistrictDashboardAdmin(admin.ModelAdmin):
    list_display = ("id", "priority", "status", "location", "created_at")
    list_filter = ("status", "priority", "location")
    search_fields = ("description", "location")

    def get_queryset(self, request):
        # ✅ MUST use proxy model queryset
        return super().get_queryset(request)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False



from django import forms
from django.contrib import admin, messages
from .models import Complaint, ComplaintActionHistory

# -----------------------
# ModelForm to make assigned_authority a dropdown
# -----------------------
class ComplaintForm(forms.ModelForm):
    AUTHORITY_CHOICES = [
        ("Officer", "Officer"),
        ("Staff", "Staff"),
        ("High Authority", "High Authority"),
    ]
    assigned_authority = forms.ChoiceField(
        choices=AUTHORITY_CHOICES,
        required=False,
        label="Assigned Authority"
    )

    class Meta:
        model = Complaint
        fields = "__all__"

# -----------------------
# Complaint Admin
# -----------------------
# from django.contrib import admin, messages
# from .models import Complaint


# @admin.register(Complaint)
# class ComplaintAdmin(admin.ModelAdmin):

#     # 🔹 LIST VIEW (table)
#     list_display = (
#         "id",
#         "citizen",
#         "priority",
#         "status",
#         "location",
#         "get_departments",
#         "assigned_authority",
#         "created_at",
#     )

#     list_filter = ("status", "priority", "departments")
#     search_fields = ("description", "location", "citizen__email")
#     readonly_fields = ("created_at",)
#     filter_horizontal = ("departments",)

#     # 🔹 DETAIL VIEW (THIS IS THE KEY FIX 🔥)
#     fieldsets = (
#         ("Citizen Info", {
#             "fields": ("citizen", "priority", "status")
#         }),
#         ("Department Info", {
#             "fields": ("departments",)
#         }),
#         ("Location Info", {
#             "fields": ("location", "latitude", "longitude")
#         }),
#         ("Complaint Details", {
#             "fields": (
#                 "description",     # ✅ FIX
#                 "attachment",      # ✅ FIX
#                 "suggestion",      # ✅ FIX
#             )
#         }),
#         ("Officer Reply", {
#             "fields": ("reply", "assigned_authority")
#         }),
#         ("System Info", {
#             "fields": ("created_at",)
#         }),
#     )

#     # 🔹 Department display
#     def get_departments(self, obj):
#         return ", ".join(
#             dept.name for dept in obj.departments.all()
#         )

#     get_departments.short_description = "Departments"


#     # -------------------
#     # Optimize queryset
#     # -------------------
#     def get_queryset(self, request):
#         return super().get_queryset(request).select_related("citizen")

#     # -------------------
#     # Show departments as comma-separated
#     # -------------------
#     def get_departments(self, obj):
#         return ", ".join([d.name for d in obj.departments.all()])
#     get_departments.short_description = "Departments"

#     # -------------------
#     # Automatically assign authority on save
#     # -------------------
#     def save_model(self, request, obj, form, change):
#         if not obj.assigned_authority:
#             # Auto-assign based on priority
#             if obj.priority.lower() == "high":
#                 obj.assigned_authority = "Officer"
#             elif obj.priority.lower() == "medium":
#                 obj.assigned_authority = "Staff"
#             else:
#                 obj.assigned_authority = "High Authority"
#         super().save_model(request, obj, form, change)

#     # -------------------
#     # Status Actions
#     # -------------------
#     @admin.action(description="🔄 Mark as In Progress")
#     def mark_in_progress(self, request, queryset):
#         updated = 0
#         for complaint in queryset:
#             if complaint.status == "Pending":
#                 complaint.status = "In Progress"
#                 complaint.save()
#                 updated += 1
#                 ComplaintActionHistory.objects.create(
#                     complaint=complaint,
#                     action="APPROVED",
#                     performed_by=request.user,
#                 )
#         self.message_user(
#             request,
#             f"{updated} complaint(s) moved to In Progress.",
#             messages.SUCCESS,
#         )

#     @admin.action(description="✅ Mark as Resolved")
#     def mark_resolved(self, request, queryset):
#         updated = 0
#         for complaint in queryset:
#             if complaint.status == "In Progress":
#                 complaint.status = "Resolved"
#                 complaint.save()
#                 updated += 1
#                 ComplaintActionHistory.objects.create(
#                     complaint=complaint,
#                     action="APPROVED",
#                     performed_by=request.user,
#                 )
#         self.message_user(
#             request,
#             f"{updated} complaint(s) resolved.",
#             messages.SUCCESS,
#         )

#     @admin.action(description="❌ Reject selected complaints")
#     def mark_rejected(self, request, queryset):
#         updated = 0
#         for complaint in queryset:
#             if complaint.status != "Resolved":
#                 complaint.status = "Rejected"
#                 complaint.save()
#                 updated += 1
#                 ComplaintActionHistory.objects.create(
#                     complaint=complaint,
#                     action="REJECTED",
#                     performed_by=request.user,
#                 )
#         self.message_user(
#             request,
#             f"{updated} complaint(s) rejected.",
#             messages.WARNING,
#         )

#     # -------------------
#     # Admin action: manually trigger auto-assign
#     # -------------------
#     @admin.action(description="Assign authority automatically")
#     def auto_assign_authority(self, request, queryset):
#         updated = 0
#         for complaint in queryset:
#             if not complaint.assigned_authority:
#                 if complaint.priority.lower() == "high":
#                     complaint.assigned_authority = "Officer"
#                 elif complaint.priority.lower() == "medium":
#                     complaint.assigned_authority = "Staff"
#                 else:
#                     complaint.assigned_authority = "High Authority"
#                 complaint.save()
#                 updated += 1
#         self.message_user(
#             request,
#             f"{updated} complaints auto-assigned to authority.",
#             messages.SUCCESS,
#         )
from django.contrib import admin, messages
from django.utils.html import format_html
from .models import Complaint


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "citizen",
        "priority",
        "status",
        "location",
        "image_preview",   # ✅ SHOW IMAGE IN LIST
        "created_at",
    )

    readonly_fields = ("created_at", "image_preview")

    fieldsets = (
        ("Citizen Info", {
            "fields": ("citizen", "priority", "status")
        }),
        ("Complaint Details", {
            "fields": (
                "description",
                "attachment",      # upload field
                "image_preview",   # preview field
            )
        }),
        ("System Info", {
            "fields": ("created_at",)
        }),
    )

    # ✅ IMAGE PREVIEW FUNCTION
    def image_preview(self, obj):
        if obj.attachment:
            return format_html(
                '<img src="{}" width="300" style="border-radius:10px;" />',
                obj.attachment.url
            )
        return "No Image"

    image_preview.short_description = "Complaint Image"



# @admin.register(ComplaintEscalation)
# class ComplaintEscalationAdmin(admin.ModelAdmin):
#     list_display = (
#         "complaint",
#         "escalated_by",
#         "escalated_to",
#         "escalated_at",
#     )
#     search_fields = ("complaint__id", "reason")
# from django.contrib import admin, messages
# from django.utils.html import format_html
# from django.urls import path
# from django.shortcuts import redirect, get_object_or_404
# from django.contrib.auth import get_user_model
# from .models import ComplaintEscalation

# User = get_user_model()

# @admin.register(ComplaintEscalation)
# class ComplaintEscalationAdmin(admin.ModelAdmin):
#     list_display = (
#         "complaint",
#         "escalated_by",
#         "escalated_to",
#         "status",
#         "escalated_at",
#         "action_buttons",
#     )
#     search_fields = ("complaint__id", "reason")
#     list_filter = ("status", "escalated_to", "escalated_at")

#     # Custom URLs for actions
#     def get_urls(self):
#         urls = super().get_urls()
#         custom_urls = [
#             path(
#                 "approve/<int:escalation_id>/",
#                 self.admin_site.admin_view(self.approve_escalation),
#                 name="complaintescalation-approve",
#             ),
#             path(
#                 "reject/<int:escalation_id>/",
#                 self.admin_site.admin_view(self.reject_escalation),
#                 name="complaintescalation-reject",
#             ),
#             path(
#                 "reassign/<int:escalation_id>/",
#                 self.admin_site.admin_view(self.reassign_escalation),
#                 name="complaintescalation-reassign",
#             ),
#         ]
#         return custom_urls + urls

#     # Action buttons for PENDING escalations
#     def action_buttons(self, obj):
#         if obj.status == "PENDING":
#             return format_html(
#                 '<a class="button" style="background-color:green;color:white;padding:2px 6px;border-radius:4px;" href="{}">Approve</a>&nbsp;'
#                 '<a class="button" style="background-color:red;color:white;padding:2px 6px;border-radius:4px;" href="{}">Reject</a>&nbsp;'
#                 '<a class="button" style="background-color:blue;color:white;padding:2px 6px;border-radius:4px;" href="{}">Reassign</a>',
#                 f'approve/{obj.id}/',
#                 f'reject/{obj.id}/',
#                 f'reassign/{obj.id}/'
#             )
#         return obj.status

#     action_buttons.short_description = "Actions"

#     # Approve escalation
#     def approve_escalation(self, request, escalation_id):
#         escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
#         escalation.status = "APPROVED"
#         escalation.save()
#         messages.success(request, f"Complaint #{escalation.complaint.id} approved.")
#         return redirect(request.META.get("HTTP_REFERER"))

#     # Reject escalation
#     def reject_escalation(self, request, escalation_id):
#         escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
#         escalation.status = "REJECTED"
#         escalation.save()
#         messages.warning(request, f"Complaint #{escalation.complaint.id} rejected.")
#         return redirect(request.META.get("HTTP_REFERER"))

#     # Reassign escalation to another officer
#     def reassign_escalation(self, request, escalation_id):
#         escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)

#         # Get all officers except current one
#         officers = User.objects.filter(role="OFFICER").exclude(pk=escalation.escalated_to_id)
#         if not officers.exists():
#             messages.error(request, "No available officers to reassign.")
#             return redirect(request.META.get("HTTP_REFERER"))

#         new_officer = officers.first()  # assign first available officer
#         escalation.escalated_to = new_officer
#         escalation.status = "REASSIGNED"
#         escalation.save()
#         messages.info(
#             request,
#             f"Complaint #{escalation.complaint.id} reassigned to officer {new_officer.email}."
#         )
#         return redirect(request.META.get("HTTP_REFERER"))

from django.contrib import admin, messages
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth import get_user_model

from accounts.models import ComplaintEscalation

User = get_user_model()


@admin.register(ComplaintEscalation)
class ComplaintEscalationAdmin(admin.ModelAdmin):
    list_display = (
        "complaint",
        "escalated_by",
        "escalated_to_display",
        "status",
        "escalated_at",
        "action_buttons",
    )

    search_fields = ("complaint__id", "reason")
    list_filter = ("status", "escalated_to", "escalated_at")

    # -------------------------------------------------
    # Custom admin URLs
    # -------------------------------------------------
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "approve/<int:escalation_id>/",
                self.admin_site.admin_view(self.approve_escalation),
                name="complaintescalation-approve",
            ),
            path(
                "reject/<int:escalation_id>/",
                self.admin_site.admin_view(self.reject_escalation),
                name="complaintescalation-reject",
            ),
            path(
                "reassign/<int:escalation_id>/",
                self.admin_site.admin_view(self.reassign_escalation),
                name="complaintescalation-reassign",
            ),
        ]
        return custom_urls + urls

    # -------------------------------------------------
    # Display helper
    # -------------------------------------------------
    def escalated_to_display(self, obj):
        if not obj.escalated_to:
            return "Not Assigned"
        return f"{obj.escalated_to.email} ({obj.escalated_to.role})"

    escalated_to_display.short_description = "Escalated To"

    # -------------------------------------------------
    # Action buttons
    # -------------------------------------------------
    def action_buttons(self, obj):
        if obj.status == "PENDING":
            return format_html(
                '<a class="button" style="background:#28a745;color:white;padding:3px 6px;border-radius:4px;" href="{}">Approve</a> '
                '<a class="button" style="background:#dc3545;color:white;padding:3px 6px;border-radius:4px;" href="{}">Reject</a> '
                '<a class="button" style="background:#007bff;color:white;padding:3px 6px;border-radius:4px;" href="{}">Reassign</a>',
                f"approve/{obj.id}/",
                f"reject/{obj.id}/",
                f"reassign/{obj.id}/",
            )
        return obj.status

    action_buttons.short_description = "Actions"

    # -------------------------------------------------
    # Approve escalation (AUTO ASSIGN ADMIN)
    # -------------------------------------------------
    def approve_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)

        if not escalation.escalated_to:
            admin_user = User.objects.filter(role="ADMIN").first()
            escalation.escalated_to = admin_user

        escalation.status = "APPROVED"
        escalation.save()

        messages.success(
            request,
            f"Complaint #{escalation.complaint.id} approved and assigned to Admin."
        )
        return redirect(request.META.get("HTTP_REFERER"))

    # -------------------------------------------------
    # Reject escalation
    # -------------------------------------------------
    def reject_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
        escalation.status = "REJECTED"
        escalation.save()

        messages.warning(
            request,
            f"Complaint #{escalation.complaint.id} rejected."
        )
        return redirect(request.META.get("HTTP_REFERER"))

    # -------------------------------------------------
    # Reassign escalation (ADMIN only)
    # -------------------------------------------------
    def reassign_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)

        admin_user = User.objects.filter(role="ADMIN").first()

        if not admin_user:
            messages.error(request, "No Admin user available.")
            return redirect(request.META.get("HTTP_REFERER"))

        escalation.escalated_to = admin_user
        escalation.status = "REASSIGNED"
        escalation.save()

        messages.info(
            request,
            f"Complaint #{escalation.complaint.id} reassigned to Admin."
        )
        return redirect(request.META.get("HTTP_REFERER"))


   

    # -----------------------------
    # Action buttons
    # -----------------------------
    def action_buttons(self, obj):
        if obj.status == "PENDING":
            return format_html(
                '<a class="button" style="background:#28a745;color:white;padding:4px 8px;border-radius:4px;" href="{}">Approve</a>&nbsp;'
                '<a class="button" style="background:#dc3545;color:white;padding:4px 8px;border-radius:4px;" href="{}">Reject</a>&nbsp;'
                '<a class="button" style="background:#007bff;color:white;padding:4px 8px;border-radius:4px;" href="{}">Reassign</a>',
                f"approve/{obj.id}/",
                f"reject/{obj.id}/",
                f"reassign/{obj.id}/",
            )
        return obj.status

    action_buttons.short_description = "Actions"

    # -----------------------------
    # Approve
    # -----------------------------
    def approve_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
        escalation.status = "APPROVED"
        escalation.save()
        messages.success(
            request,
            f"Complaint #{escalation.complaint.id} approved successfully.",
        )
        return redirect(request.META.get("HTTP_REFERER"))

    # -----------------------------
    # Reject
    # -----------------------------
    def reject_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
        escalation.status = "REJECTED"
        escalation.save()
        messages.warning(
            request,
            f"Complaint #{escalation.complaint.id} rejected.",
        )
        return redirect(request.META.get("HTTP_REFERER"))

    # -----------------------------
    # Reassign (ONLY HIGH AUTHORITY / ADMIN)
    # -----------------------------
    def reassign_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)

        authorities = User.objects.filter(
            role__in=["ADMIN", "HIGH_AUTHORITY"]
        ).exclude(pk=escalation.escalated_to_id)

        if not authorities.exists():
            messages.error(
                request,
                "No higher authority available for reassignment.",
            )
            return redirect(request.META.get("HTTP_REFERER"))

        new_authority = authorities.first()
        escalation.escalated_to = new_authority
        escalation.status = "REASSIGNED"
        escalation.save()

        messages.success(
            request,
            f"Complaint #{escalation.complaint.id} reassigned to "
            f"{new_authority.email} ({new_authority.role}).",
        )
        return redirect(request.META.get("HTTP_REFERER"))






# @admin.register(ComplaintReassign)
# class ComplaintReassignAdmin(admin.ModelAdmin):
#     list_display = (
#         "complaint",
#         "reassigned_by",
#         "reassigned_from",
#         "reassigned_to",
#         "reassigned_at",
#     )

@admin.register(CitizenMeeting)
class CitizenMeetingAdmin(admin.ModelAdmin):
    list_display = (
        "citizen",
        "officer",
        "meeting_date",
        "location",
        "status",
    )
    list_filter = ("status",)
    search_fields = ("citizen__email", "location")

@admin.register(ComplaintActionHistory)
class ComplaintActionHistoryAdmin(admin.ModelAdmin):
    list_display = (
        "complaint",
        "action",
        "performed_by",
        "performed_at",
    )

@admin.register(ComplaintReport)
class ComplaintReportAdmin(admin.ModelAdmin):
    list_display = ("id", "priority", "status", "location")

@admin.register(DepartmentPerformance)
class DepartmentPerformanceAdmin(admin.ModelAdmin):
    list_display = ("id", "priority", "status")

    def changelist_view(self, request, extra_context=None):
        performance = (
            Complaint.objects.values("departments__name")
            .annotate(total=Count("id"))
        )
        extra_context = extra_context or {}
        extra_context["performance"] = performance
        return super().changelist_view(request, extra_context)

# @admin.register(RecurringProblems)
# class RecurringProblemsAdmin(admin.ModelAdmin):
#     list_display = ("description", "created_at")

#     def get_queryset(self, request):
#         return (
#             Complaint.objects
#             .values("description")
#             .annotate(count=Count("id"))
#             .filter(count__gte=3)
#         )
from django.contrib import admin
from django.db.models import Count
from .models import Complaint, RecurringProblems


@admin.register(RecurringProblems)
class RecurringProblemsAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "location", "priority", "created_at")
    list_filter = ("priority", "location")
    search_fields = ("description",)

    def get_queryset(self, request):
        qs = super().get_queryset(request)

        recurring_descriptions = (
            Complaint.objects
            .values("description")
            .annotate(total=Count("id"))
            .filter(total__gte=3)
            .values_list("description", flat=True)
        )

        return qs.filter(description__in=recurring_descriptions)


@admin.register(ComplaintFeedback)
class ComplaintFeedbackAdmin(admin.ModelAdmin):
    list_display = ("complaint", "citizen", "rating", "created_at")


# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ("email", "role", "department", "approval_status")
#     list_filter = ("role", "approval_status")
#     search_fields = ("email",)

# from django.contrib import admin
# from django.contrib import messages
# from .models import User


# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ("email", "role", "department", "approval_status", "is_active")
#     list_filter = ("role", "approval_status", "is_active")
#     search_fields = ("email",)

#     actions = ["approve_users", "reject_users", "delete_selected"]

#     # ✅ APPROVE USERS
#     @admin.action(description="✅ Approve selected users")
#     def approve_users(self, request, queryset):
#         updated = queryset.update(
#             approval_status="Approved",
#             is_active=True
#         )
#         self.message_user(
#             request,
#             f"{updated} user(s) approved successfully.",
#             messages.SUCCESS
#         )

#     # ❌ REJECT USERS
#     @admin.action(description="❌ Reject selected users")
#     def reject_users(self, request, queryset):
#         updated = queryset.update(
#             approval_status="Rejected",
#             is_active=False
#         )
#         self.message_user(
#             request,
#             f"{updated} user(s) rejected successfully.",
#             messages.WARNING
#         )

#     # 🔒 OPTIONAL: PREVENT ADMIN SELF-DELETION
#     def delete_queryset(self, request, queryset):
#         queryset.exclude(id=request.user.id).delete()
#         self.message_user(
#             request,
#             "Selected users deleted successfully (except yourself).",
#             messages.SUCCESS
#         )

#     def has_delete_permission(self, request, obj=None):
#         return request.user.role == "ADMIN"


from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth import get_user_model
from .models import Department

User = get_user_model()


# -----------------------------
# Department Admin
# -----------------------------
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "parent")
    search_fields = ("name",)


# -----------------------------
# User Admin
# -----------------------------
@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = (
        "email",
        "role",
        "full_name",
        "phone",
        "department",        # ✅ SHOW DEPARTMENT
        "license_number",    # ✅ SHOW LICENSE
        "document_type",
        "document_verified",
        "approval_status",
        "is_active",
        "government_document_preview",
    )

    list_filter = (
        "role",
        "department",        # ✅ FILTER BY DEPARTMENT
        "document_verified",
        "approval_status",
        "is_active",
        "document_type",
    )

    search_fields = (
        "email",
        "full_name",
        "phone",
        "license_number",    # ✅ SEARCH BY LICENSE
    )

    # ❌ DO NOT make department/license readonly if you want to see them on ADD page
    readonly_fields = (
        "email",
        "role",
        "government_document_preview",
    )

    fieldsets = (
        ("Basic Information", {
            "fields": ("email", "role", "full_name", "phone")
        }),
        ("Official Details", {
            "fields": (
                "department",      # ✅ VISIBLE
                "designation",
                "license_number",  # ✅ VISIBLE
            )
        }),
        ("Address Details", {
            "fields": ("place", "pin")
        }),
        ("Government Document Verification", {
            "fields": (
                "document_type",
                "government_document",        # ✅ UPLOAD FIELD
                "government_document_preview",
                "document_verified",
                "approval_status",
                "is_active",
            )
        }),
    )

    actions = ["approve_user", "reject_user"]

    # ------------------------
    # Government Document Preview
    # ------------------------
    def government_document_preview(self, obj):
        if not obj or not obj.government_document:
            return "No document uploaded"

        file_url = obj.government_document.url
        file_name = obj.government_document.name.lower()

        if file_name.endswith((".jpg", ".jpeg", ".png")):
            return format_html(
                """
                <div>
                    <img src="{}"
                         style="max-width:420px; max-height:300px;
                         border:1px solid #ddd; padding:6px;
                         border-radius:6px;" />
                    <br>
                    <a href="{}" target="_blank">Open full size</a>
                </div>
                """,
                file_url,
                file_url,
            )

        return format_html(
            '<a href="{}" target="_blank">View Government Document</a>',
            file_url
        )

    government_document_preview.short_description = "Government ID Document"

    # ------------------------
    # Admin actions
    # ------------------------
    def approve_user(self, request, queryset):
        queryset.update(
            document_verified=True,
            approval_status="Approved",
            is_active=True,
            is_staff=True
        )
        self.message_user(request, "Selected users approved successfully.")

    approve_user.short_description = "Approve selected users"

    def reject_user(self, request, queryset):
        queryset.update(
            document_verified=False,
            approval_status="Rejected",
            is_active=False
        )
        self.message_user(request, "Selected users rejected.")

    reject_user.short_description = "Reject selected users"
