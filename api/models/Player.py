
class Player:
    def __init__(self, name):
        self.name = name
        self.handCards = []

    def draw(self, deck):
        card = deck.drawCard()
        self.handCards.append(card)

    def put_card(self):
        return self.handCards.pop()
