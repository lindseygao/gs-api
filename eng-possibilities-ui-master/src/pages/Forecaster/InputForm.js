import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
      year: '2021',
      'Value ($)': 10000,
  },
  {
      year: '2022',
      'Value ($)': 11000,
  },
  {
      year: '2023',
      'Value ($)': 11100,
  },
  {
      year: '2024',
      'Value ($)': 11111,
  },
  {
      year: '2025',
      'Value ($)': 13000,
  },
  {
      year: '2026',
      'Value ($)': 14000,
  },
  {
      year: '2027',
      'Value ($)': 16000,
  },
  {
      year: '2028',
      'Value ($)': 20000,
  },
  {
      year: '2029',
      'Value ($)': 21000,
  },
  {
      year: '2030',
      'Value ($)': 24000,
  },
  {
      year: '2031',
      'Value ($)': 25000,
  },
];

export default class InputForm extends Component {
  constructor(props) {
    super();
    this.state = {
      energy: '',
      technology: '',
      financial: '',
      realEstate: '',
      pharmaceutical: '',
      airline: '',
      retail: '',
      gaming: '',
      limitations: [],
      values: [],
      total: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    let values = [];
    // Simple GET request using fetch
    fetch('http://localhost:8080/api/v1/investoptions')
      .then(response => response.json())
      .then(data => {
          this.setState({ limitations: data })
          if (Number(this.state.energy) < Number(this.state.limitations[0].minimum)) {
            console.log("did not reach energy minimum");
          }
          if (Number(this.state.technology) < Number(this.state.limitations[1].minimum)) {
            console.log("did not reach technology minimum");
          }
          if (Number(this.state.financial) < Number(this.state.limitations[2].minimum)) {
            console.log("did not reach financial minimum");
          }
          if (Number(this.state.realEstate) < Number(this.state.limitations[3].minimum)) {
            console.log("did not reach realEstate minimum");
          }
          if (Number(this.state.pharmaceutical) < Number(this.state.limitations[4].minimum)) {
            console.log("did not reach pharmaceutical minimum");
          }
          if (Number(this.state.airline) < Number(this.state.limitations[5].minimum)) {
            console.log("did not reach airline minimum");
          }
          if (Number(this.state.retail) < Number(this.state.limitations[6].minimum)) {
            console.log("did not reach retail minimum");
          }
          if (Number(this.state.gaming) < Number(this.state.limitations[7].minimum)) {
            console.log("did not reach gaming minimum");
          }
          for (var i = 0; i < this.state.limitations.length; i++) {
            this.state.total = this.state.total + Number(this.state.limitations[i].minimum);
          }
          if (this.state.total != 100) {
            console.log("did not invest valid amount")
          }
    });

    fetch('http://localhost:8080/api/v1/forecast', {
      method: "POST",
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
    .then(data => {
      console.log(data);
      this.setState({ values: data[0] })
    });

    this.setState({
      energy: '',
      technology: '',
      financial: '',
      realEstate: '',
      pharmaceutical: '',
      airline: '',
      retail: '',
      gaming: '',
    });
  }

  render() {
    return(
      <div>
        <LineChart
                  width={1000}
                  height={500}
                  data={data}
                  margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                  }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year"/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Value ($)" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formEnergy">
                <Form.Label>Energy</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.energy} onChange={e => this.setState({ energy: e.target.value })}/>
              </Form.Group>

              <Form.Group controlId="formTechnology">
                <Form.Label>Technology</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.technology} onChange={e => this.setState({ technology: e.target.value })}/>
              </Form.Group>

              <Form.Group controlId="formFinancialServices">
                <Form.Label>Financial Services</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.financial} onChange={e => this.setState({ financial: e.target.value })}/>
              </Form.Group>

              <Form.Group controlId="formRealEstate">
                <Form.Label>Real Estate</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.realEstate} onChange={e => this.setState({ realEstate: e.target.value })}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPharmaceuticals">
                <Form.Label>Pharmaceuticals</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.pharmaceutical} onChange={e => this.setState({ pharmaceutical: e.target.value })}/>
              </Form.Group>

              <Form.Group controlId="formAirline">
                <Form.Label>Airline</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.airline} onChange={e => this.setState({ airline: e.target.value })}/>
              </Form.Group>

              <Form.Group controlId="formRetail">
                <Form.Label>Retail</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.retail} onChange={e => this.setState({ retail: e.target.value })}/>
              </Form.Group>

              <Form.Group controlId="formGaming">
                <Form.Label>Gaming</Form.Label>
                <Form.Control type="number" placeholder="0" value={this.state.gaming} onChange={e => this.setState({ gaming: e.target.value })}/>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
