
class Player:
    def __init__(self, name):
        self.name = name
        self.handCards = []

    def draw(self, deck):
        for x in range(5):
            card = deck.drawCard()
            self.handCards.append(card)

    def putCard(self):
        return self.handCards.pop()
