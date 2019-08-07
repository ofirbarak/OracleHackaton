def rule_cards_suit(self, card, used_stack, player):
    top_card = used_stack.get_top_card()
    if top_card.is_same_suit(card):
        return True, action_unchanged
    else:
        if top_card.is_same_color(card) and top_card.is_same_value(card):
            return True, action_unchanged
        else:
            return False, action_unchanged


def rule_eight_card(self, card, used_stack, player):
    if card.value == 8:
        return True, action_change_color
    else:
        return True, action_unchanged


def rule_ace_card(self, card, used_stack, player):
    if card.value == 1:
        return True, action_skip_turn
    else:
        return True, action_unchanged


def rule_three_card(self, card, used_stack, player):
    if card.value == 3:
        return True, action_change_direction
    else:
        return True, action_unchanged