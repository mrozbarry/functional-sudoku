import {
  times,
} from 'lodash/fp';
import * as Cell from './cell';

export const create = () => ({
  cells: times(Cell.create)(81),
  conflicts: [],
});
