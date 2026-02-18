# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# class UserManager(BaseUserManager):
#     def create_user(self, email, password=None, role="CITIZEN", **extra_fields):
#         if not email:
#             raise ValueError("Email is required")
#         email = self.normalize_email(email)
#         user = self.model(email=email, role=role, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password, **extra_fields):
#         user = self.create_user(email, password, role="ADMIN", **extra_fields)
#         user.is_staff = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user


# class User(AbstractBaseUser, PermissionsMixin):
#     ROLE_CHOICES = (
#         ("CITIZEN", "Citizen"),
#         ("STAFF", "Staff"),
#         ("OFFICER", "Officer"),
#         ("ADMIN", "Admin"),
#     )

#     email = models.EmailField(unique=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)

#     # Common fields
#     full_name = models.CharField(max_length=255, blank=True, null=True)
#     phone = models.CharField(max_length=15, blank=True, null=True)
#     license_number = models.CharField(max_length=50, blank=True, null=True)
#     department = models.CharField(max_length=100, blank=True, null=True)
#     designation = models.CharField(max_length=100, blank=True, null=True)
#     place = models.CharField(max_length=100, blank=True, null=True)
#     approval_status = models.CharField(max_length=20, default="Pending")

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = UserManager()

#     USERNAME_FIELD = "email"

#     def __str__(self):
#         return f"{self.email} ({self.role})"


# #citizen table
# from django.db import models
# from django.conf import settings

# class CitizenProfile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name="citizen_profile",
#         limit_choices_to={'role': 'CITIZEN'}  # optional, only citizens
#     )
#     # Add extra citizen-specific fields if needed
#     extra_info = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return self.user.full_name or self.user.email


# class Complaint(models.Model):
#     citizen = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         limit_choices_to={"role": "CITIZEN"}
#     )
#     category = models.CharField(max_length=100)
#     priority = models.CharField(max_length=20)
#     department = models.CharField(max_length=100)
#     location = models.CharField(max_length=255)
#     description = models.TextField()
#     attachment = models.FileField(upload_to='complaints/', blank=True, null=True)
#     reply = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Complaint {self.id} by {self.citizen.email}"


# #Officer tables
# from django.db import models
# from django.conf import settings
# from citizen.models import Complaint

# class ComplaintAssignment(models.Model):
#     STATUS_CHOICES = (
#         ("Assigned", "Assigned"),
#         ("In Progress", "In Progress"),
#         ("Resolved", "Resolved"),
#         ("Rejected", "Rejected"),
#         ("Returned", "Returned for Verification"), 
#     )

#     complaint = models.ForeignKey(
#         Complaint, 
#         on_delete=models.CASCADE, 
#         related_name="assignments"
#     )
    
#     # Staff assigned to the complaint
#     assigned_to = models.ForeignKey(
#         settings.AUTH_USER_MODEL, 
#         limit_choices_to={'role': 'STAFF'},  # only staff
#         on_delete=models.SET_NULL, 
#         null=True, 
#         related_name="received_assignments"
#     )
    
#     # Officer who assigned the complaint
#     assigned_by = models.ForeignKey(
#         settings.AUTH_USER_MODEL, 
#         limit_choices_to={'role': 'OFFICER'},  # only officers
#         on_delete=models.SET_NULL, 
#         null=True, 
#         related_name="given_assignments"
#     )
    
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Assigned")
#     assigned_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     remarks = models.TextField(blank=True, null=True)

#     class Meta:
#         ordering = ['-assigned_at']  # default ordering by recent

#     def __str__(self):
#         assigned_to_email = self.assigned_to.email if self.assigned_to else "Unassigned"
#         return f"Complaint {self.complaint.id} → {assigned_to_email}"


# #staff table
# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# class UserManager(BaseUserManager):
#     def create_user(self, email, full_name, phone, license_number=None, role='CITIZEN', password=None):
#         if not email:
#             raise ValueError("Email is required")
#         if not full_name:
#             raise ValueError("Full name is required")
#         if role in ['STAFF', 'OFFICER'] and not license_number:
#             raise ValueError("License number is required for staff/officer")
        
#         user = self.model(
#             email=self.normalize_email(email),
#             full_name=full_name,
#             phone=phone,
#             license_number=license_number,
#             role=role
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, full_name, phone, password):
#         user = self.create_user(email, full_name, phone, role='OFFICER', password=password)
#         user.is_staff = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user


# class User(AbstractBaseUser, PermissionsMixin):
#     ROLE_CHOICES = (
#         ('CITIZEN', 'Citizen'),
#         ('STAFF', 'Staff'),
#         ('OFFICER', 'Officer'),
#         ('ADMIN', 'Admin'),  # optional if you have a separate admin role
#     )

#     full_name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     phone = models.CharField(max_length=15)
#     license_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='CITIZEN')
    
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)  # admin/superuser flag

#     objects = UserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['full_name', 'phone']

#     def __str__(self):
#         return f"{self.full_name} ({self.role})"


# from django.db import models
# from django.conf import settings

# class StaffProfile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name="staff_profile"
#     )
#     full_name = models.CharField(max_length=255)
#     department = models.CharField(max_length=100)
#     license_number = models.CharField(max_length=50)
#     approval_status = models.CharField(max_length=20, default="Pending")

#     def __str__(self):
#         return self.full_name

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role="CITIZEN", **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, role="ADMIN", **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = (
        ("CITIZEN", "Citizen"),
        ("STAFF", "Staff"),
        ("OFFICER", "Officer"),
        ("ADMIN", "Admin"),
    )
    DOCUMENT_CHOICES = (
        ("AADHAAR", "Aadhaar Card"),
        ("VOTER", "Voter ID"),
        ("PASSPORT", "Passport"),
        ("DL", "Driving License"),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    department = models.ForeignKey(
        "accounts.Department",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users"
    )

    designation = models.CharField(max_length=100, blank=True, null=True)
    license_number = models.CharField(max_length=50, blank=True, null=True)
    place = models.CharField(max_length=255, blank=True, null=True)
    pin = models.CharField(max_length=6, blank=True, null=True)

    document_type = models.CharField(
        max_length=20,
        choices=DOCUMENT_CHOICES,
        blank=True,
        null=True
    )

    government_document = models.FileField(
        upload_to="govt_documents/",
        blank=True,
        null=True
    )

    document_verified = models.BooleanField(default=False)

    approval_status = models.CharField(max_length=20, default="Pending")

    # is_active = models.BooleanField(default=True)
    # is_staff = models.BooleanField(default=False)

    # objects = UserManager()

    # USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = []

    # def __str__(self):
    #     return f"{self.email} ({self.role})"

    is_active = models.BooleanField(default=False)

    # Django admin
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email} ({self.role})"


from django.db import models
from django.conf import settings




class CitizenProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="citizen_profile"
    )
    extra_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.email

# class Complaint(models.Model):
#     citizen = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name="complaints"
#     )
#     # category = models.CharField(max_length=100)
#     categories = Department.objects.filter(parent__isnull=True)

#     priority = models.CharField(max_length=20)
#     # department = models.CharField(max_length=100)
#     departments = models.ManyToManyField("Department", related_name="complaints")
#     location = models.CharField(max_length=255)
#     latitude = models.FloatField(null=True, blank=True)
#     longitude = models.FloatField(null=True, blank=True)
#     description = models.TextField()
#     attachment = models.FileField(upload_to="complaints/", blank=True, null=True)
#     reply = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     status = models.CharField(
#     max_length=20,
#     choices=(
#         ("Pending", "Pending"),
#         ("In Progress", "In Progress"),
#         ("Resolved", "Resolved"),
#         ("Rejected", "Rejected"),
#     ),
#     default="Pending"
# )


#     def __str__(self):
#         return f"Complaint {self.id}"
from django.conf import settings
from django.db import models

class Complaint(models.Model):
    citizen = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="complaints"
    )

    priority = models.CharField(max_length=20)

    departments = models.ManyToManyField(
        "accounts.Department",
        related_name="complaints"
    )

    location = models.CharField(max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    description = models.TextField()
    attachment = models.FileField(upload_to="complaints/", blank=True, null=True)
      # ✅ NEW: Optional suggestion by citizen
    suggestion = models.TextField(blank=True, null=True)

    # Officer reply
   
    reply = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    assigned_authority = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=(
             ("Pending", "Pending"),
         ("In Progress", "In Progress"),
        ("Approved", "Approved"),
    ("Reassigned", "Reassigned"),
    ("Resolved", "Resolved"),
    ("Rejected", "Rejected"),

        ),
        default="Pending"
    )
  
    

    def __str__(self):
        return f"Complaint {self.id}"


class ComplaintAssignment(models.Model):
    STATUS_CHOICES = (
    ("Pending", "Pending"),
    ("In Progress", "In Progress"),
    ("Approved", "Approved"),
    ("Reassigned", "Reassigned"),
    ("Resolved", "Resolved"),
    ("Rejected", "Rejected"),
)


    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="assignments"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="staff_assignments"
    )

    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="officer_assignments"
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Assigned")
    remarks = models.TextField(blank=True, null=True)

    assigned_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-assigned_at"]

    def __str__(self):
        return f"Complaint {self.complaint.id} → {self.status}"

from django.contrib import admin
from .models import ComplaintAssignment


@admin.register(ComplaintAssignment)
class ComplaintAssignmentAdmin(admin.ModelAdmin):

    # 🔹 LIST VIEW (table)
    list_display = (
        "id",
        "complaint_id",
        "assigned_to",
        "assigned_by",
        "status",
        "assigned_at",
        "updated_at",
    )

    list_filter = ("status", "assigned_at")
    search_fields = (
        "complaint__id",
        "assigned_to__email",
        "assigned_by__email",
        "remarks",
    )

    readonly_fields = ("assigned_at", "updated_at")

    # 🔹 DETAIL VIEW (open record)
    fieldsets = (
        ("Complaint Info", {
            "fields": ("complaint",)
        }),
        ("Assignment Info", {
            "fields": ("assigned_to", "assigned_by", "status")
        }),
        ("Remarks", {
            "fields": ("remarks",)
        }),
        ("System Info", {
            "fields": ("assigned_at", "updated_at")
        }),
    )

    ordering = ("-assigned_at",)

    # 🔹 Custom column for complaint id
    def complaint_id(self, obj):
        return obj.complaint.id

    complaint_id.short_description = "Complaint ID"


# class Department(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)

    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="sub_departments"
    )

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} → {self.name}"
        return self.name




from django.db import models
from django.conf import settings

class CitizenMeeting(models.Model):
    STATUS_CHOICES = (
        ("Scheduled", "Scheduled"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    citizen = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="meetings"
    )
    officer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="officer_meetings"
    )
    complaint = models.ForeignKey(
        "Complaint",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verification_meetings"
    )
    meeting_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Scheduled")
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-meeting_date"]

    def __str__(self):
        return f"Meeting with {self.citizen.full_name} on {self.meeting_date}"
    

from django.db import models
from django.conf import settings
from accounts.models import Complaint

class ComplaintFinalVerification(models.Model):
    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="final_verifications"
    )
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "OFFICER"}
    )
    verified_at = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Complaint #{self.complaint.id} verified by {self.verified_by}"



from django.db import models
from django.conf import settings
from django.db.models import Q

class ComplaintEscalation(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
        ("REASSIGNED", "Reassigned"),
    ]

    complaint = models.ForeignKey(
        'Complaint',
        on_delete=models.CASCADE,
        related_name="escalations"
    )
    escalated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "OFFICER"}
    )
    escalated_to = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.SET_NULL,
    related_name="assigned_escalations",
    limit_choices_to={"role": "ADMIN"},
    null=True,
    blank=True
)


    reason = models.TextField(blank=True, null=True)
    escalated_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    def __str__(self):
        return f"Complaint #{self.complaint.id} escalated"





from django.conf import settings
from django.db import models
from .models import Complaint   # adjust import if needed

class ComplaintFeedback(models.Model):
    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE,
        related_name="feedbacks"
    )

    citizen = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="complaint_feedbacks"
    )

    rating = models.IntegerField()  # 1 to 5
    feedback = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for Complaint {self.complaint.id}"

# models.py
# models.py

from django.db import models
from django.conf import settings


class ComplaintReassign(models.Model):
    complaint = models.ForeignKey(
        "Complaint",
        on_delete=models.CASCADE,
        related_name="reassignments"
    )

    reassigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={"role": "ADMIN"}
    )

    reassigned_from = models.CharField(max_length=100)
    reassigned_to = models.CharField(max_length=100)

    reason = models.TextField(blank=True, null=True)

    reassigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint #{self.complaint.id} reassigned"

from django.db import models
from django.conf import settings


class ComplaintActionHistory(models.Model):
    ACTION_CHOICES = (
        ("APPROVED", "Approved"),
        ("REASSIGNED", "Reassigned"),
        ("REJECTED", "Rejected"),
    )

    complaint = models.ForeignKey(
        "Complaint",
        on_delete=models.CASCADE,
        related_name="action_history"
    )

    action = models.CharField(max_length=20, choices=ACTION_CHOICES)

    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True
    )

    from_authority = models.CharField(max_length=100, blank=True, null=True)
    to_authority = models.CharField(max_length=100, blank=True, null=True)

    reason = models.TextField(blank=True, null=True)

    performed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint #{self.complaint.id} - {self.action}"


#additional informations 
# models.py - Add these at the end

# Proxy models for admin dashboard views
# models.py
class DistrictDashboard(Complaint):
    class Meta:
        proxy = True
        verbose_name = "District Dashboard"
        verbose_name_plural = "District Dashboard"


# models.py
# models.py
# ✅ PROXY MODELS (NO NEW TABLES)

class DistrictDashboard(Complaint):
    class Meta:
        proxy = True
        verbose_name = "District Dashboard"
        verbose_name_plural = "District Dashboard"


class ComplaintReport(Complaint):
    class Meta:
        proxy = True
        verbose_name = "Complaint Report"
        verbose_name_plural = "Complaint Reports"


class DepartmentPerformance(Complaint):
    class Meta:
        proxy = True
        verbose_name = "Department Performance"
        verbose_name_plural = "Department Performance"


class RecurringProblems(Complaint):
    class Meta:
        proxy = True
        verbose_name = "Recurring Problem"
        verbose_name_plural = "Recurring Problems"


class ComplaintReassign(models.Model):
    complaint = models.ForeignKey(
        Complaint,
        on_delete=models.CASCADE
    )
    reassigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reassigned_by"
    )
    reassigned_from = models.CharField(max_length=100)
    reassigned_to = models.CharField(max_length=100)
    reassigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint #{self.complaint.id} reassigned"



# app/models.py
from django.db import models
from accounts.models import Complaint

class CitizenNotification(models.Model):
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    email_sent = models.BooleanField(default=False)
    sms_sent = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)
    email_error = models.TextField(blank=True, null=True)
    sms_error = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-sent_at']

# app/models.py (add this model)
from django.db import models

class NotificationFailure(models.Model):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    complaint_id = models.IntegerField()
    error_message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=[
        ('SMS', 'SMS'),
        ('EMAIL', 'Email')
    ])
    attempted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-attempted_at']
        verbose_name = 'Notification Failure'
        verbose_name_plural = 'Notification Failures'
    
    def __str__(self):
        return f"{self.notification_type} failure for complaint {self.complaint_id}"