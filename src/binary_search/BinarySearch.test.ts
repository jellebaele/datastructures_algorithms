import BinarySearch from './BinarySearch';

describe('BinarySearch', () => {
  let binarySearch: BinarySearch<number>;

  beforeEach(() => {
    binarySearch = new BinarySearch();
  });

  test('should return correct index when target is found in the array', () => {
    const arr = [5, 8, 9, 12, 15];
    expect(binarySearch.search(arr, 12)).toEqual(3);
    expect(binarySearch.search(arr, 5)).toEqual(0);
    expect(binarySearch.search(arr, 15)).toEqual(4);
  });

  test('should return -1 when target is not found in the array', () => {
    const arr = [5, 8, 9, 12, 15];
    expect(binarySearch.search(arr, 10)).toEqual(-1);
    expect(binarySearch.search(arr, 1)).toEqual(-1);
    expect(binarySearch.search(arr, 20)).toEqual(-1);
  });

  test('should return -1 for an empty array', () => {
    const arr: number[] = [];
    expect(binarySearch.search(arr, 10)).toEqual(-1);
  });

  test('should return correct index when the array has one element and it is the target', () => {
    const arr = [7];
    expect(binarySearch.search(arr, 7)).toEqual(0);
  });

  test('should return -1 when the array has one element and it is not the target', () => {
    const arr = [7];
    expect(binarySearch.search(arr, 10)).toEqual(-1);
  });
});
