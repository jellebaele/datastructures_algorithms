import HashTable from './HashTable';

describe('HashTable', () => {
  let hashTable: HashTable<string>;

  beforeEach(() => {
    hashTable = new HashTable<string>();
  });

  test('should initialize with size 0', () => {
    expect(hashTable.getSize()).toBe(0);
  });

  test('should set and get a value', () => {
    hashTable.set('key1', 'value1');
    expect(hashTable.get('key1')).toBe('value1');
  });

  test('should return undefined for a non-existing key', () => {
    expect(hashTable.get('nonExistingKey')).toBeUndefined();
  });

  test('should return true for existing key', () => {
    hashTable.set('key1', 'value1');
    expect(hashTable.has('key1')).toBe(true);
  });

  test('should return false for a non-existing key', () => {
    expect(hashTable.has('nonExistingKey')).toBe(false);
  });

  test('should delete an existing key', () => {
    hashTable.set('key1', 'value1');
    hashTable.delete('key1');
    expect(hashTable.has('key1')).toBe(false);
  });

  test('should do nothing when deleting a non-existing key', () => {
    expect(() => hashTable.delete('nonExistingKey')).not.toThrow();
  });

  test('should clear the hash table', () => {
    hashTable.set('key1', 'value1');
    hashTable.set('key2', 'value2');
    hashTable.clear();
    expect(hashTable.getSize()).toBe(0);
    expect(hashTable.has('key1')).toBe(false);
    expect(hashTable.has('key2')).toBe(false);
  });

  test('should handle collisions', () => {
    hashTable.set('key1', 'value1');
    hashTable.set('key2', 'value2');
    expect(hashTable.get('key1')).toBe('value1');
    expect(hashTable.get('key2')).toBe('value2');
  });

  test('should update value for an existing key', () => {
    hashTable.set('key1', 'value1');
    hashTable.set('key1', 'value2'); // Updating value
    expect(hashTable.get('key1')).toBe('value2');
  });

  test('should return the correct size after operations', () => {
    expect(hashTable.getSize()).toBe(0);
    hashTable.set('key1', 'value1');
    expect(hashTable.getSize()).toBe(1);
    hashTable.set('key2', 'value2');
    expect(hashTable.getSize()).toBe(2);
    hashTable.delete('key1');
    expect(hashTable.getSize()).toBe(1);
  });

  test('should handle resizing', () => {
    const hashTableWithResizing = new HashTable(2);
    hashTableWithResizing.set('key1', 'value1');
    hashTableWithResizing.set('key2', 'value2');
    hashTableWithResizing.set('key3', 'value3');
    hashTableWithResizing.set('key4', 'value4');

    expect(hashTableWithResizing.getSize()).toBe(4);
    expect(hashTableWithResizing.get('key1')).toBe('value1');
    expect(hashTableWithResizing.get('key2')).toBe('value2');
    expect(hashTableWithResizing.get('key3')).toBe('value3');
    expect(hashTableWithResizing.get('key4')).toBe('value4');
  });
});
