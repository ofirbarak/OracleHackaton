from models.suits import Suits


class Card:
    def __init__(self, value, suit):
        self.value = value
        self.suit = suit

    def __str__(self):
        return f"{self.value} of {self.get_str_suit()}"

    def is_same_suit(self, other):
        return self.suit == other.suit

    def is_same_value(self, other):
        return self.value == other.value

    def is_same_color(self, other):
        return self.suit in [Suits.DIAMONDS, Suits.HEARTS] and other.suit in [Suits.DIAMONDS, Suits.HEARTS] or \
               self.suit in [Suits.SPADES, Suits.CLUBS] and other.suit in [Suits.SPADES, Suits.CLUBS]

    def get_str_suit(self):
        if self.suit == Suits.CLUBS:
            return "Clubs"
        elif self.suit == Suits.DIAMONDS:
            return "Diamonds"
        elif self.suit == Suits.HEARTS:
            return "Hearts"
        else:
            return "Spades"
