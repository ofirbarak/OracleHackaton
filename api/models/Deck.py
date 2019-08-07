from Card import Card


class Deck:
    def __init__(self):
        self.cards = []
        self.build()

    def build(self):
        for suit in ["Spades", "Hearts", "Clubs", "Diamonds"]:
            for value in ["2","3", "4", "5", "6","7", "8", "9", "T", "J", "Q", "K", "A"]:
                self.cards.append(Card(value, suit))
