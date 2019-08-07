import asyncio

from models.Round import Round


class Room:
    def __init__(self, creator):
        self.players = [creator]
        self.round = None
        self.rules = [card_suit_rule]
        self.name = creator.name + " room"

    async def add_player(self, player):
        self.players.append(player)
        await asyncio.wait([player.notify_about_players_in_room(self.players) for player in self.players])

    def create(self, players):
        self.round = Round(players, self.rules)


def card_suit_rule(card, used_stack, player):
    if card == 0:
        return True, round_unchanged
    return False, round_unchanged


def round_unchanged(round_instance): return round_instance
