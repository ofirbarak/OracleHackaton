from models.Card import Card
import random


class Deck:
    def __init__(self):
        self.cards = []

    def __len__(self):
        return self.cards.__len__()

    def build(self):
        for suit in ["Spades", "Hearts", "Clubs", "Diamonds"]:
            for value in ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]:
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
