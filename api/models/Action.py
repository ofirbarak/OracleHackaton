def action_skip_turn(round_stat):
    round_stat.turn += 1


def action_change_direction(round_state):
    round_state.is_clockwise = not round_state.is_clockwise


def action_unchanged(round_state):
    return


def action_change_color(round_state):
    pass


def action_add_card_to_player(round_state):
    player = round_state.players[round_state.turn]
    player.draw_card()
