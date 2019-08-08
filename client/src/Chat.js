import React from 'react';
import Container from 'react-bootstrap/Container';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageToSend: '',
            messages: ["ad", "s"]
        };
        this.state.socket = new WebSocket('ws://localhost:/');

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    sendMessage(text) {
        console.log('A name was submitted: ' + this.state.value);
        this.state.messages.push(text)
        this.state.socket.send(JSON.stringify({
            action: "send_chat_message",
            name: this.state.playerName,
            text: ""
        }));
    }
    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
        this.sendMessage(this.state.value);
    }
    render = () => {
        return (
            <Container style={{ 'backgroundColor': 'white' }, {'direction': 'rtl'
    }
}>
    <br />
    <form onSubmit={this.handleSubmit}>
        <label>
            הזן הודעה :
                    <input type="text" name="textMessage" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="send" onClick='sendMessage' />
    </form>
    <div>
        {this.state.messages.map((m, key) =>
            <p key={key}>{m}</p>
        )}
    </div>
    </Container >);
    }
}