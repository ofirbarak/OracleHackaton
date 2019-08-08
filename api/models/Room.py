import asyncio

from models.Round import Round
from models.Rules import *


class Room:
    def __init__(self, creator):
        self.players = [creator]
        self.round = None
        self.rules = [rule_cards_suit, rule_skip_turn, rule_change_color, rule_change_direction]
        self.name = creator.name + " room"

    async def add_player(self, player):
        self.players.append(player)
        await asyncio.wait([player.notify_about_players_in_room(self.players) for player in self.players])

    async def start_round(self):
        self.round = Round(self.players, self.rules)
        await self.round.start()

    def get_player_by_name(self, player_name):
        return next(player for player in self.players if player.name == player_name)
