import test from 'ava';
import * as Cell from './cell.js';
import * as Candidates from './candidates.js';
import {
  flow
} from 'lodash/fp';

test('create makes an empty cell', (t) => {
  const cell = Cell.create();
  t.deepEqual(cell, {
    number: null,
    candidates: [],
  });
});

test('updateNumber sets the number', (t) => {
  const cell = Cell.updateNumber(1)(Cell.create());
  t.deepEqual(cell, {
    number: 1,
    candidates: [],
  });
});

test('updateCandidates can be composed with candidate methods', (t) => {
  const cell = flow([
    Cell.updateCandidates(Candidates.add(2)),
    Cell.updateCandidates(Candidates.add(3)),
  ])(Cell.create());

  t.deepEqual(cell, {
    number: null,
    candidates: [2, 3],
  });
});

test('updateNumber clears candidates if the number is valid', (t) => {
  const cellWithCandidates = flow([
    Cell.updateCandidates(Candidates.add(2)),
    Cell.updateCandidates(Candidates.add(3)),
    Cell.updateNumber(3),
  ])(Cell.create());

  t.deepEqual(cellWithCandidates, {
    number: 3,
    candidates: [],
  });
});
