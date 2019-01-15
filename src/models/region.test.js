import test from 'ava';
import * as Grid from './grid';
import * as Region from './region';

test('calculates a row', (t) => {
  const grid = Grid.create();
  const row = Region.row(3)(grid);
  t.is(row.length, 9);
  t.snapshot(row);
});

test('calculates a column', (t) => {
  const grid = Grid.create();
  const column = Region.column(3)(grid);
  t.is(column.length, 9);
  t.snapshot(column);
});

test('calculates a box', (t) => {
  const grid = Grid.create();
  const box = Region.box(1)(grid);
  t.is(box.length, 9);
  t.snapshot(box);
});

test('calculates related cells from a source cell', (t) => {
  const grid = Grid.create();
  const related = Region.relatedToCell(44)(grid);
  t.is(related.length, 20);
  t.snapshot(related);
});
