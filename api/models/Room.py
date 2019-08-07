from models.Round import Round


class Room:
    def __init__(self, creator):
        self.players = [creator]
        self.round = None
        self.rules = [card_suit_rule]

    def create(self, players):
        self.round = Round(players, self.rules)


def card_suit_rule(card, used_stack, player):
    if card == 0:
        return True, round_unchanged
    return False, round_unchanged


def round_unchanged(round_instance): return round_instance
