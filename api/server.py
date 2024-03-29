#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
from atexit import unregister

import websockets

from models.Card import Card
from models.Player import Player
from models.Room import Room, Suits

logging.basicConfig()

ROOMS = list()
LONELY_USERS = list()


def users_event():
    return json.dumps({"type": "lonely_users", "count": len(LONELY_USERS)})


def rooms_event():
    return json.dumps({
        "type": "rooms_info",
        "rooms": [
            {"name": x.name, "count": len(x.players)} for x in ROOMS
        ]
    })


async def notify_users_about_rooms():
    if LONELY_USERS:  # asyncio.wait doesn't accept an empty list
        message = rooms_event()
        await asyncio.wait([user.send(message) for user in LONELY_USERS])


async def register(websocket):
    LONELY_USERS.append(websocket)
    await notify_users_about_rooms()


def get_room_by_name(room_name):
    return next((room for room in ROOMS if room.name == room_name), None)


def get_enum_from_suit_type(suit_type):
    if suit_type == 0:
        return Suits.HEARTS
    if suit_type == 1:
        return Suits.SPADES
    if suit_type == 2:
        return Suits.DIAMONDS
    if suit_type == 3:
        return Suits.CLUBS


async def mau(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)

            if data["action"] == "create_room":
                player = Player(data["name"], websocket)
                room = Room(player)
                ROOMS.append(room)
                await notify_users_about_rooms()

            elif data["action"] == "join_room":
                player_name = data["player_name"]
                player = Player(player_name, websocket)
                LONELY_USERS.remove(player.websocket)
                room = get_room_by_name(data["room_name"])
                await room.add_player(player)
                await notify_users_about_rooms()

            elif data["action"] == "start_game":
                room = get_room_by_name(data["room_name"])
                await room.start_round()

            elif data["action"] == "put_card":
                player_name = data["player_name"]
                card = data["card"]
                room = get_room_by_name(data["room_name"])
                player = room.get_player_by_name(player_name)
                card = Card(card["number"], get_enum_from_suit_type(card["type"]))
                await room.round.play(player, card)

            elif data["action"] == "take_card":
                player_name = data["player_name"]
                room = get_room_by_name(data["room_name"])
                player = room.get_player_by_name(player_name)
                await room.round.draw(player)
            else:
                logging.error("unsupported event: {}", data)
    finally:
        logging.info("unregistered");
        await unregister(websocket)


start_server = websockets.serve(mau, "10.28.145.223", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
