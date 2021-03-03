import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        year: '2021',
        'Value ($)': this.state.values[0],
    },
    {
        year: '2022',
        'Value ($)': this.state.values[1],
    },
    {
        year: '2023',
        'Value ($)': this.state.values[2],
    },
    {
        year: '2024',
        'Value ($)': this.state.values[3],
    },
    {
        year: '2025',
        'Value ($)': this.state.values[4],
    },
    {
        year: '2026',
        'Value ($)': this.state.values[5],
    },
    {
        year: '2027',
        'Value ($)': this.state.values[6],
    },
    {
        year: '2028',
        'Value ($)': this.state.values[7],
    },
    {
        year: '2029',
        'Value ($)': this.state.values[8],
    },
    {
        year: '2030',
        'Value ($)': this.state.values[9],
    },
    {
        year: '2031',
        'Value ($)': this.state.values[10],
    },
  ];

export default class LineGraph extends PureComponent {
    constructor() {
        super()
        this.state = { values: [] }
    }
    componentDidMount() {
        let values = [];
        // Simple GET request using fetch
        fetch('http://localhost:8080/api/v1/investoptions')
            .then(response => response.json())
            .then(data => {
                this.setState({ values: data })
            });
    }
    render() {
        return (
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
        );
    }
}


