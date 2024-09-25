import ISort from '../ISort';

// O(n^2)

export default class SelectionSort<T> implements ISort<T> {
  public sort(arr: Array<T>): Array<T> {
    const sortedArr = new Array<T>();
    const arrToSort = [...arr];

    for (let i = 0; i < arr.length; i++) {
      const indexSmallest = this.getIndexSmallest(arrToSort);
      sortedArr.push(arrToSort[indexSmallest]);
      arrToSort.splice(indexSmallest, 1);
    }

    return sortedArr;
  }

  private getIndexSmallest(arr: Array<T>): number {
    let indexSmallestValue = 0;
    let smallestValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < smallestValue) {
        smallestValue = arr[i];
        indexSmallestValue = i;
      }
    }

    return indexSmallestValue;
  }
}
