import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import cardsDeck from './images/cardsDeck.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PlayingCard from './PlayingCard';


const myDek = [
    { type: 'heart', number: 3 },
    { type: 'heart', number: 6 },
    { type: 'heart', number: 11 },
    { type: 'heart', number: 9 },
    { type: 'heart', number: 2 }
]


const GameRoom = (props) => {
    return (
        <Container style={{'backgroundColor':'darkgreen'}}>
            <br />
            <br />
            <Row>
                <Col>
                    <Card style={{'height':'190px', 'width':'300'}}>
                        <Card.Img style={{'height':'190px', 'width':'300'}} src={cardsDeck} />
                    </Card>
                </Col>
                <Col>
                    <PlayingCard type='heart' number={0}></PlayingCard>
                </Col>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>player1</ListGroup.Item>
                        <ListGroup.Item>player2</ListGroup.Item>
                        <ListGroup.Item>player3</ListGroup.Item>
                        <ListGroup.Item>player4</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
                {
                    myDek.map(curCard => (
                        <Col xs={2}>
                            <PlayingCard type={curCard.type} number={curCard.number}></PlayingCard>
                        </Col>
                    ))
                }


            </Row>
            <br />
            <br />
        </Container>
    );
}

export default GameRoom;
