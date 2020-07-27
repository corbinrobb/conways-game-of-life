import React from 'react';

const Grid = ({ grid, setGrid }) => {

  const changeColor = (rowIndex, colIndex) => {
    setGrid(() => {
      const newGrid = grid.map(row => [...row]);
      newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] ? 0 : 1;
      return newGrid;
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