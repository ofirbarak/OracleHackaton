import asyncio

from models.Deck import Deck, UsedStack


class Round:
    def __init__(self, players, rules, chat):
        self.players = players
        self.rules = rules
        self.deck = Deck()
        self.used_stack = UsedStack()
        self.is_clockwise = True
        self.turn = 0
        self.is_round_over = False
        self.chat = chat

    async def start(self):
        for player in self.players:
            player.hand_cards = self.deck.draw_hand()
        self.used_stack.use_card(self.deck.draw_card())
        await asyncio.wait([player.notify_about_start_round() for player in self.players])

    def player_draw_card(self, player):
        player.draw_card(self.deck)
        if self.deck.is_empty():
            self.used_stack.recycle_used_stack(self.deck)

    def draw(self, player):
        if not self.is_my_turn(player):
            self.not_played_in_his_turn(player)
        else:
            self.player_draw_card(player)
            self.forward_turn()

    def play(self, player, card):
        player.played_card(card)
        if not self.is_my_turn(player):
            self.not_played_in_his_turn(player, card)
        else:
            if self.is_valid_play(player, card):
                self.accept_play(player, card)
            else:
                self.reject_play(player, card)

    def is_valid_play(self, player, card):
        actions = []
        for rule in self.rules:
            if not rule:
                break
            valid, action = rule(card, self.used_stack, player)
            print(str(valid) + "\n")
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
            self.used_stack.use_card(card)

    def reject_play(self, player, card):
        player.get_card_back(card)
        self.player_draw_card(player)
        # TODO: send message that the play was rejected

    def forward_turn(self):
        if self.is_clockwise:
            self.turn = (self.turn + 1) % len(self.players)
        else:
            self.turn = (self.turn - 1) % len(self.players)

    def is_my_turn(self, player):
        return player == self.players[self.turn]

    def not_played_in_his_turn(self, player, card=None):
        # TODO: send message that player doesn't played in his turn
        if card:
            player.get_card_back(card)
        self.player_draw_card(player)

    def round_over(self, player):
        # TODO: msg player is the winner, player set new rule
        self.is_round_over = True
        pass
