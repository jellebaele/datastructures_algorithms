import HashMap from './HashMap';
import { Equatable } from './HashTableAllowTypes';

describe('HashMap', () => {
  let hashMap: HashMap<string, string>;

  beforeEach(() => {
    hashMap = new HashMap<string, string>();
  });

  test('should initialize with size 0', () => {
    expect(hashMap.size).toBe(0);
  });

  test('should set and get a value', () => {
    hashMap.set('key1', 'value1');

    expect(hashMap.get('key1')).toBe('value1');
    expect(hashMap.size).toBe(1);
  });

  test('should return undefined for a non-existing key', () => {
    expect(hashMap.get('nonExistingKey')).toBeNull();
  });

  test('should return true for existing key', () => {
    hashMap.set('key1', 'value1');

    expect(hashMap.has('key1')).toBe(true);
  });

  test('should return false for a non-existing key', () => {
    expect(hashMap.has('nonExistingKey')).toBe(false);
  });

  test('should handle collisions', () => {
    const hashMap = new HashMap<string, string>(5);
    hashMap.set('a', 'value1');
    hashMap.set('f', 'value2'); // 'a' and 'f' their hash is the same when size is 5

    expect(hashMap.get('a')).toBe('value1');
    expect(hashMap.get('f')).toBe('value2');
  });

  test('should update value for an existing key', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key1', 'value2');

    expect(hashMap.get('key1')).toBe('value2');
  });

  test('should delete an existing key', () => {
    hashMap.set('key1', 'value1');
    const result = hashMap.remove('key1');

    expect(hashMap.has('key1')).toBe(false);
    expect(result).toBeTruthy();
  });

  test('should return false when deleting a non-existing key', () => {
    const result = hashMap.remove('nonExistingKey');

    expect(result).toBeFalsy();
  });

  test('should clear the hash table', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');

    hashMap.clear();

    expect(hashMap.size).toBe(0);
    expect(hashMap.has('key1')).toBe(false);
    expect(hashMap.has('key2')).toBe(false);
  });

  test('should return the correct size after operations', () => {
    expect(hashMap.size).toBe(0);
    hashMap.set('key1', 'value1');

    expect(hashMap.size).toBe(1);
    hashMap.set('key2', 'value2');

    expect(hashMap.size).toBe(2);
    hashMap.remove('key1');

    expect(hashMap.size).toBe(1);
  });

  test('should handle resizing', () => {
    const hashMapWithResizing = new HashMap(4);

    hashMapWithResizing.set('key1', 'value1');
    hashMapWithResizing.set('key2', 'value2');
    hashMapWithResizing.set('key3', 'value3');
    hashMapWithResizing.set('key4', 'value4');

    expect(hashMapWithResizing.size).toBe(4);
    expect(hashMapWithResizing.get('key1')).toBe('value1');
    expect(hashMapWithResizing.get('key2')).toBe('value2');
    expect(hashMapWithResizing.get('key3')).toBe('value3');
    expect(hashMapWithResizing.get('key4')).toBe('value4');
    expect((hashMapWithResizing as any)._table.length).toBe(8);
  });

  test('should return all keys', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key3', 'value3');

    const keys = Array.from(hashMap.keys());

    expect(keys.sort()).toEqual(['key1', 'key2', 'key3']);
  });

  test('should no keys in empty hashmap', () => {
    const keys = hashMap.keys();

    expect(keys.next().value).toBeUndefined();
  });

  test('should return all values', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key3', 'value3');

    const values = Array.from(hashMap.values());

    expect(values.sort()).toEqual(['value1', 'value2', 'value3']);
  });

  test('should no keys in empty hashmap', () => {
    const values = hashMap.values();

    expect(values.next().value).toBeUndefined();
  });

  test('should handle forEach', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key3', 'value3');

    const seen: Record<string, string> = {};

    hashMap.forEach((value, key, mapInstance) => {
      seen[key] = value;
      expect(mapInstance).toBe(hashMap);
    });

    expect(seen).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    });
  });

  test('should show all entries', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key3', 'value3');

    const entries = Array.from(hashMap.entries()).sort();

    expect(entries).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2'],
      ['key3', 'value3'],
    ]);
  });

  test('should show all entries when updating the same key', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key1', 'value3');

    const entries = Array.from(hashMap.entries()).sort();

    expect(entries).toEqual([
      ['key1', 'value3'],
      ['key2', 'value2'],
    ]);
  });

  test('should show all entries when removing', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key1', 'value3');
    hashMap.remove('key1');

    const entries = Array.from(hashMap.entries()).sort();

    expect(entries).toEqual([['key2', 'value2']]);
  });

  test('should show all entries when removing', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key3', 'value3');
    hashMap.remove('key2');

    const entries = Array.from(hashMap.entries()).sort();

    expect(entries).toEqual([
      ['key1', 'value1'],
      ['key3', 'value3'],
    ]);
  });

  test('should handle number as key type and object as value type', () => {
    class CustomType implements Equatable {
      public a: string;
      public b: number;

      constructor(a: string, b: number) {
        this.a = a;
        this.b = b;
      }

      equals(other: this): boolean {
        return other !== null && other.a === this.a && other.b === this.b;
      }
    }
    const hashMap = new HashMap<number, CustomType>();
    const obj1 = new CustomType('A', 1);
    const obj2 = new CustomType('B', 1);
    hashMap.set(1, obj1);
    hashMap.set(2, obj2);

    expect(hashMap.has(1)).toBeTruthy();
    expect(hashMap.get(1)).toEqual(obj1);
    expect(hashMap.has(2)).toBeTruthy();
    expect(hashMap.get(2)).toEqual(obj2);

    const obj3 = new CustomType('B', 1);
    hashMap.set(1, obj3);
    expect(hashMap.has(1)).toBeTruthy();
    expect(hashMap.get(1)).toEqual(obj3);

    hashMap.remove(2);
    expect(hashMap.has(2)).toBeFalsy();
  });
});
