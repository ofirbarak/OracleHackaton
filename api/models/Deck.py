from models.Card import Card
import random
from models.suits import Suits


class Deck:
    def __init__(self):
        self.cards = []
        self.build()
        self.shuffle()

    def build(self):
        for suit in [Suits.Hearts, Suits.Spades, Suits.Diamonds, Suits.Clubs]:
            for value in range(1, 14):
                self.cards.append(Card(value, suit))

    def shuffle(self):
        return random.shuffle(self.cards)

    def draw_card(self):
        return self.cards.pop()

    def draw_hand(self):
        hand = []
        for i in range(5):
            hand.append(self.draw_card())
        return hand

    def is_empty(self):
        return len(self.cards) == 0

    def recycle_deck(self, cards):
        self.cards = cards
        self.shuffle()


class UsedStack:
    def __init__(self):
        self.cards = []

    def played_card(self, card):
        self.cards.append(card)

    def get_current_card(self):
        return self.cards[-1]

    def recycle_used_stack(self, deck):
        top_card = self.cards.pop()
        deck.recycle_deck(self.cards)
        self.cards.clear()
        self.cards.append(top_card)
