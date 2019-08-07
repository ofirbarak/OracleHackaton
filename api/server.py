#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets

from models.Player import Player
from models.Room import Room

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


async def counter(websocket, path):
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
                player_name = data["player_name"];
                player = next((x for x in LONELY_USERS if x.name == player_name), None)
                room_name = data["room_name"];
                room = next((x for x in ROOMS if x.name == room_name), None)
                room.add_player(player)


            else:
                logging.error("unsupported event: {}", data)
    finally:
        logging.info("unregistered");
    #     await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
