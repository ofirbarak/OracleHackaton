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
    }
    render = () => {
        return (
            <Container style={{ 'backgroundColor': 'darkgreen' }}>
                <ToastContainer />
                <br />
                <br />
                <Row>
                    <Col>
                        <CardsDek onClick={this.props.takeCardFromDek} numOfCardsInDeck={this.props.numOfCardsInDeck} />
                    </Col>
                    <Col>
                        <DrawnCards cards={this.props.playedCards}></DrawnCards>
                    </Col>
                    <Col>
                        <ListGroup>
                            {Object.keys(this.props.room_users).map((curUser,key)=><ListGroup.Item key={key}>{`${curUser} have ${this.props.room_users[curUser].numOfCards} cards`}</ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <Row>
                    {
                        this.props.myDek.map((curCard,key) => (
                            <Col key={key} xs={2} style={{'paddingBottom':'5px'}}>
                                <PlayingCard onClick={()=>{this.props.placeCard({number:curCard.number,type:curCard.type})}} type={curCard.type} number={curCard.number}></PlayingCard>
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