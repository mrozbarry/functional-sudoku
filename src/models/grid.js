import {
  flow,
  times,
} from 'lodash/fp';
import * as Cell from './cell';
import * as Candidates from './candidates';
import * as Region from './region';

export const create = () => ({
  cells: times(Cell.create)(81),
  conflicts: [],
});

export const updateCell = (cellIndex, fn) => (grid) => {
  const cell = fn(grid.cells[cellIndex]);
  return {
    ...grid,
    cells: [
      ...grid.cells.slice(0, cellIndex),
      cell,
      ...grid.cells.slice(cellIndex + 1),
    ],
  };
};

export const updateCellNumberAt = (cellIndex, number) => (grid) => {
  const relatedTransforms = Region.relatedToCell(cellIndex)(grid)
    .map(data => (
      updateCell(data.position.index, Cell.updateCandidates(Candidates.remove(number)))
    ));

  return flow([
    updateCell(cellIndex, Cell.updateNumber(number)),
    ...relatedTransforms,
  ])(grid);
};
