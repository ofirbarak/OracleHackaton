import React from 'react';
import GameRoom from './GameRoom';
import PropTypes from 'prop-types';

class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    sendSelectedRoom(event){

    }

    render(){
        return (
            <div>
                <ul>
                    {this.props.rooms.map(x=><li>{x}</li>)}
                </ul>
            </div>
        );
    }
}

WaitingRoom.propTypes = {
    rooms: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
};

export default WaitingRoom;