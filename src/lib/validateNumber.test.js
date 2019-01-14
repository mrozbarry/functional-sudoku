import test from 'ava';
import validateNumber, {
  VALID_NUMBERS
} from './validateNumber.js';
import {
  times
} from 'lodash/fp';

test('will return true for numbers 1-9', (t) => {
  const assertion = VALID_NUMBERS.map(validateNumber);
  t.is(assertion.every(v => v), true, 'all true');
});

test('will return false for all other numbers', (t) => {
  const sample = [-1, 0, 10, 11];
  const assertion = sample.map(validateNumber);
  t.deepEqual(assertion.every(v => v), false, 'all false');
});
