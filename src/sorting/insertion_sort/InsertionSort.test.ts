import InsertionSort from './InsertionSort';

describe('BubbleSort', () => {
  let insertionSort: InsertionSort<number>;

  beforeEach(() => {
    insertionSort = new InsertionSort();
  });

  test('should sort an array of multiple elements in ascending order', () => {
    const array = [64, 25, 12, 22, 11];
    const sortedArray = insertionSort.sort(array);

    expect(array).toEqual([64, 25, 12, 22, 11]); // Check if original array is unchanged
    expect(sortedArray).toEqual([11, 12, 22, 25, 64]);
  });

  test('should handle an array that is already sorted', () => {
    const array = [1, 2, 3, 4, 5];
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle an array sorted in reverse order', () => {
    const array = [5, 4, 3, 2, 1];
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle an array with duplicate elements', () => {
    const array = [3, 1, 2, 3, 1];
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual([1, 1, 2, 3, 3]);
  });

  test('should handle an array with all identical elements', () => {
    const array = [7, 7, 7, 7];
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual([7, 7, 7, 7]);
  });

  test('should handle an empty array', () => {
    const array: number[] = [];
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual([]);
  });

  test('should handle an array with a single element', () => {
    const array = [42];
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual([42]);
  });

  test('should handle a large array', () => {
    const array = Array.from({ length: 1000 }, (_, i) => 1000 - i);
    const sortedArray = insertionSort.sort(array);

    expect(sortedArray).toEqual(Array.from({ length: 1000 }, (_, i) => i + 1));
  });
});
