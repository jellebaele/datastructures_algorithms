import ISearch from '../ISearch';

export default class LinearSearch<T> implements ISearch<T> {
  // O(n)
  search(arr: T[], target: T): number {
    let index = 0;

    while (index < arr.length) {
      if (arr[index] === target) return index;
      index++;
    }

    return -1;
  }
}
