# accounts/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SuggestionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.complaint_id = self.scope['url_route']['kwargs']['complaint_id']
        self.group_name = f"complaint_{self.complaint_id}"

        # Join group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        citizen = data['citizen']

        # Only broadcast if a suggestion/chat is active
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'suggestion_message',
                'message': message,
                'citizen': citizen,
            }
        )

    async def suggestion_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'citizen': event['citizen']
        }))
