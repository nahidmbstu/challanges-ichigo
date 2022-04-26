import React from "react";
import "./App.css";

import styled from "styled-components";
const colors = [
  "#1C7C54",
  "#73E2A7",
  "#DEF4C6",
  "#1B512D",
  "#489FB5",
  "#4CE0D2",
  "#E0B0D5",
  "#D62828",
  "#9A48D0",
  "#E09F3E",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
function App() {
  const [change, setChange] = React.useState(1);
  // change the state to pick random color
  const changeColor = () => {
    setChange((change) => change + 1);
  };

  return (
    <>
      <div className="section-one">
        <Boxes className="one" onClick={changeColor}>
          1
        </Boxes>
        <Boxes className="two" onClick={changeColor}>
          2
        </Boxes>
        <Boxes className="three" onClick={changeColor}>
          3
        </Boxes>
        <Boxes className="four" onClick={changeColor}>
          4
        </Boxes>
      </div>
      <div className="section-two">
        <Boxes className="five" onClick={changeColor}>
          5
        </Boxes>
        <Boxes className="six" onClick={changeColor}>
          6
        </Boxes>
        <Boxes className="seven" onClick={changeColor}>
          7
        </Boxes>
        <Boxes className="eight" onClick={changeColor}>
          8
        </Boxes>
        <Boxes className="nine" onClick={changeColor}>
          9
        </Boxes>
      </div>
    </>
  );
}

const Boxes = styled.div`
  /* Adapt the colors based on primary prop */
  background: ${(props) => getRandomColor()};
  font-size: 1em;
  margin: 0.3em;
  padding: 0.25em 1em;
  border-radius: 3px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
