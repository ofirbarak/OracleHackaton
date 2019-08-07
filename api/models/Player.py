class Player:
    def __init__(self, name, websocket):
        self.name = name
        self.hand_cards = []
        self.websocket = websocket

    def draw(self, deck):
        card = deck.drawCard()
        self.handCards.append(card)

    def played_card(self, card):
        self.hand_cards.remove(card)

    def show_hand(self):
        for card in self.hand_cards:
            print(card)
