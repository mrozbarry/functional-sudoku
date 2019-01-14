import test from 'ava';
import * as Candidates from './candidates.js';
import {
  flow
} from 'lodash/fp';

test('create makes an empty candidate list', (t) => {
  const candidates = Candidates.create();
  t.deepEqual(candidates, []);
});

test('add adds a number to the candidate list', (t) => {
  const candidates = Candidates.add(1)(Candidates.create());
  t.deepEqual(candidates, [1]);
});

test('add enforces ordering', (t) => {
  const candidates = flow([
    Candidates.add(3),
    Candidates.add(1),
    Candidates.add(2),
  ])(Candidates.create());

  t.deepEqual(candidates, [1, 2, 3]);
});

test('add enforces uniqueness', (t) => {
  const candidates = flow([
    Candidates.add(3),
    Candidates.add(1),
    Candidates.add(3),
  ])(Candidates.create());

  t.deepEqual(candidates, [1, 3]);
});

test('add enforces valid numbers', (t) => {
  const candidates = flow([
    Candidates.add(1),
    Candidates.add('2'),
    Candidates.add(9),
    Candidates.add(100),
  ])(Candidates.create());

  t.deepEqual(candidates, [1, 2, 9]);
});


test('remove removes a number from the candidate list', (t) => {
  const candidates = flow([
    Candidates.add(3),
    Candidates.add(1),
    Candidates.remove(3),
  ])(Candidates.create());

  t.deepEqual(candidates, [1]);
});
