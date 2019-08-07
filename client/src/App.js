import React from 'react';
import './App.css';
import HomePage from './HomePage';
import WaitingRoom from './WaitingRoom';
import openSocket from 'socket.io-client';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'HomePage',
            rooms: ['ddd', 'ddsd']
        };
        // this.state.socket = new WebSocket('ws://localhost:6789/');

        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.handleServerMessages = this.handleServerMessages.bind(this);

        // this.state.socket.onmessage = this.handleServerMessages;
    }

    handleChange(key) {
        return (value) => this.setState({ [key]: value });
    }

    handleServerMessages(event) {
        console.log(event);
        // data = JSON.parse(event.data);
        // switch (data.type) {
        //     case 'group_names':
        //         this.setState({group_members: data.value});
        //         break;
        //     default:
        //         console.error(
        //             "unsupported event", data);
        // }
    }

    createRoom() {
        console.log(this.state.playerName);
        this.setState({ currentPage: "WaitingRoom" });
        // this.state.socket.send(JSON.stringify({
        //     action: "create_room",
        //     name: this.state.playerName
        // }));
    }

    render() {
        return (
            <div>
                {this.state.currentPage == 'HomePage' ?
                    <div>
                        <div className="background-image"></div>
                        <div className="bg-text">
                            <HomePage
                                changePage={this.handleChange('currentPage')}
                                changePlayerName={this.handleChange('playerName')}
                                createRoom={this.createRoom} />
                        </div>
                    </div> :
                    null}
                {this.state.currentPage == 'WaitingRoom' ?
                    <div>
                        <WaitingRoom rooms={this.state.rooms}/>
                    </div> :
                    null}

            </div>
        );
    }
}

export default App;
