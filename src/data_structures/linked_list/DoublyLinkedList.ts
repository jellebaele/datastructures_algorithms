import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import NotFoundError from '../../shared/errors/NotFoundError';
import Node from '../shared/Node';
import ILinkedList from './ILinkedList';

export default class DoublyLinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size = 0;

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size;
  }

  public addFirst(element: T): T {
    const newNode = new Node(element);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;

    return element;
  }

  // O(1)
  public add(element: T): T {
    const newNode = new Node(element);

    if (this.size === 0) this.head = newNode;
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;
    this.size++;

    return element;
  }

  insert(index: number, element: T): T {
    if (index === 0) return this.addFirst(element);
    if (index < 0 || index > this.size) throw new IndexOutOfBoundsError();
    if (index === this.size) return this.add(element);

    const prevNode = this.getNode(index - 1);
    const nextNode = prevNode?.next;
    const newNode = new Node(element, nextNode, prevNode);

    if (prevNode) {
      prevNode.next = newNode;
      // newNode.prev = prevNode;
    }
    if (nextNode) {
      nextNode.prev = newNode;
      // newNode.next = nextNode;
    }

    this.size++;

    return element;
  }

  // O(N)
  // Optimialisition: as you can go backwards, you can check if the index is above or below the middle of the list to go
  // up or down
  public get(index: number): T | null {
    if (index < 0 || index >= this.size) throw new IndexOutOfBoundsError();
    const node = this.getNode(index);

    return node ? node.data : null;
  }

  // O(N)
  public search(element: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === element) return index;

      index++;
      current = current.next;
    }

    return -1;
  }

  public getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  public getLast(): T | null {
    return this.tail ? this.tail.data : null;
  }

  // O(n)
  public toString(): string {
    let result = '';
    let currentNode = this.head;

    while (currentNode) {
      result += currentNode.data + (currentNode.next ? ' <-> ' : '');
      currentNode = currentNode.next;
    }

    return result;
  }

  // O(N)
  // If input parameter is a node -> O(1) as you don't need to traverse the list to get both
  // the next and previous node
  remove(index: number): T | null {
    if (index < 0 || index > this.size - 1) throw new IndexOutOfBoundsError();
    if (index === 0) return this.removeFirst();
    if (index === this.size - 1) return this.removeLast();

    let nodeToRemove = this.getNode(index);
    if (!nodeToRemove) throw new NotFoundError();

    const prevNode = nodeToRemove?.prev;
    if (prevNode) {
      prevNode.next = nodeToRemove.next;
    }

    const nextNode = nodeToRemove?.next;
    if (nextNode) {
      nextNode.prev = nodeToRemove.prev;
    }

    const data = nodeToRemove.data;
    nodeToRemove = null;

    this.size--;

    return data;
  }

  // O(1)
  removeFirst(): T | null {
    if (!this.head) return null;

    const newHead = this.head.next;
    const oldHeadData = this.head.data;

    if (newHead) newHead.prev = null;
    this.head.next = null;
    this.head = newHead;
    this.size--;

    return oldHeadData ? oldHeadData : null;
  }

  // 0(1)
  removeLast(): T | null {
    if (!this.tail) return null;

    const newTail = this.tail.prev;
    const oldTailData = this.tail.data;

    if (newTail) newTail.next = null;
    this.tail.prev = null;
    this.tail = newTail;
    this.size--;

    return oldTailData ? oldTailData : null;
  }

  // O(N)
  clear(): void {
    let current = this.head;
    this.head = null;
    this.tail = null;

    while (current) {
      const nextNode = current.next;
      current = null;
      current = nextNode;
      this.size--;
    }
  }

  // O(N)
  contains(element: T): boolean {
    let current = this.head;

    while (current) {
      if (current.data === element) return true;
      current = current.next;
    }

    return false;
  }

  // O(N)
  indexOf(element: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === element) return index;
      index++;
      current = current.next;
    }

    return -1;
  }

  private getNode(index: number): Node<T> | null {
    let node: Node<T> | null;

    if (index + 1 > this.size / 2) {
      node = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        node = node ? node.prev : null;
      }
    } else {
      node = this.head;
      for (let i = 0; i < index; i++) {
        node = node ? node.next : null;
      }
    }

    return node;
  }
}
