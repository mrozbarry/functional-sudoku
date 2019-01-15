import test from 'ava';
import { flow, times } from 'lodash/fp';
import * as Grid from './grid';
import * as Cell from './cell';
import * as Candidates from './candidates';

test('create makes an empty grid', (t) => {
  const grid = Grid.create();
  t.is(grid.cells.length, 81);
  t.is(grid.conflicts.length, 0);
});

test('removes candidates on setting a number', (t) => {
  const grid = flow([
    ...times(index => Grid.updateCell(index, Cell.updateCandidates(Candidates.add(1))))(81),
    Grid.updateCellNumberAt(12, 1),
  ])(Grid.create());

  const expectedNoCandidateCells = [
    3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 30, 39, 48, 57, 66, 75,
  ];

  const noCandidateCells = grid.cells.reduce((indexes, cell, index) => (
    cell.candidates.length === 0 ? indexes.concat(index) : indexes
  ), []);

  t.deepEqual(noCandidateCells, expectedNoCandidateCells);
});
