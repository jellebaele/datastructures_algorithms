import ISort from '../ISort';

/**
 * How it works:
 *    1. Take the first value from the unsorted part of the array. (Consider the
 *       very first value as part of the sorted array)
 *    2. Move the value into the correct place in the sorted part of the array.
 *    3. Go through the unsorted part of the array again as many times as there are values.
 *
 * e.g.:
 *    1.  [ 12, 2, 5, 1 ]
 *    2.  [ 2, 12, 5, 1 ]
 *    3.  [ 2, 5, 12, 1 ]
 *        ...
 */

export default class InsertionSort<T> implements ISort<T> {
  sort(arr: T[]): T[] {
    const arrToSort = [...arr];
    const sortedArray = [arrToSort.splice(0, 1)[0]];

    for (let i = 0; i < arr.length - 1; i++) {
      const element = arrToSort[i];

      let j = 0;
      while (element >= sortedArray[j] && j < sortedArray.length) {
        j++;
      }

      sortedArray.splice(j, 0, element);
    }

    return sortedArray;
  }
}
