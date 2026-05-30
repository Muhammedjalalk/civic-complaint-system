# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth.tokens import default_token_generator
# from django.urls import reverse

# from accounts.models import User
# from .tasks import send_verification_email_task


# from django.utils.http import urlsafe_base64_encode
# from django.utils.encoding import force_bytes

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def citizen_register(request):
#     data = request.data

#     full_name = data.get("full_name")
#     email = data.get("email")
#     phone = data.get("phone")
#     password = data.get("password")
#     place = data.get("place")
#     pin = data.get("pin")

#     if not all([full_name, email, phone, password]):
#         return Response(
#             {"error": "All fields are required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if User.objects.filter(email=email).exists():
#         return Response(
#             {"error": "Email already registered"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     user = User.objects.create_user(
#         email=email,
#         full_name=full_name,
#         phone=phone,
#         place=place,
#         pin=pin,
#         password=password,
#         role="CITIZEN",
#         is_active=False
#     )

#     uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
#     token = default_token_generator.make_token(user)

#     verification_url = request.build_absolute_uri(
#         reverse("citizen-verify-email") +
#         f"?uid={uidb64}&token={token}"
#     )

#     send_verification_email_task.delay(user.email, verification_url)

#     return Response(
#         {"message": "Registration successful. Please verify your email."},
#         status=status.HTTP_201_CREATED
#     )
<<<<<<< HEAD
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Civic Complaint System API is running"})
=======

def home(request):
    return JsonResponse({"message": "Civic Complaint System API is running"})

>>>>>>> 72d6597b834827a8f31f9d6bd205ec3e9f1f902a
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from accounts.models import User
from .tasks import send_verification_email_task


# @api_view(["POST"])
# @permission_classes([AllowAny])
# @parser_classes([MultiPartParser, FormParser])
# def citizen_register(request):

#     data = request.data

#     full_name = data.get("full_name")
#     email = data.get("email")
#     phone = data.get("phone")
#     password = data.get("password")
#     place = data.get("place")
#     pin = data.get("pin")

#     document_type = data.get("document_type")
#     government_document = request.FILES.get("government_document")

#     # 🔴 Validation
#     if not all([full_name, email, phone, password, document_type, government_document]):
#         return Response(
#             {"error": "All fields including government document are required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if User.objects.filter(email=email).exists():
#         return Response(
#             {"error": "Email already registered"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # ✅ Create citizen
#     user = User.objects.create_user(
#     email=email,
#     full_name=full_name,
#     phone=phone,
#     place=place,
#     pin=pin,
#     password=password,
#     role="CITIZEN",
#     document_type=document_type,
#     approval_status="Pending",
#     document_verified=False,
#     is_active=False
# )

# # ✅ Save uploaded file properly
# user.government_document = government_document
# user.save()

#     # 📧 Email verification
#     uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
#     token = default_token_generator.make_token(user)

#     verification_url = request.build_absolute_uri(
#         reverse("citizen-verify-email") +
#         f"?uid={uidb64}&token={token}"
#     )

#     send_verification_email_task.delay(user.email, verification_url)

#     return Response(
#         {
#             "message": "Registration successful. Verify email and wait for document approval."
#         },
#         status=status.HTTP_201_CREATED
#     )
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from accounts.models import User
from .tasks import send_verification_email_task


@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def citizen_register(request):
    """
    Register a new citizen with government document upload
    """
    data = request.data

    # Required fields
    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    place = data.get("place")
    pin = data.get("pin")
    document_type = data.get("document_type")
    government_document = request.FILES.get("government_document")

    # -------------------------------
    # Validation
    # -------------------------------
    if not all([full_name, email, phone, password, document_type, government_document]):
        return Response(
            {"error": "All fields including government document are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # -------------------------------
    # Create citizen
    # -------------------------------
    user = User.objects.create_user(
        email=email,
        full_name=full_name,
        phone=phone,
        place=place,
        pin=pin,
        password=password,
        role="CITIZEN",
        document_type=document_type,
        approval_status="Pending",
        document_verified=False,
        is_active=False
    )

    # ✅ Attach uploaded document
    user.government_document = government_document
    user.save()

    # -------------------------------
    # Email verification
    # -------------------------------
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    verification_url = request.build_absolute_uri(
        reverse("citizen-verify-email") +
        f"?uid={uidb64}&token={token}"
    )

    # Send verification email asynchronously
    send_verification_email_task.delay(user.email, verification_url)

    # -------------------------------
    # Response
    # -------------------------------
    return Response(
        {
            "message": "Registration successful. Verify your email and wait for document approval."
        },
        status=status.HTTP_201_CREATED
    )




from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.tokens import default_token_generator

from accounts.models import User


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.tokens import default_token_generator

from accounts.models import User


from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        uidb64 = request.GET.get("uid")
        token = request.GET.get("token")

        if not uidb64 or not token:
            return Response(
                {"error": "Invalid verification link"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=uid, role="CITIZEN")
        except Exception:
            return Response(
                {"error": "Invalid user"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if user.is_active:
            return Response(
                {"message": "Email already verified"},
                status=status.HTTP_200_OK
            )

        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save(update_fields=["is_active"])

            return Response(
                {"message": "Email verified successfully. You can now log in."},
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid or expired token"},
            status=status.HTTP_400_BAD_REQUEST
        )

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def citizen_login(request):
#     email = request.data.get("email")
#     password = request.data.get("password")

#     if not email or not password:
#         return Response(
#             {"error": "Email and password are required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     try:
#         user = User.objects.get(email=email, role="CITIZEN")
#     except User.DoesNotExist:
#         return Response(
#             {"error": "Invalid email or password"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if not user.check_password(password):
#         return Response(
#             {"error": "Invalid email or password"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if not user.is_active:
#         return Response(
#             {"error": "Email not verified. Please verify your email first."},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     # ✅ Generate JWT tokens
#     refresh = RefreshToken.for_user(user)

#     return Response(
#         {
#             "message": "Login successful",
#             "user": {
#                 "id": user.id,
#                 "email": user.email,
#                 "full_name": user.full_name,
#                 "role": user.role,
#             },
#             "access": str(refresh.access_token),
#             "refresh": str(refresh),
#         },
#         status=status.HTTP_200_OK
#     )
@api_view(["POST"])
@permission_classes([AllowAny])
def citizen_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email, role="CITIZEN")
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not user.check_password(password):
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 📧 EMAIL VERIFICATION CHECK
    if not user.is_active:
        return Response(
            {"error": "Email not verified. Please verify your email first."},
            status=status.HTTP_403_FORBIDDEN
        )

    # 🛂 ADMIN APPROVAL CHECK
    if user.approval_status != "Approved":
        return Response(
            {"error": "Account not approved by admin yet."},
            status=status.HTTP_403_FORBIDDEN
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        },
        status=status.HTTP_200_OK
    )


from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CitizenProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 🔒 Ensure only citizens can access this API
        if user.role != "CITIZEN":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        return Response(
            {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
            },
            status=status.HTTP_200_OK
        )

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Complaint
from .serializers import ComplaintSerializer, ComplaintCreateSerializer


class CitizenComplaintView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.role != "CITIZEN":
            return Response(
                {"error": "Only citizens can submit complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ComplaintCreateSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Complaint submitted successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = request.user

        if user.role != "CITIZEN":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        complaints = Complaint.objects.filter(
            citizen=user
        ).order_by("-created_at")

        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# class CitizenComplaintHistoryView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         # 🔒 Only citizens allowed
#         if user.role != "CITIZEN":
#             return Response(
#                 {"error": "Access denied"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         status_filter = request.query_params.get("status")
#         complaints = Complaint.objects.filter(citizen=user)

#         if status_filter:
#             complaints = complaints.filter(
#                 assignments__status=status_filter
#             ).distinct()

#         if not complaints.exists():
#             return Response(
#                 {"message": "No complaints found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         # Pass request context here
#         serializer = ComplaintSerializer(complaints, many=True, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer

class CitizenComplaintHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role != "CITIZEN":
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

        complaints = Complaint.objects.filter(citizen=user).order_by('-created_at')

        if not complaints.exists():
            return Response({"message": "No complaints found"}, status=status.HTTP_200_OK)

        serializer = ComplaintSerializer(complaints, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# complaint Delete
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint


class CitizenComplaintDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user

        if user.role != "CITIZEN":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            complaint = Complaint.objects.get(id=pk, citizen=user)
        except Complaint.DoesNotExist:
            return Response(
                {"error": "Complaint not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # ✅ FIXED STATUS CHECK
        if complaint.status.lower() != "pending":
            return Response(
                {"error": "Cannot delete complaint after processing"},
                status=status.HTTP_400_BAD_REQUEST
            )

        complaint.delete()
        return Response(
            {"message": "Complaint deleted successfully"},
            status=status.HTTP_200_OK
        )

#complaint update 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer


class CitizenComplaintUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = request.user

        if user.role != "CITIZEN":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            complaint = Complaint.objects.get(id=pk, citizen=user)
        except Complaint.DoesNotExist:
            return Response(
                {"error": "Complaint not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Optional: block update after processing
        if complaint.status != "PENDING":
            return Response(
                {"error": "Cannot update complaint after processing"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ComplaintSerializer(
            complaint,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Complaint updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# #offier functions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import OfficerRegisterSerializer


# from accounts.models import User
# from .serializers import OfficerRegisterSerializer


# class OfficerRegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = OfficerRegisterSerializer(data=request.data)

#         if serializer.is_valid():
#             officer = serializer.save(
#                 role="OFFICER",
#                 approval_status="Pending",
#                 is_active=False   # 🔒 admin must approve
#             )

#             return Response(
#                 {
#                     "message": "Officer registered successfully. Please wait for admin approval."
#                 },
#                 status=status.HTTP_201_CREATED
#             )

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User, Department


@api_view(['POST'])
@permission_classes([AllowAny])
def officer_register(request):
    data = request.data

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    department_id = data.get("department")
    designation = data.get("designation")
    license_number = data.get("license_number")
    place = data.get("place")

    if not all([full_name, email, phone, password, department_id]):
        return Response(
            {"error": "All fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        department = Department.objects.get(id=department_id)
    except Department.DoesNotExist:
        return Response(
            {"error": "Invalid department"},
            status=status.HTTP_400_BAD_REQUEST
        )

    User.objects.create_user(
        email=email,
        full_name=full_name,
        phone=phone,
        department=department,
        designation=designation,
        license_number=license_number,
        place=place,
        password=password,
        role="OFFICER",
        approval_status="Pending",
        is_active=False
    )

    return Response(
        {"message": "Officer registration submitted. Await admin approval."},
        status=status.HTTP_201_CREATED
    )


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


@api_view(["POST"])
@permission_classes([AllowAny])
def officer_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        officer = User.objects.get(email=email, role="OFFICER")
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not officer.check_password(password):
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔒 Admin approval check
    if officer.approval_status != "Approved":
        return Response(
            {"error": "Officer account not approved by admin"},
            status=status.HTTP_403_FORBIDDEN
        )

    # 🔒 Active check
    if not officer.is_active:
        return Response(
            {"error": "Account inactive"},
            status=status.HTTP_403_FORBIDDEN
        )

    # ✅ Generate JWT tokens
    refresh = RefreshToken.for_user(officer)

    return Response(
        {
            "message": "Login successful",
            "user": {
                "id": officer.id,
                "full_name": officer.full_name,
                "email": officer.email,
                "role": officer.role,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        },
        status=status.HTTP_200_OK
    )


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Complaint
from accounts.serializers import ComplaintSerializer


# class OfficerComplaintView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         # 🔒 Only officers allowed
#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Access denied"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         # 🔒 Officer must have department
#         if not user.department:
#             return Response(
#                 {"error": "Department not assigned"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # 🔍 Filter complaints by department
#         complaints = Complaint.objects.filter(
#             department=user.department
#         ).order_by("-created_at")

#         serializer = ComplaintSerializer(complaints, many=True)

#         return Response(
#             {
#                 "count": complaints.count(),
#                 "complaints": serializer.data
#             },
#             status=status.HTTP_200_OK
#         )
class OfficerComplaintView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 🔒 Only officers allowed
        if user.role != "OFFICER":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        # 🔒 Officer must have department
        if not user.department:
            return Response(
                {"error": "Department not assigned"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ CORRECT FILTER FOR ManyToManyField
        complaints = Complaint.objects.filter(
            departments=user.department
        ).order_by("-created_at")

        serializer = ComplaintSerializer(complaints, many=True)

        return Response(
            {
                "count": complaints.count(),
                "complaints": serializer.data
            },
            status=status.HTTP_200_OK
        )



from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from accounts.models import User  # ✅ single User model
from django.utils import timezone

@csrf_exempt
def pending_staff_list(request):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Invalid request method. Use GET."}, 
            status=405
        )

    pending_staff = User.objects.filter(
        role="STAFF",
        approval_status="Pending"
    ).values(
        "id",
        "full_name",
        "email",
        "phone",
        "license_number",
        "department",
        "place",       # formerly address
        "created_at"
    )

    return JsonResponse({"pending_staff": list(pending_staff)}, status=200)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_staff_status(request, staff_id):
    # 🔒 Only admin can update staff status
    if request.user.role != "ADMIN":
        return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

    try:
        # Load status from request body
        status_value = request.data.get("status")
        if status_value not in ["Approved", "Rejected"]:
            return Response({"error": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch staff
        staff = User.objects.get(id=staff_id, role="STAFF")
        staff.approval_status = status_value

        # Activate account if approved
        if status_value == "Approved":
            staff.is_active = True
        else:
            staff.is_active = False

        staff.save()

        return Response(
            {"message": f"Staff {status_value} successfully."},
            status=status.HTTP_200_OK
        )

    except User.DoesNotExist:
        return Response({"error": "Staff not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import User

# class OfficerStaffListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # 🔒 Only OFFICER can access
#         if request.user.role != "OFFICER":
#             return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

#         # Get all approved staff
#         approved_staff = User.objects.filter(
#             role="STAFF",
#             approval_status="Approved"
#         ).values("id", "full_name")

#         return Response({"staff": list(approved_staff)}, status=status.HTTP_200_OK)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User

class OfficerStaffListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 🔒 Only OFFICER can access
        if request.user.role != "OFFICER":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        approved_staff = User.objects.filter(
            role="STAFF",
            approval_status="Approved"
        )

        staff_data = [
            {
                "id": staff.id,
                "full_name": staff.full_name
            }
            for staff in approved_staff
        ]

        return Response(
            {"staff": staff_data},
            status=status.HTTP_200_OK
        )


# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from accounts.models import User, Complaint
# from accounts.models import ComplaintAssignment  # adjust if in separate app


# class AssignComplaintView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user

#         # 🔒 Only OFFICER can assign complaints
#         if user.role != "OFFICER":
#             return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

#         complaint_id = request.data.get("complaint_id")
#         staff_id = request.data.get("staff_id")
#         remarks = request.data.get("remarks", "")

#         if not complaint_id or not staff_id:
#             return Response(
#                 {"error": "complaint_id and staff_id are required"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         try:
#             complaint = Complaint.objects.get(id=complaint_id)
#         except Complaint.DoesNotExist:
#             return Response({"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)

#         try:
#             staff = User.objects.get(id=staff_id, role="STAFF", approval_status="Approved")
#         except User.DoesNotExist:
#             return Response({"error": "Staff not found or not approved"}, status=status.HTTP_404_NOT_FOUND)

#         # 🔹 Create assignment entry
#         assignment = ComplaintAssignment.objects.create(
#             complaint=complaint,
#             assigned_to=staff,
#             assigned_by=user,
#             status="Assigned",
#             remarks=remarks
#         )

#         # 🔹 Keep complaint status in sync
#         complaint.status = "Assigned"
#         complaint.save()

#         return Response(
#             {
#                 "message": "Complaint assigned successfully",
#                 "assignment_id": assignment.id,
#                 "complaint_id": complaint.id,
#                 "assigned_to": {"id": staff.id, "full_name": staff.full_name},
#                 "assigned_by": {"id": user.id, "full_name": user.full_name},
#                 "status": assignment.status,
#                 "assigned_at": assignment.assigned_at
#             },
#             status=status.HTTP_201_CREATED
#         )
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from accounts.models import ComplaintAssignment


# class officerAssignComplaintView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         # 🔒 Only STAFF allowed
#         if user.role != "STAFF":
#             return Response(
#                 {"error": "Access denied"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         # 🔒 Staff must have a department
#         if not user.department:
#             return Response(
#                 {"error": "Department not assigned"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # ✅ Get complaints assigned to this staff & matching department
#         assignments = ComplaintAssignment.objects.filter(
#             assigned_to=user,
#             complaint__departments=user.department
#         ).select_related("complaint", "assigned_by")

#         data = []
#         for assignment in assignments:
#             complaint = assignment.complaint

#             data.append({
#                 "assignment_id": assignment.id,
#                 "complaint_id": complaint.id,
#                 "priority": complaint.priority,
#                 "location": complaint.location,
#                 "latitude": complaint.latitude,
#                 "longitude": complaint.longitude,
#                 "description": complaint.description,
#                 "complaint_status": complaint.status,
#                 "assignment_status": assignment.status,
#                 "remarks": assignment.remarks,
#                 "assigned_by": assignment.assigned_by.full_name if assignment.assigned_by else None,
#                 "assigned_at": assignment.assigned_at,
#                 "updated_at": assignment.updated_at,
#             })

#         return Response(
#             {
#                 "count": len(data),
#                 "assigned_complaints": data
#             },
#             status=status.HTTP_200_OK
#         )

# accounts/views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Complaint, ComplaintAssignment, User

class officerAssignComplaintView (APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users

    # GET method: fetch complaints assigned by this officer
    def get(self, request):
        user = request.user

        if user.role != "OFFICER":
            return Response(
                {"error": "Access denied: Only officers can access"},
                status=status.HTTP_403_FORBIDDEN
            )

        assignments = ComplaintAssignment.objects.filter(
            assigned_by=user
        ).select_related("complaint", "assigned_to").order_by("-updated_at")

        data = []
        for assignment in assignments:
            complaint = assignment.complaint
            staff = assignment.assigned_to

            data.append({
                "assignment_id": assignment.id,
                "complaint_id": complaint.id,
                "priority": complaint.priority,
                "location": complaint.location,
                "description": complaint.description,
                "complaint_status": complaint.status,
                "assignment_status": assignment.status,
                "remarks": assignment.remarks,
                "assigned_to": staff.full_name if staff else None,
                "attachment": complaint.attachment.url if complaint.attachment else None,
                "assigned_at": assignment.assigned_at,
                "updated_at": assignment.updated_at,
            })

        return Response(
            {
                "count": len(data),
                "assigned_complaints": data
            },
            status=status.HTTP_200_OK
        )

    # POST method: assign a complaint to staff
    def post(self, request):
        user = request.user

        if user.role != "OFFICER":
            return Response(
                {"error": "Access denied: Only officers can assign complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        complaint_id = request.data.get("complaint_id")
        staff_id = request.data.get("staff_id")

        if not complaint_id or not staff_id:
            return Response(
                {"error": "Both complaint_id and staff_id are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            complaint = Complaint.objects.get(id=complaint_id)
            staff = User.objects.get(id=staff_id, role="STAFF")  # only staff
        except Complaint.DoesNotExist:
            return Response({"error": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)

        # Create assignment
        assignment = ComplaintAssignment.objects.create(
            complaint=complaint,
            assigned_to=staff,
            assigned_by=user,
            status="Assigned"
        )

        # Optionally update complaint status
        complaint.status = "Assigned"
        complaint.save()

        return Response(
            {"message": "Complaint assigned successfully", "assignment_id": assignment.id},
            status=status.HTTP_201_CREATED
        )



# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from accounts.models import ComplaintAssignment  # adjust if in another app

# class OfficerViewReturnedComplaints(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         # 🔒 Only officers can access
#         if user.role != "OFFICER":
#             return Response({"error": "Only officers can access"}, status=status.HTTP_403_FORBIDDEN)

#         # 🔍 Filter complaints returned for verification
#         returned_assignments = ComplaintAssignment.objects.filter(
#             status="Returned"  # instead of returned_for_verification
#         ).select_related("complaint", "assigned_to").order_by("-updated_at")

#         data = []
#         for assignment in returned_assignments:
#             complaint = assignment.complaint
#             staff = assignment.assigned_to
#             data.append({
#                 "assignment_id": assignment.id,
#                 "status": assignment.status,
#                 "staff_id": staff.id if staff else None,
#                 "staff_name": staff.full_name if staff else "N/A",
#                 "complaint_id": complaint.id,
#                 "category": complaint.category,
#                 "priority": complaint.priority,
#                 "department": complaint.department,
#                 "location": complaint.location,
#                 "description": complaint.description,
#                 "remarks": assignment.remarks,
#                 "attachment": complaint.attachment.url if complaint.attachment else None,
#                 "assigned_at": assignment.assigned_at,
#                 "updated_at": assignment.updated_at,
#             })

#         return Response({"returned_complaints": data}, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import ComplaintAssignment


class OfficerReturnedComplaintsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 🔒 Only OFFICER can access
        if user.role != "OFFICER":
            return Response(
                {"error": "Only officers can view returned complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        # ✅ Get complaints returned by staff, assigned by this officer
        assignments = ComplaintAssignment.objects.filter(
            status="Returned",
            assigned_by=user
        ).select_related(
            "complaint",
            "assigned_to"
        )

        data = []
        for assignment in assignments:
            complaint = assignment.complaint
            staff = assignment.assigned_to

            data.append({
                "assignment_id": assignment.id,
                "returned_status": assignment.status,
                "remarks": assignment.remarks,
                "returned_at": assignment.updated_at,

                # 🔹 Staff info
                "staff": {
                    "id": staff.id if staff else None,
                    "name": staff.full_name if staff else None,
                },

                # 🔹 Complaint info
                "complaint": {
                    "id": complaint.id,
                    "priority": complaint.priority,
                    "location": complaint.location,
                    "description": complaint.description,
                    "status": complaint.status,
                    "departments": [
                        {
                            "id": dept.id,
                            "name": dept.name
                        }
                        for dept in complaint.departments.all()
                    ],
                    "attachment": complaint.attachment.url if complaint.attachment else None,
                    "created_at": complaint.created_at,
                }
            })

        return Response(
            {"returned_complaints": data},
            status=status.HTTP_200_OK
        )

#staff functions parts
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import User,Department 

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def staff_register(request):
#     """
#     Staff registration endpoint.
#     Staff registration requires officer/admin approval.
#     """
#     data = request.data
#     full_name = data.get("full_name")
#     email = data.get("email")
#     phone = data.get("phone")
#     password = data.get("password")
#     license_number = data.get("license_number")
#     department_id = data.get("department")
#     place= data.get("place")  # formerly 'address'

#     # ✅ Validate required fields
#     if not all([full_name, email, phone, password, license_number, department_id]):
#         return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

#     if User.objects.filter(email=email).exists():
#         return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

#     # ✅ Create staff user (approval_status pending by default)
#     User.objects.create_user(
#         email=email,
#         full_name=full_name,
#         phone=phone,
#         license_number=license_number,
#         department=department_id,
#         place= place,
#         role="STAFF",
#         password=password,
#         approval_status="Pending",
#         is_active=False  # inactive until approved
#     )

#     return Response(
#         {"message": "Registration submitted. Wait for officer/admin approval."},
#         status=status.HTTP_201_CREATED
#     )

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User, Department  # ✅ import Department

@api_view(['POST'])
@permission_classes([AllowAny])
def staff_register(request):
    data = request.data

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    license_number = data.get("license_number")
    department_id = data.get("department")  # ✅ ID from frontend
    place = data.get("place")

    # ✅ Validate required fields
    if not all([full_name, email, phone, password, license_number, department_id]):
        return Response(
            {"error": "All fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ Convert department ID → Department object
    try:
        department = Department.objects.get(id=department_id)
    except Department.DoesNotExist:
        return Response(
            {"error": "Invalid department"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ Create staff user
    User.objects.create_user(
        email=email,
        full_name=full_name,
        phone=phone,
        license_number=license_number,
        department=department,  # ✅ FIXED
        place=place,
        role="STAFF",
        password=password,
        approval_status="Pending",
        is_active=False
    )

    return Response(
        {"message": "Registration submitted. Wait for officer/admin approval."},
        status=status.HTTP_201_CREATED
    )


# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
# from accounts.models import User

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def staff_login(request):
#     """
#     Staff login endpoint.
#     Only approved staff can login.
#     Returns JWT access and refresh tokens.
#     """
#     email = request.data.get("email")
#     password = request.data.get("password")

#     if not email or not password:
#         return Response(
#             {"error": "Email and password are required."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     try:
#         staff = User.objects.get(email=email, role="STAFF")
#     except User.DoesNotExist:
#         return Response({"error": "Staff not found."}, status=status.HTTP_404_NOT_FOUND)

#     # ✅ Check approval status
#     if staff.approval_status != "Approved":
#         return Response({"error": "Your account is not approved yet."}, status=status.HTTP_403_FORBIDDEN)

#     # ✅ Check password
#     if not staff.check_password(password):
#         return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

#     # 🔑 Generate JWT tokens
#     refresh = RefreshToken.for_user(staff)

#     return Response({
#         "message": "Login successful",
#         "staff_id": staff.id,
#         "full_name": staff.full_name,
#         "email": staff.email,
#         "department": staff.department,
#         "access": str(refresh.access_token),
#         "refresh": str(refresh)
#     }, status=status.HTTP_200_OK)
@api_view(['POST'])
@permission_classes([AllowAny])
def staff_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    staff = User.objects.filter(email=email, role="STAFF").first()
    if not staff:
        return Response({"error": "Staff not found."}, status=status.HTTP_404_NOT_FOUND)

    if staff.approval_status != "Approved":
        return Response({"error": "Your account is not approved yet."}, status=status.HTTP_403_FORBIDDEN)

    if not staff.check_password(password):
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(staff)

    return Response({
        "message": "Login successful",
        "staff_id": staff.id,
        "full_name": staff.full_name,
        "email": staff.email,
        "department": {
            "id": staff.department.id,
            "name": staff.department.name
        } if staff.department else None,
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }, status=status.HTTP_200_OK)


# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from accounts.models import ComplaintAssignment

# class StaffAssignedComplaintsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         staff = request.user

#         # 🔒 Only STAFF can access
#         if staff.role != "STAFF":
#             return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

#         # 🔍 Get assigned complaints
#         assignments = ComplaintAssignment.objects.filter(
#             assigned_to=staff
#         ).select_related("complaint").order_by("-assigned_at")

#         data = []
#         for assignment in assignments:
#             complaint = assignment.complaint
#             data.append({
#                 "assignment_id": assignment.id,
#                 "status": assignment.status,
#                 "assigned_at": assignment.assigned_at,
#                 "updated_at": assignment.updated_at,
#                 "remarks": assignment.remarks,
#                 "complaint": {
#                     "id": complaint.id,
#                     "category": complaint.category,
#                     "priority": complaint.priority,
#                     "department": complaint.department,
#                     "location": complaint.location,
#                     "description": complaint.description,
#                     "attachment": complaint.attachment.url if complaint.attachment else None,
#                 }
#             })

#         return Response({"assigned_complaints": data}, status=status.HTTP_200_OK)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import ComplaintAssignment

class StaffAssignedComplaintsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        staff = request.user

        # 🔒 Only STAFF can access
        if staff.role != "STAFF":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        # 🔍 Get assigned complaints
        assignments = ComplaintAssignment.objects.filter(
            assigned_to=staff
        ).select_related("complaint").prefetch_related(
            "complaint__departments"
        ).order_by("-assigned_at")

        data = []
        for assignment in assignments:
            complaint = assignment.complaint

            data.append({
                "assignment_id": assignment.id,
                "assignment_status": assignment.status,
                "assigned_at": assignment.assigned_at,
                "updated_at": assignment.updated_at,
                "remarks": assignment.remarks,

                "complaint": {
                    "id": complaint.id,
                    "priority": complaint.priority,
                    "departments": [d.name for d in complaint.departments.all()],
                    "location": complaint.location,
                    "latitude": complaint.latitude,
                    "longitude": complaint.longitude,
                    "description": complaint.description,
                    "status": complaint.status,
                    "attachment": complaint.attachment.url if complaint.attachment else None,
                }
            })

        return Response(
            {"assigned_complaints": data},
            status=status.HTTP_200_OK
        )


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import ComplaintAssignment

class UpdateAssignmentStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        staff = request.user

        # 🔒 Only STAFF can access
        if staff.role != "STAFF":
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

        assignment_id = request.data.get("assignment_id")
        status_value = request.data.get("status")

        if not assignment_id or not status_value:
            return Response({"error": "assignment_id and status are required"}, status=status.HTTP_400_BAD_REQUEST)

        # 🔍 Fetch assignment belonging to this staff
        try:
            assignment = ComplaintAssignment.objects.get(
                id=assignment_id,
                assigned_to=staff
            )
        except ComplaintAssignment.DoesNotExist:
            return Response({"error": "Assignment not found for this staff"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Update status
        assignment.status = status_value
        assignment.save(update_fields=["status", "updated_at"])

        return Response({
            "message": "Status updated successfully",
            "assignment_id": assignment.id,
            "new_status": assignment.status
        }, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import ComplaintAssignment

class ReturnComplaintToOfficer(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        staff = request.user

        # 🔒 Only STAFF can access
        if staff.role != "STAFF":
            return Response({"error": "Only staff can return complaints"}, status=status.HTTP_403_FORBIDDEN)

        assignment_id = request.data.get("assignment_id")
        remarks = request.data.get("remarks", "")

        if not assignment_id:
            return Response({"error": "assignment_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # 🔍 Fetch assignment
        try:
            assignment = ComplaintAssignment.objects.get(
                id=assignment_id,
                assigned_to=staff
            )
        except ComplaintAssignment.DoesNotExist:
            return Response({"error": "Assignment not found for this staff"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Update status to "Returned"
        assignment.status = "Returned"
        if remarks:
            assignment.remarks = remarks
        assignment.save(update_fields=["status", "remarks", "updated_at"])

        return Response({
            "message": "Complaint returned to officer for verification",
            "assignment_id": assignment.id,
            "staff_id": staff.id,
            "status": assignment.status
        }, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint, ComplaintAssignment, User

class EscalateComplaintView(APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request, assignment_id):
        """
        Escalate a complaint assignment to higher authority (OFFICER or ADMIN)
        """
        try:
            assignment = ComplaintAssignment.objects.get(id=assignment_id)
        except ComplaintAssignment.DoesNotExist:
            return Response({"error": "Assignment not found."}, status=status.HTTP_404_NOT_FOUND)

        # Only escalate unresolved complaints
        if assignment.status == "Resolved":
            return Response({"message": "Cannot escalate a resolved complaint."}, status=status.HTTP_400_BAD_REQUEST)

        complaint = assignment.complaint

        # Optional: Only escalate high-priority complaints or pending ones
        if complaint.priority != "High" and assignment.status not in ["Assigned", "In Progress"]:
            return Response({"message": "Only unresolved or high-priority complaints can be escalated."}, status=status.HTTP_400_BAD_REQUEST)

        # Find higher authority (OFFICER or ADMIN), exclude current assignee
        higher_authority = User.objects.filter(role__in=["OFFICER", "ADMIN"]).exclude(id=assignment.assigned_to.id).first()
        if not higher_authority:
            return Response({"error": "No higher authority available."}, status=status.HTTP_404_NOT_FOUND)

        # Mark current assignment as returned/escalated
        assignment.status = "Returned"
        assignment.remarks = "Escalated to higher authority."
        assignment.save()

        # Create new assignment for higher authority
        new_assignment = ComplaintAssignment.objects.create(
            complaint=complaint,
            assigned_to=higher_authority,
            assigned_by=request.user,
            status="Assigned",
            remarks="Escalated from lower staff."
        )

        return Response({
            "message": f"Complaint {complaint.id} escalated to {higher_authority.full_name} ({higher_authority.role}).",
            "new_assignment_id": new_assignment.id,
            "new_status": new_assignment.status
        }, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint, ComplaintAssignment, User, Department

class MultiDepartmentAssignmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, complaint_id):
        """
        Assign a complaint to multiple departments
        """
        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response({"error": "Complaint not found."}, status=status.HTTP_404_NOT_FOUND)

        department_ids = request.data.get("department_ids", [])
        if not department_ids:
            return Response({"error": "No departments provided."}, status=status.HTTP_400_BAD_REQUEST)

        for dept_id in department_ids:
            try:
                department = Department.objects.get(id=dept_id)
            except Department.DoesNotExist:
                continue

            # Find a staff in this department (example: first available)
            staff = User.objects.filter(role="STAFF", department=department.name).first()
            if staff:
                ComplaintAssignment.objects.create(
                    complaint=complaint,
                    assigned_to=staff,
                    assigned_by=request.user,
                    status="Assigned",
                    remarks=f"Assigned to {department.name} department."
                )

        return Response({"message": "Complaint assigned to multiple departments."}, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Complaint
from .serializers import ComplaintGeoSerializer

class ComplaintGeoMapView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Get all complaints with latitude and longitude
        """
        complaints = Complaint.objects.exclude(latitude__isnull=True, longitude__isnull=True)
        serializer = ComplaintGeoSerializer(complaints, many=True)
        return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CitizenMeeting
from .serializers import CitizenMeetingSerializer
from django.db.models import Q   

class ScheduleMeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Schedule a meeting with a citizen
        """
        serializer = CitizenMeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Meeting scheduled successfully.", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListMeetingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        List all meetings for the logged-in officer or citizen
        """
        user = request.user
        meetings = CitizenMeeting.objects.filter(models.Q(citizen=user) | models.Q(officer=user))
        serializer = CitizenMeetingSerializer(meetings, many=True)
        return Response(serializer.data)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .models import Department

# class DepartmentByCategoryView(APIView):
#     def get(self, request):
#         category_id = request.GET.get('category')

#         departments = Department.objects.filter(parent_id=category_id)

#         return Response([
#             {"id": d.id, "name": d.name}
#             for d in departments
#         ])
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Department

class DepartmentByCategoryView(APIView):
    permission_classes = [AllowAny]  # ✅ ADD THIS LINE

    def get(self, request):
        category_id = request.GET.get('category')

        if not category_id:
            return Response([])

        departments = Department.objects.filter(parent_id=category_id)

        return Response([
            {"id": d.id, "name": d.name}
            for d in departments
        ])



# class CategoryListView(APIView):
#     def get(self, request):
#         categories = Department.objects.filter(parent__isnull=True)
#         return Response([
#             {"id": c.id, "name": c.name}
#             for c in categories
#         ])


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Department

class CategoryListView(APIView):
    permission_classes = [AllowAny]  # ✅ THIS IS REQUIRED

    def get(self, request):
        categories = Department.objects.filter(parent__isnull=True)
        return Response([
            {"id": c.id, "name": c.name}
            for c in categories
        ])

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class StaffProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 🔒 Only STAFF can access
        if user.role != "STAFF":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        data = {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "license_number": user.license_number,
            "place": user.place,
            "department": {
                "id": user.department.id if user.department else None,
                "name": user.department.name if user.department else None,
            },
            "approval_status": user.approval_status,
            "is_active": user.is_active,
            "role": user.role,
        }

        return Response(
            {"staff_profile": data},
            status=status.HTTP_200_OK
        )

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class OfficerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 🔒 Only OFFICER can access
        if user.role != "OFFICER":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        data = {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "designation": user.designation,
            "license_number": user.license_number,
            "department": {
                "id": user.department.id if user.department else None,
                "name": user.department.name if user.department else None,
            },
            "approval_status": user.approval_status,
            "is_active": user.is_active,
            "role": user.role,
        }

        return Response(
            {"officer_profile": data},
            status=status.HTTP_200_OK
        )


#suggection is optional
# views.py

# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from .models import CitizenSuggestion
# from .serializers import CitizenSuggestionSerializer

# class CitizenSuggestionCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = CitizenSuggestionSerializer(
#             data=request.data,
#             context={"request": request}
#         )

#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {"message": "Suggestion submitted successfully"},
#                 status=status.HTTP_201_CREATED
#             )

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Department
# from .serializers import DepartmentSerializer

# class DepartmentListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # ONLY real departments (child departments)
#         departments = Department.objects.filter(parent__isnull=False)
#         serializer = DepartmentSerializer(departments, many=True)
#         return Response(serializer.data)

# class CitizenSuggestionListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         suggestions = CitizenSuggestion.objects.filter(citizen=request.user)
#         serializer = CitizenSuggestionSerializer(suggestions, many=True)
#         return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint

class SuggestionReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, complaint_id):
        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response(
                {"error": "Complaint not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        reply_text = request.data.get("suggestion_reply")

        if not reply_text:
            return Response(
                {"error": "Reply is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        complaint.reply = reply_text
        complaint.save()

        return Response(
            {
                "message": "Suggestion reply sent successfully",
                "reply": complaint.reply
            },
            status=status.HTTP_200_OK
        )


# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import User


# class OfficerViewStaffProfile(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, staff_id):
#         user = request.user

#         # 🔒 Only OFFICER can access
#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Access denied"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         try:
#             staff = User.objects.get(id=staff_id, role="STAFF")
#         except User.DoesNotExist:
#             return Response(
#                 {"error": "Staff not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         data = {
#             "id": staff.id,
#             "full_name": staff.full_name,
#             "email": staff.email,
#             "phone": staff.phone,
#             "license_number": staff.license_number,
#             "place": staff.place,
#             "department": {
#                 "id": staff.department.id if staff.department else None,
#                 "name": staff.department.name if staff.department else None,
#             },
#             "approval_status": staff.approval_status,
#             "is_active": staff.is_active,
#             "role": staff.role,
#         }

#         return Response(
#             {"staff_profile": data},
#             status=status.HTTP_200_OK
#         )


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User

class OfficerDepartmentStaffListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        officer = request.user

        # 🔒 Only OFFICER
        if officer.role != "OFFICER":
            return Response(
                {"error": "Access denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        # 🔒 Officer must have department
        if not officer.department:
            return Response(
                {"error": "Officer department not assigned"},
                status=status.HTTP_400_BAD_REQUEST
            )

        staff_list = User.objects.filter(
            role="STAFF",
            department=officer.department,
            approval_status="Approved"
        ).values(
            "id",
            "full_name",
            "email",
            "phone",
            "license_number",
            "place"
        )

        return Response(
            {
                "department": officer.department.name,
                "staff": list(staff_list)
            },
            status=status.HTTP_200_OK
        )


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User

class OfficerViewStaffDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Only OFFICER can access
        if request.user.role != "OFFICER":
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

        officer_department = request.user.department

        if not officer_department:
            return Response({"error": "Officer has no department assigned"}, status=status.HTTP_400_BAD_REQUEST)

        # Get all approved staff in officer's department
        staff_in_department = User.objects.filter(
            role="STAFF",
            approval_status="Approved",
            department=officer_department
        ).values(
            "id",
            "full_name",
            "email",
            "phone",
            "license_number",
            "place",
            "approval_status",
            "is_active",
        )

        # Include department info
        staff_list = []
        for staff in staff_in_department:
            staff["department"] = {
                "id": officer_department.id,
                "name": officer_department.name
            }
            staff_list.append(staff)

        return Response({"staff": staff_list}, status=status.HTTP_200_OK)


# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import Complaint, ComplaintAssignment
# from .models import ComplaintFinalVerification

# class OfficerFinalVerificationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user

#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can verify complaints"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         complaint_ids = request.data.get("complaint_ids", [])

#         for cid in complaint_ids:
#             complaint = Complaint.objects.get(id=cid)

#             # save verification
#             ComplaintFinalVerification.objects.create(
#                 complaint=complaint,
#                 verified_by=user
#             )

#             # update assignment status
#             ComplaintAssignment.objects.filter(
#                 complaint=complaint,
#                 assigned_by=user
#             ).update(status="Verified")

#             # update complaint status
#             complaint.status = "Verified"
#             complaint.save()

#         return Response(
#             {"message": "Complaints verified successfully"},
#             status=status.HTTP_200_OK
#         )
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import Complaint, ComplaintAssignment
# from .models import ComplaintFinalVerification


# class OfficerFinalVerificationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user

#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can verify complaints"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         complaint_ids = request.data.get("complaint_ids", [])

#         # ✅ TAKE REMARK FROM FRONTEND
#         remark = request.data.get("remark") or request.data.get("remarks")

#         for cid in complaint_ids:
#             complaint = Complaint.objects.get(id=cid)

#             # ✅ SAVE VERIFICATION WITH REMARK
#             ComplaintFinalVerification.objects.create(
#                 complaint=complaint,
#                 verified_by=user,
#                 remarks=remark
#             )

#             # update assignment status
#             ComplaintAssignment.objects.filter(
#                 complaint=complaint,
#                 assigned_by=user
#             ).update(status="Verified")

#             # update complaint status
#             complaint.status = "Verified"
#             complaint.save()

#         return Response(
#             {"message": "Complaints verified successfully"},
#             status=status.HTTP_200_OK
#         )


# # from .models import ComplaintEscalation

# # class OfficerEscalateComplaintsView(APIView):
# #     permission_classes = [IsAuthenticated]

# #     def post(self, request):
# #         user = request.user

# #         if user.role != "OFFICER":
# #             return Response(
# #                 {"error": "Only officers can escalate complaints"},
# #                 status=status.HTTP_403_FORBIDDEN
# #             )

# #         complaint_ids = request.data.get("complaint_ids", [])

# #         for cid in complaint_ids:
# #             complaint = Complaint.objects.get(id=cid)

# #             ComplaintEscalation.objects.create(
# #                 complaint=complaint,
# #                 escalated_by=user,
# #                 reason="Escalated after staff return"
# #             )

# #             ComplaintAssignment.objects.filter(
# #                 complaint=complaint,
# #                 assigned_by=user
# #             ).update(status="Escalated")

# #             complaint.status = "Escalated"
# #             complaint.save()

# #         return Response(
# #             {"message": "Complaints escalated successfully"},
# #             status=status.HTTP_200_OK
# #         )
# from .models import ComplaintEscalation, Complaint, ComplaintAssignment
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status


# class OfficerEscalateComplaintsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user

#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can escalate complaints"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         complaint_ids = request.data.get("complaint_ids", [])
#         remark = request.data.get("remark") or request.data.get("remarks")

#         for cid in complaint_ids:
#             complaint = Complaint.objects.get(id=cid)

#             ComplaintEscalation.objects.create(
#                 complaint=complaint,
#                 escalated_by=user,
#                 reason=remark  # ✅ TAKE FROM FRONTEND
#             )

#             ComplaintAssignment.objects.filter(
#                 complaint=complaint,
#                 assigned_by=user
#             ).update(status="Escalated")

#             complaint.status = "Escalated"
#             complaint.save()

#         return Response(
#             {"message": "Complaints escalated successfully"},
#             status=status.HTTP_200_OK
#         )

from .models import ComplaintEscalation, Complaint, ComplaintAssignment
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.core.mail import send_mail
from django.conf import settings


# class OfficerEscalateComplaintsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user

#         # 🔒 Role check
#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can escalate complaints"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         complaint_ids = request.data.get("complaint_ids", [])
#         remark = request.data.get("remark") or request.data.get("remarks")

#         if not complaint_ids:
#             return Response(
#                 {"error": "Complaint IDs are required"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         for cid in complaint_ids:
#             try:
#                 complaint = Complaint.objects.get(id=cid)
#             except Complaint.DoesNotExist:
#                 continue

#             # ✅ Save escalation
#             ComplaintEscalation.objects.create(
#                 complaint=complaint,
#                 escalated_by=user,
#                 reason=remark
#             )

#             # ✅ Update assignment status
#             ComplaintAssignment.objects.filter(
#                 complaint=complaint,
#                 assigned_by=user
#             ).update(status="Escalated")

#             # ✅ Update complaint status
#             complaint.status = "Escalated"
#             complaint.save()

#             # ✅ SEND EMAIL TO CITIZEN
#             citizen_email = complaint.citizen.email
#             send_mail(
#                 subject="Complaint Escalated",
#                 message=(
#                     f"Dear {complaint.citizen.full_name},\n\n"
#                     f"Your complaint (ID: {complaint.id}) has been escalated to the concerned authority.\n\n"
#                     f"Remarks: {remark or 'No remarks'}\n\n"
#                     f"Thank you for using the Civic Complaint System."
#                 ),
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[citizen_email],
#                 fail_silently=True
#             )

#         return Response(
#             {"message": "Complaints escalated and notification sent successfully"},
#             status=status.HTTP_200_OK
#         )

from accounts.models import ComplaintEscalation, Complaint, ComplaintAssignment, User

class OfficerEscalateComplaintsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.role != "OFFICER":
            return Response(
                {"error": "Only officers can escalate complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        complaint_ids = request.data.get("complaint_ids", [])
        remark = request.data.get("remark") or request.data.get("remarks")

        if not complaint_ids:
            return Response(
                {"error": "Complaint IDs are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        admin_user = User.objects.filter(role="ADMIN").first()  # 🔥 assign admin here

        for cid in complaint_ids:
            try:
                complaint = Complaint.objects.get(id=cid)
            except Complaint.DoesNotExist:
                continue

            # ✅ Save escalation with admin assignment
            ComplaintEscalation.objects.create(
                complaint=complaint,
                escalated_by=user,
                escalated_to=admin_user,  # 🔥 FIX: assign admin
                reason=remark
            )

            # ✅ Update assignment status
            ComplaintAssignment.objects.filter(
                complaint=complaint,
                assigned_by=user
            ).update(status="Escalated")

            # ✅ Update complaint status
            complaint.status = "Escalated"
            complaint.save()

            # ✅ Send email
            citizen_email = complaint.citizen.email
            send_mail(
                subject="Complaint Escalated",
                message=(
                    f"Dear {complaint.citizen.full_name},\n\n"
                    f"Your complaint (ID: {complaint.id}) has been escalated to the concerned authority.\n\n"
                    f"Remarks: {remark or 'No remarks'}\n\n"
                    f"Thank you for using the Civic Complaint System."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[citizen_email],
                fail_silently=True
            )

        return Response(
            {"message": "Complaints escalated and notification sent successfully"},
            status=status.HTTP_200_OK
        )

# app/views.py

# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import Complaint, ComplaintAssignment
# from .models import ComplaintFinalVerification


# class OfficerFinalVerificationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user

#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can verify complaints"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         complaint_ids = request.data.get("complaint_ids", [])

#         # ✅ TAKE REMARK FROM FRONTEND
#         remark = request.data.get("remark") or request.data.get("remarks")

#         for cid in complaint_ids:
#             complaint = Complaint.objects.get(id=cid)

#             # ✅ SAVE VERIFICATION WITH REMARK
#             ComplaintFinalVerification.objects.create(
#                 complaint=complaint,
#                 verified_by=user,
#                 remarks=remark
#             )

#             # update assignment status
#             ComplaintAssignment.objects.filter(
#                 complaint=complaint,
#                 assigned_by=user
#             ).update(status="Verified")

#             # update complaint status
#             complaint.status = "Verified"
#             complaint.save()

#         return Response(
#             {"message": "Complaints verified successfully"},
#             status=status.HTTP_200_OK
#         )
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.core.mail import send_mail
from django.conf import settings

from accounts.models import Complaint, ComplaintAssignment
from .models import ComplaintFinalVerification


class OfficerFinalVerificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # 🔒 Role check
        if user.role != "OFFICER":
            return Response(
                {"error": "Only officers can verify complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        complaint_ids = request.data.get("complaint_ids", [])
        remark = request.data.get("remark") or request.data.get("remarks")

        if not complaint_ids:
            return Response(
                {"error": "Complaint IDs are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        for cid in complaint_ids:
            try:
                complaint = Complaint.objects.get(id=cid)
            except Complaint.DoesNotExist:
                continue

            # ✅ Save final verification
            ComplaintFinalVerification.objects.create(
                complaint=complaint,
                verified_by=user,
                remarks=remark
            )

            # ✅ Update assignment status
            ComplaintAssignment.objects.filter(
                complaint=complaint,
                assigned_to=user
            ).update(status="Verified")

            # ✅ Update complaint status
            complaint.status = "Verified"
            complaint.save()

            # ✅ SEND EMAIL TO CITIZEN
            citizen_email = complaint.citizen.email

            send_mail(
                subject="Complaint Successfully Verified",
                message=(
                    f"Dear {complaint.citizen.full_name},\n\n"
                    f"Your complaint (ID: {complaint.id}) has been successfully verified "
                    f"by the concerned officer.\n\n"
                    f"Remarks: {remark or 'No remarks'}\n\n"
                    f"Thank you for using the Civic Complaint System."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[citizen_email],
                fail_silently=True,
            )

        return Response(
            {"message": "Complaints verified and notification sent successfully"},
            status=status.HTTP_200_OK
        )



# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from accounts.models import (
#     ComplaintAssignment,
#     ComplaintFinalVerification,
#     ComplaintEscalation
# )

# class OfficerVerificationHistoryView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         officer = request.user

#         if officer.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can view verification history"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         history = []

#         # ✅ VERIFIED COMPLAINTS
#         verified_qs = ComplaintFinalVerification.objects.filter(
#             verified_by=officer
#         ).select_related("complaint")

#         for v in verified_qs:
#             assignment = ComplaintAssignment.objects.filter(
#                 complaint=v.complaint,
#                 assigned_by=officer
#             ).select_related("assigned_to").first()

#             history.append({
#                 "assignment_id": assignment.id if assignment else None,
#                 "returned_status": "Verified",
#                 "verified_at": v.verified_at,
#                 "final_remarks": v.remarks,

#                 "staff": {
#                     "id": assignment.assigned_to.id if assignment and assignment.assigned_to else None,
#                     "name": assignment.assigned_to.full_name if assignment and assignment.assigned_to else None,
#                 },

#                 "complaint": {
#                     "id": v.complaint.id,
#                     "priority": v.complaint.priority,
#                     "description": v.complaint.description,
#                     "location": v.complaint.location,
#                     "departments": [
#                         {"id": d.id, "name": d.name}
#                         for d in v.complaint.departments.all()
#                     ],
#                 }
#             })

#         # ✅ ESCALATED COMPLAINTS
#         escalated_qs = ComplaintEscalation.objects.filter(
#             escalated_by=officer
#         ).select_related("complaint")

#         for e in escalated_qs:
#             assignment = ComplaintAssignment.objects.filter(
#                 complaint=e.complaint,
#                 assigned_by=officer
#             ).select_related("assigned_to").first()

#             history.append({
#                 "assignment_id": assignment.id if assignment else None,
#                 "returned_status": "Escalated",
#                 "escalated_at": e.escalated_at,
#                 "escalation_reason": e.reason,

#                 "staff": {
#                     "id": assignment.assigned_to.id if assignment and assignment.assigned_to else None,
#                     "name": assignment.assigned_to.full_name if assignment and assignment.assigned_to else None,
#                 },

#                 "complaint": {
#                     "id": e.complaint.id,
#                     "priority": e.complaint.priority,
#                     "description": e.complaint.description,
#                     "location": e.complaint.location,
#                     "departments": [
#                         {"id": d.id, "name": d.name}
#                         for d in e.complaint.departments.all()
#                     ],
#                 }
#             })

#         # 🔽 Sort by latest action
#         history.sort(
#             key=lambda x: x.get("verified_at") or x.get("escalated_at"),
#             reverse=True
#         )

#         return Response(
#             {"history": history},
#             status=status.HTTP_200_OK
#         )

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import (
    ComplaintAssignment,
    ComplaintFinalVerification,
    ComplaintEscalation
)


class OfficerVerificationHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        officer = request.user

        if officer.role != "OFFICER":
            return Response(
                {"error": "Only officers can view verification history"},
                status=status.HTTP_403_FORBIDDEN
            )

        history = []

        # =========================
        # ✅ VERIFIED COMPLAINTS
        # =========================
        verified_qs = ComplaintFinalVerification.objects.filter(
            verified_by=officer
        ).select_related("complaint")

        for v in verified_qs:
            assignment = ComplaintAssignment.objects.filter(
                complaint=v.complaint,
                assigned_by=officer
            ).select_related("assigned_to").first()

            history.append({
                "assignment_id": assignment.id if assignment else None,
                "returned_status": "Verified",
                "verified_at": v.verified_at,

                # ✅ OFFICER ENTERED REMARK
                "remark": v.remarks,
                "final_remarks": v.remarks,  # keep old key

                "staff": {
                    "id": assignment.assigned_to.id if assignment and assignment.assigned_to else None,
                    "name": assignment.assigned_to.full_name if assignment and assignment.assigned_to else None,
                },

                "complaint": {
                    "id": v.complaint.id,
                    "priority": v.complaint.priority,
                    "description": v.complaint.description,
                    "location": v.complaint.location,
                    "departments": [
                        {"id": d.id, "name": d.name}
                        for d in v.complaint.departments.all()
                    ],
                }
            })

        # =========================
        # ✅ ESCALATED COMPLAINTS
        # =========================
        escalated_qs = ComplaintEscalation.objects.filter(
            escalated_by=officer
        ).select_related("complaint")

        for e in escalated_qs:
            assignment = ComplaintAssignment.objects.filter(
                complaint=e.complaint,
                assigned_by=officer
            ).select_related("assigned_to").first()

            history.append({
                "assignment_id": assignment.id if assignment else None,
                "returned_status": "Escalated",
                "escalated_at": e.escalated_at,

                # ✅ OFFICER ENTERED REMARK
                "remark": e.reason,
                "escalation_reason": e.reason,  # keep old key

                "staff": {
                    "id": assignment.assigned_to.id if assignment and assignment.assigned_to else None,
                    "name": assignment.assigned_to.full_name if assignment and assignment.assigned_to else None,
                },

                "complaint": {
                    "id": e.complaint.id,
                    "priority": e.complaint.priority,
                    "description": e.complaint.description,
                    "location": e.complaint.location,
                    "departments": [
                        {"id": d.id, "name": d.name}
                        for d in e.complaint.departments.all()
                    ],
                }
            })

        # =========================
        # 🔽 SORT BY LATEST ACTION
        # =========================
        history.sort(
            key=lambda x: x.get("verified_at") or x.get("escalated_at"),
            reverse=True
        )

        return Response(
            {"history": history},
            status=status.HTTP_200_OK
        )



# views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer

class CitizenTrackComplaintView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, complaint_id):
        user = request.user

        try:
            complaint = Complaint.objects.get(id=complaint_id, citizen=user)
        except Complaint.DoesNotExist:
            return Response(
                {"error": "Complaint not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ComplaintSerializer(complaint, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint, ComplaintFeedback
from .serializers import ComplaintFeedbackSerializer

class ComplaintFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, complaint_id):
        feedbacks = ComplaintFeedback.objects.filter(complaint_id=complaint_id)
        serializer = ComplaintFeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request, complaint_id):
        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response(
                {"error": "Complaint not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ComplaintFeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                complaint=complaint,
                citizen=request.user
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views.py
# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Complaint

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def citizen_verified_complaints(request):
    user = request.user
    if user.role != "CITIZEN":
        return Response({"detail": "Forbidden"}, status=403)

    complaints = Complaint.objects.filter(citizen=user, final_verifications__isnull=False).distinct()

    data = []
    for complaint in complaints:
        verified_info = complaint.final_verifications.last()
        departments = [str(d) for d in complaint.departments.all()]

        data.append({
            "id": complaint.id,
            "priority": complaint.priority,
            "departments": departments,
            "location": complaint.location,
            "description": complaint.description,
            "attachment": complaint.attachment.url if complaint.attachment else None,
            "status": complaint.status,
            "created_at": complaint.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "verified_by": str(verified_info.verified_by),
            "verified_at": verified_info.verified_at.strftime("%Y-%m-%d %H:%M:%S"),
            "verification_remarks": verified_info.remarks or ""
        })

    return Response(data)

#citizen share Feddback
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Complaint, ComplaintFeedback


class CitizenComplaintFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        complaint_id = request.data.get("complaint")
        rating = request.data.get("rating")
        comment = request.data.get("comment")

        # 🔴 Validate input
        if not complaint_id or not rating:
            return Response(
                {"error": "Complaint and rating are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔍 Get complaint (only citizen's complaint)
        try:
            complaint = Complaint.objects.get(
                id=complaint_id,
                citizen=user
            )
        except Complaint.DoesNotExist:
            return Response(
                {"error": "Complaint not found or unauthorized"},
                status=status.HTTP_404_NOT_FOUND
            )

        # 🛑 Prevent duplicate feedback
        if ComplaintFeedback.objects.filter(
            complaint=complaint,
            citizen=user
        ).exists():
            return Response(
                {"error": "Feedback already submitted"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ Save feedback
        ComplaintFeedback.objects.create(
            complaint=complaint,
            citizen=user,
            rating=rating,
            feedback=comment or ""
        )

        return Response(
            {"message": "Feedback submitted successfully"},
            status=status.HTTP_201_CREATED
        )


#officer View Feedback
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import ComplaintFeedback, Complaint


class OfficerViewFeedback(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 🔐 Only OFFICER allowed
        if user.role != "OFFICER":
            return Response(
                {"error": "Unauthorized"},
                status=status.HTTP_403_FORBIDDEN
            )

        if not user.department:
            return Response(
                {"error": "Officer department not assigned"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔍 Get feedbacks related to officer department
        feedbacks = ComplaintFeedback.objects.filter(
            complaint__departments=user.department
        ).select_related(
            "complaint", "citizen"
        ).order_by("-created_at")

        data = []
        for fb in feedbacks:
            data.append({
                "feedback_id": fb.id,
                "rating": fb.rating,
                "feedback": fb.feedback,
                "created_at": fb.created_at,

                # Complaint info
                "complaint_id": fb.complaint.id,
                "priority": fb.complaint.priority,
                "status": fb.complaint.status,
                "location": fb.complaint.location,
                "description": fb.complaint.description,

                # Citizen info
                "citizen_name": fb.citizen.full_name,
                "citizen_email": fb.citizen.email,
            })

        return Response(data, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import ComplaintEscalation
from django.db.models import Q


class OfficerEscalatedComplaintsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # ✅ Only OFFICER allowed
        if user.role != "OFFICER":
            return Response(
                {"error": "Only officers can view escalated complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        # ✅ Correct filtering logic
        escalations = ComplaintEscalation.objects.filter(
            Q(escalated_by=user) | Q(complaint__assigned_authority=user)
        ).select_related(
            "complaint",
            "escalated_by",
            "escalated_to"
        ).order_by("-escalated_at")

        data = []
        for e in escalations:
            data.append({
                "id": e.id,
                "complaint": {
                    "id": e.complaint.id,
                    "description": e.complaint.description,
                    "suggestion": e.complaint.suggestion,
                    "attachment": e.complaint.attachment.url if e.complaint.attachment else None,
                    "priority": e.complaint.priority,
                    "location": e.complaint.location,
                    "status": e.complaint.status,
                },
                "escalated_by": {
                    "id": e.escalated_by.id,
                    "full_name": e.escalated_by.full_name,
                    "email": e.escalated_by.email,
                },
                "escalated_to": {
                    "id": e.escalated_to.id,
                    "full_name": e.escalated_to.full_name,
                    "email": e.escalated_to.email,
                } if e.escalated_to else None,
                "reason": e.reason or "",
                "status": e.status,   # PENDING / APPROVED / REJECTED / REASSIGNED
                "escalated_at": e.escalated_at,
            })

        return Response(data, status=status.HTTP_200_OK)


# accounts/views.py
# views.py
# views.py
# accounts/views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import ComplaintEscalation

class CitizenEscalatedComplaintsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        escalations = ComplaintEscalation.objects.filter(complaint__citizen=user)
        
        data = []
        for e in escalations:
            data.append({
                "id": e.id,
                "complaint": {
                    "id": e.complaint.id,
                    "description": e.complaint.description,
                    "suggestion": e.complaint.suggestion,
                    "attachment": e.complaint.attachment.url if e.complaint.attachment else None,
                    "priority": e.complaint.priority,
                    "location": e.complaint.location,
                    "status": e.complaint.status,
                },
                "escalated_by": {
                    "id": e.escalated_by.id,
                    "full_name": e.escalated_by.full_name,
                    "email": e.escalated_by.email,
                },
                # ✅ Handle null escalated_to properly
                "escalated_to": {
                    "id": e.escalated_to.id,
                    "full_name": e.escalated_to.full_name,
                    "email": e.escalated_to.email,
                } if e.escalated_to else None,
                "reason": e.reason or "",
                "status": e.status,
                "escalated_at": e.escalated_at,
            })
        
        return Response(data)


# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from accounts.models import ComplaintEscalation, ComplaintFinalVerification


# class OfficerFinalVerificationView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, escalation_id):
#         user = request.user

#         # ✅ role check
#         if user.role != "OFFICER":
#             return Response(
#                 {"error": "Only officers can perform final verification"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         try:
#             escalation = ComplaintEscalation.objects.select_related(
#                 "complaint"
#             ).get(id=escalation_id)
#         except ComplaintEscalation.DoesNotExist:
#             return Response(
#                 {"error": "Escalation not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         # ✅ only REASSIGNED allowed
#         if escalation.status != "REASSIGNED":
#             return Response(
#                 {"error": "Only reassigned complaints can be verified"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # ✅ prevent duplicate verification
#         if ComplaintFinalVerification.objects.filter(
#             complaint=escalation.complaint
#         ).exists():
#             return Response(
#                 {"error": "Complaint already verified"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # ✅ create final verification
#         ComplaintFinalVerification.objects.create(
#             complaint=escalation.complaint,
#             verified_by=user,
#             remarks=request.data.get("remarks", "")
#         )

#         # ✅ update escalation status
#         escalation.status = "APPROVED"
#         escalation.save()

#         return Response(
#             {
#                 "message": "Complaint verified successfully",
#                 "escalation_id": escalation.id,
#                 "complaint_id": escalation.complaint.id,
#                 "status": escalation.status
#             },
#             status=status.HTTP_200_OK
#         )



from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.core.mail import send_mail
from django.conf import settings

from accounts.models import Complaint, ComplaintAssignment
from .models import ComplaintFinalVerification


class OfficerReassignedComplaintVerificationView(APIView):
    """
    Allows an officer to verify complaints that were reassigned to them.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # 🔒 Role check
        if user.role != "OFFICER":
            return Response(
                {"error": "Only officers can verify complaints"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get complaint id(s) from request
        complaint_ids = request.data.get("complaint_ids") or request.data.get("complaint_id")
        remark = request.data.get("remark") or request.data.get("remarks")

        # Normalize to list
        if isinstance(complaint_ids, int):
            complaint_ids = [complaint_ids]
        elif not isinstance(complaint_ids, list):
            return Response(
                {"error": "Complaint ID(s) are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        verified_complaints = []

        for cid in complaint_ids:
            try:
                complaint = Complaint.objects.get(id=cid)
            except Complaint.DoesNotExist:
                continue

            # ✅ Check if complaint is reassigned to this officer
            assignment = ComplaintAssignment.objects.filter(
                complaint=complaint,
                assigned_to=user
            ).first()

            if not assignment:
                continue  # Skip complaints not assigned/reassigned to this officer

            if complaint.status not in ["REASSIGNED", "PENDING"]:
                continue  # Only verify complaints in REASSIGNED or PENDING status

            # ✅ Save final verification record
            ComplaintFinalVerification.objects.create(
                complaint=complaint,
                verified_by=user,
                remarks=remark
            )

            # ✅ Update assignment status
            assignment.status = "Verified"
            assignment.save()

            # ✅ Update complaint status
            complaint.status = "APPROVED"
            complaint.save()

            # ✅ Send email to citizen
            citizen_email = complaint.citizen.email
            send_mail(
                subject="Complaint Successfully Verified",
                message=(
                    f"Dear {complaint.citizen.full_name},\n\n"
                    f"Your complaint (ID: {complaint.id}) has been verified "
                    f"by the officer.\n\n"
                    f"Remarks: {remark or 'No remarks'}\n\n"
                    f"Thank you for using the Civic Complaint System."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[citizen_email],
                fail_silently=True,
            )

            verified_complaints.append(complaint.id)

        if not verified_complaints:
            return Response(
                {"error": "No complaints were verified. They may not be reassigned to you or already verified."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "message": f"Successfully verified complaints: {verified_complaints}"
            },
            status=status.HTTP_200_OK
        )
