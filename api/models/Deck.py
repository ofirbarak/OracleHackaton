from models.Card import Card
import random
from models.suits import Suits


class Deck:
    def __init__(self):
        self.cards = []

    def __len__(self):
        return self.cards.__len__()

    def build(self):
        for suit in iter(Suits):
            for value in range(1, 14):
                self.cards.append(Card(value, suit))

    def shuffle(self):
        return random.shuffle(self.cards)

    def drawCard(self):
        return self.cards.pop()

    def playCard(self, card):
        self.cards.append(card)

    def isEmpty(self):
        return len(self.cards) == 0

    def copyDeck(self, other):
        other.cards = self.cards



