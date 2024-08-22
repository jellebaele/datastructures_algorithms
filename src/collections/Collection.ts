export default abstract class Collection<T> {
  protected data: T[] = [];
  protected capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  size(): number {
    return this.data.length;
  }

  isFull(): boolean {
    return this.data.length === this.capacity;
  }

  abstract peek(): T | undefined;
}
