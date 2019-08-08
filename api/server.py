#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets
from Chat.Chat import Chat

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
    await notify_users_about_rooms()


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
                player_name = data["player_name"]
                player = Player(player_name, websocket)
                LONELY_USERS.remove(player.websocket)
                room_name = data["room_name"]
                room = next((x for x in ROOMS if x.name == room_name), None)
                await room.add_player(player)


                await rooms_event()
            elif data["action"] == "chat_message":
                message = data["message_text"]
                await notify_state()
            else:
                logging.error("unsupported event: {}", data)
    finally:
        logging.info("unregistered");
    #     await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

CHAT_LIST = list()
async def chat_counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        await websocket.send(state_event())
        async for message in websocket:
            data = json.loads(message)
            if data["action"] == "create_chat":
                chat = Chat(data["team_name"], websocket)
                CHAT_LIST.append(chat)
                await rooms_event()
            elif data["action"] == "get_message":
                message = data["message_text"]
                await notify_state()
            else:
                logging.error("unsupported event: {}", data)
    finally:
        await unregister(websocket)

start_chat_server = websockets.serve(chat_counter, "localhost", 6666)

asyncio.get_event_loop().run_until_complete(start_chat_server)
asyncio.get_event_loop().run_forever()
