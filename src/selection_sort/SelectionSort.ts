export default class SelectionSort<T> {
  public sort(arr: Array<T>) {
    const arrayToSort = [...arr];
    const result = new Array<T>();

    for (let i = 0; i < arr.length; i++) {
      const indexSmallest = this.findIndexSmallest(arrayToSort);
      result.push(arrayToSort[indexSmallest]);
      arrayToSort.splice(indexSmallest, 1);
    }

    return result;
  }

  private findIndexSmallest(arr: Array<T>): number {
    if (arr.length <= 0) return -1;
    let indexSmallest = 0;
    let smallest = arr[indexSmallest];

    for (let i = 1; i < arr.length; i++) {
      const element = arr[i];
      if (element < smallest) {
        smallest = element;
        indexSmallest = i;
      }
    }

    return indexSmallest;
  }
}
