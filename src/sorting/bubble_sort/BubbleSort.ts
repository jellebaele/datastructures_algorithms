import ISort from '../ISort';

/**
 * How it works:
 *    1. Go through the array, one value at a time.
 *    2. For each value, compare the value with the next value.
 *    3. If the value is higher than the next one, swap the values so that the highest value comes last.
 *    4. Go through the array as many times as there are values in the array.
 */

//  O(n^2)
export default class BubbleSort<T> implements ISort<T> {
  sort(arr: T[]): Array<T> {
    const arrToSort = [...arr];

    for (let i = 0; i < arrToSort.length - 1; i++) {
      let swapped = false;
      // As for every loop of i, the highest number will be in its correct place
      /**
       * i = 0: [ 4, 3, 2, 1] -> [ 3, 4, 2, 1] -> [ 3, 2, 4, 1] -> [ 3, 2, 1, 4]
       */
      for (let j = 0; j < arrToSort.length - i - 1; j++) {
        if (arrToSort[j] > arrToSort[j + 1]) {
          this.swap(arrToSort, j, j + 1);
          swapped = true;
        }
      }

      if (!swapped) break;
    }
    return arrToSort;
  }

  private swap(arr: T[], a: number, b: number) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
}
