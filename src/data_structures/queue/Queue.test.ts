import Queue from './Queue';
import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue(5); // Set a small capacity for testing
  });

  test('should enqueue elements and increase the size', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.size()).toBe(2);
  });

  test('should dequeue elements in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBeUndefined(); // Empty queue should return undefined
  });

  test('should throw an error when enqueuing into a full queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    queue.enqueue(5);

    expect(() => queue.enqueue(6)).toThrow(IndexOutOfBoundsError);
  });

  test('should handle peeking at the front element', () => {
    queue.enqueue(10);
    queue.enqueue(20);

    expect(queue.peek()).toBe(10); // Peek should return the first element
    queue.dequeue();
    expect(queue.peek()).toBe(20); // Peek should now return the next element
  });

  test('should handle an empty queue correctly', () => {
    expect(queue.size()).toBe(0);
    expect(queue.dequeue()).toBeUndefined(); // Dequeue from an empty queue should return undefined
    expect(queue.peek()).toBeUndefined(); // Peek on an empty queue should return undefined
  });

  describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
      queue = new Queue(5); // Set a small capacity for testing
    });

    test('should enqueue multiple elements from a list and increase the size', () => {
      queue.enqueueList([1, 2, 3]);

      expect(queue.size()).toBe(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });

    test('should enqueue elements from a list and handle partial filling of the queue', () => {
      queue.enqueue(1);
      queue.enqueueList([2, 3]);

      expect(queue.size()).toBe(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });

    test('should throw an error if enqueuing a list that exceeds the queue capacity', () => {
      queue.enqueue(1);
      expect(() => queue.enqueueList([2, 3, 4, 5, 6])).toThrow(IndexOutOfBoundsError);
    });

    test('should handle enqueuing a list with exactly enough space in the queue', () => {
      queue.enqueue(1);
      queue.enqueueList([2, 3, 4]);

      expect(queue.size()).toBe(4);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
    });

    test('should not change the queue if enqueuing an empty list', () => {
      queue.enqueue(1);
      queue.enqueueList([]);

      expect(queue.size()).toBe(1);
      expect(queue.peek()).toBe(1);
    });

    test('should correctly handle enqueuing a list to an empty queue', () => {
      queue.enqueueList([7, 8, 9]);

      expect(queue.size()).toBe(3);
      expect(queue.dequeue()).toBe(7);
      expect(queue.dequeue()).toBe(8);
      expect(queue.dequeue()).toBe(9);
    });
  });
});
