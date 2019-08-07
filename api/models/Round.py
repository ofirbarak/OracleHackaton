from models.Deck import Deck, UsedStack


class Round:
    def __init__(self, players, rules):
        self.players = players
        self.rules = rules
        self.deck = Deck()
        self.used_stack = UsedStack()
        self.is_clockwise = True
        self.turn = 0

    def start(self):
        for player in self.players:
            player.hand_cards = self.deck.draw_hand()
        # todo send through sockets the player.handCards

    def end(self):
        pass

    def player_draw_card(self, player):
        player.draw_card(self.deck)
        if self.deck.is_empty():
            self.used_stack.recycle_used_stack(self.deck)

    def play(self, player, card):
        if not self.is_my_turn(player):
            self.not_played_in_his_turn(player)
        else:
            player.played_card(card)
            if self.is_valid_play(player, card):
                self.accept_play(player, card)
            else:
                self.reject_play(player, card)

    def is_valid_play(self, player, card):
        actions = []
        for rule in self.rules:
            valid, action = rule(card, self.used_stack, player)
            if valid:
                actions.append(action)
            else:
                return False
        for act in actions:
            act(self)
        return True

    def accept_play(self, player, card):
        # TODO: send message that played was accepted
        if player.is_won():
            self.round_over(player)
        else:
            self.forward_turn()
            self.used_stack.played_card(card)

    def reject_play(self, player, card):
        player.get_card_back(card)
        self.player_draw_card(player)
        # TODO: send message that the play was rejected

    def forward_turn(self):
        self.turn += 1

    def is_my_turn(self, player):
        return player == self.players[self.turn]

    def not_played_in_his_turn(self, player):
        # TODO: send message that player doesn't played in his turn
        self.player_draw_card(player)

    def round_over(self, player):
        # TODO: msg player is the winner, player set new rule
        pass
