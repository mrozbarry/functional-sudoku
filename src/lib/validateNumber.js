export const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default number => VALID_NUMBERS.indexOf(parseInt(number, 10)) >= 0;
