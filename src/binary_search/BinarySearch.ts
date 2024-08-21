import ISearch from '../shared/ISearch';

// O(log n)
export default class BinarySearch<T> implements ISearch<T> {
  search(sortedArr: T[], element: T): number {
    let low = 0;
    let high = sortedArr.length - 1;

    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const guess = sortedArr[middle];

      if (guess === element) return middle;
      if (guess < element) low = middle + 1;
      else high = middle - 1;
    }

    return -1;
  }
}
