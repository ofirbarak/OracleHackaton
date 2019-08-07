

class Chat:
    def __init__(self, player, websocket):
        self.websocket = websocket
        self.players = [player]
        self.send_message("הצטרף לצ'ט" + player.name + "המשתמש")

    def add_user(self, player):
        return "hello from " + player.name

    def send_message(self, player, text, websocket):
        self.messages.append(text)