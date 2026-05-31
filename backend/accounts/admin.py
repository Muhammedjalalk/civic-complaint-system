# accounts/admin.py
from django.contrib import admin, messages
from django.contrib.auth import get_user_model
from django.db.models import Count
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import redirect, get_object_or_404

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
        "department",
        "license_number",
        "document_type",
        "document_verified",
        "approval_status",
        "is_active",
        "government_document_preview",
    )
    list_filter = (
        "role",
        "department",
        "document_verified",
        "approval_status",
        "is_active",
        "document_type",
    )
    search_fields = ("email", "full_name", "phone", "license_number")
    readonly_fields = ("email", "role", "government_document_preview")
    fieldsets = (
        ("Basic Information", {
            "fields": ("email", "role", "full_name", "phone")
        }),
        ("Official Details", {
            "fields": ("department", "designation", "license_number")
        }),
        ("Address Details", {
            "fields": ("place", "pin")
        }),
        ("Government Document Verification", {
            "fields": (
                "document_type",
                "government_document",
                "government_document_preview",
                "document_verified",
                "approval_status",
                "is_active",
            )
        }),
    )
    actions = ["approve_user", "reject_user"]

    def government_document_preview(self, obj):
        if not obj or not obj.government_document:
            return "No document uploaded"
        file_url = obj.government_document.url
        file_name = obj.government_document.name.lower()
        if file_name.endswith((".jpg", ".jpeg", ".png")):
            return format_html(
                '<div>'
                '<img src="{}" style="max-width:420px;max-height:300px;border:1px solid #ddd;padding:6px;border-radius:6px;" />'
                '<br><a href="{}" target="_blank">Open full size</a>'
                '</div>',
                file_url, file_url,
            )
        return format_html('<a href="{}" target="_blank">View Government Document</a>', file_url)

    government_document_preview.short_description = "Government ID Document"

    def approve_user(self, request, queryset):
        queryset.update(document_verified=True, approval_status="Approved", is_active=True, is_staff=True)
        self.message_user(request, "Selected users approved successfully.")
    approve_user.short_description = "Approve selected users"

    def reject_user(self, request, queryset):
        queryset.update(document_verified=False, approval_status="Rejected", is_active=False)
        self.message_user(request, "Selected users rejected.")
    reject_user.short_description = "Reject selected users"


# -----------------------------
# DistrictDashboard Admin
# -----------------------------
@admin.register(DistrictDashboard)
class DistrictDashboardAdmin(admin.ModelAdmin):
    list_display = ("id", "priority", "status", "location", "created_at")
    list_filter = ("status", "priority", "location")
    search_fields = ("description", "location")

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# -----------------------------
# Complaint Admin
# -----------------------------
@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ("id", "citizen", "priority", "status", "location", "image_preview", "created_at")
    readonly_fields = ("created_at", "image_preview")
    fieldsets = (
        ("Citizen Info", {
            "fields": ("citizen", "priority", "status")
        }),
        ("Complaint Details", {
            "fields": ("description", "attachment", "image_preview")
        }),
        ("System Info", {
            "fields": ("created_at",)
        }),
    )

    def image_preview(self, obj):
        if obj.attachment:
            return format_html(
                '<img src="{}" width="300" style="border-radius:10px;" />',
                obj.attachment.url
            )
        return "No Image"
    image_preview.short_description = "Complaint Image"


# -----------------------------
# ComplaintEscalation Admin
# -----------------------------
@admin.register(ComplaintEscalation)
class ComplaintEscalationAdmin(admin.ModelAdmin):
    list_display = (
        "complaint", "escalated_by", "escalated_to_display",
        "status", "escalated_at", "action_buttons",
    )
    search_fields = ("complaint__id", "reason")
    list_filter = ("status", "escalated_to", "escalated_at")

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

    def escalated_to_display(self, obj):
        if not obj.escalated_to:
            return "Not Assigned"
        return f"{obj.escalated_to.email} ({obj.escalated_to.role})"
    escalated_to_display.short_description = "Escalated To"

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

    def approve_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
        if not escalation.escalated_to:
            escalation.escalated_to = User.objects.filter(role="ADMIN").first()
        escalation.status = "APPROVED"
        escalation.save()
        messages.success(request, f"Complaint #{escalation.complaint.id} approved.")
        return redirect(request.META.get("HTTP_REFERER"))

    def reject_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
        escalation.status = "REJECTED"
        escalation.save()
        messages.warning(request, f"Complaint #{escalation.complaint.id} rejected.")
        return redirect(request.META.get("HTTP_REFERER"))

    def reassign_escalation(self, request, escalation_id):
        escalation = get_object_or_404(ComplaintEscalation, pk=escalation_id)
        authorities = User.objects.filter(role__in=["ADMIN", "HIGH_AUTHORITY"]).exclude(pk=escalation.escalated_to_id)
        if not authorities.exists():
            messages.error(request, "No higher authority available for reassignment.")
            return redirect(request.META.get("HTTP_REFERER"))
        new_authority = authorities.first()
        escalation.escalated_to = new_authority
        escalation.status = "REASSIGNED"
        escalation.save()
        messages.success(request, f"Complaint #{escalation.complaint.id} reassigned to {new_authority.email} ({new_authority.role}).")
        return redirect(request.META.get("HTTP_REFERER"))


# -----------------------------
# CitizenMeeting Admin
# -----------------------------
@admin.register(CitizenMeeting)
class CitizenMeetingAdmin(admin.ModelAdmin):
    list_display = ("citizen", "officer", "meeting_date", "location", "status")
    list_filter = ("status",)
    search_fields = ("citizen__email", "location")


# -----------------------------
# ComplaintActionHistory Admin
# -----------------------------
@admin.register(ComplaintActionHistory)
class ComplaintActionHistoryAdmin(admin.ModelAdmin):
    list_display = ("complaint", "action", "performed_by", "performed_at")


# -----------------------------
# ComplaintReport Admin
# -----------------------------
@admin.register(ComplaintReport)
class ComplaintReportAdmin(admin.ModelAdmin):
    list_display = ("id", "priority", "status", "location")


# -----------------------------
# DepartmentPerformance Admin
# -----------------------------
@admin.register(DepartmentPerformance)
class DepartmentPerformanceAdmin(admin.ModelAdmin):
    list_display = ("id", "priority", "status")

    def changelist_view(self, request, extra_context=None):
        performance = Complaint.objects.values("departments__name").annotate(total=Count("id"))
        extra_context = extra_context or {}
        extra_context["performance"] = performance
        return super().changelist_view(request, extra_context)


# -----------------------------
# RecurringProblems Admin
# -----------------------------
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


# -----------------------------
# ComplaintFeedback Admin
# -----------------------------
@admin.register(ComplaintFeedback)
class ComplaintFeedbackAdmin(admin.ModelAdmin):
    list_display = ("complaint", "citizen", "rating", "created_at")