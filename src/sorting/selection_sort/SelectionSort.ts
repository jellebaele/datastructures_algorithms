import ISort from '../ISort';

// O(n^2)

/**
 * How it works:
 *    1. Go through the array to find the lowest value.
 *    2. Move the lowest value to the front of the unsorted part of the array.
 *    3. Go through the array again as many times as there are values in the array.
 */
export default class SelectionSort<T> implements ISort<T> {
  sort(arr: T[]): T[] {
    const result = new Array<T>(arr.length);
    const arrToSort = [...arr];

    for (let i = 0; i < result.length; i++) {
      const indexSmallest = this.getIndexSmallest(arrToSort);
      result[i] = arrToSort[indexSmallest];
      arrToSort.splice(indexSmallest, 1);
    }

    return result;
  }

  private getIndexSmallest(arr: T[]): number {
    let index = 0;
    let smallest = arr[index];

    for (let i = 1; i < arr.length; i++) {
      const element = arr[i];
      if (element < smallest) {
        index = i;
        smallest = element;
      }
    }

    return index;
  }
}
