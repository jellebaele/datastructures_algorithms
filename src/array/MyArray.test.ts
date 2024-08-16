import MyArray from './MyArray';

describe('MyArray', () => {
  let arr: MyArray<number>;

  beforeEach(() => {
    arr = new MyArray<number>(3);
  });

  test('should add elements to the end using push', () => {
    arr.push(10);
    arr.push(20);
    arr.push(30);

    expect(arr.getLength()).toBe(3);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(20);
    expect(arr.get(2)).toBe(30);
  });

  test('should remove and return the last element using pop', () => {
    arr.push(10);
    arr.push(20);

    const popped = arr.pop();

    expect(popped).toBe(20);
    expect(arr.getLength()).toBe(1);
    expect(arr.get(0)).toBe(10);
  });

  test('should throw an error when pushing beyond the fixed length', () => {
    arr.push(10);
    arr.push(20);
    arr.push(30);

    expect(() => arr.push(40)).toThrow('Array is full');
  });

  test('should return undefined when popping from an empty array', () => {
    const popped = arr.pop();

    expect(popped).toBeUndefined();
    expect(arr.getLength()).toBe(0);
  });

  test('should get elements by index', () => {
    arr.push(10);
    arr.push(20);
    arr.push(30);

    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(20);
    expect(arr.get(2)).toBe(30);
    expect(arr.get(3)).toBeUndefined(); // Out of bounds
  });

  test('should delete an element at a specific index', () => {
    arr.push(10);
    arr.push(20);
    arr.push(30);

    arr.delete(1);

    expect(arr.getLength()).toBe(2);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(30);
  });

  test('should handle deleting the first element', () => {
    arr.push(10);
    arr.push(20);

    arr.delete(0);

    expect(arr.getLength()).toBe(1);
    expect(arr.get(0)).toBe(20);
  });

  test('should handle deleting the last element', () => {
    arr.push(10);
    arr.push(20);

    arr.delete(1);

    expect(arr.getLength()).toBe(1);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBeUndefined(); // Out of bounds
  });

  test('should handle deleting an out-of-bounds index', () => {
    arr.push(10);
    arr.push(20);

    arr.delete(10); // Out-of-bounds delete

    expect(arr.getLength()).toBe(2);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(20);
  });

  test('should return a string representation of the array', () => {
    arr.push(10);
    arr.push(20);
    arr.push(30);

    expect(arr.toString()).toBe('[ 10, 20, 30 ]');
  });

  test('should return an empty array representation when the array is empty', () => {
    expect(arr.toString()).toBe('[ ]');
  });
});
