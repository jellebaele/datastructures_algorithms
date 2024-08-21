const sumArray = (arr: Array<number>): number => {
  if (arr.length === 0) return 0;
  else return arr[0] + sumArray(arr.slice(1));
};

const countLengthArray = (arr: Array<number>): number => {
  if (isArrayEmpty(arr)) return 0;
  else return 1 + countLengthArray(arr.slice(1));
};

const isArrayEmpty = (arr: number[]): boolean => {
  return arr.every(item => item === undefined);
};

/**
 *
 * 100, 50
 * highest % lowest = 0 -> return lowest
 *
 * 100, 24
 * highest % lowest = 4
 *
 * 24 % 4 = 0 -> return lowest = 4
 */
const getLargestSquareSize = (length: number, width: number): number => {
  if (length % width === 0 || width % length === 0) return Math.min(length, width);

  const highest = Math.max(length, width);
  const lowest = Math.min(length, width);
  const rest = highest % lowest;

  return getLargestSquareSize(lowest, rest);
};

const getHighest = (arr: Array<number>): number => {
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr[1] > arr[0] ? arr[1] : arr[0];

  const subHighest = getHighest(arr.slice(1));
  return arr[0] > subHighest ? arr[0] : subHighest;
};

const binarySearch = (
  arr: Array<number>,
  target: number,
  left = 0,
  right = arr.length - 1,
): number => {
  if (right < left) return -1;

  const middle = Math.floor((left + right) / 2);
  const guess = arr[middle];

  if (guess === target) return middle;
  else if (guess < target) return binarySearch(arr, target, middle + 1, right);
  else return binarySearch(arr, target, left, middle - 1);
};

export { sumArray, countLengthArray, getLargestSquareSize, getHighest, binarySearch };
