import React from 'react';

const Controls = ({ setRunning, running, runningRef, start, clearGrid }) => {
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
      <button 
        onClick={() => clearGrid()}
        className="clear-button"
      >
        Clear
      </button>
    </div>
  );
}

export default Controls;