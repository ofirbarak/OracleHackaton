import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlayingCard from './PlayingCard';
import clone from 'clone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrawnCards from './DrawnCards';
import CardsDek from './CardsDek';
import _ from 'lodash'


export default class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myDek: props.handCards,
            playedCards: [
                { type: 'heart', number: 0 }
            ],
            numOfCardsInDeck:56

        };
    }


    placeCard = (type,number) =>{
        toast(`placed ${number} of ${type}`)
        setTimeout(()=>{
            const indexToRemove = this.state.myDek.findIndex((curCard)=>(curCard.type===type && curCard.number===number))
            const newDek = _.remove(this.state.myDek,(cur,index)=>index!==indexToRemove)
            const newPlayedCards = _.clone(this.state.playedCards)
            newPlayedCards.push({type,number})
            this.setState({myDek: newDek,playedCards:newPlayedCards})
        },100)
    }
    takeCardFromDek = () =>{
        const newArr = clone(this.state.myDek);
        newArr.push({ type: 'heart', number: 6 })
        this.setState({myDek:newArr,numOfCardsInDeck:this.state.numOfCardsInDeck-1})
    }
    rejectUserAction = ()=> {
        toast('ha ha ha ');
    }
    render = () => {
        return (
            <Container style={{ 'backgroundColor': 'darkgreen' }}>
                <ToastContainer />
                <br />
                <br />
                <Row>
                    <Col>
                        <CardsDek onClick={this.takeCardFromDek} numOfCardsInDeck={this.state.numOfCardsInDeck} />
                    </Col>
                    <Col>
                        <DrawnCards cards={this.state.playedCards}></DrawnCards>
                    </Col>
                    <Col>
                        <ListGroup>
                            {this.props.room_users.map((curUser,key)=><ListGroup.Item key={key}>{curUser}</ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <Row>
                    {
                        this.state.myDek.map((curCard,key) => (
                            <Col key={key} xs={2} style={{'paddingBottom':'5px'}}>
                                <PlayingCard onClick={()=>{this.placeCard(curCard.type,curCard.number)}} type={curCard.type} number={curCard.number}></PlayingCard>
                            </Col>
                        ))
                    }


                </Row>
                <br />
                <br />
            </Container>
        );
    }
}