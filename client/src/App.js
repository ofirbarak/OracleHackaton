import React from 'react';
import './App.css';
import HomePage from './HomePage';
import PickRoom from './PickRoom';
import GameRoom from './GameRoom'
import WatingRoom from './WatingRoom';
import openSocket from 'socket.io-client';
import { toast } from 'react-toastify';
import clone from 'clone';
import _ from 'lodash';

const enumToType = (enumName) => {
    if (enumName === 0)
        return 'heart'
    if (enumName === 1)
        return 'spade'
    if (enumName === 2)
        return 'diamond'
    if (enumName === 3)
        return 'club'
    return undefined
}

const TypeToEnum = (type) => {
    if (type === 'heart')
        return 0
    if (type === 'spade')
        return 1
    if (type === 'diamond')
        return 2
    if (type === 'club')
        return 3
    return undefined
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'HomePage',
            rooms: [],
            room_users: [],
            roomName: undefined,
            myDek: [],
            playedCards: [
                { type: 'heart', number: 0 }
            ],
            numOfCardsInDeck: 56
        };
        this.state.socket = new WebSocket('ws://localhost:6789/');

        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.pickRoom = this.pickRoom.bind(this);

        this.state.socket.onmessage = this.handleServerMessages;
    }

    handleChange(key) {
        return (value) => this.setState({ [key]: value });
    }

    handleServerMessages = (event) => {
        console.log(event);
        let data = JSON.parse(event.data);
        console.log(data.names);
        switch (data.type) {
            case 'rooms_info':
                this.setState({ rooms: data.rooms });
                break;
            case 'game_started':
                const initialDek = data.hand_cards.map((curCard) => {
                    const curCardAsJson = JSON.parse(curCard);
                    return {
                        type: enumToType(curCardAsJson.type),
                        number: curCardAsJson.number
                    }
                })
                this.setState({ currentPage: 'GameRoom', myDek: initialDek });
                break;
            case 'card_put_on_deck':
                const curCardAsJson = JSON.parse(data.card);
                const formatedCard = {
                    type: enumToType(curCardAsJson.type),
                    number: curCardAsJson.number
                }
                const playedCardsClone = _.clone(this.state.playedCards)
                playedCardsClone.push(formatedCard)

                const temp = clone(this.state.room_users)
                temp[data.player_name].numOfCards--;
                this.state.setState({ playedCards: playedCardsClone, room_users: temp })
                break;
            case 'wrong_move':
                toast(`${data.player_name} ${data.message}`)
                break;
            case 'card_taken_from_played_cards':
                if (data.player_name === this.state.playerName) {
                    const curCardAsJson = JSON.parse(data.card);
                    const formatedCard = {
                        type: enumToType(curCardAsJson.type),
                        number: curCardAsJson.number
                    }
                    const myDekClone = _.clone(this.state.myDek)
                    myDekClone.push(formatedCard)
                    this.setState({ myDek: myDekClone });
                }

                const temp3 = clone(this.state.room_users)
                temp3[data.player_name].numOfCards++;
                this.state.setState({ room_users: temp3 })


                break;
            case 'card_taken_from_deck':
                if (data.player_name === this.state.playerName) {
                    const curCardAsJson = JSON.parse(data.card);
                    const formatedCard = {
                        type: enumToType(curCardAsJson.type),
                        number: curCardAsJson.number
                    }
                    const myDekClone = _.clone(this.state.myDek)
                    myDekClone.push(formatedCard)
                    this.setState({ myDek: myDekClone });
                }

                const temp1 = clone(this.state.room_users)
                temp1[data.player_name].numOfCards++;
                this.state.setState({ room_users: temp1 })

                break;
            case 'add_player_to_room':
                const temp2 = {}
                _.forEach(data.players, (cur) => {
                    temp2[cur] = { name: cur, numOfCards: 5 }
                })
                this.setState({ room_users: temp2 });
                break;
            default:
                console.error(
                    "unsupported event", data);
        }
    }

    createRoom() {
        console.log(this.state.playerName);
        this.state.socket.send(JSON.stringify({
            action: "create_room",
            name: this.state.playerName
        }));
        this.setState({ currentPage: "WaitingRoom", roomName: this.state.playerName + ' room' });
    }

    pickRoom(roomName) {
        this.state.socket.send(JSON.stringify({
            action: "join_room",
            player_name: this.state.playerName,
            room_name: roomName
        }))
        this.setState({ currentPage: "WaitingRoom", roomName });
    }

    letsPlay = () => {
        this.state.socket.send(JSON.stringify({
            action: "start_game",
            room_name: this.state.roomName
        }))
    }

    putCard = (card) => {
        this.state.socket.send(JSON.stringify({
            action: "put_card",
            room_name: this.state.roomName,
            player_name: this.state.playerName,
            card: {
                number: card.number,
                type: TypeToEnum(card.type)
            }
        }))
    }
    takeCard = () => {
        this.state.socket.send(JSON.stringify({
            action: "take_card",
            room_name: this.state.roomName,
            player_name: this.state.playerName
        }))
    }

    render() {
        return (
            <div>
                {this.state.currentPage == 'HomePage' ?
                    <div>
                        <div className="background-image"></div>
                        <div className="bg-text transparant-backround">
                            <HomePage
                                changePage={this.handleChange('currentPage')}
                                changePlayerName={this.handleChange('playerName')}
                                createRoom={this.createRoom} />
                        </div>
                    </div> :
                    null}
                {this.state.currentPage == 'pickRoom' ?
                    <div>
                        <PickRoom
                            rooms={this.state.rooms}
                            pickRoom={this.pickRoom} />
                    </div> :
                    null}
                {this.state.currentPage == 'WaitingRoom' ?
                    <div>
                        <WatingRoom
                            room_users={this.state.room_users}
                            letsPlay={this.letsPlay}
                            changePage={this.handleChange('currentPage')} />
                    </div> :
                    null}
                {this.state.currentPage == 'GameRoom' ?
                    <div>
                        <GameRoom
                            myDek={this.state.myDek}
                            playedCards={this.state.playedCards}
                            numOfCardsInDeck={this.state.numOfCardsInDeck}
                            takeCardFromDek={this.takeCard}
                            placeCard={this.putCard}
                            room_users={this.state.room_users}
                            playerName={this.state.playerName}
                            changePage={this.handleChange('currentPage')} />
                    </div> :
                    null}

            </div>
        );
    }
}

export default App;
