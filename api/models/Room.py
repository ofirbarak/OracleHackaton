import asyncio

from Chat.Chat import Chat
from models.Round import Round
from models.Rules import *


class Room:
    def __init__(self, creator):
        self.players = [creator]
        self.round = None
        self.rules = [rule_cards_suit, rule_ace_card, rule_eight_card, rule_three_card]
        self.name = creator.name + " room"
        self.chat = Chat(creator)

    async def add_player(self, player):
        self.players.append(player)
        await asyncio.wait([player.notify_about_players_in_room(self.players) for player in self.players])
        await asyncio.wait([self.chat.send_message(player, "המשתמש ")])

    async def start_round(self):
        self.round = Round(self.players, self.rules)
        await self.round.start()

    def card_suit_rule(self, card, used_stack, player):
        if card == 0:
            return True, self.round_unchanged
        return False, self.round_unchanged

    def round_unchanged(self, round_instance): return round_instance
