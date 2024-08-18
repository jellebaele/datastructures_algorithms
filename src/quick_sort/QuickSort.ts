import ISort from '../shared/ISort';

// O(n^2) worst case
// O(n logn) average

export default class QuickSort<T> implements ISort<T> {
  public sort(arr: Array<T>): Array<T> {
    if (arr.length < 2) return arr;

    const pivot = arr[0];
    const partitionLowerNumbers = [];
    const partationHigherNumbers = [];

    for (let i = 1; i < arr.length; i++) {
      const element = arr[i];
      if (element < pivot) partitionLowerNumbers.push(element);
      else partationHigherNumbers.push(element);
    }

    return [...this.sort(partitionLowerNumbers), pivot, ...this.sort(partationHigherNumbers)];
  }
}
