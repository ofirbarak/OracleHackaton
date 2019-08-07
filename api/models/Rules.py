from models.suits import Suits


def rule_cards_suit(card, used_stack, player):
    top_card = used_stack.get_top_card()
    if top_card.is_same_suit(card):
        return True, action_unchanged
    else:
        if top_card.is_same_color(card) and top_card.is_same_value(card):
            return True, action_unchanged
        else:
            return False, action_unchanged


def rule_eight_card(card, used_stack, player):
    if card.value == 8:
        if card.suit in [Suits.HEARTS, Suits.DIAMONDS]:
            return True, action_change_color_black
        else:
            return True, action_change_color_red
    else:
        return True, action_unchanged


def rule_ace_card(card, used_stack, player):
    if card.value == 1:
        return True, action_skip_turn
    else:
        return True, action_unchanged


def rule_three_card(card, used_stack, player):
    if card.value == 3:
        return True, action_change_direction
    else:
        return True, action_unchanged


def rule_only_black(card, used_stack, player):
    if card.suit in [Suits.CLUBS, Suits.SPADES]:
        return True, action_restore_rules
    else:
        return False, action_unchanged


def rule_only_red(card, used_stack, player):
    if card.suit in [Suits.HEARTS, Suits.DIAMONDS]:
        return True, action_restore_rules
    else:
        return False, action_unchanged


def action_skip_turn(round_state):
    round_state.turn += 1


def action_change_direction(round_state):
    round_state.is_clockwise = not round_state.is_clockwise


def action_unchanged(round_state):
    return


def action_change_color_black(round_state):
    round_state.rules[0] = rule_only_black


def action_change_color_red(round_state):
    round_state.rules[0] = rule_only_red


def action_add_card_to_player(round_state):
    player = round_state.players[round_state.turn]
    player.draw_card()


def action_restore_rules(round_state):
    round_state.rules[0] = rule_cards_suit
