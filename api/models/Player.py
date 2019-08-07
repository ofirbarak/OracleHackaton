import asyncio
import json


class Player:
    def __init__(self, name, websocket):
        self.name = name
        self.hand_cards = []
        self.websocket = websocket

    def draw_card(self, deck):
        card = deck.drawCard()
        self.hand_cards.append(card)

    def played_card(self, card):
        self.hand_cards.remove()

    def show_hand(self):
        for card in self.hand_cards:
            print(card)

    def get_card_back(self, card):
        self.hand_cards.append(card)

    def is_won(self):
        return len(self.hand_cards) == 0

    def define_rule(self):
        return Rule()

    async def notify_about_players_in_room(self, players):
        if players:  # asyncio.wait doesn't accept an empty list
            message = json.dumps({
                "type": "add_player_to_room",
                "players": [x.name for x in players]
            })
            await asyncio.wait([self.websocket.send(message)])

    async def notify_about_start_round(self):
        message = json.dumps({
            "type": "game_started",
            "hand_cards": self.hand_cards
        })
        await asyncio.wait([self.websocket.send(message)])
