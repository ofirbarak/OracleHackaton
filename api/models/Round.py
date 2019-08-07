from api.models.Deck import Deck


class Round:
    def __init__(self):
        self.players = []
        self.deck = Deck()
        self.usedStack = Deck()
