
class Player:
    def __init__(self, name, websocket):
        self.name = name
        self.handCards = []
        self.websocket = websocket

    def draw(self, deck):
        for x in range(5):
            card = deck.drawCard()
            self.handCards.append(card)

    def putCard(self):
        return self.handCards.pop()
