import React from 'react';
import './App.css';
import HomePage from './HomePage';
import JoinGame from './JoinGame';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'HomePage'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key) {
        return (value) => this.setState({ [key]: value });
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
                                changePlayerName={this.handleChange('playerName')}/>
                        </div>
                    </div> :
                    null }
                {this.state.currentPage == 'JoinGame' ?
                    <div>
                        <JoinGame />
                    </div> :
                    null }

            </div>
        );
    }
}

export default App;
