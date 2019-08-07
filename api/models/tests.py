from models.Player import Player
from models.Round import Round

players = [Player("A"), Player("B"), Player("C"), Player("D"), Player("E"), Player("F"), Player("G"), Player("H")]

rules = []

newRound = Round(players, rules)

newRound.start()

for p in players:
    print(p.name + ":")
    p.show_hand()
