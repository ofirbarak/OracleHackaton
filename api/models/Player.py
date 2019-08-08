import asyncio
import json


class Player:
    def __init__(self, name, websocket=None):
        self.name = name
        self.hand_cards = []
        self.websocket = websocket

    def draw_card(self, deck):
        card = deck.draw_card()
        self.hand_cards.append(card)
        return card

    async def played_card(self, card):
        self.hand_cards.remove(card)
        await self.notify_about_put_card(card)

    def show_hand(self):
        for card in self.hand_cards:
            print(card)

    def get_card_back(self, card):
        self.hand_cards.append(card)

    def is_won(self):
        return len(self.hand_cards) == 0

    async def notify_about_players_in_room(self, players):
        if players:  # asyncio.wait doesn't accept an empty list
            message = json.dumps({
                "type": "add_player_to_room",
                "players": [x.name for x in players]
            })
            await asyncio.wait([self.websocket.send(message)])

    async def notify_about_start_round(self, first_card):
        message = json.dumps({
            "type": "game_started",
            "hand_cards": [card.to_json() for card in self.hand_cards],
            "first_card": first_card.to_json()
        })
        await asyncio.wait([self.websocket.send(message)])

    async def notify_about_put_card(self, card):
        message = json.dumps({
            "type": "card_put_on_deck",
            "card": card.to_json(),
            "player_name": self.name
        })
        await asyncio.wait([self.websocket.send(message)])

    async def notify_about_invalid_put_card(self, card, text_message):

        message = json.dumps({
            "type": "wrong_move",
            "card": card.to_json() if card else card,
            "message": text_message,
            "player_name": self.name
        })
        await asyncio.wait([self.websocket.send(message)])

    async def notify_about_take_card_back(self, card, text_message):
        message = json.dumps({
            "type": "card_taken_from_played_cards",
            "card": card.to_json(),
            "message": text_message,
            "player_name": self.name
        })
        await asyncio.wait([self.websocket.send(message)])

    async def notify_about_draw_card(self, card, player_drawn):
        message = json.dumps({
            "type": "card_taken_from_deck",
            "card": card.to_json(),
            "player_name": player_drawn.name
        })
        await asyncio.wait([self.websocket.send(message)])
