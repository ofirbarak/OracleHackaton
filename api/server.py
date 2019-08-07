#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets

from models.Player import Player
from models.Room import Room

logging.basicConfig()

STATE = {"value": 0}

ROOMS = list()

USERS = set()
LONELY_USERS = list()


def state_event():
    return json.dumps({"type": "state", **STATE})


def users_event():
    return json.dumps({"type": "lonely_users", "count": len(LONELY_USERS)})


def rooms_event():
    return json.dumps({
        "type": "rooms_names",
        "rooms": [
            {"name": x.name, "count": len(x.players)} for x in ROOMS
        ]
    })


def notify_users_about_rooms():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = rooms_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def notify_state():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = state_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def notify_users():
    if USERS and LONELY_USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket):
    LONELY_USERS.append(websocket)
    USERS.add(websocket)


async def unregister(websocket):
    USERS.remove(websocket)


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

            if data["action"] == "minus":
                STATE["value"] -= 1
                await notify_state()
            elif data["action"] == "plus":
                STATE["value"] += 1
                await notify_state()
            else:
                logging.error("unsupported event: {}", data)
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
