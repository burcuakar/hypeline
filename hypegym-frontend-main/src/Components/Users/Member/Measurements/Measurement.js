import React from 'react'
import { useState } from 'react'
import "./measurement.css";

const measure = [
    { region: "Weight", now: "130" },
    { region: "waist", now: "32" },
    { region: "hips", now: "40" },
    { region: "wrist", now: "6" },
    { region: "forearm", now: "11" }
]

const Row = (props) => {
    const { region, now } = props
    return (
        <tr>
            <td style={{ backgroundColor: 'white' }}>{region}</td>
            <td style={{ backgroundColor: 'white' }}>{now}</td>
        </tr>
    )
}

const Table = (props) => {
    const { data } = props;
    console.log(data)
    return (
        <table>
            <thead>
                <th style={{ backgroundColor: '#f6f6f6' }}> Region</th>
                <th style={{ backgroundColor: '#f6f6f6' }}> Measure</th>
            </thead>
            <tbody>
                {data.map((row, index) =>
                    <Row key={`key-${index}`}
                        region={row.region}
                        now={row.now} />)}

            </tbody>
        </table >
    )
}

function Measurement() {
    const [rows, setRows] = useState(measure)
    return (
        <div className='Measurement'>
            <Table data={rows} />
        </div >
    )
}
export default Measurement