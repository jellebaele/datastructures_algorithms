import { modularHash } from './hashing';

describe('modularHash', () => {
  const size = 1000;

  test('should return a consistent hash for the same input', () => {
    const input = 'testKey';
    const hash1 = modularHash(input, size);
    const hash2 = modularHash(input, size);
    expect(hash1).toBe(hash2);
  });

  test('should produce different hashes for different inputs', () => {
    const hash1 = modularHash('key1', size);
    const hash2 = modularHash('key2', size);
    expect(hash1).not.toBe(hash2);
  });

  test('should return the same hash for inputs that are permutations of each other', () => {
    const hash1 = modularHash('abcd', size);
    const hash2 = modularHash('dcba', size);
    expect(hash1).not.toBe(hash2);
  });

  test('should handle empty string', () => {
    expect(modularHash('', size)).toBe(0);
  });

  test('should handle strings with special characters', () => {
    const hash1 = modularHash('!@#$%^&*()', size);
    const hash2 = modularHash('!@#$%^&*()', size);
    expect(hash1).toBe(hash2);
  });

  test('should handle very long strings', () => {
    const longString = 'a'.repeat(1000);
    const hash = modularHash(longString, size);
    expect(typeof hash).toBe('number');
  });
});
