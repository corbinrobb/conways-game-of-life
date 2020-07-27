import React from 'react';

const Preset = ({ name, matrix, start, createPresetGrid}) => {
  return (
    <div onClick={() => createPresetGrid(matrix, start)}>
      {name}
    </div>
  );
}

export default Preset;