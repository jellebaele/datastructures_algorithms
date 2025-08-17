import HashSet from './HashSet';

describe('HashMap', () => {
  let hashSet: HashSet<string>;

  beforeEach(() => {
    hashSet = new HashSet<string>();
  });

  test('should initialize with size 0', () => {
    expect(hashSet.size).toBe(0);
  });

  test('should set and get a value', () => {
    hashSet.add('key1');

    expect(hashSet.has('key1')).toBeTruthy();
    expect(Array.from(hashSet.keys())).toContain('key1');
    expect(hashSet.size).toBe(1);
  });

  test('should return true for existing key', () => {
    hashSet.add('key1');

    expect(hashSet.has('key1')).toBe(true);
  });

  test('should return false for a non-existing key', () => {
    expect(hashSet.has('nonExistingKey')).toBe(false);
  });

  test('should handle collisions', () => {
    const hashMap = new HashSet<string>(5);
    hashMap.add('a');
    hashMap.add('f'); // 'a' and 'f' their hash is the same when size is 5

    expect(hashMap.has('a')).toBeTruthy();
    expect(hashMap.has('f')).toBeTruthy();
  });

  test('should not store duplicate keys', () => {
    hashSet.add('key1');
    hashSet.add('key1');

    expect(hashSet.has('key1')).toBeTruthy();
    expect(hashSet.size).toBe(1);

    const keys = hashSet.keys();

    expect(keys.next().value).toBe('key1');
    expect(keys.next().value).toBeUndefined();
  });

  test('should delete an existing key', () => {
    hashSet.add('key1');
    const result = hashSet.remove('key1');

    expect(hashSet.has('key1')).toBe(false);
    expect(result).toBeTruthy();
  });

  test('should return false when deleting a non-existing key', () => {
    const result = hashSet.remove('nonExistingKey');

    expect(result).toBeFalsy();
  });

  test('should clear the hash table', () => {
    hashSet.add('key1');
    hashSet.add('key2');

    hashSet.clear();

    expect(hashSet.size).toBe(0);
    expect(hashSet.has('key1')).toBe(false);
    expect(hashSet.has('key2')).toBe(false);
  });

  test('should return the correct size after operations', () => {
    expect(hashSet.size).toBe(0);
    hashSet.add('key1');

    expect(hashSet.size).toBe(1);
    hashSet.add('key2');

    expect(hashSet.size).toBe(2);
    hashSet.remove('key1');

    expect(hashSet.size).toBe(1);
  });

  test('should handle resizing', () => {
    const hashMapWithResizing = new HashSet(4);

    hashMapWithResizing.add('key1');
    hashMapWithResizing.add('key2');
    hashMapWithResizing.add('key3');
    hashMapWithResizing.add('key4');

    expect(hashMapWithResizing.size).toBe(4);
    expect(hashMapWithResizing.has('key1')).toBeTruthy();
    expect(hashMapWithResizing.has('key2')).toBeTruthy();
    expect(hashMapWithResizing.has('key3')).toBeTruthy();
    expect(hashMapWithResizing.has('key4')).toBeTruthy();
    expect((hashMapWithResizing as any)._map._table.length).toBe(8);
  });

  test('should return all keys', () => {
    hashSet.add('key1');
    hashSet.add('key2');
    hashSet.add('key3');

    const keys = Array.from(hashSet.keys());

    expect(keys.sort()).toEqual(['key1', 'key2', 'key3']);
  });

  test('should no keys in empty hashmap', () => {
    const keys = hashSet.keys();

    expect(keys.next().value).toBeUndefined();
  });

  test('should return all values', () => {
    hashSet.add('key1');
    hashSet.add('key2');
    hashSet.add('key3');

    const values = Array.from(hashSet.values());

    expect(values.sort()).toEqual(['key1', 'key2', 'key3']);
  });

  test('should no keys in empty hashmap', () => {
    const values = hashSet.values();

    expect(values.next().value).toBeUndefined();
  });

  test('should handle forEach', () => {
    hashSet.add('key1');
    hashSet.add('key2');
    hashSet.add('key3');

    const seen: string[] = [];

    hashSet.forEach((key, mapInstance) => {
      seen.push(key);
      expect(mapInstance).toBe(hashSet);
    });

    seen.sort();
    expect(seen).toEqual(['key1', 'key2', 'key3']);
  });

  test('should show all entries', () => {
    hashSet.add('key1');
    hashSet.add('key2');
    hashSet.add('key3');

    const entries = Array.from(hashSet.entries()).sort();

    expect(entries).toEqual([
      ['key1', 'key1'],
      ['key2', 'key2'],
      ['key3', 'key3'],
    ]);
  });

  test('should show all entries when updating the same key', () => {
    hashSet.add('key1');
    hashSet.add('key2');
    hashSet.add('key1');

    const entries = Array.from(hashSet.entries()).sort();

    expect(entries).toEqual([
      ['key1', 'key1'],
      ['key2', 'key2'],
    ]);
  });

  test('should show all entries when removing', () => {
    hashSet.add('key1');
    hashSet.add('key2');
    hashSet.add('key3');
    hashSet.remove('key1');

    const entries = Array.from(hashSet.entries()).sort();

    expect(entries).toEqual([
      ['key2', 'key2'],
      ['key3', 'key3'],
    ]);
  });
});
