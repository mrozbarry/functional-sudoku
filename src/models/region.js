/*
 *  0  1  2   3  4  5   6  7  8
 *  9 10 11  12 13 14  15 16 17
 * 18 19 20  21 22 23  24 25 26
 *
 * 27 28 29  30 31 32  33 34 35
 * 36 37 38  39 40 41  42 43 44
 * 45 46 47  48 49 50  51 52 53
 *
 * 54 55 56  57 58 59  60 61 62
 * 63 64 65  66 67 68  69 70 71
 * 72 73 74  75 76 77  78 79 80
 */

import {
  times,
} from 'lodash/fp';

const rowIndexes = rowNumber => (
  rowNumber >= 0 && rowNumber <= 8
    ? times(iter => (rowNumber * 9) + iter)(9)
    : []
);

const columnIndexes = columnNumber => (
  columnNumber >= 0 && columnNumber <= 8
    ? times(iter => columnNumber + (iter * 9))(9)
    : []
);

const boxLookup = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

const boxIndexes = boxNumber => boxLookup[boxNumber] || [];

export const indexToPosition = index => ({
  index,
  column: index % 9,
  row: Math.floor(index / 9),
  box: boxLookup.findIndex(indexes => indexes.indexOf(index) >= 0),
});

const collectCells = fn => number => grid => fn(number).map(index => ({
  cell: grid.cells[index],
  position: indexToPosition(index),
}));

export const row = collectCells(rowIndexes);
export const column = collectCells(columnIndexes);
export const box = collectCells(boxIndexes);
export const relatedToCell = cellIndex => (grid) => {
  const position = indexToPosition(cellIndex);
  const boxCells = box(position.box)(grid);
  const rowCells = row(position.row)(grid);
  const columnCells = column(position.column)(grid);

  return [...boxCells, ...rowCells, ...columnCells]
    .reduce((matches, match) => {
      const exists = matches.find(m => m.position.index === match.position.index);
      return exists ? matches : matches.concat(match);
    }, [{
      position,
    }])
    .slice(1);
};
