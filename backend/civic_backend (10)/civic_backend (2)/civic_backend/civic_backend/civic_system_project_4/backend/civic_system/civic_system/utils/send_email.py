from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_welcome_email(name, email):
    subject = "Welcome to Smart City Portal"
    html_message = render_to_string("welcome_email.html", {"name": name})
    plain_message = strip_tags(html_message)

    send_mail(
        subject,
        plain_message,
        "muhammedjalal12@gmail.com",     # From Email
        ["muhammedjalal12@gmail.com"],                   # To Email
        html_message=html_message
    )
