import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default class InputForm extends Component {
  constructor(props, context) {
    super();
    this.state = {
      energy: 0,
      technology: 0,
      financial: 0,
      realEstate: 0,
      pharmaceutical: 0,
      airline: 0,
      retail: 0,
      gaming: 0,
    };
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:8080/api/v1/forecast', {
      type: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        energy: this.state.energy,
        technology: this.state.technology,
        financial: this.state.financial,
        realEstate: this.state.realEstate,
        pharmaceutical: this.state.pharmaceutical,
        airline: this.state.airline,
        retail: this.state.retail,
        gaming: this.state.gaming,
      })
    }).then(response => response.json())
    .then(data => console.log(data));

    this.setState({
      energy: 0,
      technology: 0,
      financial: 0,
      realEstate: 0,
      pharmaceutical: 0,
      airline: 0,
      retail: 0,
      gaming: 0,
    });
  }

  render() {
    return(
      <form>
        <Row>
          <Col>
            <Form.Group action={this.props.action} method={this.props.method} controlId="formEnergy" onSubmit={this.onSubmit}>
              <Form.Label>Energy</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="formTechnology">
              <Form.Label>Technology</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="formFinancialServices">
              <Form.Label>Financial Services</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="formRealEstate">
              <Form.Label>Real Estate</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPharmaceuticals">
              <Form.Label>Pharmaceuticals</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="formAirline">
              <Form.Label>Airline</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="formRetail">
              <Form.Label>Retail</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>

            <Form.Group controlId="formGaming">
              <Form.Label>Gaming</Form.Label>
              <Form.Control type="number" placeholder="0" />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

InputForm.defaultProps = {
  action: 'http://localhost:3000',
  method: 'post'
};
