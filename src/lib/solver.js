import { VALID_NUMBERS } from './validateNumber';
import * as Region from '../models/region';
import * as Grid from '../models/grid';

const clearCandidates = grid => ({
  ...grid,
  cells: grid.cells.map(cell => ({
    ...cell,
    candidates: [],
  })),
});

const populateCandidates = grid => ({
  ...grid,
  cells: grid.cells.map((cell, index) => {
    if (cell.number) {
      return cell;
    }
    const presentNumbers = Region.relatedToCell(index)(grid)
      .map(data => data.cell.number)
      .filter(number => number !== null);

    const candidates = VALID_NUMBERS.filter(number => presentNumbers.indexOf(number) === -1);

    return {
      ...cell,
      candidates,
    };
  }),
});

const getCurrentBoxIndex = grid => (
  [0, 1, 2, 3, 4, 5, 6, 7, 8].find(boxIndex => (
    Region.box(boxIndex)(grid).some(data => !data.cell.number)
  ))
);

const resolveKnownCells = (initialGrid) => {
  const getNextKnownCell = grid => (
    grid.cells.findIndex(cell => !cell.number && cell.candidates.length === 1)
  );

  let nextKnownCell = getNextKnownCell(initialGrid);
  let grid = { ...initialGrid };
  while (nextKnownCell >= 0) {
    grid = Grid.updateCellNumberAt(nextKnownCell, grid.cells[nextKnownCell].candidates[0])(grid);
    nextKnownCell = getNextKnownCell(grid);
  }
  return grid;
};

const throwIfUnsolvable = (grid) => {
  if (grid.cells.find(c => !c.number && c.candidates.length === 0)) {
    throw new Error('Puzzle state is unsolvable');
  }
  return grid;
};

const solve = (initialGrid) => {
  const grid = resolveKnownCells(throwIfUnsolvable(initialGrid));
  const boxIndex = getCurrentBoxIndex(grid);
  if (boxIndex === undefined) {
    return grid;
  }

  const initialCells = Region.box(boxIndex)(grid).filter(data => !data.cell.number);
  const lowestCandidate = Math.min(...initialCells.map(data => data.cell.candidates.length));
  const cells = initialCells.filter(data => data.cell.candidates.length === lowestCandidate);
  const { cell, position } = cells[Math.floor(Math.random() * cells.length)];
  const number = cell.candidates[Math.floor(Math.random() * cell.candidates.length)];

  return Grid.updateCellNumberAt(position.index, number)(grid);
};

export default solve;
export { clearCandidates, populateCandidates };
