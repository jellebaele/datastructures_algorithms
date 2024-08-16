import LinkedList from './LinkedList';

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test('should initialize an empty list', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.getSize()).toBe(0);
  });

  test('should add an element to the end of the list', () => {
    list.add(10);
    expect(list.getSize()).toBe(1);
    expect(list.get(0)).toBe(10);
  });

  test('should add two elements to the end of the list', () => {
    list.add(10);
    list.add(20);

    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
  });

  test('should insert an element at a specific index', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.insert(1, 15); // Add 15 at index 1

    expect(list.getSize()).toBe(4);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(15);
    expect(list.get(2)).toBe(20);
    expect(list.get(3)).toBe(30);
  });

  test('should insert an element at a specific index', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.insert(1, 15); // Add 15 at index 1

    expect(list.getSize()).toBe(4);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(15);
    expect(list.get(2)).toBe(20);
    expect(list.get(3)).toBe(30);
  });

  test('should insert an element at index 0 in an empty list', () => {
    list.insert(0, 10); // Add 10 at index 0
    expect(list.getSize()).toBe(1);
    expect(list.get(0)).toBe(10);
  });

  test('should insert an element at the end of the list', () => {
    list.add(10);
    list.insert(1, 20); // Add 20 at index 1 (end of the list)
    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
  });

  test('should throw an error when adding an element at an out-of-bounds index', () => {
    expect(() => list.insert(1, 10)).toThrow('Index out of bounds');
  });

  test('should handle an empty list in string representation', () => {
    expect(list.toString()).toBe('');
  });

  test('should convert the list to a string representation', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    expect(list.toString()).toBe('10 -> 20 -> 30');
  });

  test('should add an element at the beginning of the list', () => {
    list.add(20);
    list.addFirst(10); // Add 10 at the beginning
    expect(list.getSize()).toBe(2);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(20);
  });

  test('should clear the list', () => {
    list.add(10);
    list.add(20);
    list.clear();
    expect(list.getSize()).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should check if the list contains an element', () => {
    list.add(10);
    list.add(20);
    expect(list.contains(10)).toBe(true);
    expect(list.contains(30)).toBe(false);
  });

  test('should get the first element of the list', () => {
    list.add(10);
    list.add(20);
    expect(list.getFirst()).toBe(10);
  });

  test('should get the last element of the list', () => {
    list.add(10);
    list.add(20);
    expect(list.getLast()).toBe(20);
  });

  test('should return the index of an element', () => {
    list.add(10);
    list.add(20);
    expect(list.indexOf(10)).toBe(0);
    expect(list.indexOf(20)).toBe(1);
    expect(list.indexOf(30)).toBe(-1); // Element not in the list
  });

  test('should remove an element at first index', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.remove(0); // Remove element at index 1 (20)
    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe(20);
    expect(list.get(1)).toBe(30);
  });

  test('should remove an element at last index', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.remove(0); // Remove element at index 1 (20)
    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe(20);
    expect(list.get(1)).toBe(30);
  });

  test('should remove an element by index', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.remove(1); // Remove element at index 1 (20)
    expect(list.getSize()).toBe(2);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(30);
  });

  test('should handle removing an element at an out-of-bounds index', () => {
    list.add(10);
    list.add(20);
    expect(() => list.remove(2)).toThrow('Index out of bounds');
  });

  test('should remove the first element', () => {
    list.add(10);
    list.add(20);
    list.removeFirst();
    expect(list.getSize()).toBe(1);
    expect(list.getFirst()).toBe(20);
  });

  test('should handle removing from an empty list', () => {
    expect(list.removeFirst()).toBeNull();
  });

  test('should remove the last element', () => {
    list.add(10);
    list.add(20);
    list.removeLast();
    expect(list.getSize()).toBe(1);
    expect(list.getLast()).toBe(10);
  });

  test('should handle removing from a list with one element', () => {
    list.add(10);
    list.removeLast();
    expect(list.getSize()).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should handle removing from an empty list', () => {
    expect(list.removeLast()).toBeNull();
  });
});
