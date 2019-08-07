import React from 'react';
import './App.css';
import HomePage from './HomePage';
import PickRoom from './PickRoom';
import WatingRoom from './WatingRoom';
import openSocket from 'socket.io-client';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'HomePage',
            rooms: [{ name: "room1", count: 1 },
            { name: "room2", count: 3 },
            { name: "room3", count: 2 },
            { name: "room4", count: 5 }],
            room_users: ['dsdsds', 'sdsd', 'sfsdf', 'sdfsdf', 'sdfsdf'],
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
        this.setState({ currentPage: "WaitingRoom" });
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
                            changePage={this.handleChange('currentPage')}/>
                    </div> :
                    null}

            </div>
        );
    }
}

export default App;
