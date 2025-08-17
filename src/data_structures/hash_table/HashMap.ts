// https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/
// https://algs4.cs.princeton.edu/34hash/

import { modularHash } from '../../shared/utils/hashing';
import SinglyLinkedList from '../linked_list/SinglyLinkedList';
import {
  Equatable,
  HashTableAllowedKeyTypes,
  HashTableAllowedValueTypes,
} from './HashTableAllowTypes';

export interface IHashTable<
  TKey extends HashTableAllowedKeyTypes,
  TValue extends HashTableAllowedValueTypes,
> {
  get size(): number;
  clear(): void;
  remove(key: TKey): boolean;
  entries(): IterableIterator<[TKey, TValue | null]>;
  forEach(callback: (value: TValue, key: TKey, map: IHashTable<TKey, TValue>) => void): void;
  get(key: TKey): TValue | null;
  has(key: TKey): boolean;
  keys(): IterableIterator<TKey>;
  set(key: TKey, value: TValue): this;
  values(): IterableIterator<TValue | null>;
}

class KeyValuePair<TKey, TValue> implements Equatable {
  public key: TKey;
  public value: TValue | null;

  constructor(key: TKey, value: TValue | null = null) {
    this.key = key;
    this.value = value;
  }

  equals(other: this): boolean {
    return other !== null && other.key === this.key;
  }
}

export default class HashMap<
  TKey extends HashTableAllowedKeyTypes,
  TValue extends HashTableAllowedValueTypes,
> implements IHashTable<TKey, TValue>
{
  private _size: number;
  private _table: SinglyLinkedList<KeyValuePair<TKey, TValue>>[];
  private _initialSize: number;
  private _currentTableSize: number;
  private readonly LOAD_FACTOR_LIMIT = 0.7;

  constructor(initialSize = 32) {
    this._size = 0;
    this._initialSize = initialSize;
    this._currentTableSize = initialSize;
    this._table = this.initializeTable(this._currentTableSize);
  }

  get size(): number {
    return this._size;
  }

  clear(): void {
    this._table = this.initializeTable(this._initialSize);
    this._size = 0;
  }

  remove(key: TKey): boolean {
    const hash = this.hashKey(key);
    const linkedList = this._table[hash];
    if (linkedList.size <= 0) return false;

    const kvpToFind = new KeyValuePair<TKey, TValue>(key);
    const index = linkedList.indexOf(kvpToFind);
    const result = linkedList.remove(index);

    if (result) {
      this._size--;
      return true;
    }

    return false;
  }

  get(key: TKey): TValue | null {
    const hash = this.hashKey(key);
    const linkedList = this._table[hash];
    const pairToFind = new KeyValuePair<TKey, TValue>(key);

    if (!linkedList) return null;
    const index = linkedList.indexOf(pairToFind);
    return linkedList.get(index)?.value ?? null;
  }

  has(key: TKey): boolean {
    return this.get(key) !== null;
  }

  *keys(): IterableIterator<TKey> {
    for (const linkedList of this._table) {
      for (const kvp of linkedList) {
        yield kvp.key;
      }
    }
  }

  set(key: TKey, value: TValue): this {
    if ((this.size + 1) / this._currentTableSize > this.LOAD_FACTOR_LIMIT) {
      this.resizeTable(this._currentTableSize * 2);
    }

    const hash = this.hashKey(key);

    const linkedList = this._table[hash];
    const newKvp = new KeyValuePair<TKey, TValue>(key, value);

    const index = linkedList.indexOf(newKvp);
    if (index === -1) {
      linkedList.add(newKvp);
      this._table[hash] = linkedList;
      this._size++;

      return this;
    }

    const node = linkedList.get(index);
    if (node) node.value = value;

    return this;
  }

  *values(): IterableIterator<TValue | null> {
    for (const linkedList of this._table) {
      for (const kvp of linkedList) {
        if (kvp.key !== undefined && kvp.value === undefined) continue;
        yield kvp.value;
      }
    }
  }

  forEach(callback: (value: TValue, key: TKey, map: IHashTable<TKey, TValue>) => void): void {
    for (const linkedList of this._table) {
      for (const kvp of linkedList) {
        callback(kvp.value!, kvp.key, this);
      }
    }
  }

  *entries(): IterableIterator<[TKey, TValue | null]> {
    for (const bucket of this._table) {
      for (const kvp of bucket) {
        if (kvp.key !== undefined && kvp.value !== undefined) yield [kvp.key, kvp.value];
      }
    }
  }

  // Modular hash is used for testing purposes
  private hashKey(key: TKey): number {
    return modularHash(key.toString(), this._currentTableSize);
  }

  private resizeTable(newSize: number) {
    const originalTable = this._table;
    this._currentTableSize = newSize;
    this._size = 0;
    this._table = this.initializeTable(this._currentTableSize);

    for (const bucket of originalTable) {
      for (const kvp of bucket) {
        if (!kvp || kvp.value === null || kvp.value === undefined) continue;
        this.set(kvp.key, kvp.value);
      }
    }
  }

  private initializeTable(size: number): SinglyLinkedList<KeyValuePair<TKey, TValue>>[] {
    return Array.from({ length: size }, () => new SinglyLinkedList<KeyValuePair<TKey, TValue>>());
  }
}
