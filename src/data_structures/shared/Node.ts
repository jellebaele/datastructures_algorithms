export default class Node<T> {
  data: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(data: T, next: Node<T> | null = null, prev: Node<T> | null = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}
