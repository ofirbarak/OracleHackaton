import React from 'react';
import './App.css';
import HomePage from './HomePage';
import PickRoom from './PickRoom';
import GameRoom from './GameRoom'
import WatingRoom from './WatingRoom';
import openSocket from 'socket.io-client';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'HomePage',
            rooms: [],
            room_users: [],
            handCards: [],
            roomName: undefined
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
                this.setState({ currentPage: 'GameRoom',handCards:data.handCards });
                break;
            case 'add_player_to_room':
                this.setState({ room_users: data.players });
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
        this.setState({ currentPage: "WaitingRoom" });
    }

    pickRoom(roomName) {
        this.state.socket.send(JSON.stringify({
            action: "join_room",
            player_name: this.state.playerName,
            room_name: roomName
        }))
        this.setState({ currentPage: "WaitingRoom",roomName });
    }

    letsPlay = ()=> {
        this.state.socket.send(JSON.stringify({
            action: "start_game",
            room_name: this.state.roomName
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
                            pickRoom={this.pickRoom}/>
                    </div> :
                    null}
                {this.state.currentPage == 'WaitingRoom' ?
                    <div>
                        <WatingRoom
                            room_users={this.state.room_users}
                            letsPlay={this.letsPlay}
                            changePage={this.handleChange('currentPage')}/>
                    </div> :
                    null}
                {this.state.currentPage == 'GameRoom' ?
                    <div>
                        <GameRoom
                            handCards={this.state.handCards}
                            changePage={this.handleChange('currentPage')}/>
                    </div> :
                    null}

            </div>
        );
    }
}

export default App;
