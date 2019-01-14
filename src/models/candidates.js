import {
  flow,
  filter,
  map,
} from 'lodash/fp';
import validateNumber from '../lib/validateNumber';

export const create = () => [];

const unique = array => Array.from(new Set(array));

export const add = number => candidates => flow([
  unique,
  filter(validateNumber),
  map(n => parseInt(n, 10)),
  arr => arr.sort(),
])([...candidates, number]);

export const remove = number => flow([filter(n => n !== number)]);
