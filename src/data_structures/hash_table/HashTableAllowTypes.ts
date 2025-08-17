export interface Equatable {
  equals(other: this): boolean;
}

export type HashTableAllowedValueTypes = string | number | boolean | Equatable;
export type HashTableAllowedKeyTypes = string | number;
