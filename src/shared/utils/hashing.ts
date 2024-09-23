// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const modularHash = (key: string, size: number): number => {
  let hash = 0;
  const prime = 31;

  if (typeof key === 'string') {
    for (let i = 0; i < key.length; i++) {
      hash = prime * hash + (key.charCodeAt(i) % size);
    }
  }

  return hash;
};
