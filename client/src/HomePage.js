import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import logo from './logo.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage() {
  return (
    <div class="container justify-content-center">
      <Row className="justify content-md-center">
        <Col>
          <img src={logo} class="rounded"/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <FormControl placeholder="username" />
      </Row>
      <Row className="justify content-md-center">
        <Col>
          <Button>join game</Button>
        </Col>
        <Col>
          <Button>create game</Button>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
