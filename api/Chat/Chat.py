import asyncio
import json


class Chat:
    def __init__(self, player, websocket):
        # self.websocket = websocket
        self.send_welcome_message(player.name)

    async def send_message(self, player, text, websocket):
        text = "השחקן " + player.name+"אומר "+ text
        self.messages.append(text)
        self.notify_about_new_chat_message()

    async def send_welcome_message(self, player, websocket):
        text = "השחקן" + player.name + "הצטרף לצ'ט"
        self.messages.append(text)
        self.notify_about_new_chat_message()

    def getJsonMessage(self, player):
        return json.dumps({
            "type": "send_message_by_player",
            "message": self.messages,
        })

    async def notify_about_new_chat_message(self):
        message = Chat.getJsonMessage()
        await asyncio.wait([self.websocket.send(message)])

