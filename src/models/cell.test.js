import test from 'ava';
import * as Cell from './cell.js';

test('create makes an empty cell', (t) => {
  const cell = Cell.create();
  t.deepEqual(cell, {
    number: null,
    candidates: [],
  });
});

test('update sets the number', (t) => {
  const cell = Cell.update(1)(Cell.create());
  t.deepEqual(cell, {
    number: 1,
    candidates: [],
  });
});
