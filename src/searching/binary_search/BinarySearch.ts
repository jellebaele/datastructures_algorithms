import ISearch from '../ISearch';

// O(log n)
export default class BinarySearch<T> implements ISearch<T> {
  search(sortedArr: T[], target: T): number {
    let low = 0;
    let high = sortedArr.length - 1;

    while (low <= high) {
      const middle = Math.floor((high + low) / 2);
      const guess = sortedArr[middle];

      if (guess === target) return middle;
      if (guess < target) low = middle + 1;
      else high = middle - 1;
    }

    return -1;
  }

  searchRecursive = (
    sortedArr: Array<number>,
    target: number,
    low = 0,
    high = sortedArr.length - 1,
  ): number => {
    if (low > high) return -1;

    const middle = Math.floor((low + high) / 2);
    const guess = sortedArr[middle];

    if (guess === target) return middle;
    else if (guess < target) return this.searchRecursive(sortedArr, target, middle + 1, high);
    else return this.searchRecursive(sortedArr, target, low, middle - 1);
  };
}
