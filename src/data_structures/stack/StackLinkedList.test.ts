import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import StackLinkedList from './StackLinkedList';

describe('Stack', () => {
  let stack: StackLinkedList<number>;

  beforeEach(() => {
    stack = new StackLinkedList<number>(5);
  });

  test('should push elements and increase the size', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size).toBe(2);
  });

  test('should pop elements in LIFO order', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.size).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.size).toBe(0);
    expect(stack.pop()).toBeUndefined();
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

    expect(stack.peek()).toBe(20);
    stack.pop();
    expect(stack.peek()).toBe(10);
  });

  test('should handle an empty stack correctly', () => {
    expect(stack.size).toBe(0);
    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
  });

  test('should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBeTruthy();
  });

  test('should return false if stack is not empty', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();
  });
});
