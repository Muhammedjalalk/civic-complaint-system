from rest_framework import serializers
from accounts.models import User
from accounts.models import Complaint



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "full_name",
            "phone",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class CitizenProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email", "phone"]

# class ComplaintSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Complaint
#         fields = "__all__"
#         read_only_fields = ["citizen", "created_at", "reply"]
# from rest_framework import serializers
# from .models import Complaint
# from accounts.models import Department  # ✅ import Department

# class ComplaintSerializer(serializers.ModelSerializer):
#     departments = serializers.PrimaryKeyRelatedField(
#         queryset=Department.objects.all(),
#         many=True
#     )

#     class Meta:
#         model = Complaint
#         fields = "__all__"
#         read_only_fields = ["citizen", "created_at", "reply"]

# serializers.py
from rest_framework import serializers
from .models import Complaint, Department

# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = ('id', 'name')
class DepartmentSerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(source="parent.name", read_only=True)

    class Meta:
        model = Department
        fields = ["id", "name", "parent_name"]


# class ComplaintSerializer(serializers.ModelSerializer):
#     department = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Complaint
#         fields = (
#             'id', 'priority', 'location', 'description', 'attachment', 'status',
#             'created_at', 'department',
#         )

#     def get_department(self, obj):
#         # assuming many-to-many relation
#         departments = obj.departments.all()  # or related_name
#         return ", ".join([d.name for d in departments])

from rest_framework import serializers
from .models import Complaint, Department


# class ComplaintCreateSerializer(serializers.ModelSerializer):
#     departments = serializers.PrimaryKeyRelatedField(
#         queryset=Department.objects.all(),
#         many=True,
#         write_only=True
#     )

#     class Meta:
#         model = Complaint
#         fields = [
#             "priority",
#             "location",
#             "description",
#             "attachment",
#             "departments"
#         ]

#     def create(self, validated_data):
#         departments = validated_data.pop("departments")

#         complaint = Complaint.objects.create(
#             citizen=self.context["request"].user,
#             **validated_data
#         )

#         # 🔥 CRITICAL LINE
#         complaint.departments.set(departments)

#         return complaint

# complaints/serializers.py
from rest_framework import serializers
from .models import Complaint
from .ai_department_engine import detect_departments


class ComplaintCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = [
            "location",
            "description",
            "attachment",
            "suggestion",
        ]

    def create(self, validated_data):
        request = self.context["request"]
        description = validated_data["description"]

        from accounts.ai_engine import (
            detect_departments,
            detect_priority
        )

        departments = detect_departments(description)
        priority = detect_priority(description)

        complaint = Complaint.objects.create(
            citizen=request.user,
            priority=priority,
            status="Pending",
            **validated_data
        )

        complaint.departments.set(departments)
        return complaint



class ComplaintSerializer(serializers.ModelSerializer):
    departments = serializers.StringRelatedField(many=True)
    attachment = serializers.FileField(read_only=True, use_url=True)

    class Meta:
        model = Complaint
        fields = "__all__"








# officer_serilizer parts
from rest_framework import serializers
from accounts.models import User


class OfficerRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "full_name",
            "phone",
            "department",
            "designation",
            "license_number",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


from rest_framework import serializers
from accounts.models import Complaint


# class ComplaintSerializer(serializers.ModelSerializer):
#     citizen_name = serializers.CharField(
#         source="citizen.name",
#         read_only=True
#     )
#     citizen_email = serializers.EmailField(
#         source="citizen.email",
#         read_only=True
#     )

#     class Meta:
#         model = Complaint
#         fields = [
#             "id",
#             "citizen",
#             "citizen_name",
#             "citizen_email",
#             "category",
#             "priority",
#             "department",
#             "location",
#             "description",
#             "attachment",
#             "status",
#             "reply",
#             "created_at",
#             "updated_at",
#         ]
#         read_only_fields = [
#             "id",
#             "citizen",
#             "status",
#             "reply",
#             "created_at",
#             "updated_at",
#         ]

# from rest_framework import serializers
# from .models import Complaint

# class ComplaintGeoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Complaint
#         fields = ['id', 'category', 'priority', 'latitude', 'longitude', 'status', 'created_at']


from rest_framework import serializers
from .models import CitizenMeeting

class CitizenMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitizenMeeting
        fields = '__all__'

from rest_framework import serializers
from .models import Complaint


class ComplaintGeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = [
            'id',
            'category',
            'priority',
            'location',
            'latitude',
            'longitude',
            'created_at',
        ]


#Suggection serilizer
# serializers.py

# serializers.py

# serializers.py



# Tracking Serilizers.py 
from rest_framework import serializers
from .models import Complaint


class CitizenComplaintTrackSerializer(serializers.ModelSerializer):
    timeline = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = [
            "id",
            "priority",
            "location",
            "description",
            "created_at",
            "status",
            "timeline",
        ]

    def get_timeline(self, complaint):
        events = []

        # Complaint created
        events.append({
            "label": "Complaint Registered",
            "date": complaint.created_at,
        })

        # Assignment (internal but simplified)
        assignment = complaint.assignments.first()
        if assignment:
            events.append({
                "label": "Complaint is being processed",
                "date": assignment.assigned_at,
            })

        # Escalation
        escalation = complaint.escalations.first()
        if escalation:
            events.append({
                "label": "Complaint escalated for higher review",
                "date": escalation.escalated_at,
            })

        # Meeting
        meeting = complaint.verification_meetings.first()
        if meeting:
            events.append({
                "label": "Verification meeting conducted",
                "date": meeting.meeting_date,
            })

        # Final verification
        verification = complaint.final_verifications.first()
        if verification:
            events.append({
                "label": "Complaint resolved",
                "date": verification.verified_at,
            })

        return events


from rest_framework import serializers
from .models import ComplaintFeedback

class ComplaintFeedbackSerializer(serializers.ModelSerializer):
    citizen = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ComplaintFeedback
        fields = [
            "id",
            "complaint",
            "citizen",
            "rating",
            "feedback",
            "created_at"
        ]
        read_only_fields = ["citizen"]
