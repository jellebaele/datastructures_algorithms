export default class BinarySearch<T> {
  public search(list: Array<T>, target: T): number {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
      const index = Math.floor((low + high) / 2);
      const guess = list[index];

      if (guess === target) return index;
      if (guess > target) high = index - 1;
      if (guess < target) low = index + 1;
    }

    return -1;
  }
}
