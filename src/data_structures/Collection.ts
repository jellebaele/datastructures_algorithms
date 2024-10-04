export default abstract class Collection<T> {
  protected data: T[];
  protected capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.data = new Array<T>(capacity);
  }

  getSize(): number {
    return this.data.length;
  }

  isFull(): boolean {
    return this.data.length === this.capacity;
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }

  abstract peek(): T | undefined;
}
