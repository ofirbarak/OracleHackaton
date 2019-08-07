from models.Deck import Deck, UsedStack


class Round:
    def __init__(self, players, rules):
        self.players = players
        self.rules = rules
        self.deck = Deck()
        self.usedStack = UsedStack()
        self.is_clockwise = True
        self.turn = 0

    def start(self):
        for player in self.players:
            player.handCards = self.deck.draw_hand()
            player.notify_about_start_round()

        # todo send through sockets the player.handCards

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
