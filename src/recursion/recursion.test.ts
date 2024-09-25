import { countLengthArray, getHighest, getLargestSquareSize, sumArray } from './recursion';

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

describe('getLargestSquareSize', () => {
  test('should return the smaller dimension when one dimension is a multiple of the other', () => {
    expect(getLargestSquareSize(50, 25)).toBe(25);
    expect(getLargestSquareSize(1680, 840)).toBe(840);
    expect(getLargestSquareSize(640, 320)).toBe(320);
  });

  test('should return the greatest common divisor for non-multiple dimensions', () => {
    expect(getLargestSquareSize(1680, 640)).toBe(80); // GCD of 1680 and 640 is 80
    expect(getLargestSquareSize(640, 400)).toBe(80); // GCD of 640 and 400 is 80
    expect(getLargestSquareSize(35, 10)).toBe(5); // GCD of 35 and 10 is 5
  });

  test('should handle cases where both dimensions are equal', () => {
    expect(getLargestSquareSize(50, 50)).toBe(50);
    expect(getLargestSquareSize(100, 100)).toBe(100);
  });

  test('should handle cases where one of the dimensions is 1', () => {
    expect(getLargestSquareSize(1, 50)).toBe(1);
    expect(getLargestSquareSize(50, 1)).toBe(1);
  });

  test('should handle cases with prime number dimensions', () => {
    expect(getLargestSquareSize(17, 31)).toBe(1); // GCD of 17 and 31 is 1
    expect(getLargestSquareSize(29, 7)).toBe(1); // GCD of 29 and 7 is 1
  });

  test('should handle large dimensions', () => {
    expect(getLargestSquareSize(1000000, 250000)).toBe(250000); // GCD of 1000000 and 250000 is 250000
    expect(getLargestSquareSize(123456789, 987654321)).toBe(9); // GCD of 123456789 and 987654321 is 9
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
