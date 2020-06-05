import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import {MapWrapper} from './views/Map.js';
import './App.css';

function App() {
  return (
      <Container fluid>
        <Row>
          <Col sm={8} className="Map">
            {MapWrapper}
          </Col>
          <Col sm={4} className="Discussion">Discussion</Col>
        </Row>
      </Container>
  );
}

export default App;
