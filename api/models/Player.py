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

    def played_card(self, card):
        self.hand_cards.remove(card)

    def show_hand(self):
        for card in self.hand_cards:
            print(card)

    def get_card_back(self, card):
        self.hand_cards.append(card)

    def is_won(self):
        return len(self.hand_cards) == 0
