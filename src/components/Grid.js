import React from 'react';
import produce from 'immer';

const Grid = ({ grid, setGrid }) => {

  const changeColor = (rowIndex, colIndex) => {    
    setGrid(g => {
      return produce(g, newGrid => {
        newGrid[rowIndex][colIndex]
      ? newGrid[rowIndex][colIndex] = 0
      : newGrid[rowIndex][colIndex] = 1;
      })
    })
  }

  return (
    <div className="grid">
      {grid.map((row, i1) => {
        return <div key={'row' + i1} className="row">
            {row.map((col, i2) => {
              return (
                <div 
                  key={'col' + i2}
                  className={col ? "cell alive" : "cell"} 
                  onClick={() => changeColor(i1, i2)} 
                />)
          })}
        </div>
      })}
    </div>
  );
}

export default Grid;