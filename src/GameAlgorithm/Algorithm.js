/* #region GameConditions */
/*Vector positions of neighbors
    let DUL = [-1, 1],
let U = [0, 1],
let DUR = [1, 1],
let L = [-1, 0],
let R = [1, -0],
let DDL = [-1, -1],
let D = [0, -1],
let DDR = [1, -1],

    node should be an 
    object with properties: 
    row, col, isAlive


Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

/* #endregion*/
const neighborPos = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, 0],
  [1, -0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

export default function AlgorithmInit(grid, rowVal, colVal) {
  return CalcForAlive(grid, rowVal, colVal);
}

function CalcForAlive(grid, rowVal, colVal) {
  let changeCount = 0;
  let newGrid = [];
  grid.forEach((row) => {
    let newRow = [];
    row.forEach((node) => {
      const newNode = { ...node };
      const neighbors = getAllNeighbors(node, grid, rowVal, colVal);
      const liveNeighbors = neighbors.filter((neighbor) => neighbor.isAlive);
      if (node.isAlive) {
        if (liveNeighbors.length < 2 || liveNeighbors.length > 3) {
          newNode.isAlive = false;
          changeCount += 1;
        }
      } else {
        if (liveNeighbors.length === 3) {
          newNode.isAlive = true;
          changeCount += 1;
        }
      }
      newRow.push(newNode);
    });
    newGrid.push(newRow);
  });
  return [newGrid, changeCount];
}

function getAllNeighbors(node, grid, rowVal, colVal) {
  const neighbors = [];
  const nodePos = [node.row, node.col];
  neighborPos.forEach((posVector) => {
    let interRow = nodePos[0] - posVector[0];
    let interCol = nodePos[1] - posVector[1];
    if (
      interRow > -1 &&
      interCol > -1 &&
      interRow < rowVal &&
      interCol < colVal
    ) {
      neighbors.push(grid[interRow][interCol]);
    }
  });
  return neighbors;
}
