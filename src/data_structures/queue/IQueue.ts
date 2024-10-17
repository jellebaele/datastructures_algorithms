interface IQueue<T> {
  enqueue(element: T): void;
  enqueueList(elements: T[] | undefined): void;
  dequeue(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
  peek(): T | undefined;
  size: number;
}

export default IQueue;
