"""
ASGI config for civic_system project.

Handles both regular HTTP requests and WebSocket connections
(used for real-time complaint suggestions/chat).

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'civic_system.settings')

# django_asgi_app must be created before importing anything that touches
# models/apps, otherwise Django raises "Apps aren't loaded yet".
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from accounts.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
