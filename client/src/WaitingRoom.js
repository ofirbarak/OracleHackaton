import React from 'react';
import GameRoom from './GameRoom';

class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <GameRoom></GameRoom>
            </div>
        );
    }
}

export default WaitingRoom;