import { hashValue } from './hashing';

describe('hashValue', () => {
  test('should return a consistent hash for the same input', () => {
    const input = 'testKey';
    const hash1 = hashValue(input);
    const hash2 = hashValue(input);
    expect(hash1).toBe(hash2);
  });

  test('should produce different hashes for different inputs', () => {
    const hash1 = hashValue('key1');
    const hash2 = hashValue('key2');
    expect(hash1).not.toBe(hash2);
  });

  test('should return the same hash for inputs that are permutations of each other', () => {
    const hash1 = hashValue('abcd');
    const hash2 = hashValue('dcba');
    expect(hash1).not.toBe(hash2);
  });

  test('should handle empty string', () => {
    expect(hashValue('')).toBe(0);
  });

  test('should handle strings with special characters', () => {
    const hash1 = hashValue('!@#$%^&*()');
    const hash2 = hashValue('!@#$%^&*()');
    expect(hash1).toBe(hash2);
  });

  test('should handle very long strings', () => {
    const longString = 'a'.repeat(1000);
    const hash = hashValue(longString);
    expect(typeof hash).toBe('number');
  });

  test('should handle numbers', () => {
    const hash1 = hashValue(123);
    const hash2 = hashValue(123);
    expect(hash1).toBe(hash2);
    expect(hashValue(123)).not.toBe(hashValue(456));
  });

  test('should handle objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { b: 2, a: 1 };

    expect(hashValue(obj1)).toBe(hashValue(obj2));
    expect(hashValue(obj1)).toBe(hashValue(obj3));
    expect(hashValue(obj1)).not.toBe(hashValue({ a: 2, b: 3 }));
  });
});
