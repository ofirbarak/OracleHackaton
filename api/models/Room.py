import asyncio

from models.Round import Round
from models.Rules import *


class Room:
    def __init__(self, creator):
        self.players = [creator]
        self.round = None
        self.rules = [rule_cards_suit, rule_ace_card, rule_eight_card, rule_three_card]
        self.name = creator.name + " room"

    async def add_player(self, player):
        self.players.append(player)
        await asyncio.wait([player.notify_about_players_in_room(self.players) for player in self.players])

    def create(self, players):
        self.round = Round(players, self.rules)
