import React from 'react';
import './App.css';
import HomePage from './HomePage';
import WaitingRoom from './WaitingRoom';
import openSocket from 'socket.io-client';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'HomePage'
        };

        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.state.socket = openSocket('http://localhost');

        this.state.socket.on('room_data', )
    }

    handleChange(key) {
        return (value) => this.setState({ [key]: value });
    }

    createRoom(){
        this.setState({currentPage: 'WaitingRoom'});
        console.log(this.state.playerName);
        this.state.socket.emit('create_room', {action: this.state.playerName})
    }

    render() {
        return (
            <div>
                {this.state.currentPage == 'HomePage' ?
                    <div>
                        <div class="background-image"></div>
                        <div class="bg-text">
                            <HomePage 
                                changePage={this.handleChange('currentPage')}
                                changePlayerName={this.handleChange('playerName')}
                                createRoom={this.createRoom}/>
                        </div>
                    </div> :
                    null}
                {this.state.currentPage == 'WaitingRoom' ?
                    <div>
                        <WaitingRoom />
                    </div> :
                    null }

            </div>
        );
    }
}

export default App;
