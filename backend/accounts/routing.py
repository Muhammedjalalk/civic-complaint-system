from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/suggestions/(?P<complaint_id>\d+)/$",
        consumers.SuggestionConsumer.as_asgi(),
    ),
]
