// O(n^2)

export default class SelectionSort<T> {
  public sort(arr: Array<T>): Array<T> {
    const resultArr = new Array<T>();
    const arrToSort = [...arr];

    for (let i = 0; i < arr.length; i++) {
      const indexSmallest = this.getIndexSmallest(arrToSort);
      resultArr.push(arrToSort[indexSmallest]);
      arrToSort.splice(indexSmallest, 1);
    }

    return resultArr;
  }

  private getIndexSmallest(arr: Array<T>): number {
    let indexSmallest = 0;
    let smallest = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < smallest) {
        smallest = arr[i];
        indexSmallest = i;
      }
    }

    return indexSmallest;
  }
}
