import * as Candidates from './candidates.js';

export const create = () => ({
  number: null,
  candidates: Candidates.create(),
});

export const update = number => cell => ({
  ...cell,
  number,
});
