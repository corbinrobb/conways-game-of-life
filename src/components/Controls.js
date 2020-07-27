import React from 'react';

const Controls = props => {

  const { 
    setRunning, 
    running, 
    runningRef, 
    start, 
    clearGrid, 
    sides, 
    setSides, 
    speed, 
    setSpeed,
    setCount
  } = props;

  const largerGrid = () => {
    if (sides < 40) setSides(sides + 5)
    setCount(0)
  }

  const smallerGrid = () => {
    if (sides > 20) setSides(sides - 5)
    setCount(0)
  }

  const slower = () => {
    if (speed < 2000) setSpeed(speed + 250);
  }

  const faster = () => {
    if (speed > 250) setSpeed(speed - 250);
  }

  return (
    <div className="controls">
      <button 
        onClick={()=> {
          setRunning(!running)
          if (!running) {
            runningRef.current = true;
            start()
          }
          }} 
        className={running ? "stop-button" : "start-button" }>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => clearGrid()} className="clear-button">Clear</button>
      <button className="speed-button" onClick={slower}>Slower</button>
      <button className="speed-button" onClick={faster}>Faster</button>
      <button disabled={running} className="grid-button" onClick={smallerGrid}>-5 Grid</button>
      <button disabled={running} className="grid-button" onClick={largerGrid}>+5 Grid</button>
    </div>
  );
}

export default Controls;