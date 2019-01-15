import * as Candidates from './candidates';
import validateNumber from '../lib/validateNumber';

export const create = () => ({
  number: null,
  candidates: Candidates.create(),
});

export const updateNumber = number => cell => ({
  number,
  candidates: validateNumber(number) ? [] : cell.candidates,
});

export const updateCandidates = candidateFn => cell => ({
  ...cell,
  candidates: candidateFn(cell.candidates),
});
