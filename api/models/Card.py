from models.suits import Suits


class Card:
    def __init__(self, value, suit):
        self.value = value
        self.suit = suit

    def is_same_suit(self, other):
        return self.suit == other.suit

    def is_same_value(self, other):
        return self.value == other.value

    def is_same_color(self, other):
        return self.suit in [Suits.DIAMONDS, Suits.HEARTS] and other.suit in [Suits.DIAMONDS, Suits.HEARTS] or \
               self.suit in [Suits.SPADES, Suits.CLUBS] and other.suit in [Suits.SPADES, Suits.CLUBS]
