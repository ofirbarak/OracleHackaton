from models.Deck import Deck


class Round:
    def __init__(self, players, rules):
        self.players = []
        self.deck = Deck()
        self.usedStack = Deck()
        self.rules = rules
        self.turn = 0
