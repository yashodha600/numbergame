import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import './App.css';

function App() {
  const [checkednum, pressedValue] = useState<number | null>(null);
  const randomarray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => .5 - Math.random());

  return (
    <div className="App">
      <label htmlFor='type' placeholder='Enetr Name'> Enter your Name:</label>
      <input type="text" placeholder='Enter Name' /><br /><br />
      <label htmlFor='type' > Enter your Choice:</label>
      <InputNumber min={1} max={9} onChange={(newNumber: number) => pressedValue(newNumber)} />

      {checkednum ?
        <Matrix randomarray={randomarray} checkednum={checkednum} pressedValue={pressedValue} />
        :
        <div></div>
      }
    </div>
  );
}

interface MatrixProps {
  randomarray: number[];
  checkednum: number | null;
  pressedValue: (newcheckednum: number | null) => void;
}

const Matrix = ({ randomarray, checkednum, pressedValue }: MatrixProps) => {
  const [pressed, setpressed] = useState<number[] | []>([]);
  const onChangework = (val: number) => {
    setpressed([...pressed, val]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (pressed.includes(checkednum as never)) {
        alert('Congrajulations You won!');
        pressedValue(null);
        setpressed([]);
      }

      if (pressed.length === 3 && !pressed.includes(checkednum as never)) {
        alert('You lose! Click Okay to Retry');
        pressedValue(null);
        setpressed([]);
      }
    }, 100)
  }, [pressed]);

  return (
    <div className="boxContainer">
      {randomarray.map((val: number, index: number) => {
        if (pressed.includes(val as never)) {
          return <div className={val === checkednum ? 'box box-right' : 'box box-wrong'} key={index}>{val}</div>
        } else {
          return <div className="box" key={index} onClick={() => onChangework(val)}></div>
        }
      })}
    </div>
  );
}


export default App;
