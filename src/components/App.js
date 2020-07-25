import React, { useState, useCallback, useRef } from 'react';
import Grid from './Grid';
import produce from 'immer';
import Controls from './Controls';


const directions = [
  [-1, 0],
  [-1, 1],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
]

const createGrid = () => {
  const rows = [];
  for (let i = 0; i < 25; i++) {
    const row = [];
    for (let j = 0; j < 25; j++) {
      row.push(0)
    }
    rows.push(row)
  }
  return rows
}

const App = () => {
  const [grid, setGrid] = useState(createGrid())

  const [running, setRunning] = useState(false);


  const clearGrid = () => {
    setGrid(g => {
      return produce(g, newGrid => {
        return newGrid.map(row => {
          return row.map(col => {
            return 0;
          })
        })
      })
    })
  }

  const runningRef = useRef(running);
  runningRef.current = running;

  const start = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    
    setGrid(g => {
      return produce(g, newGrid => {
        for (let i = 0; i < 25; i++) {
          for (let j = 0; j < 25; j++) {
            let neighbors = 0;
            directions.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < 25 && newJ >= 0 && newJ < 25) {
                neighbors += g[newI][newJ]
              }
            })
            if (neighbors < 2 || neighbors > 3) {
              newGrid[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              newGrid[i][j] = 1;
            }
          }
        }
      })
    });

    setTimeout(start, 1000)
  }, [])

  return (
    <>
      <main>
        <h1>Conway's Game of Life</h1>
        <div className="content">
          <div className="left">
            <Grid grid={grid} setGrid={setGrid} />
            <Controls
              setRunning={setRunning}
              running={running}
              runningRef={runningRef}
              start={start}
              clearGrid={clearGrid}
            />
          </div>
          <div className="right">
            <div className="presets">
              <h3>Presets</h3>
            </div>
            <div className="rules">
              <h3>Rules</h3>
              <ul>
                <li>Any live cell with two or three live neighbours survives.</li>
                <li>Any dead cell with three live neighbours becomes a live cell.
</li>
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