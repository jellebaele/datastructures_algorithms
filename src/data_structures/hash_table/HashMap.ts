// https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/
// https://algs4.cs.princeton.edu/34hash/

import { modularHash } from '../../shared/utils/hashing';
import SinglyLinkedList from '../linked_list/SinglyLinkedList';
import { Equatable, HashTableAllowedTypes } from './HashTableAllowTypes';

export interface IHashTable<T extends HashTableAllowedTypes> {
  get size(): number;
  clear(): void;
  remove(key: string): boolean;
  // entries();
  // forEach():void;
  get(key: string): T | null;
  has(key: string): boolean;
  keys(): IterableIterator<string>;
  set(key: string, value: T): this;
  values(): IterableIterator<T>;
}

class KeyValuePair<T> implements Equatable {
  public key: string;
  public value?: T | null;

  constructor(key: string, value?: T) {
    this.key = key;
    this.value = value;
  }
  equals(other: this): boolean {
    return other !== null && other.key === this.key;
  }
}

export default class HashMap<T extends HashTableAllowedTypes> implements IHashTable<T> {
  private _size: number;
  private _table: SinglyLinkedList<KeyValuePair<T>>[];
  private _currentTableSize: number;
  private readonly LOAD_FACTOR_LIMIT = 0.7;

  constructor(initialSize = 1000) {
    this._size = 0;
    this._currentTableSize = initialSize;
    this._table = this.initializeTable(this._currentTableSize);
  }

  get size(): number {
    return this._size;
  }

  clear(): void {
    this._table = new Array(this._currentTableSize);
    this._size = 0;
  }

  remove(key: string): boolean {
    const hash = this.hashKey(key);
    const linkedList = this._table[hash];
    if (linkedList.size <= 0) return false;

    const kvpToFind = new KeyValuePair<T>(key);
    const index = linkedList.indexOf(kvpToFind);
    const result = linkedList.remove(index);

    if (result) {
      this._size--;
      return true;
    }

    return false;
  }

  get(key: string): T | null {
    const hash = this.hashKey(key);
    const linkedList = this._table[hash];
    const pairToFind = new KeyValuePair<T>(key);

    if (!linkedList) return null;
    const index = linkedList.indexOf(pairToFind);
    return linkedList.get(index)?.value ?? null;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  *keys(): IterableIterator<string> {
    for (const linkedList of this._table) {
      for (const kvp of linkedList) {
        yield kvp.key;
      }
    }
  }

  set(key: string, value: T): this {
    const hash = this.hashKey(key);

    const linkedList = this._table[hash];
    const newKvp = new KeyValuePair<T>(key, value);

    const index = linkedList.indexOf(newKvp);

    if (index === -1) {
      if (-this.size + 1 / this._currentTableSize > this.LOAD_FACTOR_LIMIT) {
        this.resizeTable(this._currentTableSize * 2);
      }

      linkedList.add(newKvp);
      this._table[hash] = linkedList;
      this._size++;
      return this;
    }

    linkedList.insert(index, newKvp);
    return this;
  }

  *values(): IterableIterator<T> {
    for (const linkedList of this._table) {
      for (const kvp of linkedList) {
        if (!kvp.value) continue;
        yield kvp.value;
      }
    }
  }

  private hashKey(key: string): number {
    return modularHash(key, this._currentTableSize);
  }

  private resizeTable(newSize: number) {
    const originalTable = this._table;
    this._currentTableSize *= newSize;
    this._size = 0;
    this._table = this.initializeTable(this._currentTableSize);

    for (const bucket of originalTable) {
      const size = bucket.size;
      for (let i = 0; i < size; i++) {
        const kvp = bucket.get(i);
        if (!kvp || !kvp.value) continue;
        this.set(kvp.key, kvp.value);
      }
    }
  }

  private initializeTable(size: number): SinglyLinkedList<KeyValuePair<T>>[] {
    return Array.from({ length: size }, () => new SinglyLinkedList<KeyValuePair<T>>());
  }
}
