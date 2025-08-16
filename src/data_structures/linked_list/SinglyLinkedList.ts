import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import NotFoundError from '../../shared/errors/NotFoundError';
import Node from '../shared/Node';
import ILinkedList from './ILinkedList';

export default class SinglyLinkedList<T> implements ILinkedList<T> {
  private size = 0;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  public isEmpty(): boolean {
    return this.size === 0;
  }

  // O(1)
  // Without keeping track of 'size' property: O(N) as you need to traverse the entire list
  public getSize(): number {
    return this.size;
  }

  // With tail: O(1)
  // Without tail: traverse to end and add: O(N)
  public add(element: T): T {
    const newNode = new Node(element);

    if (this.size === 0) this.head = newNode;
    if (this.tail) this.tail.next = newNode;

    this.tail = newNode;
    this.size++;

    return element;
  }

  // O(1)
  public addFirst(element: T): T {
    const newNode = new Node(element);

    this.head = newNode;
    if (this.size === 0) this.tail = newNode;
    this.size++;

    return element;
  }

  // O(N)
  public insert(index: number, element: T): T {
    if (index < 0 || index > this.size) throw new IndexOutOfBoundsError();
    if (index === this.size) return this.add(element);
    if (index === 0) return this.addFirst(element);

    const prevNode = this.findNodeBefore(index);
    if (prevNode) {
      const newNode = new Node(element, prevNode.next);
      prevNode.next = newNode;
      this.size++;
    }

    return element;
  }

  // O(N)
  public get(index: number): T | null {
    const node = this.getNode(index);

    return node ? node.data : null;
  }

  // O(1)
  public getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  // O(1) with tail, otherwise O(N) as you need to traverse the list
  public getLast(): T | null {
    return this.tail ? this.tail.data : null;
  }

  // O(N)
  public search(element: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (this.isEqual(current.data, element)) return index;
      index++;
      current = current.next;
    }

    return -1;
  }

  // O(N)
  // If input parameter is a node -> O(N) as you node to traverse
  // to the node before to be deleted
  public remove(index: number): T | null {
    if (index < 0 || index + 1 > this.size) throw new IndexOutOfBoundsError();
    if (index === 0) return this.removeFirst();
    if (index === this.size) return this.removeLast();

    const nodeToRemove = this.getNode(index);
    if (!nodeToRemove) throw new NotFoundError();

    const prevNode = this.findNodeBefore(index);
    if (!prevNode) throw new NotFoundError();

    prevNode.next = nodeToRemove.next;
    nodeToRemove.next = null;

    this.size--;
    return nodeToRemove ? nodeToRemove.data : null;
  }

  // O(1)
  public removeFirst(): T | null {
    if (!this.head) return null;

    const nodeToRemove = this.head;
    this.head = this.head.next;
    nodeToRemove.next = null;
    this.size--;

    return nodeToRemove.data;
  }

  // O(N)
  public removeLast(): T | null {
    if (!this.tail) return null;

    const nodeToRemove = this.tail;
    const prevNode = this.findNodeBefore(this.size - 1);
    if (prevNode) {
      prevNode.next = null;
      this.tail = prevNode;
    }

    if (nodeToRemove === this.head) this.head = null;

    this.size--;

    return nodeToRemove.data;
  }

  // O(N)
  public clear(): void {
    let currentNode = this.head;

    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.next = null; // Break the link to help garbage collection
      currentNode = nextNode;
    }

    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // O(N)
  public contains(element: T): boolean {
    let currentNode = this.head;

    while (currentNode) {
      if (this.isEqual(currentNode.data, element)) return true;
      currentNode = currentNode.next;
    }

    return false;
  }

  // O(N)
  public indexOf(element: T): number {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (this.isEqual(currentNode.data, element)) return index;
      currentNode = currentNode.next;
      index++;
    }

    return -1;
  }

  // O(N)
  public toString(): string {
    let result = '';
    let node = this.head;

    while (node) {
      result += node.data + (node.next ? ' -> ' : '');
      node = node.next;
    }

    return result;
  }

  private findNodeBefore(index: number): Node<T> | null {
    if (index < 1 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current) current = current.next;
    }

    return current;
  }

  private getNode(index: number): Node<T> | null {
    if (index < 0 || index >= this.size) return null;

    let node: Node<T> | null = this.head;
    for (let i = 0; i < index; i++) {
      node = node?.next || null;
    }

    return node ? node : null;
  }

  private isEqual(a: T, b: T): boolean {
    const hasEqualsMethod = typeof (a as any).equals === 'function';

    return hasEqualsMethod ? (a as any).equals(b) : a === b;
  }
}
