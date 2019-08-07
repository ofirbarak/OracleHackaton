
class Player:
    def __init__(self, name, websocket):
        self.name = name
        self.handCards = []
        self.websocket = websocket

    def draw(self, deck):
        card = deck.drawCard()
        self.handCards.append(card)

    def put_card(self):
        card_to_play = self.handCards.pop()


    def show_hand(self):
        for card in self.handCards:
            print(card)