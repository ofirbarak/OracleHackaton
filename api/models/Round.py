import asyncio

from models.Deck import Deck, UsedStack


class Round:
    def __init__(self, players, rules):
        self.players = players
        self.rules = rules
        self.deck = Deck()
        self.usedStack = UsedStack()
        self.is_clockwise = True
        self.turn = 0

    async def start(self):
        for player in self.players:
            player.hand_cards = self.deck.draw_hand()

        await asyncio.wait([player.notify_about_start_round() for player in self.players])

    def end(self):
        pass

    def play_action(self):
        valid = self.validate_rules()
        if not valid:
            self.reject_user_action()
        else:
            self.operate_user_action()
            self.forward_turn

    def validate_rules(self):
        valid = True
        for rule in self.rules:
            if not rule():
                return False

    def operate_user_action(self, card):
        self.deck.remove(card)
        self.usedStack.push(card)

    def reject_user_action(self):
        self.players[self.turn].draw()  # add one more card to hand of player

    def forward_turn(self):
        self.turn += 1
