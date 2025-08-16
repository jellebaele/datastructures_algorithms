import DoublyLinkedList from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  test('should initialize an empty list', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size).toBe(0);
  });

  test('should add an element to the end of the list', () => {
    list.add(10);

    expect(list.size).toBe(1);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(10);
  });

  test('should add multiple element to the end of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.size).toBe(3);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(30);
  });

  test('should convert an empty list to a string', () => {
    expect(list.toString()).toBe('');
  });

  test('should convert the list with one element to a string', () => {
    list.add(10);
    expect(list.toString()).toBe('10');
  });

  test('should convert the list with multiple elements to a string', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.toString()).toBe('10 <-> 20 <-> 30');
  });

  test('should add an element to the beginning of an empty list', () => {
    list.addFirst(10);

    expect(list.size).toBe(1);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(10);
  });

  test('should add an element to the beginning of a non-empty list', () => {
    list.add(20);
    list.addFirst(10);

    expect(list.size).toBe(2);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(20);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
  });

  test('should get the element at the index of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);
    list.add(50);

    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
    expect(list.get(3)).toBe(40);
    expect(list.get(4)).toBe(50);
  });

  test('should throw an error when getting from an empty list', () => {
    expect(() => list.get(0)).toThrow('Index out of bounds');
  });

  test('should throw an error when getting with a negative index', () => {
    list.add(10);
    expect(() => list.get(-1)).toThrow('Index out of bounds');
  });

  test('should throw an error when getting with an index greater than the list size', () => {
    list.add(10);
    list.add(20);
    expect(() => list.get(2)).toThrow('Index out of bounds');
  });

  test('should throw an error when getting with an index equal to the list size', () => {
    list.add(10);
    expect(() => list.get(1)).toThrow('Index out of bounds');
  });

  test('should maintain correct linkage when multiple elements are added at the beginning', () => {
    list.add(30);
    list.addFirst(20);
    list.addFirst(10);

    expect(list.size).toBe(3);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(30);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
  });

  test('should update toString correctly after adding an element at the beginning', () => {
    list.add(20);
    list.addFirst(10);

    expect(list.toString()).toBe('10 <-> 20');
  });

  test('should return the index of the element if it exists', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.search(10)).toBe(0); // Element at the beginning
    expect(list.search(20)).toBe(1); // Element in the middle
    expect(list.search(30)).toBe(2); // Element at the end
  });

  test('should return -1 if the element does not exist', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.search(40)).toBe(-1); // Element not in the list
  });

  test('should return -1 for an empty list', () => {
    expect(list.search(10)).toBe(-1);
  });

  test('should return the index of the first occurrence if there are duplicates', () => {
    list.add(10);
    list.add(20);
    list.add(10); // Duplicate element

    expect(list.search(10)).toBe(0); // Should return the first occurrence
  });

  test('should return -1 when searching for null or undefined values', () => {
    list.add(10);
    list.add(20);

    expect(list.search(null as unknown as number)).toBe(-1);
    expect(list.search(undefined as unknown as number)).toBe(-1);
  });

  test('should insert an element at the beginning of the list', () => {
    list.add(20);
    list.add(30);
    list.insert(0, 10);

    expect(list.size).toBe(3);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
  });

  test('should insert an element at the end of the list', () => {
    list.add(10);
    list.add(20);
    list.insert(2, 30); // Insert at the end

    expect(list.size).toBe(3);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
  });

  test('should insert an element in the middle of the list', () => {
    list.add(10);
    list.add(30);
    list.insert(1, 20); // Insert in the middle

    expect(list.size).toBe(3);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
  });

  test('should throw an error when inserting at an out-of-bounds index (negative index)', () => {
    expect(() => list.insert(-1, 10)).toThrow('Index out of bounds');
  });

  test('should throw an error when inserting at an out-of-bounds index (index greater than size)', () => {
    list.add(10);
    list.add(20);
    expect(() => list.insert(3, 30)).toThrow('Index out of bounds');
  });

  test('should insert an element into an empty list at index 0', () => {
    list.insert(0, 10);

    expect(list.size).toBe(1);
    expect(list.get(0)).toBe(10);
  });

  test('should correctly update the list after multiple inserts', () => {
    list.add(10);
    list.add(30);
    list.add(60);
    list.add(70);
    list.add(90);
    list.insert(1, 20); // List: 10, 20, 30, 60, 70, 90
    list.insert(3, 40); // List: 10, 20, 30, 40, 60, 70, 90
    list.insert(6, 80); // List: 10, 20, 30, 40, 60, 70, 80, 90
    list.insert(4, 50); // List: 10, 20, 30, 40, 50, 60, 70, 80, 90
    list.insert(0, 5); // List: 5, 10, 20, 30, 40, 50, 60, 70, 80, 90

    expect(list.size).toBe(10);
    expect(list.get(0)).toBe(5);
    expect(list.get(1)).toBe(10);
    expect(list.get(2)).toBe(20);
    expect(list.get(3)).toBe(30);
    expect(list.get(4)).toBe(40);
    expect(list.get(5)).toBe(50);
    expect(list.get(6)).toBe(60);
    expect(list.get(7)).toBe(70);
    expect(list.get(8)).toBe(80);
    expect(list.get(9)).toBe(90);
    expect(list.toString()).toBe(
      '5 <-> 10 <-> 20 <-> 30 <-> 40 <-> 50 <-> 60 <-> 70 <-> 80 <-> 90',
    );
  });

  test('should remove the first element from a list with multiple elements', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    const removed = list.removeFirst();

    expect(removed).toBe(10);
    expect(list.size).toBe(2);
    expect(list.get(0)).toBe(20);
    expect(list.get(1)).toBe(30);
  });

  test('should remove the first element from a list with one element', () => {
    list.add(10);

    const removed = list.removeFirst();

    expect(removed).toBe(10);
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should handle removing from an empty list', () => {
    expect(list.removeFirst()).toBeNull();
  });

  test('should handle removing after multiple removals', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    list.removeFirst(); // Remove 10
    list.removeFirst(); // Remove 20

    const removed = list.removeFirst(); // Remove 30

    expect(removed).toBe(30);
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should remove the last element from a list with multiple elements', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    const removed = list.removeLast();

    expect(removed).toBe(30);
    expect(list.size).toBe(2);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
  });

  test('should remove the last element from a list with one element', () => {
    list.add(10);

    const removed = list.removeLast();

    expect(removed).toBe(10);
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should handle removing from an empty list', () => {
    expect(list.removeLast()).toBeNull();
  });

  test('should handle removing after multiple removals', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    list.removeLast(); // Remove 30
    list.removeLast(); // Remove 20

    const removed = list.removeLast(); // Remove 10

    expect(removed).toBe(10);
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should remove the element at the beginning of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    const removed = list.remove(0); // Remove element at index 0 (10)

    expect(removed).toBe(10);
    expect(list.size).toBe(2);
    expect(list.get(0)).toBe(20);
    expect(list.get(1)).toBe(30);
  });

  test('should remove the element at the end of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    const removed = list.remove(2); // Remove element at index 2 (30)

    expect(removed).toBe(30);
    expect(list.size).toBe(2);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
  });

  test('should remove the element in the middle of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);

    const removed = list.remove(2); // Remove element at index 2 (30)

    expect(removed).toBe(30);
    expect(list.size).toBe(3);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(40);
  });

  test('should handle removing from an empty list', () => {
    expect(() => list.remove(0)).toThrow('Index out of bounds');
  });

  test('should handle removing at an out-of-bounds index (negative index)', () => {
    list.add(10);
    list.add(20);

    expect(() => list.remove(-1)).toThrow('Index out of bounds');
  });

  test('should handle removing at an out-of-bounds index (index greater than size)', () => {
    list.add(10);
    list.add(20);

    expect(() => list.remove(2)).toThrow('Index out of bounds');
  });

  test('should handle removing the last remaining element in the list', () => {
    list.add(10);

    const removed = list.remove(0); // Remove the last element (10)

    expect(removed).toBe(10);
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should correctly update links when removing an element', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);

    list.remove(1); // Remove element at index 1 (20)

    expect(list.size).toBe(3);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(30);
    expect(list.get(2)).toBe(40);
  });

  test('should clear a list with multiple elements', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    list.clear();

    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(() => list.get(0)).toThrow('Index out of bounds'); // Check access after clear
    expect(list.getFirst()).toBeNull();
    expect(list.getLast()).toBeNull();
  });

  test('should clear a list with one element', () => {
    list.add(10);

    list.clear();

    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(() => list.get(0)).toThrow('Index out of bounds'); // Check access after clear
    expect(list.getFirst()).toBeNull();
    expect(list.getLast()).toBeNull();
  });

  test('should handle clearing an already empty list', () => {
    list.clear(); // Clear an empty list

    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(() => list.get(0)).toThrow('Index out of bounds'); // Check access after clear
    expect(list.getFirst()).toBeNull();
    expect(list.getLast()).toBeNull();
  });

  test('should clear after multiple operations', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.remove(1); // Remove 20
    list.insert(1, 25); // Insert 25

    list.clear();

    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(() => list.get(0)).toThrow('Index out of bounds'); // Check access after clear
    expect(list.getFirst()).toBeNull();
    expect(list.getLast()).toBeNull();
  });

  test('should return true if the list contains the element', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.contains(20)).toBe(true);
    expect(list.contains(30)).toBe(true);
  });

  test('should return false if the list does not contain the element', () => {
    list.add(10);
    list.add(20);

    expect(list.contains(30)).toBe(false);
  });

  test('should return false if the list is empty', () => {
    expect(list.contains(10)).toBe(false);
  });

  test('should handle checking for element that has not been added', () => {
    list.add(10);
    list.add(20);

    expect(list.contains(15)).toBe(false);
  });

  test('should return the index of the element if it exists in the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.indexOf(20)).toBe(1);
    expect(list.indexOf(30)).toBe(2);
  });

  test('should return -1 if the element does not exist in the list', () => {
    list.add(10);
    list.add(20);

    expect(list.indexOf(30)).toBe(-1);
  });

  test('should return -1 if the list is empty', () => {
    expect(list.indexOf(10)).toBe(-1);
  });

  test('should handle finding index of an element that was just removed', () => {
    list.add(10);
    list.add(20);
    list.remove(0); // Remove 10

    expect(list.indexOf(10)).toBe(-1);
    expect(list.indexOf(20)).toBe(0);
  });

  test('should handle finding index of an element after multiple operations', () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.remove(1); // Remove 20
    list.insert(1, 25); // Insert 25 at index 1

    expect(list.indexOf(10)).toBe(0);
    expect(list.indexOf(25)).toBe(1);
    expect(list.indexOf(30)).toBe(2);
  });

  test('should iterate over elements using for...of', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    const result: number[] = [];
    for (const value of list) {
      result.push(value);
    }

    expect(result).toEqual([10, 20, 30]);
  });

  test('should support spread syntax', () => {
    list.add(1);
    list.add(2);
    list.add(3);

    expect([...list]).toEqual([1, 2, 3]);
  });

  test('should return empty iterator for empty list', () => {
    expect([...list]).toEqual([]);
  });
});
