import test from 'ava';
import * as Grid from './grid';

test('create makes an empty grid', (t) => {
  const grid = Grid.create();
  t.is(grid.cells.length, 81);
  t.is(grid.conflicts.length, 0);
});
