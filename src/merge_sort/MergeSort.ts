import ISort from '../shared/ISort';

export default class MergeSort<T> implements ISort<T> {
  sort(arr: T[]): Array<T> {
    if (arr.length < 2) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return this.merge(this.sort(left), this.sort(right));
  }

  private merge(left: T[], right: T[]): T[] {
    const resultArray: T[] = [];
    let leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return [...resultArray, ...left.slice(leftIndex), ...right.slice(rightIndex)];
  }
}
