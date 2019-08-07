from models.Deck import Deck


class Round:
    def __init__(self, players, rules):
        self.players = []
        self.deck = Deck()
        self.usedStack = UsedStack()
        self.is_clockwise = True
        self.rules = rules
        self.turn = 0
        self.current_card = self.usedStack.get_current_card()
        self.action_valid

    def start(self):
        for player in self.players
            player.handCards = self.deck.draw_hand()

    def end(self):


    def play_action(self):
        valid = self.validate_rules()
        if not valid
            self.reject_user_action()
        else:
            self.operate_user_action()
            self.forward_turn

    def validate_rules(self):
        valid = True
        for rule in self.rules
            if not rule():
                return False

    def operate_user_action(self, card):
        self.deck.remove(card)
        self.usedStack.push(card)

    def reject_user_action(self):
        self.players[self.turn].draw() # add one more card to hand of player

    def forward_turn(self):
        self.turn += 1;


