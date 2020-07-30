import React, { useState, useCallback, useRef, useEffect } from 'react';
import Grid from './Grid';
import Controls from './Controls';
import Preset from './Preset';
import { neighborCoord, presets } from './coordinates';

const createGrid = sides => {
  const rows = [];
  for (let i = 0; i < sides; i++) {
    const row = [];
    for (let j = 0; j < sides; j++) {
      row.push(0)
    }
    rows.push(row)
  }
  return rows
}

const App = () => {
  const [sides, setSides] = useState(25);
  const [grid, setGrid] = useState(createGrid(sides));
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [history, setHistory] = useState([]);


  useEffect(() => {
    setGrid(createGrid(sides));
  }, [sides])

  useEffect(() => {
    speedRef.current = speed;
  }, [speed])


  const runningRef = useRef(running);
  runningRef.current = running;
  
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const checkNeighbors = useCallback(prevGrid => {
    const newGrid = prevGrid.map(row => [...row]);

    for (let row = 0; row < sides; row++) {
      for (let col = 0; col < sides; col++) {
        let neighbors = 0;
        neighborCoord.forEach(([x, y]) => {
          const newRow = row + x;
          const newCol = col + y;
          if (newRow >= 0 
            && newRow < sides
            && newCol >= 0 
            && newCol < sides) {
            neighbors += prevGrid[newRow][newCol]
          }
        })
        if (neighbors < 2 || neighbors > 3) {
          newGrid[row][col] = 0;
        } else if (prevGrid[row][col] === 0 && neighbors === 3) {
          newGrid[row][col] = 1;
        }
      }
    }

    setHistory(prevHistory => [...prevHistory, prevGrid])
    return newGrid;
  }, [sides])

  const start = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(checkNeighbors);
    setCount(prevCount => prevCount + 1);

    setTimeout(start, speedRef.current);
  }, [checkNeighbors])

  const nextGeneration = () => {
    setGrid(checkNeighbors);
    setCount(count + 1);
  }

  const prevGeneration = () => {
    if (history.length > 0) {
      setGrid(history[history.length - 1])
      setHistory(prevHistory => prevHistory.filter(g => g !== prevHistory[prevHistory.length -1]))
      setCount(count - 1);
    }
  }

  const clearGrid = () => {
    setGrid(prevGrid => prevGrid.map(row => row.map(col => 0)));
    setRunning(false);
    setCount(0);
    setSpeed(1000);
    setHistory([]);
  }

  const createPresetGrid = (matrix, start) => {
    let row;
    let col;
    if (!start) {
      const mid = Math.floor(sides/2);
      row = mid;
      col = mid;
    } else {
      row = start[0];
      col = start[1];
    }

    clearGrid();

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);

      matrix.forEach(([x, y]) => {
        const newRow = row + x;
        const newCol = col + y;
        newGrid[newRow][newCol] = 1;
      })

      return newGrid;
    });
  }

  const randomGrid = () => {
    clearGrid()

    setGrid(grid.map(row => row.map(col => {
        return (Math.random() < 0.35) ? 1 : 0;
      })))
  }

  return (
    <>
      <main>
        <h1>Conway's Game of Life</h1>
        <div className={sides > 30 ? "content-larger" : "content"}>
          <div className="left">
            <Grid
              grid={grid}
              setGrid={setGrid}
              running={running}
            />
            <div className="info">
              <p>Generation: {count}</p>
              <p>Speed: {(1/(speed/1000)).toFixed(1)} gen/s</p>
              <p>Size: {sides}x{sides}</p>
            </div>
            <Controls
              setRunning={setRunning}
              running={running}
              runningRef={runningRef}
              start={start}
              clearGrid={clearGrid}
              sides={sides}
              setSides={setSides}
              speed={speed}
              setSpeed={setSpeed}
              setCount={setCount}
              nextGeneration={nextGeneration}
              prevGeneration={prevGeneration}
            />
          </div>
          <div className="right">
            <div className="presets">
              <h3>Presets</h3>
              <div className="presets-list">
                {presets.map(preset => {
                  return <Preset 
                    key={preset.name}
                    {...preset}
                    sides={sides}
                    clearGrid={clearGrid}
                    createPresetGrid={createPresetGrid}
                  />
                })}
                <div onClick={randomGrid}>Random</div>
              </div>
            </div>
            <div className="rules">
              <h3>Rules</h3>
              <ul>
                <li>Any live cell with two or three live neighbours survives.</li>
                <li>Any dead cell with three live neighbours becomes a live cell.</li>
                <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;