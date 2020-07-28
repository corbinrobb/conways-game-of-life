export const neighborCoord = [
  [-1, 0], [-1, 1], [-1, -1], [0, 1], 
  [0, -1], [1, 1], [1, 0], [1, -1],
]

export const presets = [
  { name: "Glider", 
    matrix: [[1, 0],[1, -1],[1, 1],[0, 1],[-1, 0]],
    start: [1, 1]
  },
  { name: "Toad", 
    matrix: [[0, 0], [1, -1], [1, 0], [0, 1], [0, 2], [1, 1]],
    start: 0
  },
  { name: "Quad Blinker", 
    matrix: [[0,0], [-1, 0], [0, -1], [0, 1], [1, 0]],
    start: 0
  },
  { name: "Pulsar", 
    matrix: [
              [-2,1],[-3,1],[-4,1],[-1,2],[-1,3],[-1,4],
              [2,1],[3,1],[4,1],[1,2],[1,3],[1,4],
              [-1,-2],[-1,-3],[-1,-4],[-2,-1],[-3,-1],[-4,-1],
              [1,-2],[1,-3],[1,-4],[2,-1],[3,-1],[4,-1],
              [-6,2],[-6,3],[-6,4],[-2,6],[-3,6],[-4,6],
              [6,2],[6,3],[6,4],[2,6],[3,6],[4,6],
              [-6,-2],[-6,-3],[-6,-4],[-2,-6],[-3,-6],[-4,-6],
              [6,-2],[6,-3],[6,-4],[2,-6],[3,-6],[4,-6],
            ],
    start: 0
  },
];