export const sumArray = (arr: Array<number>): number => {
  if (arr.length === 0) return 0;
  else return arr[0] + sumArray(arr.slice(1));
};

export const countLengthArray = (arr: Array<number>): number => {
  if (arr === undefined || arr.length === 0) return 0;
  else return 1 + countLengthArray(arr.slice(1));
};

export const getHighest = (arr: Array<number>): number => {
  if (arr.length == 1) return arr[0];
  if (arr.length == 2) {
    return arr[0] > arr[1] ? arr[0] : arr[1];
  }

  const subHighest = getHighest(arr.slice(1));
  return arr[0] > subHighest ? arr[0] : subHighest;
};

export const binarySearch = (
  arr: number[],
  target: number,
  left = 0,
  right: number = arr.length - 1,
): number => {
  if (left > right) return -1;

  const middle = Math.floor((left + right) / 2);

  if (target === arr[middle]) return middle;
  else if (target > arr[middle]) return binarySearch(arr, target, middle + 1, right);
  else return binarySearch(arr, target, left, middle - 1);
};
