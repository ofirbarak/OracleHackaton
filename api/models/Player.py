import asyncio
import json


class Player:
    def __init__(self, name, websocket):
        self.name = name
        self.handCards = []
        self.websocket = websocket

    def draw(self, deck):
        card = deck.drawCard()
        self.handCards.append(card)

    def put_card(self):
        card_to_play = self.handCards.pop()

    def show_hand(self):
        for card in self.handCards:
            print(card)

    @staticmethod
    def players_in_room_data(players):
        return json.dumps({
            "type": "add_player_to_room",
            "players": [x.name for x in players]
        })

    async def notify_about_players_in_room(self, players):
        if players:  # asyncio.wait doesn't accept an empty list
            message = Player.players_in_room_data(players)
            await asyncio.wait([self.websocket.send(message)])
