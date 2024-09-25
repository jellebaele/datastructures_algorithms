import LinearSearch from './LinearSearch';

describe('LinearSearch', () => {
  let linearSearch: LinearSearch<number>;

  beforeEach(() => {
    linearSearch = new LinearSearch();
  });

  describe('search', () => {
    test('should return correct index when target is found in the array', () => {
      const arr = [5, 8, 9, 12, 15];
      expect(linearSearch.search(arr, 12)).toEqual(3);
      expect(linearSearch.search(arr, 5)).toEqual(0);
      expect(linearSearch.search(arr, 15)).toEqual(4);
    });

    test('should return -1 when target is not found in the array', () => {
      const arr = [5, 8, 9, 12, 15];
      expect(linearSearch.search(arr, 10)).toEqual(-1);
      expect(linearSearch.search(arr, 1)).toEqual(-1);
      expect(linearSearch.search(arr, 20)).toEqual(-1);
    });

    test('should return -1 for an empty array', () => {
      const arr: number[] = [];
      expect(linearSearch.search(arr, 10)).toEqual(-1);
    });

    test('should return correct index when the array has one element and it is the target', () => {
      const arr = [7];
      expect(linearSearch.search(arr, 7)).toEqual(0);
    });

    test('should return -1 when the array has one element and it is not the target', () => {
      const arr = [7];
      expect(linearSearch.search(arr, 10)).toEqual(-1);
    });
  });
});
