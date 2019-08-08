from models.Player import Player
from models.Round import Round
from models.Rules import *

players = [Player("A"), Player("B"), Player("C")]

rules = [rule_cards_suit, rule_skip_turn, rule_change_color, rule_change_direction]

newRound = Round(players, rules)

newRound.start()

while not newRound.is_round_over:
    for p in players:
        print(p.name + ":")
        p.show_hand()
    print(newRound)
    p = input('player to play: ')
    if p == 'q':
        break
    card = input('choose card index to play: ')
    if card == 'd':
        newRound.draw(players[int(p)])
    else:
        newRound.play(players[int(p)], players[int(p)].hand_cards[int(card)])
