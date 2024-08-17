import { binarySearch, countLengthArray, getHighest, sumArray } from './recursion';

describe('sumArray', () => {
  test('should return 0 for an empty array', () => {
    const result = sumArray([]);
    expect(result).toBe(0);
  });

  test('should return the sum of a single-element array', () => {
    const result = sumArray([10]);
    expect(result).toBe(10);
  });

  test('should return the correct sum for an array of positive numbers', () => {
    const result = sumArray([1, 2, 3, 4, 5]);
    expect(result).toBe(15);
  });

  test('should return the correct sum for an array of negative numbers', () => {
    const result = sumArray([-1, -2, -3, -4, -5]);
    expect(result).toBe(-15);
  });

  test('should return the correct sum for an array with both positive and negative numbers', () => {
    const result = sumArray([10, -2, 3, -4, 5]);
    expect(result).toBe(12);
  });

  test('should return the correct sum for an array with zeros', () => {
    const result = sumArray([0, 0, 0]);
    expect(result).toBe(0);
  });

  test('should return the correct sum for an array with large numbers', () => {
    const result = sumArray([1000000, 2000000, 3000000]);
    expect(result).toBe(6000000);
  });

  test('should handle an array with floating-point numbers', () => {
    const result = sumArray([1.5, 2.5, 3.5]);
    expect(result).toBeCloseTo(7.5); // Using toBeCloseTo for floating-point precision
  });
});

describe('countLengthArray', () => {
  test('should return 0 for an empty array', () => {
    const result = countLengthArray([]);
    expect(result).toBe(0);
  });

  test('should return the correct count for an array with one element', () => {
    const result = countLengthArray([42]);
    expect(result).toBe(1);
  });

  test('should return the correct count for an array with multiple elements', () => {
    const result = countLengthArray([1, 2, 3, 4, 5]);
    expect(result).toBe(5);
  });

  test('should return the correct count for an array with repeated elements', () => {
    const result = countLengthArray([7, 7, 7, 7]);
    expect(result).toBe(4);
  });

  test('should return the correct count for an array with negative numbers', () => {
    const result = countLengthArray([-1, -2, -3]);
    expect(result).toBe(3);
  });

  test('should return the correct count for an array with mixed positive and negative numbers', () => {
    const result = countLengthArray([-1, 0, 1, 2, -2]);
    expect(result).toBe(5);
  });
});

describe('getHighest', () => {
  test('should return the only element for a single-element array', () => {
    const result = getHighest([42]);
    expect(result).toBe(42);
  });

  test('should return the highest element for an array with two elements', () => {
    const result1 = getHighest([42, 99]);
    const result2 = getHighest([99, 42]);
    expect(result1).toBe(99);
    expect(result2).toBe(99);
  });

  test('should return the highest element for an array with multiple elements', () => {
    const result = getHighest([10, 20, 30, 5, 15]);
    expect(result).toBe(30);
  });

  test('should handle an array with negative numbers', () => {
    const result = getHighest([-10, -20, -30, -5, -15]);
    expect(result).toBe(-5);
  });

  test('should handle an array with both positive and negative numbers', () => {
    const result = getHighest([10, -20, 30, -5, 15]);
    expect(result).toBe(30);
  });

  test('should handle an array with all identical elements', () => {
    const result = getHighest([7, 7, 7, 7, 7]);
    expect(result).toBe(7);
  });

  test('should handle an empty array gracefully', () => {
    expect(() => getHighest([])).toThrow(); // Assuming an error should be thrown for an empty array
  });
});

describe('BinarySearch', () => {
  test('should return correct index when target is found in the array', () => {
    const arr = [5, 8, 9, 12, 15];

    expect(binarySearch(arr, 12)).toEqual(3);
    expect(binarySearch(arr, 5)).toEqual(0);
    expect(binarySearch(arr, 15)).toEqual(4);
  });

  test('should return -1 when target is not found in the array', () => {
    const arr = [5, 8, 9, 12, 15];
    expect(binarySearch(arr, 10)).toEqual(-1);
    expect(binarySearch(arr, 1)).toEqual(-1);
    expect(binarySearch(arr, 20)).toEqual(-1);
  });

  test('should return -1 for an empty array', () => {
    const arr: number[] = [];
    expect(binarySearch(arr, 10)).toEqual(-1);
  });

  test('should return correct index when the array has one element and it is the target', () => {
    const arr = [7];
    expect(binarySearch(arr, 7)).toEqual(0);
  });

  test('should return -1 when the array has one element and it is not the target', () => {
    const arr = [7];
    expect(binarySearch(arr, 10)).toEqual(-1);
  });
});
