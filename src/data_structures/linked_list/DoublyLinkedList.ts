import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import NotFoundError from '../../shared/errors/NotFoundError';
import Node from '../shared/Node';
import ILinkedList from './ILinkedList';

export default class DoublyLinkedList<T> implements ILinkedList<T> {
  private _head: Node<T> | null = null;
  private _tail: Node<T> | null = null;
  private _size = 0;

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public get size(): number {
    return this._size;
  }

  public addFirst(element: T): T {
    const newNode = new Node(element);

    if (!this._head) {
      this._head = this._tail = newNode;
    } else {
      newNode.next = this._head;
      this._head.prev = newNode;
      this._head = newNode;
    }

    this._size++;

    return element;
  }

  // O(1)
  public add(element: T): T {
    const newNode = new Node(element);

    if (this._size === 0) this._head = newNode;
    if (this._tail) {
      this._tail.next = newNode;
      newNode.prev = this._tail;
    }

    this._tail = newNode;
    this._size++;

    return newNode.data;
  }

  insert(index: number, element: T): T {
    if (index < 0 || index > this._size) throw new IndexOutOfBoundsError();
    if (index === 0) return this.addFirst(element);
    if (index === this._size) return this.add(element);

    const prevNode = this.getNode(index - 1);
    const nextNode = prevNode?.next;
    const newNode = new Node(element, nextNode, prevNode);

    if (!prevNode || !nextNode) throw new NotFoundError();

    prevNode.next = newNode;
    newNode.prev = prevNode;

    newNode.next = nextNode;
    nextNode.prev = newNode;

    this._size++;

    return newNode.data;
  }

  // O(N)
  // Optimialisition: as you can go backwards, you can check if the index is above or below the middle of the list to go
  // up or down
  public get(index: number): T | null {
    if (index < 0 || index >= this._size) throw new IndexOutOfBoundsError();
    const node = this.getNode(index);

    return node ? node.data : null;
  }

  // O(N)
  public search(element: T): number {
    let current = this._head;
    let index = 0;

    while (current) {
      if (current.data === element) return index;

      index++;
      current = current.next;
    }

    return -1;
  }

  public getFirst(): T | null {
    return this._head ? this._head.data : null;
  }

  public getLast(): T | null {
    return this._tail ? this._tail.data : null;
  }

  // O(n)
  public toString(): string {
    let result = '';
    let currentNode = this._head;

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
    if (index < 0 || index > this._size - 1) throw new IndexOutOfBoundsError();
    if (index === 0) return this.removeFirst();
    if (index === this._size - 1) return this.removeLast();

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

    this._size--;

    return data;
  }

  // O(1)
  removeFirst(): T | null {
    if (!this._head) return null;

    const newHead = this._head.next;
    const oldHeadData = this._head.data;

    if (newHead) newHead.prev = null;
    this._head.next = null;
    this._head = newHead;
    this._size--;

    return oldHeadData ? oldHeadData : null;
  }

  // 0(1)
  removeLast(): T | null {
    if (!this._tail) return null;

    const newTail = this._tail.prev;
    const oldTailData = this._tail.data;

    if (newTail) newTail.next = null;
    this._tail.prev = null;
    this._tail = newTail;
    this._size--;

    return oldTailData ? oldTailData : null;
  }

  // O(N)
  clear(): void {
    let current = this._head;
    this._head = null;
    this._tail = null;

    while (current) {
      const nextNode = current.next;
      current = null;
      current = nextNode;
      this._size--;
    }
  }

  // O(N)
  contains(element: T): boolean {
    let current = this._head;

    while (current) {
      if (current.data === element) return true;
      current = current.next;
    }

    return false;
  }

  // O(N)
  indexOf(element: T): number {
    let current = this._head;
    let index = 0;

    while (current) {
      if (current.data === element) return index;
      index++;
      current = current.next;
    }

    return -1;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let current = this._head;

    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  private getNode(index: number): Node<T> | null {
    let node: Node<T> | null;

    if (index + 1 > this._size / 2) {
      node = this._tail;
      for (let i = this._size - 1; i > index; i--) {
        node = node ? node.prev : null;
      }
    } else {
      node = this._head;
      for (let i = 0; i < index; i++) {
        node = node ? node.next : null;
      }
    }

    return node;
  }
}
