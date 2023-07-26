import React from "react";
import { useState } from "react";
import "./exercises.css";
// import img1 from "../../../../../src/assets/img/img1.jpg";

const exercisearray = [
  { exercise: "squat", reps: "4x12" },
  { exercise: "bench press", reps: "4x12" },
  { exercise: "Upright Row", reps: "4x12" },
  { exercise: "Seated Overhead Press", reps: "4x12" },
  { exercise: "Pull Ups", reps: "4x12" },
];

const Row = (props) => {
  const { exercise, reps } = props;
  return (
    <tr>
      <td style={{ backgroundColor: "white" }}>{exercise}</td>
      <td style={{ backgroundColor: "white" }}>{reps}</td>
    </tr>
  );
};

const Table = (props) => {
  const { data } = props;
  return (
    <table>
      <thead>
        <th style={{ backgroundColor: "#f6f6f6" }}> Exercises</th>
        <th style={{ backgroundColor: "#f6f6f6" }}> Repetitions</th>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <Row key={`key-${index}`} exercise={row.exercise} reps={row.reps} />
        ))}
      </tbody>
    </table>
  );
};

function Exercises() {
  const [rows, setRows] = useState(exercisearray);
  return (
    <div className="exercises">
      <Table data={rows} />
    </div>
  );
}
export default Exercises;
