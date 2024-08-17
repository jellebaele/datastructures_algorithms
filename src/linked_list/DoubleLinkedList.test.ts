import DoublyLinkedList from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  test('should initialize an empty list', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.getSize()).toBe(0);
  });

  test('should add an element to the beginning of an empty list', () => {
    list.addFirst(10);

    expect(list.getSize()).toBe(1);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(10);
  });

  test('should add an element to the end of the list', () => {
    list.add(10);

    expect(list.getSize()).toBe(1);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(10);
  });

  test('should add multiple element to the end of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.getSize()).toBe(3);
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

  test('should add an element to the beginning of a non-empty list', () => {
    list.add(20);
    list.addFirst(10);

    expect(list.getSize()).toBe(2);
    expect(list.getFirst()).toBe(10);
    expect(list.getLast()).toBe(20);
    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
  });

  test('should get the element at the index of the list', () => {
    list.add(10);
    list.add(20);
    list.add(30);

    expect(list.get(0)).toBe(10);
    expect(list.get(1)).toBe(20);
    expect(list.get(2)).toBe(30);
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

    expect(list.getSize()).toBe(3);
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

  // test('should correctly update the list after adding and removing elements at the beginning', () => {
  //   list.add(30);
  //   list.addFirst(20);
  //   list.addFirst(10);

  //   list.removeFirst(); // Remove 10

  //   expect(list.getSize()).toBe(2);
  //   expect(list.getFirst()).toBe(20);
  //   expect(list.get(0)).toBe(20);
  //   expect(list.get(1)).toBe(30);
  // });

  // test('should convert the list to a string after removing an element', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);
  //   list.remove(1); // Remove element 20
  //   expect(list.toString()).toBe('10 <-> 30');
  // });

  // test('should convert the list to a string after inserting an element', () => {
  //   list.add(10);
  //   list.add(30);
  //   list.insert(1, 20); // Insert 20 between 10 and 30
  //   expect(list.toString()).toBe('10 <-> 20 <-> 30');
  // });

  // test('should add multiple elements to the end of the list', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);

  //   expect(list.getSize()).toBe(3);
  //   expect(list.getFirst()).toBe(10);
  //   expect(list.getLast()).toBe(30);
  // });

  // test('should navigate through the list in both directions', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);

  //   expect(list.get(0)).toBe(10);
  //   expect(list.get(1)).toBe(20);
  //   expect(list.get(2)).toBe(30);

  //   expect(list.getPrevious(1)).toBe(10);
  //   expect(list.getPrevious(2)).toBe(20);
  // });

  // test('should insert an element at a specific index', () => {
  //   list.add(10);
  //   list.add(30);
  //   list.insert(1, 20); // Insert 20 at index 1

  //   expect(list.getSize()).toBe(3);
  //   expect(list.get(0)).toBe(10);
  //   expect(list.get(1)).toBe(20);
  //   expect(list.get(2)).toBe(30);

  //   expect(list.getPrevious(1)).toBe(10);
  //   expect(list.getNext(1)).toBe(30);
  // });

  // test('should remove an element at a specific index', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);
  //   list.remove(1); // Remove element at index 1 (20)

  //   expect(list.getSize()).toBe(2);
  //   expect(list.get(0)).toBe(10);
  //   expect(list.get(1)).toBe(30);

  //   expect(list.getPrevious(1)).toBe(10);
  //   expect(list.getLast()).toBe(30);
  // });

  // test('should remove the first element', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);
  //   list.removeFirst();

  //   expect(list.getSize()).toBe(2);
  //   expect(list.getFirst()).toBe(20);
  //   expect(list.getPrevious(1)).toBe(20);
  // });

  // test('should remove the last element', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);
  //   list.removeLast();

  //   expect(list.getSize()).toBe(2);
  //   expect(list.getLast()).toBe(20);
  //   expect(list.getNext(0)).toBe(20);
  // });

  // test('should handle searching for an element', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.add(30);

  //   expect(list.contains(20)).toBe(true);
  //   expect(list.contains(40)).toBe(false);
  //   expect(list.indexOf(30)).toBe(2);
  //   expect(list.indexOf(50)).toBe(-1);
  // });

  // test('should handle inserting at the beginning', () => {
  //   list.add(20);
  //   list.insert(0, 10); // Insert 10 at the beginning

  //   expect(list.getSize()).toBe(2);
  //   expect(list.getFirst()).toBe(10);
  //   expect(list.getNext(0)).toBe(20);
  // });

  // test('should handle inserting at the end', () => {
  //   list.add(10);
  //   list.insert(1, 20); // Insert 20 at the end

  //   expect(list.getSize()).toBe(2);
  //   expect(list.getLast()).toBe(20);
  //   expect(list.getPrevious(1)).toBe(10);
  // });

  // test('should throw an error when accessing an out-of-bounds index', () => {
  //   list.add(10);
  //   expect(() => list.get(1)).toThrow('Index out of bounds');
  //   expect(() => list.insert(2, 20)).toThrow('Index out of bounds');
  //   expect(() => list.remove(2)).toThrow('Index out of bounds');
  // });

  // test('should clear the list', () => {
  //   list.add(10);
  //   list.add(20);
  //   list.clear();

  //   expect(list.isEmpty()).toBe(true);
  //   expect(list.getSize()).toBe(0);
  // });
});
