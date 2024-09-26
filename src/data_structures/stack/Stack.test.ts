import Stack from './Stack';
import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack(5); // Set a small capacity for testing
  });

  test('should push elements and increase the size', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.getSize()).toBe(2);
  });

  test('should pop elements in LIFO order', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeUndefined(); // Empty stack should return undefined
  });

  test('should throw an error when pushing into a full stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);

    expect(() => stack.push(6)).toThrow(IndexOutOfBoundsError);
  });

  test('should handle peeking at the top element', () => {
    stack.push(10);
    stack.push(20);

    expect(stack.peek()).toBe(20); // Peek should return the last element
    stack.pop();
    expect(stack.peek()).toBe(10); // Peek should now return the next element
  });

  test('should handle an empty stack correctly', () => {
    expect(stack.getSize()).toBe(0);
    expect(stack.pop()).toBeUndefined(); // Pop from an empty stack should return undefined
    expect(stack.peek()).toBeUndefined(); // Peek on an empty stack should return undefined
  });
});
