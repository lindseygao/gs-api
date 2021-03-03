import React, { PureComponent } from 'react';
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


